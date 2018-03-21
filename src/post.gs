function createMentionPart(followers) {
  return '@' + followers.join(' @');
}

function chooseTopic(followers) {
  // TODO: Read configuration from GoogleSpreadsheet or something
  var time = new Date();
  var hour = time.getHours();
  
  if (hour < 10) return 1;
  else if (hour < 18) return 2;
  return 3;
}

function createBody(followers) {
  var topic = chooseTopic(followers);
  Logger.log('topic: ' + topic);
  
  switch (topic) {
    case 1:
      return learnersDictWOD();
    case 2:
      return tedShortTalk();
    case 3:
      return techcrunchPopularJP();
  }
  return 'unexpected error';
}

function createTweet(followers) {
  var mentions = createMentionPart(followers);
  var body = createBody(followers);
  return mentions + ' ' + body;
}

function post() {
  var followers = getFollowerNames();
  tweet(createTweet(followers));
}