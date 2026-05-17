# Architecture

A bird's-eye view of how HARTLE.TECH's platform is wired. The whole thing is one operator, one VPS, one git repo, and a small stack of opinionated choices.

## The slices

| Slice | What | Tool |
|---|---|---|
| **DNS, CDN, edge identity** | `hartle.tech` + `neartrace.app` zones | Cloudflare (via Terraform) |
| **TLS edge + host routing** | Every `*.hartle.tech` vhost | Caddy (single host instance) |
| **Mesh network** | Tailnet for tailnet-only services | Tailscale |
| **Container runtime** | All workloads except edge + plumbing | k3s (single node) |
| **GitOps** | Reconciliation of k8s manifests + HelmReleases | Flux v2 |
| **Identity** | OIDC for every UI | Authentik |
| **Secrets** | Every credential | OpenBao (Vault fork) |
| **Observability** | Logs + metrics + traces | Grafana + Loki + Alloy + Tempo + Prometheus |
| **CI/CD** | Apply TF + Ansible on `main`; build images on `develop` | GitHub Actions → GHCR |

## The three reconciliation paths

The GitOps repo at `code-hartle-tech/hartle.tech-terraform` has three slices applied three different ways:

| Slice | Apply mechanism | Trigger |
|---|---|---|
| `*.tf` at the repo root | GHA `iac-apply.yml` → `tofu apply` | push to `main` on `**.tf` |
| `ansible/` | Same GHA workflow → `ansible-playbook` | push to `main` |
| `k8s/` | **Flux** in-cluster (source/helm/kustomize controllers) | push to `main` on **any** path (1-min poll) |

## Pages

- **[GitOps + Flux](/architecture/gitops)** — how reconciliation actually works
- **[Identity (Authentik)](/architecture/identity)** — OIDC flow for every UI
- **[Secrets (OpenBao)](/architecture/secrets)** — the path-not-values discipline
