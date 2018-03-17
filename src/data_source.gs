function tedHomePageSpotlight() {
  var html = UrlFetchApp.fetch('https://www.ted.com/').getContentText();
  
  var spotlight = Parser.data(html).from("<a class='sa d:b pos:r ga-link'").to(">").build();

  // NOTE: href omits the domain part
  var url = Parser.data(spotlight).from("data-ga-label='1 of 3-up | ").to("'").build();
  var title = Parser.data(spotlight).from("title='").to("'").build();
  
  return title + ' ' + url;
}