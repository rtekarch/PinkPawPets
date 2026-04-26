# PinkPawPets — Booking Endpoint Setup

This folder contains the Google Apps Script that powers the booking form on
[pinkpawpets.com](https://pinkpawpets.com). It logs each booking into a
Google Sheet and emails you when a new request arrives.

## Setup (one-time)

1. **Create the Google Sheet**
   - Go to [sheets.new](https://sheets.new)
   - Rename the file to `PinkPawPets Bookings`

2. **Open the Apps Script editor**
   - In that sheet: `Extensions` → `Apps Script`

3. **Paste the code**
   - Delete the default `function myFunction() { ... }` content
   - Copy/paste the entire contents of `Code.gs` from this folder
   - Update `NOTIFY_EMAIL` at the top if you want a different inbox
   - `SHEET_ID` is already set to the live Bookings sheet — only change if you point at a different sheet (the long string between `/d/` and `/edit` in the sheet's URL)
   - Click the floppy/save icon

4. **Deploy as Web App**
   - Click `Deploy` (top right) → `New deployment`
   - Click the gear icon next to "Select type" → choose `Web app`
   - Description: `PinkPawPets booking endpoint`
   - Execute as: `Me (your-email)`
   - Who has access: **`Anyone`** (required — the public form must POST to it)
   - Click `Deploy`

5. **Authorize**
   - It will ask for permissions (Sheets + Gmail)
   - Choose your Google account
   - Click `Advanced` → `Go to PinkPawPets booking endpoint (unsafe)` (this is normal for unverified personal scripts)
   - Click `Allow`

6. **Copy the Web App URL**
   - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
   - Paste this URL into `index.html` (the `BOOKING_ENDPOINT` constant at the top of the `<script>` block)

7. **Test**
   - Reload pinkpawpets.com
   - Submit a test booking
   - Check the Google Sheet — a new row should appear
   - Check your inbox — an email should arrive

## Updating the script later

If you change `Code.gs`, you must redeploy:
- `Deploy` → `Manage deployments` → pencil icon → Version: `New version` → `Deploy`
- The URL stays the same — no need to update `index.html`
