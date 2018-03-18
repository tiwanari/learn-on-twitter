function tedHomePageSpotlight() {
  var html = UrlFetchApp.fetch('https://www.ted.com/').getContentText();
  
  var spotlight = Parser.data(html).from("<a class='sa d:b pos:r ga-link'").to(">").build();

  // NOTE: href omits the domain part
  var url = Parser.data(spotlight).from("data-ga-label='1 of 3-up | ").to("'").build();
  var title = Parser.data(spotlight).from("title='").to("'").build();
  
  return title + ' ' + url;
}

function learnersDictWOD() {
  var url = 'http://www.learnersdictionary.com/word-of-the-day';
  var html = UrlFetchApp.fetch(url).getContentText();
  
  var word = Parser.data(html).from('<span class = "hw_txt">').to('</span>').build();
  var pos = Parser.data(html).from('<span class="fl">').to('</span>').build();
  
  return 'Word of the Day: ' + word + ' (' + pos + ', ' + url + ')';
}