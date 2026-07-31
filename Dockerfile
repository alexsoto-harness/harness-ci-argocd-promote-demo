FROM node:20-alpine AS deps
WORKDIR /app
COPY app/package.json ./
RUN npm install --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=deps /app/node_modules ./node_modules
COPY app/package.json ./
COPY app/server.js ./
USER node
EXPOSE 8080
CMD ["node", "server.js"]
