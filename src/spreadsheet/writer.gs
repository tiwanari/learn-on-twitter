function recordTweet(date, datasource, tweet) {
  var sheet = getReviewSheet();
  sheet.appendRow([date, datasource, tweet]);
}

function getReviewSheet() {
  var sphreadsheet = 'LearnOnTwitter';
  var sheet = 'Review';
  
  var files = DriveApp.getFilesByName(sphreadsheet);
  var file = !files.hasNext() ? SpreadsheetApp.create(sphreadsheet) : files.next();
  
  var ss = SpreadsheetApp.openById(file.getId())
  try {
    ss.setActiveSheet(ss.getSheetByName(sheet));
  } catch (e) {
    ss.insertSheet(sheet);
    ss.appendRow(['Date', 'Data Source', 'Tweet']);
  }
  return ss;
}
