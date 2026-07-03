FROM oven/bun:alpine AS base

FROM base AS optimizer
WORKDIR /app
RUN bun add -g turbo

FROM optimizer AS manager
WORKDIR /app
COPY . .
RUN turbo prune xforces --docker

FROM base AS installer
WORKDIR /app
COPY --from=manager /app/out/json/ .
COPY --from=manager /app/out/bun.lock* .
COPY --from=manager /app/turbo.json ./
RUN bun install
COPY --from=manager /app/out/full/ .

FROM base AS build
WORKDIR /app
COPY --from=installer /app/ ./
ARG DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN DATABASE_URL=$DATABASE_URL bun run build --filter=xforces
RUN rm -rf node_modules apps/xforces/node_modules
RUN bun install --production --frozen-lockfile

FROM oven/bun:alpine AS final
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0" 
ENV PORT=3000
COPY --from=build /app/apps/xforces/.next/standalone ./
COPY --from=build /app/apps/xforces/public ./apps/xforces/public
COPY --from=build /app/apps/xforces/.next/static ./apps/xforces/.next/static
EXPOSE 3000
CMD ["bun", "apps/xforces/server.js"]
