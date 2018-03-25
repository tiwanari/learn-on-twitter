function getOrCreateSheet(sheetname, initialHeader) {
  var sphreadsheet = 'LearnOnTwitter';
  
  var files = DriveApp.getFilesByName(sphreadsheet);
  var file = !files.hasNext() ? SpreadsheetApp.create(sphreadsheet) : files.next();
  
  var ss = SpreadsheetApp.openById(file.getId())
  try {
    ss.setActiveSheet(ss.getSheetByName(sheetname));
  } catch (e) {
    ss.insertSheet(sheetname);
    ss.appendRow(initialHeader);
  }
  return ss;
}

function recordTweet(datasource, tweet) {
  var date = new Date().toISOString();
  
  var sheet = getOrCreateSheet('Review', ['Date', 'Data Source', 'Tweet']);
  sheet.appendRow([date, datasource, tweet]);
}

function addUserDatasourceRow(time, user, datasource) {
  var sheet = getOrCreateSheet('User-Datasource', ['Time (0 - 23, JST)', 'User', 'Data Source']);
  var data = sheet.getDataRange().getValues();
  
  for (i in data) {
    var row = data[i];
    if (row[0] === time && row[1] === user && row[2] == datasource) {
      Logger.log('Found the same row.');
      return;
    }
  }
  
  sheet.appendRow([time, user, datasource]);
}

function removeUserDatasourceRow(time, user, datasource) {
  var sheet = getOrCreateSheet('User-Datasource', ['Time (0 - 23, JST)', 'User', 'Data Source']);
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var data = rows.getValues()
  
  for (var i = 0; i < numRows; i++) {
    var row = data[i];
    if (row[0] === time && row[1] === user && row[2] == datasource) {
      Logger.log('Found the target row at ' + i);
      sheet.deleteRow(i + 1);
      return;
    }
  }
  Logger.log('Could not find the target row.');
}