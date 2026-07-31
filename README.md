# Harness CI + ArgoCD promote demo

Squarespace-style **build once, promote same artifact** across **Dev → Staging → Prod**.

**Teaching point:** ArgoCD does not promote. Promotion = updating Git desired state for the next environment; ArgoCD only syncs.

```
Harness Cloud CI
  Build → push alexsotoharness/harness-ci-argocd-promote-demo:<tag>
  Update envs/dev     → direct commit → Argo syncs Dev
  Approval
  Update envs/staging → PR + merge    → Argo syncs Staging
  Approval
  Update envs/prod    → PR + merge    → Argo syncs Prod

Selective stage re-run ≈ Drone `build promote … staging|prod`
```

## Layout

| Path | Purpose |
|------|---------|
| `app/` | Tiny Node/Express web app (shows env + image tag) |
| `Dockerfile` | Multi-stage image → `alexsotoharness/harness-ci-argocd-promote-demo` |
| `manifests/base/` | Shared Deployment + Service |
| `envs/{dev,staging,prod}/` | Kustomize overlays (image tag + namespace + `APP_ENV`) |
| `argocd/` | Argo Application manifests (auto-sync) |
| `scripts/promote.sh` | Updates env overlay; Dev=direct commit, Staging/Prod=PR+merge |
| `harness/ci_argocd_promote_demo.yaml` | Pipeline YAML for `sandbox` / `soto_sandbox` |

## One-time setup

### 1. ArgoCD apps (UI or CLI)

Target cluster must reach Docker Hub. Create apps (auto-sync + CreateNamespace):

```bash
kubectl apply -f argocd/promote-demo-dev.yaml
kubectl apply -f argocd/promote-demo-staging.yaml
kubectl apply -f argocd/promote-demo-prod.yaml
```

Or create the same three Applications in https://argo.sotocodes.com pointing at:

| App | Path | Namespace |
|-----|------|-----------|
| `promote-demo-dev` | `envs/dev` | `sq-demo-dev` |
| `promote-demo-staging` | `envs/staging` | `sq-demo-staging` |
| `promote-demo-prod` | `envs/prod` | `sq-demo-prod` |

Repo: `https://github.com/alexsoto-harness/harness-ci-argocd-promote-demo.git` @ `main`.

No Argo API token is required for Phase 1.

### 2. Harness secret

Pipeline promote steps use project secret **`gh-alexsoto-harness-fine-grained-token`** in `sandbox` / `soto_sandbox` (contents + pull-requests write on this repo).

### 3. Import pipeline

Reuse existing assets:

- Org/project: `sandbox` / `soto_sandbox`
- GitHub connector: `ghalexsotoharnessfinegrained`
- Docker Hub connector: `dockerhubalexsotoharness`

Create pipeline from `harness/ci_argocd_promote_demo.yaml` (identifier `ci_argocd_promote_demo`).  
Confirm **Allow selective stage executions** is enabled (set in YAML).

## Demo checklist

### Full run

1. Run pipeline on `main` (accept default `imageTag` = sequence id).
2. **Build** pushes `alexsotoharness/harness-ci-argocd-promote-demo:<tag>`.
3. **Promote Dev** commits `envs/dev` tag update → Argo syncs Dev → UI shows env `dev` + tag.
4. Approve **Staging** → PR merges `envs/staging` → Argo syncs Staging.
5. Approve **Prod** → PR merges `envs/prod` → Argo syncs Prod.

### Drone-like promote (selective re-run)

1. After a full build (or Build + Dev), note the `imageTag`.
2. Re-run only **Approve Staging → Promote Staging** (and/or Prod), passing the **same** `imageTag`.
3. No rebuild — same digest/tag moves to the next env via Git.

Local dry-run:

```bash
DRY_RUN=1 ./scripts/promote.sh staging 123
```

## Phase 2 (later)

Harness GitOps (BYOA into `argo.sotocodes.com`): replace shell promote with Update Release Repo + wait-for-PR-merge + GitOps Sync.

## Out of scope (Phase 1)

- Harness-managed Argo replacing personal Argo
- Mapping existing Harness CD envs Dev/Staging/Prod onto Argo apps
