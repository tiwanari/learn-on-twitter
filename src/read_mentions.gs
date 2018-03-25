var ONE_HOUR = 60 * 60 * 1000; /* ms */
function withinOneHour(time) {
  return ((new Date) - new Date(time)) < ONE_HOUR
}

function validateParams(op, time, datasource) {
  if (op !== 'add' && op !== 'remove') {
    return false;
  }
  if (time < 0 || 23 < time) {
    return false;
  }
  if (datasource < 1 || DATA_SOURCE.length < datasource) {
    return false;
  }
  return true;
}

function processRequest(user, op, time, datasource, bot) {
  var REQUEST_FORMAT = 
      'Usage: @' + bot + ' op([add|remove]) time([0-23], JST) data_source([1-' + DATA_SOURCE.length + '])';
  
  if (!validateParams(op, time, datasource)) {
    return 'Validation Error! ' + REQUEST_FORMAT;
  }
  
  var action;
  switch (op) {
    case 'add':
      addUserDatasourceRow(time, user, datasource);
      Logger.log('Inserted a row ' + time + ' ' + user + ' ' + datasource);
      action = 'adding';
      break;
    case 'remove':
      removeUserDatasourceRow(time, user, datasource);
      Logger.log('Deleted a row ' + time + ' ' + user + ' ' + datasource);
      action = 'removing';
      break;
  }
  
  try {
    tweet('@' + user + ' received your request for ' + action + ' ' + DATA_SOURCE[datasource - 1].name + ' at ' + time + ' (JST) everyday');
  } catch (err) {
    // ignore
  }
}

function readMentions() {
  var mentions = getMentions();
  
  for (var i = mentions.length - 1; i >= 0; i--) {
    var mention = mentions[i];
    
    var time = mention.created_at;
    
    if (!withinOneHour(time)) {
      Logger.log('Too old. Ignore');
      continue;
    }
    
    var user = mention.user.screen_name;
    var text = mention.text;
    
    // @(bot_name) op time data_soucrce
    // e.g., @LearnOnTwit add 13 1
    var m = text.match(/@(\w+) +(\w+) +(\d+) +(\d+)/);
    
    if (m === null || typeof m !== 'object') {
      Logger.log('Ignore: ' + text);
      continue;
    }
    
    var bot = m[1];
    var op = m[2].toLowerCase();
    var time = parseInt(m[3]);
    var datasource = parseInt(m[4]);
    
    Logger.log('Request from @' + user + ': ' + op + ' ' + time + ' ' + datasource);
    
    var err = processRequest(user, op, time, datasource, bot);
    if (err) {
      tweet('@' + user + ' ' + err);
    }
  }
}
