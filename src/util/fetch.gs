function fetchWithRetry(url, maxRetry) {
  var html = undefined;
  for (var i = 0; i < maxRetry; i++) {
    var succeeded = true;
    try {
      html = UrlFetchApp.fetch(url).getContentText();
    } catch(err) {
      Logger.log('Failed ' + (i + 1) + ' time');
      Logger.log(err);
      succeeded = false;
    }
    if (succeeded) {
      break;
    }
  }
  return html;
}