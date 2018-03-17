function createMentionPart(followers) {
  return '@' + followers.join(' @');
}

function createTweet(followers) {
  var mentions = createMentionPart(followers);
  var body = tedHomePageSpotlight();
  return mentions + ' ' + body;
}

function post() {
  var followers = getFollowerNames();
  tweet(createTweet(followers));
}