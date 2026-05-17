# docs.hartle.tech

Public-facing engineering documentation for [HARTLE.TECH](https://hartle.tech).

Architecture overviews, integration guides, public APIs, contribution notes. The internal counterpart (runbooks, incident write-ups, decisions) lives on the tailnet at `wiki.hartle.tech`.

## Local dev

```sh
cd docs
npm ci
npm run dev          # vitepress dev server on :5180
npm run build        # static build → docs/external/.vitepress/dist
```

## Layout

```
docs/
├── external/        # VitePress site → docs.hartle.tech
│   ├── .vitepress/
│   ├── index.md
│   ├── guides/
│   ├── architecture/
│   └── products/
├── Dockerfile       # multi-stage: node:20 build → caddy:2-alpine runtime
└── Caddyfile        # in-pod, binds :8080
```

GHA on `develop` push builds the image and publishes to GHCR; Flux reconciles the cluster manifest in [`hartle.tech-terraform/k8s/workloads/product-docs/docs-hartle-tech/`](https://github.com/code-hartle-tech/hartle.tech-terraform/tree/main/k8s/workloads/product-docs).

## License

Apache-2.0 — see [LICENSE](LICENSE).
