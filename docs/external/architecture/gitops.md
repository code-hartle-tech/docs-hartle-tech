# GitOps + Flux

Every persistent change to HARTLE.TECH's infrastructure happens through `hartle.tech-terraform`. The repo holds three slices that reconcile via three different paths.

## Mental model

```
hartle.tech-terraform/
├── *.tf                ← Terraform (Cloudflare DNS, Authentik OIDC clients)
├── ansible/            ← Caddy config, dnsmasq overrides, host config
└── k8s/                ← Kubernetes manifests + Flux HelmReleases
    ├── flux-system/    ← Flux's own GitRepository + Kustomizations
    └── workloads/      ← The actual apps (observability, product-docs, …)
```

## The flow

```
push main ──→ GitHub Actions ──→ Terraform Cloud (plan + apply)
            └─→ Ansible (SSH → VPS via Tailscale + IaC SSH key)
            
                 (independently)
push main ──→ Flux GitRepository (1-min poll) ──→ kustomize-controller
                                                ↓
                                           kubectl apply
                                                ↓
                                           helm-controller
                                                ↓
                                           workloads converge
```

## Why this shape

- **Terraform** is the only thing that should mutate Cloudflare / Authentik / Tailscale. State lives in TF Cloud (free tier). Drift surfaces as a plan delta.
- **Ansible** owns the OS-level config on the VPS: systemd units (Caddy, dnsmasq), file ownership, kernel sysctls. It only touches the things k8s can't.
- **Flux** owns everything inside the cluster. We never `kubectl apply` by hand on `main` — commits to `k8s/` are the source of truth, and Flux is the agent that makes the cluster match.

## Adding a new workload

1. Drop `k8s/workloads/<name>/` with a `Deployment` / `Service` / etc.
2. Add the path to `k8s/workloads/kustomization.yaml`.
3. Open a PR. Merge to `main`.
4. Wait up to ~1 min for Flux to reconcile.

If the workload needs an OIDC client, add a matching `authentik_provider_*` + `authentik_application` + brand binding in `authentik_sso.tf` in the same PR. Mandatory SSO is a hard org rule.
