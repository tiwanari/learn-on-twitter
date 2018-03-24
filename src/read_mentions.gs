var ONE_HOUR = 60 * 60 * 1000; /* ms */
function withinOneHour(time) {
  return ((new Date) - new Date(time)) < ONE_HOUR
}

function validateParams(op, time, dataSource) {
  if (op !== 'add' || op !== 'remove') {
    return false;
  }
  if (time < 0 || 23 < time) {
    return false;
  }
  if (dataSource < 1 || DATA_SOURCE.length < dataSource) {
    return false;
  }
  return true;
}

function processRequest(user, op, time, dataSource, bot) {
  var REQUEST_FORMAT = 
      'Usage: @' + bot + ' op([add|remove]) time([0-23], JST) data_source([1-' + DATA_SOURCE.length + '])';
 
  if (!validateParams(op, time, dataSource)) {
    return 'Validation Error! ' + REQUEST_FORMAT;
  }
  
  switch (op) {
    case 'add':
      addUserDataSourceRow(time, user, dataSource);
      break;
    case 'remove':
      removeUserDataSourceRow(time, user, dataSource);
      break;
  }
}

function readMentions() {
  var mentions = getMentions();
  
  for (var i = 0; i < mentions.length; i++) {
    var mention = mentions[i];
    
    var time = mention.created_at;
    
    if (!withinOneHour(time)) {
      Logger.log('Too old. Ignore');
      return;
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
    var dataSource = parseInt(m[4]);
    
    Logger.log('Request from @' + user + ': ' + op + ' ' + time + ' ' + dataSource);
    
    var err = processRequest(user, op, time, dataSource, bot);
    if (err) {
      tweet('@' + user + ' ' + err);
    }
  }
}
