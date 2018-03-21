function recordTweet(date, datasource, tweet) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Review');
  sheet.appendRow([date, datasource, tweet]);
}