Learn on Twitter
===

This repository is a collection of Google Apps Scripts to run a Twitter bot which sends its followers learning topics periodically. You can setup your own Twitter bot using these scripts easily by following the setup section.

Example: https://twitter.com/LearnOnTwit


# How to use
## Setup
1. Make a Google Apps Script on https://script.google.com.
1. Pull this repository using https://github.com/leonhartX/gas-github.
1. Copy the script URL `https://script.google.com/macros/d/{PROJECT_ID}`.
1. Create a Twitter application on https://apps.twitter.com/app/.
   * Use the script URL as `CallbackURL`.
1. Write down `API key` and `API Secret`.
1. Go to `File > Project Properties > Script Properties`.
1. Set the key and secret you wrote down as `API_KEY` and `API_SECRET` respectively.
1. Add libraries by following the next section.

### Dependency: libraries
NOTE: Choose the latest version.

1. Go to `Resource > Library...`.
1. Add `Oauth1` by putting `1CXDCY5sqT9ph64fFwSzVtXnbjpSfWdRymafDrtIZ7Z_hwysTY7IIhi7s`.
1. Add `Parser` by putting `M1lugvAXKKtUxn_vdAG9JZleS6DrsjUUV`.


## Authorize and test
1. Run `getOAuthURL`.
1. Check the log and copy the link.
1. Open the link and accept what it says.

After completing the above processes, run `testTweet` function in `test/twitter/api.gs` as a test, which posts a `Yeah!` tweet.

## Usage
1. Set a GAS trigger (hourly, daily, weekly, etc.) for `post` function in `src/post.gs`.
    * `Edit > Custom Project's Trigger`.

## Implemented Learning Data Sources
* [TED](https://www.ted.com/): The talk shown at the top of the index page.
* [TED Short Talk](https://www.ted.com/talks?sort=newest&language=en&duration=0-6): A randomly selected short (0-6 min) talk on the list.
* [Learner's Dictionally](http://www.learnersdictionary.com/word-of-the-day): Word of the day.
* [Techcrunch Japan](https://jp.techcrunch.com/popular/): The first talk on the popular list with its English article URL if available.
* [xkcd](https://xkcd.com/): A randomly chosen comic.
* (To be added)

# Todos
Refer to Issues to see the latest Todo list.

* Make several options for learning data source.
* Use Google Spreadsheet as a configuration file.
    * Keep usernames and data sources each user wants to use.

# License
MIT
