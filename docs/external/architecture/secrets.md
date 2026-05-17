# Secrets (OpenBao)

Every credential lives in [OpenBao](https://openbao.org) (the LF fork of HashiCorp Vault, related the same way OpenTofu↔Terraform). Repos contain *paths*, never *values*.

## Where things live

| Path | What |
|---|---|
| `secret/hartle.tech/cloudflare/api_token` | CF DNS API token used by Terraform + Caddy ACME |
| `secret/hartle.tech/authentik/<app>_client_secret` | Per-app OIDC client secret |
| `secret/hartle.tech/grafana/admin-password` | Grafana bootstrap admin (auto-disabled in favor of SSO post-bootstrap) |
| `secret/hartle.tech/tailscale/api_key` | Tailscale control-plane API key (for split-DNS provisioning) |
| `secret/hartle.tech/github/pat` | GHCR pull token used by the in-cluster pull secret |
| ... | ... |

## How GHA pulls them

GitHub Actions authenticates to OpenBao via JWT (using GitHub's OIDC token, audience `cortex.hartle.tech`), then reads paths into `TF_VAR_*` environment variables before `tofu apply` runs. No long-lived tokens stored in GHA secrets — the workflow's bearer is the GitHub OIDC token itself.

## What gets bootstrapped how

| Resource | Bootstrap method |
|---|---|
| OpenBao itself | Helm chart; init JSON kept on operator machine (SOPS-encrypted) |
| Authentik admin token | Manual bootstrap → stored in OpenBao → consumed by Terraform thereafter |
| GHCR pull secret in cluster | Bootstrap script reads PAT from OpenBao → creates k8s Secret |

The discipline: a fresh clone of `hartle.tech-terraform` + the OpenBao init JSON is enough to rebuild the entire platform on a fresh VPS. If anything else is required, it's a bug worth tracking.
