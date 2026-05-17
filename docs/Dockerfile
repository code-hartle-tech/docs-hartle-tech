# docs-hartle-tech — multi-stage.
# Stage 1 builds the VitePress site; stage 2 wraps it in caddy:2-alpine.

FROM node:20-alpine AS build
WORKDIR /src
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM caddy:2-alpine AS runtime
USER root
RUN setcap -r /usr/bin/caddy || true
WORKDIR /srv
COPY --from=build /src/external/.vitepress/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
USER nobody
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=2s \
  CMD wget --quiet --spider http://127.0.0.1:8080/ || exit 1
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
