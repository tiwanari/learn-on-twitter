// set proper values 
// File > Project Properties > Script Properties
var API_KEY = PropertiesService.getScriptProperties().getProperty('API_KEY');
var API_SECRET = PropertiesService.getScriptProperties().getProperty('API_SECRET');

function getService() {
  return OAuth1.createService('Twitter')
  .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
  .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
  .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
  .setConsumerKey(API_KEY)
  .setConsumerSecret(API_SECRET)
  .setCallbackFunction('authCallback')
  .setPropertyStore(PropertiesService.getUserProperties());
}

function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) return HtmlService.createHtmlOutput('Successfully Authorized');
}

function reset() {
  getService().reset();
}

function getOAuthURL() {
  Logger.log(getService().authorize());
}

