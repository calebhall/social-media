var scetch = document.getElementById("scetch"),
    mirror = document.getElementById("mirror"),
    video = document.getElementById("video"),
    mirrorContext = mirror.getContext("2d"),
    scetchContext = scetch.getContext("2d"),
    FinCon = document.getElementById("FinCon"),
    FinConContext = FinCon.getContext("2d");
var recording = false;

window.AudioContext =
    window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
console.log(audioContext);
navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    false
);


var virec = new VIRecorder.initVIRecorder({
        recorvideodsize: 0.4, // recorded video dimentions are 0.4 times smaller than the original
        webpquality: 0.7, // chrome and opera support webp imags, this is about the aulity of a frame
        framerate: 15, // recording frame rate 
        videotagid: "video",
        videoWidth: "640",
        videoHeight: "480",

    },
    function() {
        //success callback. this will fire if browsers supports 
    },
    function(err) {
        //onerror callback, this will fire if browser does not support
        console.log(err.code + " , " + err.name);
    }
);
var errBack = function(error) {
    console.log("Video capture error: ", error.code);
};



if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = window.URL.createObjectURL(stream);
    }, errBack);

} else if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({ video: true }, function(stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        audio: true
        video: true
    }, errBack);

} else if (navigator.mozGetUserMedia) {
    navigator.mozGetUserMedia({ video: true }, function(stream) {
        video.src = window.URL.createObjectURL(stream);

    }, errBack);
}

function drawCap() {
    var image = scetch.toDataURL("image/png");
    var imgdata = image.replace(/^data:image\/(png|jpeg);base64,/, "");

    var boxThatDoesNotHaveText = new Image();
    boxThatDoesNotHaveText.src = 'data:image/png;base64,' + imgdata;
    $('#scetch').after(boxThatDoesNotHaveText);
}
document.getElementById("snapPhoto").addEventListener("click", function() {
    $('body').attr('data-active-scene', 'playback');

    
        FinConContext.clearRect(0, 0, FinCon.width, FinCon.height);
        FinConContext.translate(FinCon.width, 0);
        FinConContext.scale(-1, 1);
        FinConContext.drawImage(mirror, 0, 0);
        FinConContext.drawImage(scetch, 0, 0);
});

document.getElementById("snapVideo").addEventListener("click", function() {

    if (recording) {
        recording = false;
        virec.stopCapture(oncaptureFinish);
    } else {
        virec.startCapture();
        recording = true;
    }
});
$("#tweettext").on("keyup", function(e) {
        if (e.keyCode == 13) {
            var tweettext = document.getElementById("tweettext").value;

            tweet(tweettext);
        }
    })
    // $(document.body).bind("click", function(e) {

//         var element = e.target;
//         var c = element.className;

//         if (c == "posts") {
//             console.log("posts selected");
//             $(".content").addClass("z");
//             $("#" + c).removeClass("hide");
//         } else if (c == "uploads") {
//             console.log("uploads selected")
//             $(".content").addClass("hide");
//             $("#" + c).removeClass("hide");

//         }
function oncaptureFinish(audioblob, videoblob) {

    var audiobase64 = window.URL.createObjectURL(audioblob);
    var videobase64 = window.URL.createObjectURL(videoblob);
    document.getElementById('audiored').src = audiobase64;
    document.getElementById('recordedvideo').src = videobase64;
    document.getElementById('downloadurl').style.display = '';
    document.getElementById('downloadurl').href = videobase64;
}


$("#colorpicker").bind("click", function(e) {
    console.log("YOU GET VERIATY NOWW");
    if ($("#picker").css('display') == "none") {
        $("#picker").css('display', "block");
        $("#picker").css('z-index', 300);
    } else {
        $("#picker").css('display', "none");
        $("#picker").css('z-index', -2);
        // $("#closedPicker").css("display", 0);
    }
})
$("#uploads").bind("click", function(e) {
    console.log("YOU GET VERIATY NOWW");
    if ($("#twitter").css('opacity') == 0) {
        $("#twitter").css('opacity', 1);
        $("#twitter").css('z-index', 300);
    } else {
        $("#twitter").css('opacity', 0);
        $("#twitter").css('z-index', -1);
    }
});

$("input").on('change', function() {
    var size = $(this).val();
    brushSize = size;
});


$("#video")[0].onplay = function() {
    console.log("#video");
     mirrorContext.translate(mirror.width, 0);
     mirrorContext.scale(-1, 1);
     draw(this, mirrorContext, mirror.width, mirror.height);
}

$(document).ready(function() {
    scetchContext.canvas.width = window.innerWidth;
    scetchContext.canvas.height = window.innerHeight;
    mirrorContext.canvas.width = window.innerWidth;
    mirrorContext.canvas.height = window.innerHeight;
        FinConContext.canvas.width = window.innerWidth;
    FinConContext.canvas.height = window.innerHeight;
});

connect();