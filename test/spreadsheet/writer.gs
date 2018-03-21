function testRecordTweet() {
  var datasource = DATA_SOURCE.TED_HOME_PAGE_SPOTLIGHT.name;
  var tweet = '@hello Word of the day: word';
  recordTweet(datasource, tweet);
}