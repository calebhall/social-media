var canvas = document.getElementById("canvas"),
    video = document.getElementById("video"),
    context = canvas.getContext("2d"),
    audio = new AudioController();
    navigator.getUserMedia = (
    	navigator.getUserMedia ||
    	navigator.webkitGetUserMedia ||
    	navigator.mozGetUserMedia ||
    	navigator.msGetUserMedia ||
    	false
    	);

        var audioInput =
    var errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };
                   var audioInput =
    

    if (navigator.getUserMedia) {
    	console.log('normal')
        navigator.getUserMedia({video: true}, function(stream) {
        	console.log("stream");

            video.src = window.URL.createObjectURL(stream);
    
        }, errBack);

    } else if (navigator.webkitGetUserMedia) {
    	console.log('webKit')
        navigator.webkitGetUserMedia({video: true}, function(stream) {
        		console.log("webkitstream");
            video.src = window.webkitURL.createObjectURL(stream);
              audio:true
         video:true
        }, errBack);

    } else if (navigator.mozGetUserMedia) {
    	    	console.log('moz')
        navigator.mozGetUserMedia({video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
         
        }, errBack);
    }

document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
});