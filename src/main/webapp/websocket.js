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
        if(message.from==undefined){
            document.getElementById("connect").disabled=false;
            document.getElementById("disconnect").disabled=true;
        }else{
            document.getElementById("connect").disabled=true;
            document.getElementById("disconnect").disabled=false;
        }
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

function disconnect() {
    ws.close();
    document.getElementById("connect").disabled=false;
    document.getElementById("disconnect").disabled=true;
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
