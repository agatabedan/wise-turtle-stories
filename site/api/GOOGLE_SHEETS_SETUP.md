# Life After Google Sheets setup

This creates a private webhook that adds each submitted Journey request to a Google Sheet.

1. Create a Google Sheet named `Wise Turtle Journey Requests`.
2. In the sheet, open `Extensions` -> `Apps Script`.
3. Replace the starter code with this script. Replace `PASTE_THE_SAME_LONG_SECRET_HERE` with a long secret you keep private.

```javascript
const SHEET_NAME = "Journey requests";
const WEBHOOK_TOKEN = "PASTE_THE_SAME_LONG_SECRET_HERE";

function doPost(event) {
  if (!event || event.parameter.token !== WEBHOOK_TOKEN) {
    return json({ ok: false, error: "Unauthorized" });
  }

  const request = JSON.parse(event.postData.contents || "{}");
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted at",
        "Name",
        "Email",
        "Weather",
        "Requested path",
        "Situation",
        "Preferred contact",
        "Phone",
        "Request ID"
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      request.createdAt || "",
      request.name || "",
      request.email || "",
      request.weather || "",
      request.service || "",
      request.situation || "",
      request.contactPreference || "",
      request.phone || "",
      request.id || ""
    ]);
  } finally {
    lock.releaseLock();
  }

  return json({ ok: true });
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click `Deploy` -> `New deployment` -> choose `Web app`.
5. Set `Execute as` to `Me` and `Who has access` to `Anyone`.
6. Click `Deploy`, approve Google's permissions, then copy the URL ending in `/exec`.
7. In the Render Web Service environment, add:

```text
GOOGLE_SHEETS_WEBHOOK_URL = the Apps Script /exec URL
GOOGLE_SHEETS_WEBHOOK_TOKEN = the same long secret from the script
```

8. Save changes and submit a test Journey form. A new row should appear automatically.

The Postgres database remains the permanent source of truth. Google Sheets is a convenient live view and will not prevent a form from being saved if it is temporarily unavailable.
