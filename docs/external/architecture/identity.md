# Identity (Authentik)

Every UI in the HARTLE.TECH platform sits behind [Authentik](https://goauthentik.io). No credentials are stored inside individual apps; everything federates through OIDC.

## The graph

```
Operator (browser / mobile)
        │
        ▼
  Authentik (authentik.hartle.tech)
   ├─ federates → GitHub OAuth
   └─ federates → Google Workspace
        │
        ▼
   Issues OIDC token → cluster apps (Grafana, Flux UI, OpenBao, Headlamp, Lab, …)
```

## Two OIDC patterns we use

| Pattern | Authentik resource | When |
|---|---|---|
| **Direct OAuth2** | `authentik_provider_oauth2` | App speaks OIDC natively (Grafana, OpenBao). App gets a `client_id` + `client_secret`. |
| **Forward-auth proxy** | `authentik_provider_proxy` | App doesn't speak OIDC (Flux UI, Lab static site). Caddy `forward_auth` consults Authentik's embedded outpost; an `ak-proxy` cookie carries the session. |

## Group → role mapping

We use Authentik group membership to assign roles inside each app. The standard claim-mapping is `groups[*]` → role attribute. For example, Grafana:

```ini
role_attribute_path = "contains(groups[*], 'grafana_admin') && 'Admin' || contains(groups[*], 'grafana_editor') && 'Editor' || 'Viewer'"
```

This lets us promote a user to admin in any app by adding them to a group in Authentik — no per-app user management.

## What this does NOT cover

- **Service-to-service auth.** Workloads inside the cluster talk via plain HTTP over `*.svc.cluster.local` (or mTLS via Linkerd / Istio if we ever add it). OIDC is for human users only.
- **API tokens.** Long-lived tokens for CI / scripts live in OpenBao (e.g. `hartle.tech/cloudflare/api_token`). Those rotate manually today; rotation automation is on the roadmap.
