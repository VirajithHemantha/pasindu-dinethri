function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const sheetId = '1QfPoaYoI79oo5jk18SMlSUdVV0aiQ-yhqKIPWOF1dHo';
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    
    // Check if the payload is present
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ status: 'error', message: 'No payload' });
    }
    
    const data = JSON.parse(e.postData.contents);
    const type = data.type; // 'rsvp' or 'wishes'
    
    if (type === 'rsvp') {
      return handleRsvp(spreadsheet, data);
    } else if (type === 'wishes') {
      return handleWishes(spreadsheet, data);
    } else {
      return createJsonResponse({ status: 'error', message: 'Invalid type' });
    }
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function handleRsvp(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, data: any) {
  const sheetName = 'RSVPs';
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(['Timestamp', 'Full Name', 'Guests', 'Dietary Notes']);
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, 4);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    sheet.setFrozenRows(1);
  }
  
  const timestamp = new Date();
  sheet.appendRow([
    timestamp,
    data.fullName || '',
    data.guests || '',
    data.dietaryNotes || ''
  ]);
  
  return createJsonResponse({ status: 'success', message: 'RSVP recorded' });
}

function handleWishes(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet, data: any) {
  const sheetName = 'Wishes';
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(['Timestamp', 'Name', 'Message']);
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, 3);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    sheet.setFrozenRows(1);
  }
  
  const timestamp = new Date();
  sheet.appendRow([
    timestamp,
    data.name || '',
    data.message || ''
  ]);
  
  return createJsonResponse({ status: 'success', message: 'Wish recorded' });
}

function createJsonResponse(responseObject: any) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle preflight requests for CORS
function doOptions(e: any) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
