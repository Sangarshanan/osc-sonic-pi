var socket;
var isConnected;

setupOsc(12004, 4560);


function sendMessage(effect, mix) {
  if (isConnected) {
    socket.emit('message', ['/effect/value', effect]);
    socket.emit('message', ['/mix/value', mix]);
  }
}

document.getElementById('send-message').onclick = async () => {
  sendMessage(
  	document.getElementById('fx').value,
  	Math.floor(Math.random() * 2)
  );
}

function setupOsc(oscPortIn, oscPortOut) {

  socket = io.connect('http://127.0.0.1:8081', {
    port: 8081,
    rememberTransport: false
  });
  socket.on('connect', function() {
    socket.emit('config', {
      server: {
        port: oscPortIn,
        host: '127.0.0.1'
      },
      client: {
        port: oscPortOut,
        host: '127.0.0.1'
      }
    });
  });
  socket.on('connect', function() {
    isConnected = true;
  });
  socket.on('message', function(msg) {
    if (msg[0] == '#bundle') {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });

}
