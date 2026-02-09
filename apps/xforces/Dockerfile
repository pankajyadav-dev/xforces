FROM oven/bun:latest AS base
WORKDIR /app
RUN bun add -g  turbo

FROM base AS manager
WORKDIR /app
COPY . .
RUN turbo prune xforces --docker

FROM base AS installer
WORKDIR /app
COPY --from=manager /app/out/full/ ./
COPY --from=manager /app/out/bun.lock* ./
COPY --from=manager /app/turbo.json ./
COPY --from=manager /app/package.json ./
RUN bun install

FROM base AS build
WORKDIR /app
COPY --from=installer /app/ ./
ENV AUTH_SECRET=
ENV DATABASE_URL="postgres://virat:virat123@host.docker.internal:5432/xforcesdb"
ENV AUTH_GOOGLE_ID=
ENV AUTH_GOOGLE_SECRET=
ENV AUTH_TRUST_HOST=true
ENV AUTH_URL=http://localhost:3002
ENV REDIS_URL=redis://api_user:api_pass@host.docker.internal:6379/1
RUN bun run build --filter=xforces


# FROM base AS build
# WORKDIR /app
# COPY --from=filter /app/node_modules ./node_modules
# COPY --from=manager /app/out/full/ ./
# COPY turbo.json turbo.json
# COPY package.json package.json
# # RUN bun install

FROM base AS final
WORKDIR /app
COPY --from=build /app/apps/xforces/ ./
EXPOSE 3002
CMD ["bun", "run","start"]









# RUN bun install
# RUN bun turbo run build --filter=xforces

# WORKDIR  /app/apps/xforces/
# EXPOSE 3002
# CMD [ "bun","run", "start" ]
