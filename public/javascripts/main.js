
	var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady(){
  		makeWidget();
  		makePlayer(url);
    }
    
    function makeWidget(){
    	console.log("Make a widget")
      	widget = new YT.UploadWidget('widget', {
            height: 500,
            events:{
            	'onUploadSuccess':onUploadSuccess,
            	'onProcessingComplete':onProcessingComplete
            }
      });
    }

    function onUploadSuccess(event) {
        alert('Video ID ' + event.data.videoId + ' was uploaded and is currently being processed.');
    }

    function onProcessingComplete(event) {
        upload_player = new YT.Player('upload_player', {
          height: '200',
          width: '400',
          videoId: event.data.videoId,
          events: {}
        });
    }

    var url = $("#player-replace").attr("name");

    function makePlayer(vidUrl){
    	var indicatorString = "watch?v=";
    	var indicatorStringIndex = url.indexOf(indicatorString);
    	var vidIDstart = indicatorStringIndex + indicatorString.length;
    	var content= url.substring(vidIDstart);
    	console.log("content: "+content)
    
      	player = new YT.Player('player-replace', {
            height: '390',
            width: '640',
            videoId: content,
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
      });
        console.log("made player")
    }


    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
    }

    function stopVideo(){
        player.stopVideo();
   }