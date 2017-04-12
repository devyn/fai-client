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

var myString = "Ready.\r\n? d\r\nstart? 11000\r\nend? 11010\r\nconfirm 11000 .. 11010 (y/n)?\r\n\n00010023 0400ae0c 12345678 deadbeef\r\n47283aac e9e9e9e9 1238d9a0 ab900fff\r\n0a0a0a99 29201a9c d320aa10 cc0a2e22\r\naba110ce 00000000 000100ff fefefefe\r\n\r\n? ";

var x = 0;
var y = 0;
var i = 0;


charset.onload = function () {
  setInterval(function () {
    if (i >= myString.length) return;

    if (myString[i] === "\r") {
      x = 0;
      i++;
      return;
    }

    if (myString[i] === "\n") {
      y++;
      i++;
      return;
    }

    drawChar(myString.charCodeAt(i), x * 8, y * 12);

    x++;
    if (x >= 40) {
      x = 0;
      y++;
    }

    i++;
  }, 50);
};
