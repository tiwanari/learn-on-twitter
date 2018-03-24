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

function convertJsonToParams(data) {
  return Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function getFollowers() {
  var service = getService();
  if (service.hasAccess()) {
    var data = {
      skip_status: true,
      include_user_entities: false
    };
    var url = 
        'https://api.twitter.com/1.1/followers/list.json?' + convertJsonToParams(data);
    var response = service.fetch(url, { method: 'get' });
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

function getMentions() {
  var service = getService();
  if (service.hasAccess()) {
    var data = {
      trim_user: false,
      include_entities: false
    };
    var url = 
        'https://api.twitter.com/1.1/statuses/mentions_timeline.json?' + convertJsonToParams(data);
    var response = service.fetch(url, { method: 'get' });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
    
    return result;
  }
}