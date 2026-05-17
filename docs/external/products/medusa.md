# Medusa

ESP32-S3 inside a phone case. Passive RF recon, defensive research lane.

## Where to read more

- [medusa.hartle.tech](https://medusa.hartle.tech) — landing site
- [medusa.hartle.tech/docs/](https://medusa.hartle.tech/docs/) — public docs
- [github.com/code-hartle-tech/medusa](https://github.com/code-hartle-tech/medusa) — source

## What it is

Medusa is the MCU branch of the hacking-case-kit family. NearTrace handles the phone-side scanning; Medusa lives in the case alongside it as a passive RF observer. Apache-2.0 licensed; the public repo holds the seed issues and project board.

## What it is not

Medusa does not transmit. It listens, decodes, and logs — anything that crosses the line from passive observation into active emission is by design out of scope. That keeps the project clean of regulatory weight in most jurisdictions.
