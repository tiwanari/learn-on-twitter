function tweet(text) {
  var service = getService();
  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/statuses/update.json';
    var payload = {
      status: text
    };
    var options = {
      method: 'post',
      payload: payload,
      escaping: false
    };
    var response = service.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    return result;
  }
}

function getFollowers() {
  var service = getService();
  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/followers/list.json';
    var data = {
      cursor: 1,
      screen_name: 'LearnOnTwit',
      skip_status: true,
      include_user_entities: false
    };
    var options = {
      method: 'get',
      data: data
    };
    var response = service.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    return result.users;
  }
}

function getFollowerNames() {
  var names = [];
  var followers = getFollowers();
  followers.forEach(function(element, index, array) {
    Logger.log('Add ' + element.screen_name);
    names.push(element.screen_name);
  });
  Logger.log('Got followers: ' + names);
  return names;
}