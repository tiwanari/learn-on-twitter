function testAllDatasource() {
  testTedHomePageSpotlight();
  testTedShortTalk();
  testLearnersDictWOD();
  testTechcrunchPopularJP();
  testXkcdRandom();
  testWiredJPFeed();
}

function testTedHomePageSpotlight() {
  Logger.log(tedHomePageSpotlight());
}

function testTedShortTalk() {
  Logger.log(tedShortTalk());
}

function testLearnersDictWOD() {
  Logger.log(learnersDictWOD());
}

function testTechcrunchPopularJP() {
  Logger.log(techcrunchPopularJP());
}

function testXkcdRandom() {
  Logger.log(xkcdRandom());
}

function testWiredJPFeed() {
  Logger.log(wiredJPFeed());
}