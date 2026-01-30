FROM oven/bun:1 AS base
WORKDIR /app

# Install all dependencies (including devDependencies for build)
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build stage
FROM deps AS build
COPY src src
COPY tsconfig.json tsconfig.build.json ./
RUN bun run build:prod

# Production dependencies only
FROM base AS prod-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Final image
FROM base AS release
COPY --from=prod-deps /app/node_modules node_modules
COPY --from=build /app/lib lib
COPY package.json .

USER bun
EXPOSE 3000
CMD ["bun", "start"]
