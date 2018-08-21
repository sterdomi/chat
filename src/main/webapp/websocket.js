var ws;
function connect() {
    var username = document.getElementById("username").value;
    var color = document.getElementById("color").value.substring(1);
    var host = document.location.host;
    var pathname = document.location.pathname;
    ws = new WebSocket('ws://'+document.location.host+document.location.pathname.substring(0,document.location.pathname.lastIndexOf('/')) + "/chat/" + username + "/" +color);

    ws.onmessage = function(event) {
    var log = document.getElementById("log");
        console.log(event.data);
        var message = JSON.parse(event.data);
        log.innerHTML += "<p style=\"color:"+message.color+"\";>"+message.from + " : " + message.content + "</p>\n";
        log.scrollTop=log.scrollHeight;
    };

    var input = document.getElementById("msg");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            send();
            input.value="";
        }
    });
}

function send() {
    var content = document.getElementById("msg").value;
    var color = document.getElementById("color").value.substring(1);
    var json = JSON.stringify({
        "content":content,
        "color":color
    });
    ws.send(json);
}
