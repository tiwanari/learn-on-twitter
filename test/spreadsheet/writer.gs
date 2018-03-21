function testRecordTweet() {
  var date = new Date().toISOString();
  var datasource = 1;
  var tweet = '@hello Word of the day: word';
  recordTweet(date, datasource, tweet);
}