function createMentionPart(followers) {
  return '@' + followers.join(' @');
}

function chooseDataSource(followers) {
  // TODO: Read configuration from GoogleSpreadsheet or something
  var hour = new Date().getHours();
  
  if (hour < 10) return DATA_SOURCE.LEARNERS_DICTIONARY_WORD_OF_THE_DAY;
  else if (hour < 18) return DATA_SOURCE.TED_SHORT_TALK;
  return DATA_SOURCE.TECH_CRUNCH_POPULAR_JP;
}

function createBody(followers, datasource) {
  return datasource();
}

function createTweet(followers, datasource) {
  var mentions = createMentionPart(followers);
  var body = createBody(followers, datasource);
    
  return mentions + ' ' + body;
}

function post() {
  var followers = getFollowerNames();
  var datasource = chooseDataSource(followers);
  var tw = createTweet(followers, datasource);
  
  tweet(tw);
  recordTweet(datasource.name, tw);
}