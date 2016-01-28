var canvas = document.getElementById("canvas"),
    video = document.getElementById("video"),
    context = canvas.getContext("2d");

    navigator.getUserMedia = (
    	navigator.getUserMedia ||
    	navigator.webkitGetUserMedia ||
    	navigator.mozGetUserMedia ||
    	navigator.msGetUserMedia ||
    	false
    	);
// window.addEventListener("DOMContentLoaded", function() {
    var errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };
     console.log(navigator.getUserMedia)

    if (navigator.getUserMedia) {
    	console.log('normal')
        navigator.getUserMedia({video: true}, function(stream) {
        	console.log("stream");

            video.src = window.URL.createObjectURL(stream);
            // video.play();
        }, errBack);

    } else if (navigator.webkitGetUserMedia) {
    	console.log('webKit')
        navigator.webkitGetUserMedia({video: true}, function(stream) {
        		console.log("webkitstream");
            video.src = window.webkitURL.createObjectURL(stream);
            // video.play();
        }, errBack);

    } else if (navigator.mozGetUserMedia) {
    	    	console.log('moz')
        navigator.mozGetUserMedia({video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            // video.play();
        }, errBack);
    }
// }, false);

document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
});