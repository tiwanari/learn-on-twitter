function readUserDatasource() {
  var sheet = getOrCreateSheet('User-Datasource', ['Time (0 - 23, JST)', 'User', 'Data Source']);
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var data = rows.getValues()
  
  var result = [];
  // skip header
  for (var i = 1; i < numRows; i++) {
    var row = data[i];
    result.push({ time: row[0], user: row[1], data_source: row[2] - 1 });
  }
  
  return result;
}