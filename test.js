var canvas = document.getElementById("canvas");

var ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 320, 240);

var charset = new Image();
charset.src = 'charset.png';

function drawChar(char, x, y) {
  if (char < 0) return;
  if (char > 255) return;

  console.log("drawChar(", char, x, y, ")");

  ctx.drawImage(
    charset,
    ((char % 16) | 0) * 8,
    ((char / 16) | 0) * 12,
    8,
    12,
    x,
    y,
    8,
    12
  );
}

charset.onload = function () {
  var ws = new WebSocket("ws://localhost:4567");

  ws.addEventListener('message', function (event) {
    var msg = event.data.split(",");

    var idx = +msg[0];
    var byte = +msg[1];

    drawChar(byte, ((idx % 40) | 0) * 8, ((idx / 40) | 0) * 12);
  });
};
