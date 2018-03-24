var DATA_SOURCE = {
  TED_HOME_PAGE_SPOTLIGHT: tedHomePageSpotlight,
  TED_SHORT_TALK: tedShortTalk,
  LEARNERS_DICTIONARY_WORD_OF_THE_DAY: learnersDictWOD,
  TECH_CRUNCH_POPULAR_JP: techcrunchPopularJP,
  XKCD_RANDOM: xkcdRandom,
  WIRED_JP_FEED: wiredJPFeed
};

function tedHomePageSpotlight() {
  var html = UrlFetchApp.fetch('https://www.ted.com/').getContentText();
  
  var spotlight = Parser.data(html).from("<a class='sa d:b pos:r ga-link'").to(">").build();
  
  // NOTE: href omits the domain part
  var url = Parser.data(spotlight).from("data-ga-label='1 of 3-up | ").to("'").build();
  var title = Parser.data(spotlight).from("title='").to("'").build();
  
  var message = unescapeHTML(stitle + ' ' + url);
  
  return message;
}

function tedShortTalk() {
  var html = UrlFetchApp.fetch('https://www.ted.com/talks?duration=0-6&language=en&page=1&sort=newest').getContentText();
  
  var tops = Parser.data(html).from("<h4 class='h12 talk-link__speaker'").to("/a>").iterate();
  
  // random pick-up
  var top = tops[Math.floor(Math.random() * tops.length)];
  
  var speaker = Parser.data(top).from(">").to("</h4>").build();
  
  // NOTE: href omits the domain part
  var domain = 'https://www.ted.com';
  var url = domain + Parser.data(top).from("href='").to("'").build();
  
  var title = Parser.data(top).from("lang='en'>").to("<").build();
  
  var message = unescapeHTML(speaker + ' ' + title + ' ' + url);
  
  return message;
}

function learnersDictWOD() {
  var url = 'http://www.learnersdictionary.com/word-of-the-day';
  var html = UrlFetchApp.fetch(url).getContentText();
  
  var word = Parser.data(html).from('<span class = "hw_txt">').to('</span>').build();
  var pos = Parser.data(html).from('<span class="fl">').to('</span>').build();
  
  return 'Word of the Day: ' + word + ' (' + pos + ', ' + url + ')';
}

function techcrunchPopularJP() {
  var html = UrlFetchApp.fetch('https://jp.techcrunch.com/popular/').getContentText();
  
  var popular = Parser.data(html).from('<div class="trending-container">').to("</a>").build();
  
  var title = Parser.data(popular).from('<div class="trending-title">').to("<").build();
  var url = Parser.data(popular).from('<a href="').to('"').build();
  
  var message = unescapeHTML(title + ' ' + url);
  
  // if the URL has a date part YYYY-MM-DD, it should have an English article too
  var m = url.match(/(\d{4})-(\d{2})-(\d{2})-(.+)/);
  if (m === null || typeof m !== 'object') return message;
  
  var englishUrl = 'https://techcrunch.com/' + m[1] + '/' + m[2] + '/' + m[3] + '/' + m[4];
  
  return message + ' Eng: ' + englishUrl;
}

function xkcdRandom() {
  var MAX_RETRY = 5;
  var url = 'https://c.xkcd.com/random/comic/';
  
  // a fetch to the URL sometimes fails
  var html = fetchWithRetry(url, MAX_RETRY);
  
  var finalUrl = Parser.data(html).from('Permanent link to this comic: ').to('<br />').build();
  
  var content = Parser.data(html).from('<div id="comic">').to('</div>').build();
  
  var image = Parser.data(content).from('src="').to('"').build();
  var alt = Parser.data(content).from('alt="').to('"').build();
  
  return alt + ' ' + finalUrl + ' https:' + image;
}

function wiredJPFeed() {
  var url = 'https://wired.jp/rssfeeder/';
  
  var feed = UrlFetchApp.fetch(url).getContentText();
  
  var firstItem = Parser.data(feed).from('<item>').to('</item>').build();
  
  var title = Parser.data(firstItem).from('<title>').to('</title>').build();
  var link = Parser.data(firstItem).from('<link>').to('</link>').build();
  
  var article = UrlFetchApp.fetch(link).getContentText();
  
  if (!article.match(/WIRED \(US\)/)) {
    return title + ' ' + link;
  }
  
  var englishUrl = Parser.data(article).from("<a href='").to("' target='_blank' rel='nofollow'> WIRED (US)").build();
      
  return title + ' ' + link + ' Eng: ' + englishUrl;
}