# Security Policy

PinkPawPets is a small static site for a neighborhood pet-care business
run by two 12-year-olds. We take responsible disclosure seriously even at
this scale.

## Supported

The current `main` branch deployed at https://pinkpawpets.com.

## Reporting a vulnerability

**Please do not open a public GitHub issue for security problems.**

Instead, email the site owner at the address listed in the GitHub profile
of [@rtekarch](https://github.com/rtekarch), or use GitHub's private
[security advisory form](https://github.com/rtekarch/PinkPawPets/security/advisories/new).

Include:

- A short description of the issue
- Steps to reproduce
- The impact you believe it has

We will acknowledge receipt within 7 days and aim to remediate or
respond with a plan within 30 days.

## What's in scope

- The static site (`index.html`)
- The Google Apps Script booking endpoint (`apps-script/Code.gs`)
- The booking flow's handling of submitted personal data
  (names, phone numbers, pet info, free-text notes)

## What's out of scope

- Spam or abuse of the public booking form (rate-limit / validation
  improvements are welcome as regular issues, not security reports)
- Issues in third-party dependencies for which an upstream fix already
  exists — please file an issue and we will update
- Social engineering of the human operators (Charlie, Katie, or their
  parents)

## Data handling

The booking form collects: name, phone number, pet name & type, dates,
and free-text notes. This data is:

- Sent over HTTPS to a Google Apps Script Web App
- Appended to a private Google Sheet
- Emailed to a single notification inbox

Data is retained until manually deleted by the operators. There is no
analytics, tracking, or third-party sharing.
