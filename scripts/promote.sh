#!/usr/bin/env bash
# Promote an already-built image tag into an environment by updating Git desired state.
# Dev: direct commit to main (fast). Staging/Prod: PR + merge (audit trail).
#
# Usage:
#   ./scripts/promote.sh <dev|staging|prod> <image-tag>
#
# Required env (CI):
#   GITHUB_TOKEN  — PAT/fine-grained token with contents + pull_requests write
# Optional:
#   GIT_USER_NAME / GIT_USER_EMAIL
#   REPO_SLUG     — default alexsoto-harness/harness-ci-argocd-promote-demo
#   DRY_RUN=1     — print changes only
#   SKIP_MERGE=1  — open PR but do not merge (staging/prod)

set -euo pipefail

ENV_NAME="${1:-}"
IMAGE_TAG="${2:-}"
REPO_SLUG="${REPO_SLUG:-alexsoto-harness/harness-ci-argocd-promote-demo}"
BASE_BRANCH="${BASE_BRANCH:-main}"
KUSTOMIZE_FILE="envs/${ENV_NAME}/kustomization.yaml"

if [[ -z "${ENV_NAME}" || -z "${IMAGE_TAG}" ]]; then
  echo "Usage: $0 <dev|staging|prod> <image-tag>" >&2
  exit 1
fi

case "${ENV_NAME}" in
  dev|staging|prod) ;;
  *)
    echo "ENV must be one of: dev, staging, prod" >&2
    exit 1
    ;;
esac

if [[ ! -f "${KUSTOMIZE_FILE}" ]]; then
  echo "Missing ${KUSTOMIZE_FILE}" >&2
  exit 1
fi

if [[ -z "${GITHUB_TOKEN:-}" && -z "${DRY_RUN:-}" ]]; then
  echo "GITHUB_TOKEN is required unless DRY_RUN=1" >&2
  exit 1
fi

echo "==> Promoting tag '${IMAGE_TAG}' to ${ENV_NAME}"

python3 - "${KUSTOMIZE_FILE}" "${IMAGE_TAG}" <<'PY'
import re
import sys
from pathlib import Path

path = Path(sys.argv[1])
tag = sys.argv[2]
text = path.read_text()

new_text, n1 = re.subn(
    r'(^images:\n(?:.*\n)*?\s+newTag:\s*).*$',
    rf'\1"{tag}"',
    text,
    count=1,
    flags=re.M,
)
if n1 != 1:
    # Fallback: replace first newTag line under images
    new_text, n1 = re.subn(
        r'^(\s+newTag:\s*).*$',
        rf'\1"{tag}"',
        text,
        count=1,
        flags=re.M,
    )
if n1 != 1:
    raise SystemExit("ERROR: did not find images[].newTag to update")

needle = "path: /spec/template/spec/containers/0/env/1/value"
lines = new_text.splitlines()
out = []
updated = False
i = 0
while i < len(lines):
    out.append(lines[i])
    if needle in lines[i] and i + 1 < len(lines) and lines[i + 1].lstrip().startswith("value:"):
        indent = lines[i + 1][: len(lines[i + 1]) - len(lines[i + 1].lstrip())]
        out.append(f"{indent}value: {tag}")
        i += 2
        updated = True
        continue
    i += 1
if not updated:
    raise SystemExit("ERROR: did not find IMAGE_TAG env patch to update")
path.write_text("\n".join(out) + "\n")
print(f"Updated {path} -> tag {tag}")
PY

echo "==> Diff:"
git --no-pager diff -- "${KUSTOMIZE_FILE}" || true

if [[ -n "${DRY_RUN:-}" ]]; then
  echo "DRY_RUN set; stopping before git/GitHub operations"
  exit 0
fi

command -v curl >/dev/null
command -v python3 >/dev/null

git config user.name "${GIT_USER_NAME:-harness-ci-promote}"
git config user.email "${GIT_USER_EMAIL:-harness-ci-promote@users.noreply.github.com}"
git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${REPO_SLUG}.git"

git fetch origin "${BASE_BRANCH}"
git checkout -B "${BASE_BRANCH}" "origin/${BASE_BRANCH}"

# Re-apply file edits after checkout (checkout restores tracked files)
python3 - "${KUSTOMIZE_FILE}" "${IMAGE_TAG}" <<'PY'
import re
import sys
from pathlib import Path

path = Path(sys.argv[1])
tag = sys.argv[2]
text = path.read_text()
new_text, n1 = re.subn(r'^(\s+newTag:\s*).*$', rf'\1"{tag}"', text, count=1, flags=re.M)
if n1 != 1:
    raise SystemExit("ERROR: did not find images[].newTag to update")
needle = "path: /spec/template/spec/containers/0/env/1/value"
lines = new_text.splitlines()
out = []
updated = False
i = 0
while i < len(lines):
    out.append(lines[i])
    if needle in lines[i] and i + 1 < len(lines) and lines[i + 1].lstrip().startswith("value:"):
        indent = lines[i + 1][: len(lines[i + 1]) - len(lines[i + 1].lstrip())]
        out.append(f"{indent}value: {tag}")
        i += 2
        updated = True
        continue
    i += 1
if not updated:
    raise SystemExit("ERROR: did not find IMAGE_TAG env patch to update")
path.write_text("\n".join(out) + "\n")
PY

api() {
  local method="$1"
  local url="$2"
  shift 2
  curl -fsSL -X "${method}" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -H "Content-Type: application/json" \
    "$@" \
    "${url}"
}

if [[ "${ENV_NAME}" == "dev" ]]; then
  git add "${KUSTOMIZE_FILE}"
  if git diff --cached --quiet; then
    echo "No changes — ${ENV_NAME} already at tag ${IMAGE_TAG}"
    exit 0
  fi
  git commit -m "promote(dev): ${IMAGE_TAG}"
  git push origin "HEAD:${BASE_BRANCH}"
  echo "==> Dev promoted via direct commit to ${BASE_BRANCH}"
  exit 0
fi

BRANCH="promote/${ENV_NAME}/${IMAGE_TAG//\//-}"

git checkout -B "${BRANCH}"
git add "${KUSTOMIZE_FILE}"
if git diff --cached --quiet; then
  echo "No changes — ${ENV_NAME} already at tag ${IMAGE_TAG}"
  exit 0
fi
git commit -m "promote(${ENV_NAME}): ${IMAGE_TAG}"
git push -u origin "${BRANCH}" --force

OWNER="${REPO_SLUG%%/*}"
EXISTING_PR="$(api GET \
  "https://api.github.com/repos/${REPO_SLUG}/pulls?head=${OWNER}:${BRANCH}&state=open" \
  | python3 -c 'import json,sys; data=json.load(sys.stdin); print(data[0]["number"] if data else "")')"

if [[ -z "${EXISTING_PR}" ]]; then
  PAYLOAD="$(IMAGE_TAG="${IMAGE_TAG}" ENV_NAME="${ENV_NAME}" BRANCH="${BRANCH}" BASE_BRANCH="${BASE_BRANCH}" python3 - <<'PY'
import json, os
env = os.environ["ENV_NAME"]
tag = os.environ["IMAGE_TAG"]
body = f"""## Promote {env}

Update desired state for **{env}** to image tag `{tag}`.

Same artifact previously built by Harness CI. ArgoCD auto-sync will apply after merge.

- App: `promote-demo-{env}`
- Path: `envs/{env}`
- Namespace: `sq-demo-{env}`
"""
print(json.dumps({
  "title": f"promote({env}): {tag}",
  "head": os.environ["BRANCH"],
  "base": os.environ["BASE_BRANCH"],
  "body": body,
}))
PY
)"
  PR_NUMBER="$(api POST "https://api.github.com/repos/${REPO_SLUG}/pulls" -d "${PAYLOAD}" \
    | python3 -c 'import json,sys; print(json.load(sys.stdin)["number"])')"
  echo "==> Opened PR #${PR_NUMBER}"
else
  PR_NUMBER="${EXISTING_PR}"
  echo "==> Reusing open PR #${PR_NUMBER}"
fi

if [[ -n "${SKIP_MERGE:-}" ]]; then
  echo "SKIP_MERGE set; leaving PR #${PR_NUMBER} open"
  exit 0
fi

api PUT "https://api.github.com/repos/${REPO_SLUG}/pulls/${PR_NUMBER}/merge" \
  -d "{\"merge_method\":\"squash\",\"commit_title\":\"promote(${ENV_NAME}): ${IMAGE_TAG}\"}" \
  >/dev/null

echo "==> Merged PR #${PR_NUMBER} — ArgoCD will sync ${ENV_NAME}"
