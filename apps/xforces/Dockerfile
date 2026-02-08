FROM oven/bun:1 AS base
WORKDIR /app
COPY . .
RUN bun install
ENV AUTH_SECRET=
ENV DATABASE_URL="postgres://virat:virat123@host.docker.internal:5432/xforcesdb"
ENV AUTH_GOOGLE_ID=
ENV AUTH_GOOGLE_SECRET=
ENV AUTH_TRUST_HOST=true
ENV AUTH_URL=http://localhost:3002
ENV REDIS_URL=redis://api_user:api_pass@localhost:6379/1
RUN bun turbo run build --filter=xforces

WORKDIR  /app/apps/xforces/
EXPOSE 3002
CMD [ "bun","run", "start" ]
