FROM oven/bun:alpine AS base

FROM base AS optimizer
RUN bun add -g turbo

FROM base AS stdbase
RUN apk add --no-cache python3 make g++

FROM optimizer AS manager
WORKDIR /app
COPY . .
RUN turbo prune engine --docker

FROM stdbase AS installer
WORKDIR /app
COPY --from=manager /app/out/json/ .
COPY --from=manager /app/out/bun.lock* .
COPY --from=manager /app/turbo.json .
RUN bun install
COPY --from=manager /app/out/full/ .

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
ARG DATABASE_URL
RUN DATABASE_URL=$DATABASE_URL bun run build --filter=engine
RUN rm -rf node_modules apps/engine/node_modules
RUN bun install --production --frozen-lockfile

FROM base AS final
RUN apk add --no-cache libstdc++ 
WORKDIR /app
COPY --from=builder /app/apps/engine/dist/ ./apps/engine/dist/
COPY --from=builder /app/apps/engine/node_modules ./apps/engine/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/engine/package.json ./apps/engine/package.json
WORKDIR /app/apps/engine
CMD ["bun", "run", "./dist/index.js"]