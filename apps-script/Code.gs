/**
 * PinkPawPets booking endpoint
 *
 * - Receives booking POSTs from pinkpawpets.com
 * - Appends a row to the bound Google Sheet
 * - Emails NOTIFY_EMAIL with the booking details
 *
 * Setup: Deploy as Web App → Execute as: Me → Who has access: Anyone.
 * Copy the resulting /exec URL into index.html (BOOKING_ENDPOINT constant).
 */

const NOTIFY_EMAIL = 'ctriordan1@gmail.com';
const SHEET_ID = '1yY-7KpC16pEX0WIUeI3bll9OUDhe6mjr86gV9tYDXno';
const SHEET_NAME = 'Bookings';

const HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Pet Name',
  'Pet Type',
  'Start Date',
  'End Date',
  'Services',
  'Notes',
  'User Agent'
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');

    const timestamp = new Date();
    const name      = String(body.name      || '').slice(0, 200);
    const phone     = String(body.phone     || '').slice(0, 50);
    const petName   = String(body.petName   || '').slice(0, 100);
    const petType   = String(body.petType   || '').slice(0, 50);
    const startDate = String(body.startDate || '').slice(0, 50);
    const endDate   = String(body.endDate   || '').slice(0, 50);
    const services  = Array.isArray(body.services) ? body.services.join(', ').slice(0, 500) : String(body.services || '').slice(0, 500);
    const notes     = String(body.notes     || '').slice(0, 2000);
    const userAgent = String(body.userAgent || '').slice(0, 300);

    if (!name || !phone) {
      return jsonResponse({ ok: false, error: 'name and phone are required' }, 400);
    }

    const sheet = getOrCreateSheet();
    sheet.appendRow([timestamp, name, phone, petName, petType, startDate, endDate, services, notes, userAgent]);

    sendNotificationEmail({ timestamp, name, phone, petName, petType, startDate, endDate, services, notes });

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'PinkPawPets booking endpoint', method: 'POST JSON to this URL' });
}

function getOrCreateSheet() {
  const ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('Spreadsheet not found. Set SHEET_ID at the top of Code.gs.');
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendNotificationEmail(b) {
  const subject = `New PinkPawPets booking: ${b.name}`;
  const body = [
    'New booking request received!',
    '',
    `Name:       ${b.name}`,
    `Phone:      ${b.phone}`,
    `Pet:        ${b.petName || '(not provided)'} (${b.petType || 'unspecified'})`,
    `Dates:      ${b.startDate || '?'} → ${b.endDate || '?'}`,
    `Services:   ${b.services || '(none)'}`,
    `Notes:      ${b.notes || '(none)'}`,
    '',
    `Received:   ${b.timestamp}`,
    '',
    'See the bookings sheet for full history.'
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: body,
    replyTo: NOTIFY_EMAIL
  });
}

function jsonResponse(obj, status) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
