# Security and Responsible Disclosure

ANKOMMER is used by people in sensitive moments of transition, including asylum seekers and newly arrived families. Security and privacy are not optional features. If you discover a vulnerability, please help us protect users by reporting it responsibly.

## Reporting a vulnerability

**Please do not file public issues for security problems.** Instead, contact the maintainer privately.

Open a private security advisory on GitHub:

https://github.com/AliAlMokdad/ankommer/security/advisories/new

We will acknowledge receipt within 72 hours, work with you on a fix, and credit you in the release notes (unless you prefer to remain anonymous).

## What is in scope

- Code in this repository (web app, service worker, Cloudflare worker)
- The production site at https://ankommer.org and `www.ankommer.org`
- Any integration that handles user data

## What is out of scope

- Vulnerabilities in upstream services we depend on (Open-Meteo, DAWA, Rejseplanen). Please report those upstream.
- Social engineering of the maintainer.
- Issues that require physical access to a user's device.

## Privacy commitments

ANKOMMER does not collect or store personal data on a server. All user progress and preferences are stored locally on the user's device. The AI assistant ("Bjørn") sends individual messages to an inference endpoint for processing but does not link them to a stable user identifier.

If a contribution would change any of these commitments, it cannot be merged without a public discussion first.

## Updates

Security advisories and fixes will be announced in the repository's "Security" tab and, where appropriate, in the project's release notes.
