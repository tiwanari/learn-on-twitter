function createMentionPart(followers) {
  return '@' + followers.join(' @');
}

function chooseTopic(followers) {
  // TODO: Read configuration from GoogleSpreadsheet or something
  var time = new Date();
  if (time.getHours() < 12) return 1;
  return 2;
}

function createBody(followers) {
  var topic = chooseTopic(followers);
  Logger.log('topic: ' + topic);
  
  switch (topic) {
    case 1:
      return learnersDictWOD();
    case 2:
      return tedShortTalk();
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