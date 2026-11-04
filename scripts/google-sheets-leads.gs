/**
 * Google Apps Script — טבלת לידים מסודרת לאקסל / Sheets
 * -------------------------------------------------------
 * 1. פתחו Google Sheets חדש: "לידים — דוד טובול"
 * 2. בשורה 1 כתבו כותרות:
 *    תאריך | שם מלא | טלפון | על הפרויקט | מקור | ISO
 * 3. Extensions → Apps Script → הדביקו את הקובץ הזה → שמרו
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. העתיקו את ה-Web app URL ל־Vercel Env:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];

    // Ensure header row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "תאריך",
        "שם מלא",
        "טלפון",
        "על הפרויקט",
        "מקור",
        "ISO",
      ]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }

    sheet.appendRow([
      data.timestamp || "",
      data.name || "",
      data.phone || data.phoneRaw || "",
      data.message || "",
      data.source || "david-tubul-site",
      data.iso || new Date().toISOString(),
    ]);

    // Keep phone column as plain text (prevent scientific notation)
    var last = sheet.getLastRow();
    sheet.getRange(last, 3).setNumberFormat("@");

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, row: last }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "david-tubul-leads" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
