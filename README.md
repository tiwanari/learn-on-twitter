Learn on Twitter
===

# How to use
## Setup
1. Make a Google App Script on [https://script.google.com].
1. Pull this repository using [https://github.com/leonhartX/gas-github].
1. Copy the script URL `https://script.google.com/macros/d/{PROJECT_ID}`.
1. Create a Twitter application on [https://apps.twitter.com/app/].
    * Use the script URL as `CallbackURL`.
1. Write down `API key` and `API Secret`.
1. Go to `File > Project Properties > Script Properties`
1. Set the key and secret you wrote down as `API_KEY` and `API_SECRET` respectively.

## Authorize and test
1. Run `getOAuthURL`.
1. Check the log and copy the link.
1. Open the link and accept what it says.

After its completion, run `test` function as a test, which posts a `Yeah!` tweet.

# Todos
* Make several options for learning data source.
* Use Google Spreadsheet as configuration file.
    * Keep usernames and data sources each user wants to use.
