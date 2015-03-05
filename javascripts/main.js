(function  ($) {
	$(document).ready(function(){

		var scrollToElement = function(el, ms){
		    var speed = (ms) ? ms : 600;
		    $('html,body').animate({
		        scrollTop: $(el).offset().top
		    }, speed);
		}

		// specify id of element and optional scroll speed as arguments
		$("#share-button").click(function() {
			$("#share-container").slideDown(function() {
				scrollToElement('#share-container', 600);
			});
		});

		$('#share').socialSharePrivacy({
			path_prefix:"javascripts/share/",
			layout: "box",
			info_link: "",
			info_link_target : "_blank" ,

			order: ["facebook", "twitter","gplus", "hackernews"],
			services : {
				tumblr : {status : false},
				mail : {status : false},
				info: {status : false}
			}
		});


		var player = null;
		var initializePlayer = function(playList) {
			player = new window.jPlayerPlaylist({
				jPlayer: "#jquery_jplayer_1",
				cssSelectorAncestor: "#jp_container_1",
				size: {
					width: "100%",
					height: "30px"
				}}, [], {
					swfPath: "../dist/jplayer",
					supplied: "wav",
					wmode: "window",
					useStateClassSkin: true,
					autoBlur: false,
					smoothPlayBar: true,
					keyEnabled: true
				}
			);


			$("#jquery_jplayer_1").bind($.jPlayer.event.error, function(event) { // Add a listener to report the time play began
				alert("Please load a playlist from above first.");
			});
		};
	  	var playLists = [];

		var loadPlaylist = function  (playListsIndex) {
	  		var playList = playLists[playListsIndex];
	  		player.setPlaylist(playList);
	  	}


	  	$.get("./channel.json").then(function(samplePacks) {
	    	for (var i = 0; i < samplePacks.length; i++) {
	      		var pack = samplePacks[i];
      			var txt = pack.files.length + " samples in &ldquo;" + pack.name + "&rdquo; | load playlist";
	      		var $li = $("<li></li>");
	      		var $a = $("<a href='javascript:void(0);'>" + txt + "</a> ");
	      		$a.data("playListsIndex", i);
	      		$a.click(function() {
	      			loadPlaylist($(this).data("playListsIndex"));
	      		});
	      		$li.append($a);
	  			 

	  			var author  = ('<a target="_blank" href="' + (pack.authorUrl || 'javascript:void(0)') + '">' + (pack.author || "unknown") + '</a>');
	  			var license  = ('<a target="_blank" href="' + (pack.licenseUrl || 'javascript:void(0)') + '">' + (pack.license || "MIT and GPL") + '</a>');
	  			var $description = $('<div>Description: ' + (pack.description || "") + '</div>');
	      		var $license = $("<span>Version: " + (pack.version || "unknown") + "</span> | <span>Author: " + author + "</span> | <span>License: " + license + "</span><hr>");
	  			$("#authors-and-contributors-list").append($li).append($description).append($license);

		  		var playList = [];
		      	for (var s = 0; s < pack.files.length; s++) {
		        	var sample = pack.files[s];
		        	playList.push({
		          		title : pack.files[s].replace(".wav", ""),
		          		wav : "./" + pack.path + "/" + pack.files[s],
		          		artist: pack.author, // Optional
    					free: Boolean, // Optional - Generates links to the media
		    		});
		      	}
		      	playLists.push(playList);
	    	}

		    initializePlayer();
		    //loadPlaylist(0);
		    // body...
		  });



	});
})(window.jQuery);