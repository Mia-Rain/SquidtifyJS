# SquidtifyJS
***
I am rewriting SquidtifyJS, as such, this repo is likely to feature broken code, Your Use May Vary.
***
JS implementation of Spotify's API &amp; SDK, using only client side JS ~ Completely on github pages!
<p><img src="https://cdn.discordapp.com/attachments/723802289948721162/762584657744887828/SpuidtifyJS_ex1_invert.png" width="20%" align="right"></p>

***
### Setup
  1. Create a new app at the [Spotify Dev Dashboard](https://developer.spotify.com/dashboard/applications)
  2. Remeber the `client_id` and `client_secret`, you will need them later
  3. Edit settings, and add `http://www.thatgeekyweeb.is-dummy-thi.cc/SquidtifyJS/callback` to `redirect_uri`'s (It's recommended to add both `http` & `https`)
  4. Head [here](https://www.thatgeekyweeb.is-dummy-thi.cc/SquidtifyJS), and press `start`
***
### Planned Features
  1. Embedded SDK player
  2. Search Support
  3. Playlist Support
  4. Modify Support (Maybe...)
  5. Proper redirect from Setup Page
  6. Album Support
  7. Artist Support
  8. Volume support (Bars for these are currently Placeholders)
  > These features may be added in any order
***
### Present Features
  1. Single Pause/Play Button
  2. Shuffle Support
  3. Dynamic Song and Artist name Support
  4. Dynamic Album Cover
  5. Next and Previous Song Support
  6. Reload error handling (Player breaks upon page reload, simply redirect to Setup page to request new code)
  7. Cookies for saving of `client_id` & `client_Secret`
  8. Automattic code request when Cookie is present
  9. Error handling for `ajax` requests
  10. Seek support
  11. Track & Context loop support
***
