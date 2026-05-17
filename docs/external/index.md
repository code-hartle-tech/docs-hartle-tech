---
layout: home
title: HARTLE.TECH · docs
hero:
  name: HARTLE.TECH
  text: Engineering docs
  tagline: Architecture, integration guides, and product overviews. Public-facing surface; internal runbooks live on the tailnet.
  actions:
    - theme: brand
      text: Guides
      link: /guides/
    - theme: alt
      text: Architecture
      link: /architecture/
    - theme: alt
      text: hartle.tech
      link: https://hartle.tech
features:
  - icon: 📐
    title: Architecture
    details: How the GitOps loop is wired — Terraform + Ansible + Flux v2 + k3s + Authentik + OpenBao. One repo, three reconciliation paths.
    link: /architecture/
    linkText: Read
  - icon: 🚀
    title: Products
    details: What we ship — NearTrace, Medusa, DumpSock, Nosferato. Each has its own surface; this page collects the engineering overview.
    link: /products/
    linkText: Browse
  - icon: 🛠
    title: Guides
    details: Getting started, contributing, and the workflow conventions that keep the platform sane.
    link: /guides/
    linkText: Open
  - icon: 🔐
    title: Identity & secrets
    details: OIDC via Authentik, secrets in OpenBao. Every UI is SSO; every credential is path-not-value.
    link: /architecture/identity
    linkText: Identity
---
