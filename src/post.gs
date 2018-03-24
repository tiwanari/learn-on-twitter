function createMentionPart(followers) {
  return '@' + followers.join(' @');
}

function createBody(followers, datasource) {
  return datasource();
}

function createTweet(followers, datasource) {
  var mentions = createMentionPart(followers);
  var body = createBody(followers, datasource);
  
  return mentions + ' ' + body;
}

function createTweets() {
  var config = readUserDataSource();
  var hour = new Date().getHours();
  
  var tweets = [];
  config.forEach(function(row) {
    if (row.time != hour) return;
    
    var datasource = DATA_SOURCE[row.data_source].func;
    var tw = createTweet([row.user], datasource);
    tweets.push({ text: tw, datasource: datasource });
  });
  return tweets;
}

function hourlyPost() {
  var INTERVAL = 60 * 1000; // 1 min
  
  var tweets = createTweets();
  tweets.forEach(function(tw, index) {
    try {
      tweet(tw.text);
      recordTweet(tw.datasource.name, tw.text);
    } catch (err) {
      Logger.log(err);
    }
    Utilities.sleep(INTERVAL);
  });
}

/** Testing purpose **/
function chooseDataSource(followers) {
  var hour = new Date().getHours();
  
  if (hour < 10) return DATA_SOURCE[2].func;
  else if (hour < 18) return DATA_SOURCE[1].func;
  return DATA_SOURCE[3].func;
}

function post() {
  var followers = getFollowerNames();
  var datasource = chooseDataSource(followers);
  var tw = createTweet(followers, datasource);
  
  tweet(tw);
  recordTweet(datasource.name, tw);
}
/** /Testing purpose **/