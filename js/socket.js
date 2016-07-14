var ws;
var isReconnected = false;

function connect(){
	ws = window.ws = new WebSocket("wss://sockenote.herokuapp.com");
	ws.onopem = open;
	ws.onmessage = message;
	ws.onerror = error;
	ws.onclose = close;
}

function open(e) {
	if (isReconnected)
		return;
}

function message(e) {
	console.log("message", e.data)
}

function error(e) {
	console.error('onerror', e);
}
function close(e) {
	reconnect();
}
function reconnect() {
	isReconnected = true;
	setTimeout(connect, 1000);
}

function tweet(caption){
	var canvas = document.getElementById("scetch");	
	var imgData = JSON.stringify(getBase64Image(canvas));
	ws.send(JSON.stringify({
		event: "share",
		image: imgData,
		tweet: caption
	}));
}
function getBase64Image(element){
	 var image = element.toDataURL("image/png");
    return image.replace(/^data:image\/(png|jpg);base64,/, "");
}
