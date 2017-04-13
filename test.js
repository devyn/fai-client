var canvas = document.getElementById("canvas");

var ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 320, 240);

var charset = new Image();
charset.src = 'charset.png';

function drawChar(char, x, y) {
  if (char < 0) return;
  if (char > 255) return;

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
  var ws = new WebSocket("ws://localhost:2391", "v1.fai.devyn.me");

  ws.addEventListener('message', function (event) {
    var msg = event.data.split(",");

    var idx = +msg[0];
    var word = +msg[1];

    for (var b = 0; b < 4; b++) {
      console.log(idx, word, b);

      var byteIdx = (idx * 4) + b;

      drawChar(
        (word >> (b * 8)) & 0xff,
        ((byteIdx % 40) | 0) * 8,
        ((byteIdx / 40) | 0) * 12
      );
    }
  });
};
