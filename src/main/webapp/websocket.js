var ws;
var myColor;
function connect() {
    var username = document.getElementById("username").value;
    
    var host = document.location.host;
    var pathname = document.location.pathname;
    myColor=getRandomColor();
    ws = new WebSocket('ws://'+document.location.host+document.location.pathname.substring(0,document.location.pathname.lastIndexOf('/')) + "/chat/" + username);

    ws.onmessage = function(event) {
    var log = document.getElementById("log");
        console.log(event.data);
        var message = JSON.parse(event.data);
        //todo: font color wird auf server gesetzt.
        log.innerHTML += "<p style=\"color:"+myColor+"\";>"+message.from + " : " + message.content + "</p>\n";
        log.scrollTop=log.scrollHeight;
    };
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function send() {
    var content = document.getElementById("msg").value;
    var json = JSON.stringify({
        "content":content
    });

    ws.send(json);
}