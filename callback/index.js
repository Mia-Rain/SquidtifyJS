var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('code'));
var code = urlParams.get('code');
const CLID = sessionStorage.getItem('CLID');
const CLSEC = sessionStorage.getItem('CLSEC');
function mills(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

document.getElementById('li').style.setProperty('display', 'none', 'important'); // Force hide 'li'

/*TOKEN GEN*/$.ajax({
  type: 'POST',
  url: "https://accounts.spotify.com/api/token",
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  contentType: 'application/x-www-form-urlencoded; charset=utf-8',
  dataType: 'json',
  data: { 'client_id': CLID, 'client_secret': CLSEC, 'redirect_uri': 'https://www.thatgeekyweeb.is-dummy-thi.cc/rewrite-squidtify/callback/', code, 'grant_type': "authorization_code" },
  success: function (response, data) {
    console.log(response);
    console.log(data);
    sessionStorage.setItem('refresh_token', response.refresh_token);
  },
  error: function () {
    console.log("ERROR IN TOKEN GEN");
    swal({
      title: "ERROR IN TOKEN GEN!",
      text: "There was a error in requesting the Refresh Token... We need to restart...",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((reload) => {
      if (reload) {
        window.location.replace('https://www.thatgeekyweeb.is-dummy-thi.cc/rewrite-squidtify/');
      } else {
        swal.close();
      }
    });
  }
});

var authT = {
	get refresh_token() {
      return sessionStorage.getItem('refresh_token');
  },
	get access_token() {
		$.ajax({
      type: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      contentType: 'application/x-www-form-urlencoded',
      data: { 'client_id': sessionStorage.getItem('CLID'), 'client_secret': sessionStorage.getItem('CLSEC'), 'grant_type': 'refresh_token', 'refresh_token': authT.refresh_token },
        success: function (response, data) {
        sessionStorage.setItem('access_token', response.access_token);
			},
      error: function (xhr, ajaxOptions, thrownError) {
        console.log("ERROR IN AUTH()")
        //window.location.replace('https://www.thatgeekyweeb.is-dummy-thi.cc/rewrite-squidtify/');
      }
		});
		return sessionStorage.getItem('access_token');
	},
}

window.history.replaceState(null, null, window.location.pathname); // Emptys the URL params since they ugly

// WP-SWITCHER
wps = ["https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/shift.png","https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/spin.png","https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/water.png","https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/the-blood-is-there.png","https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/im-crying.png","https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/blended.png","https://github.com/ThatGeekyWeeb/Squid-Dots/raw/master/wallpapers/clouds.png"];
sessionStorage.setItem('num', 0);
function wpRight() {
	if ( sessionStorage.getItem('num') === null) {
		sessionStorage.setItem('num', 0);
	} else if (parseInt(sessionStorage.getItem('num')) > (wps.length - 1)) {
		sessionStorage.setItem('num',0);
	} else if (parseInt(sessionStorage.getItem('num')) + 1 == (wps.length)) {
		document.body.style.background = null;
	sessionStorage.setItem('num', 0);
	} else {
		sessionStorage.setItem('num',parseInt(sessionStorage.getItem('num')) + 1);
	}
	document.body.style.background = 'url(' + wps[parseInt(sessionStorage.getItem('num'))] + ')';
}
function wpLeft() {
var num = sessionStorage.getItem('num');
	if ( sessionStorage.getItem('num') === null) {
		sessionStorage.setItem('num', 0);
	} else if (parseInt(sessionStorage.getItem('num')) == 0 || (sessionStorage.getItem('num') == "NaN")) {
	document.body.style.background = null;
	sessionStorage.setItem('num', wps.length - 1);
	} else if ( parseInt(sessionStorage.getItem('num')) > 0 ) {
		sessionStorage.setItem('num',parseInt(sessionStorage.getItem('num')) - 1);
		console.log('less');
	} else {
	 sessionStorage.setItem('num', wps.length - 1);
	console.log('last');
	}
	document.body.style.background = 'url(' + wps[parseInt(sessionStorage.getItem('num'))] + ')';
}
function wpReset() {document.body.style.background = null; sessionStorage.setItem('num', 0);}
function li() {
	if (document.querySelectorAll("[class=player]")[0].style.display  == 'none') {document.querySelectorAll("[class=player]")[0].style.display = null;} else {document.querySelectorAll("[class=player]")[0].style.display = 'none';}
	if (document.getElementById('li').style.display == 'none') {document.getElementById('li').style.display = null;} else {document.getElementById('li').style.setProperty('display', 'none', 'important');}
} // licensing
// WP SWITCHER END


var api = {
  get device() {
    $.ajax({
    		type: 'GET',
    		url: "https://api.spotify.com/v1/me/player/devices",
    			contentType: 'application/x-www-form-urlencoded',
    			Accept: 'application/json',
    			data: { 'access_token': authT.access_token },
    			success: function (response, data) {
    		if (response.devices[0] === null || response.devices[0] === undefined) {
    		   		sessionStorage.setItem('device', null);
    			console.log('No device!!!');
    		   	} else {
    			   		sessionStorage.setItem('device', response.devices[0].id);
    		   		console.log(response.devices[0].id);
    			  }
    		}
    })
    return sessionStorage.getItem('device');
  },
}

function pause() {
$.ajax({
		type: 'PUT',
		url: "https://api.spotify.com/v1/me/player/pause",
			data: { device_id: api.device },
			headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
		   	 'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success: function () {
					console.log('Paused');
			}
})
}
function resume(){
$.ajax({
		type: 'PUT',
		url: "https://api.spotify.com/v1/me/player/play",
			data: {},
			headers: {
				Authorization: 'Bearer ' + authT.access_token,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			success: function () {
					console.log('Resumed');
			}
})
}
function seekTo() {
console.log('seeking');
seek = Math.floor(sessionStorage.getItem('durr') * (document.querySelector(".seek_slider").value / 100));
console.log(seek);
$.ajax({
  type: 'PUT',
  url: 'https://api.spotify.com/v1/me/player/seek?position_ms=' + seek,
  headers: {
  	Authorization: 'Bearer ' + authT.access_token,
  },
  success: function (response, data) {console.log(response);}
})
}
function pauseplay() {
	$.ajax({
		type: 'GET',
	  url: 'https://api.spotify.com/v1/me/player',
	  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
				},
	  success: function (response, data) {
	   if ( response.is_playing == true  ) {
	   		sessionStorage.setItem('playback', 'playing');
   	   } else if ( response.is_playing == false ) {
	   		sessionStorage.setItem('playback', 'paused');}
   	   }
});
  if ( sessionStorage.getItem('playback') == 'playing' ) {
    resume();
  } else if ( sessionStorage.getItem('playback') == 'paused' ) {
	   pause();
	}
}
document.body.onkeyup = function(space){
	if(space.keyCode == 32){
	   pauseplay();
	}
}
function prevTrack() {
$.ajax({
  type: 'post',
  url: 'https://api.spotify.com/v1/me/player/previous',
  data: { device_id: api.device },
  headers: {
  'Authorization': ' Bearer ' + authT.access_token
  },
  success: function (response, data) {
	   console.log(data)
  }
});
}
function nextTrack() {
$.ajax({
  type: 'post',
  url: 'https://api.spotify.com/v1/me/player/next',
  data: { device_id: api.device },
  headers: {
  'Authorization': ' Bearer ' + authT.access_token
  },
  success: function (response, data) {
	console.log(data)
  }
});
}
function shuffle() {
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
			},
  success: function (response, data) {
	if ( response.shuffle_state == true ) {
		 $.ajax({
			type: 'PUT',
			url: 'https://api.spotify.com/v1/me/player/shuffle?state=false',
  			headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
			},
  			success: function (response, data) {
				console.log(data);
  			},
			error: function (error) {
				console.log(error);
			}
  		})
	} else if ( response.shuffle_state == false ) {
		  $.ajax({
			type: 'PUT',
			url: 'https://api.spotify.com/v1/me/player/shuffle?state=true',
  			headers: {
		   	 	Authorization: 'Bearer ' + authT.access_token,
			},
  			success: function (response, data) {
				console.log(data);
  			},
			error: function (error) {
				console.log(error);
			}
		});}}
});}
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
			},
  success: function (response, data) {
	if ( response != "" && response != undefined && response.item.id != "" && response.item.id != undefined ) {
			sessionStorage.setItem('uri', response.item.id);
	}
  }
})
$.ajax({
		type: 'GET',
	  url: 'https://api.spotify.com/v1/me/player',
	  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
				},
	  success: function (response, data) {
	   if ( response != undefined && response != "" && response.repeat_state == "context" ) {
	   		document.getElementById("track").classList.add("context_loop");
				document.getElementById("loop").style.color = "darkorchid";
   	   } else if ( response != undefined && response != "" && response.repeat_state == "track") {
	   		document.getElementById("track").classList.add("fa-circle");
		  	document.getElementById("track").classList.remove("context_loop");
		 	document.getElementById("loop").style.color = "darkorchid";
		  } else if ( response != undefined && response != "" && response.repeat_state != "" && response.repeat_state != undefined && response.repeat_state) {
	  	document.getElementById("loop").style.color = "darkorchid";
	  } /* During my test I noticed that sometimes the player would understand the value, the above should work as a catch all unless repeat is not enabled
	  	I also added a request to the setInterval func, that should fix any issues caussed by a lack of device*/
   	}
});
function loop() {
$.ajax({
	type: 'PUT',
  url: 'https://api.spotify.com/v1/me/player/repeat?state=track',
  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
	},
  success: function (response, data) {
	console.log("Track loop enabled");
  }
})
}
function reloop(){
	$.ajax({
	type: 'PUT',
  url: 'https://api.spotify.com/v1/me/player/repeat?state=context',
  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
	},
  success: function (response, data) {
	console.log("Context loop enabled");
  }
})
}
function unloop() {
	$.ajax({
	type: 'PUT',
  url: 'https://api.spotify.com/v1/me/player/repeat?state=off',
  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
	},
  success: function (response, data) {
	console.log("Loop disabled");
  }
})
}

function repeat(){
document.getElementById("loop").style.color = "darkorchid";
	if ( document.getElementById("track").classList.value.includes("fa-circle") != true && document.getElementById("track").classList.value.includes("context_loop") == false ) {
	  document.getElementById("track").classList.add("fa-circle");
	  loop(); /* enable single track repeat */
	} else if ( document.getElementById("track").classList.value.includes("fa-circle") == true ) {
	  document.getElementById("track").classList.remove("fa-circle");
	  document.getElementById("track").classList.add("context_loop");
	  reloop(); /* enable context loop */
	} else if ( document.getElementById("track").classList.value.includes("context_loop") == true ) {
			document.getElementById("track").classList.remove("fa-circle");
			document.getElementById("track").classList.remove("context_loop");
	  document.getElementById("loop").style.color = "";
	  unloop(); /* disable loop */
	}
}
uri = sessionStorage.getItem('uri');
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = '[My Spotify Web API access token]';
  const player = new Spotify.Player({
	name: 'Web Playback SDK Quick Start Player',
	getOAuthToken: callback => { callback(sessionStorage.getItem('access_token'));}
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); sessionStorage.setItem('HDRM', undefined);});
  player.addListener('authentication_error', ({ message }) => { console.error(message); console.log("ERROR IN PLAYER AUTH");  }); //window.location.replace('https://www.thatgeekyweeb.is-dummy-thi.cc/rewrite-squidtify/'); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

	// Lack of DRM support causes a break in init, but failure to auth is unrelated to DRM

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
	  console.log('Ready with Device ID', device_id);
  });
  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
	console.log('Device ID has gone offline', device_id);
  });
  // Connect to the player!
  player.connect();

player.addListener("player_state_changed", (state) => {

console.log(state);
if (
	state
	&& state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id)
	&& !state.paused
	&& state.paused
	) {
	console.log('Track ended');
	setTrackEnd(true);
  }
state = state;
});
};
  function trans(){
	  devid = [window.device]; $.ajax({
		type: 'PUT',
		url: 'https://api.spotify.com/v1/me/player',
		headers: {
			Authorization: 'Bearer ' + authT.access_token,
		},
		data:JSON.stringify({device_ids: devid})
		// if there was a no device error since the SDK is slow, we close the error dialog
		// 			FIX ME
  });
  }
if ( sessionStorage.getItem('HDRM') != "undefined" || sessionStorage.getItem('device') != "null") {
  trans(); console.log('Trans-ed');
  if (swal.getState().isOpen == true){ swal.close(); }
} // Only run trans() if SDK is working or device is unset
//
setInterval(function() {
$.ajax({
  type: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  contentType: 'application/x-www-form-urlencoded',
  data: { 'client_id': sessionStorage.getItem('CLID'), 'client_secret': sessionStorage.getItem('CLSEC'), 'grant_type': 'refresh_token', 'refresh_token': authT.refresh_token },
  success: function (response, data) {
	sessionStorage.setItem('access_token', response.access_token);
  }
});
uri = sessionStorage.getItem('uri');
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
  },
  success: function (response, data) {
	if ( sessionStorage.getItem('device') != undefined && response != "" && response != undefined && response.shuffle_state == true ) {
		if ( document.getElementById("shuffle").style.color != "darkorchid" ) {
			document.getElementById("shuffle").style.color = "darkorchid"
		}
	} else if ( sessionStorage.getItem('device') != undefined && response != "" && response != undefined && response.shuffle_state == false ) {
			document.getElementById("shuffle").style.color = ""
	} else if ( sessionStorage.getItem('device') == "null" || sessionStorage.getItem('device') == 'not found' || sessionStorage.getItem('device') === null) {
		swal({
			icon: "error",
			title: "Whoops!",
			text: "No device was found, please turn one on!",
		});
		sessionStorage.setItem('device', null);
	}
  }
})
	$.ajax({
		type: 'GET',
	  url: 'https://api.spotify.com/v1/me/player',
	  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
				},
	  success: function (response, data) {
			document.querySelectorAll("[class=slider_container] input")[1].value = response.device.volume_percent; // Sets volume slider to current state
   	  }
});
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
  },
  success: function (response, data) {
   if ( response != "" && response != undefined && response.is_playing == true ) {
	document.getElementById("playbutton").classList = "fa fa-pause-circle fa-5x";
   } else {
	document.getElementById("playbutton").classList = "fa fa-play-circle fa-5x";
   }
  }
})
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': ' Bearer ' + authT.access_token
  },
  success: function (response, data) {
  	if ( response != undefined && response.is_playing != false && response.is_playing != undefined){
	   sessionStorage.setItem('playing', true);
  	} else {
	   sessionStorage.setItem('playing', false);
	}
  }
});
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
			},
  success: function (response, data) {
	if (sessionStorage.getItem('device') != "null" && response != "" && response != undefined  && response.item.id != "" && response.item.id != undefined && response.item != undefined && response != undefined && response != "") {
   	 sessionStorage.setItem('uri', response.item.id);
	}
  }
})
uri = sessionStorage.getItem('uri');
if ( uri != undefined && uri != "" && sessionStorage.getItem('uri') != undefined && sessionStorage.getItem('uri') != "" ) {
$.ajax({
	type: 'GET',
 	url: 'https://api.spotify.com/v1/tracks/' + uri,
  	headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
		},
  success: function (response, data) {
	if ( response != undefined && response != "" && response.album.images[0].url != "" && response.album.images[0].url != undefined ) {
	  document.getElementById("track-art").style.backgroundImage = '';
	  document.getElementById("track-art").style.backgroundImage = 'URL("' + response.album.images[0].url + '")';
	} else {
	swal({
		title: "Whao",
		text: "The response from the server was not defined!",
		icon: "error",
		buttons: true,
		dangerMode: true,
	}).then((value) => {
		if (`${value}` == "true") {
			resume();
		} else {console.error('Resume was refussed, you should reload the page, as it is broken now... Addtionally remeber to start playback')}
	})
	}
  }
})
}
$.ajax({
  type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': ' Bearer ' + authT.access_token
  },
  success: function (response, data) {
	if (sessionStorage.getItem('device') != 'null' || response !== undefined) {
  		if ( parseInt(document.querySelector('input[type=range]').value, 10) == 1 || parseInt(document.querySelector('input[type=range]').value, 10) >= 90) {
			document.querySelector('input[type=range]').value = Math.floor((response.progress_ms * 100) / response.item.duration_ms);
			} else if ( ((response.progress_ms * 100) / response.item.duration_ms) - parseInt(document.querySelector('input[type=range]').value, 10) >= 0.5 || ((response.progress_ms * 100) / response.item.duration_ms) - parseInt(document.querySelector('input[type=range]').value, 10) < document.querySelector('input[type=range]').value ) {
				document.querySelector('input[type=range]').value = Math.floor((response.progress_ms * 100) / response.item.duration_ms);
  		}
	}
  }
})
$.ajax({
	type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
			},
  success: function (response, data) {
  if (response != "" && response != undefined && response.item.id != "" && response.item.id != undefined ){
  $.ajax({
		type: 'GET',
  	url: 'https://api.spotify.com/v1/tracks/' + response.item.id,
	  	headers: {
		   	 Authorization: 'Bearer ' + authT.access_token,
		},
  	success: function (response, data) {
		if ( response != undefined && response != "" && response.duration_ms != "" && response.duration_ms != undefined) {
				sessionStorage.setItem('durr', response.duration_ms);
				document.getElementById("durr").innerHTML = mills(response.duration_ms);
		} else { document.getElementById("durr").innerHTML = 'Unset'; }
		}
	})}
   }
})
$.ajax({
  type: 'GET',
  url: 'https://api.spotify.com/v1/me/player',
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': ' Bearer ' + authT.access_token
  },
  success: function (response, data) {
	if ( response != undefined && response != "" && response.item.name != "" && response.item.name != undefined && response.item.name != "" ) {
		if ( document.getElementById("track-name").innerHTML != response.item.name ) {
			document.getElementById("track-name").innerHTML = response.item.name
		}
	}
  }
})
$.ajax({
	type: 'GET',
  	url: 'https://api.spotify.com/v1/me/player',
  	headers: {
  		'Accept': 'application/json',
  		'Content-Type': 'application/json',
  		'Authorization': ' Bearer ' + authT.access_token
  	},
  	success: function (response, data) {
		if ( response != undefined && response != "" && response.item.artists[0].name != "" && response.item.artists[0].name != undefined ) {
			if ( document.getElementById("track-artist").innerHTML != response.item.artists[0].name ) {
				document.getElementById("track-artist").innerHTML = response.item.artists[0].name
			}
		}
  	}
});
$.ajax({
	  type: 'GET',
	  url: 'https://api.spotify.com/v1/me/player',
	  headers: {
			   	 Authorization: 'Bearer ' + authT.access_token,
				},
	  success: function (response, data) {
	   if ( response != undefined && response != "" && response.repeat_state == "context" ) {
	   		document.getElementById("track").classList.add("context_loop");
				document.getElementById("loop").style.color = "darkorchid";
   	   } else if ( response != undefined && response != "" && response.repeat_state == "track") {
	   		document.getElementById("track").classList.add("fa-circle");
		  	document.getElementById("track").classList.remove("context_loop");
		 	document.getElementById("loop").style.color = "darkorchid";
		  } else if ( response != undefined && response != "" && response.repeat_state != "" && response.repeat_state != undefined && response.repeat_state) {
	  	document.getElementById("loop").style.color = "darkorchid";
	  }
	 }
});
}, 3000);
// if ( document.getElementById("track-art").style.backgroundImage == "" && )
