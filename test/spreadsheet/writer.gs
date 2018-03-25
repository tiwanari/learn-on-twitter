function testRecordTweet() {
  var datasource = DATA_SOURCE[0].func.name;
  var tweet = '@hello Word of the day: word';
  recordTweet(datasource, tweet);
}

function testAddUserDatasourceRow() {
  var time = 13;
  var user = 'helpfulUser';
  var datasource = 1;
  addUserDatasourceRow(time, user, datasource);
}

function testRemoveUserDatasourceRow() {
  var time = 13;
  var user = 'helpfulUser';
  var datasource = 1;
  removeUserDatasourceRow(time, user, datasource);
}