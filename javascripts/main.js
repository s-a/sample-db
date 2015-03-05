$(document).ready(function(){


  var initializePlayer = function(playList) {
    new window.jPlayerPlaylist({
      jPlayer: "#jquery_jplayer_1",
      cssSelectorAncestor: "#jp_container_1",
      size: {
        width: "100%",
        height: "30px"
      }
    }, playList, {
      swfPath: "../dist/jplayer",
      supplied: "wav",
      wmode: "window",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true
    });


  };

  var playList = [];
  $.get("./channel.json").then(function(samplePacks) {
    for (var i = 0; i < samplePacks.length; i++) {
      var pack = samplePacks[i];

      $("#authors-and-contributors-list").append($("<li>" + pack.files.length + " samples in &ldquo;" + pack.name + "&rdquo; <i>(by " + pack.author + ")</i></li>"));



      for (var s = 0; s < pack.files.length; s++) {
        var sample = pack.files[s];
        playList.push({
          title : pack.files[s].replace(".wav", "") + " by " + pack.author,
          wav : "./" + pack.path + "/" + pack.files[s]
        })
      };
    };
    initializePlayer(playList);
    // body...
  })



});
