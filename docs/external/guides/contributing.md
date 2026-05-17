# Contributing

Most repos accept PRs from anyone. The org-wide conventions:

## Commit style

```
type(scope SXXEXX #NNN): short subject

Longer body explaining the why. Wrap at ~72 chars.
Reference issues with `#NNN` and PRs with `!NNN` (where applicable).
```

`type` is one of: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`. `scope` is the area touched. `SXXEXX` is the session marker (loosely "TV-show coding journal" — feel free to omit on external PRs).

## Workflow

1. Open an issue first if the change is non-trivial — discussion is easier in writing than after the fact.
2. Branch off `develop` (or the repo's default — check the repo README).
3. Open a PR against the same branch you branched from.
4. Keep PRs small; reviewable in one sitting.

## Code of conduct

Be useful, be patient, be explicit. We use the [Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## Security disclosures

Email `contact@hartle.tech` with the words `SECURITY` in the subject. We respond within 72 hours. Please don't open a public issue for vulnerabilities until we've coordinated a fix.
