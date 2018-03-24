function testRecordTweet() {
  var datasource = DATA_SOURCE[0].func.name;
  var tweet = '@hello Word of the day: word';
  recordTweet(datasource, tweet);
}

function testAddUserDataSourceRow() {
  var time = 13;
  var user = 'helpfulUser';
  var dataSource = 1;
  addUserDataSourceRow(time, user, dataSource);
}

function testRemoveUserDataSourceRow() {
  var time = 13;
  var user = 'helpfulUser';
  var dataSource = 1;
  removeUserDataSourceRow(time, user, dataSource);
}