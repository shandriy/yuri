addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementsByTagName("canvas")[0];
  var context = canvas.getContext("2d", { alpha: false });
  canvas.width = 800;
  canvas.height = 600;
  function resize() {
    var outWidth, outHeight, top, left;
    if (innerWidth * 3 > innerHeight * 4) {
      outWidth = innerHeight * (4 / 3);
      outHeight = innerHeight;
      left = (innerWidth - outWidth) / 2;
      top = 0;
    } else {
      outHeight = innerWidth / (4 / 3);
      outWidth = innerWidth;
      top = (innerHeight - outHeight) / 2;
      left = 0;
    };
    canvas.style.top = top + "px";
    canvas.style.left = left + "px";
    canvas.style.width = outWidth + "px";
    canvas.style.height = outHeight + "px";
  };
  resize();
  addEventListener("resize", resize);
  addEventListener("focus", resize);
  function loadImage(path, onload) {
    var image = new Image();
    image.addEventListener("load", onload);
    image.src = path;
    return image;
  };
  function loadImages(prefix, pathArray, onload) {
    var length = pathArray.length, out = [];
    for (var i = 0; i < length; i += 1) {
      out.push(loadImage(prefix + pathArray[i], onload));
    };
    return out;
  };
  var pathArray = [
    "temp.jpg"
  ];
  var leftToLoad = pathArray.length;
  var imageArray = loadImages("assets/images/", pathArray, function() {
    leftToLoad -= 1;
    if (leftToLoad < 1) {
      frame();
    };
  });
  var keysDown = [];
  function keyDown(key) {
    return keysDown.indexOf(key) > -1;
  }
  function keyCode(code) {
    if (code > 64 && code < 91) return "Key" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[code - 65];
    else if (code > 47 && code < 58) return "Digit" + (code - 48);
    else switch (code) {
      case 16:
        return "ShiftLeft";
      case 32:
        return "Space";
      case 37:
        return "ArrowLeft";
      case 38:
        return "ArrowUp";
      case 39:
        return "ArrowRight";
      case 40:
        return "ArrowDown";
    };
  };
  addEventListener("keydown", function(event) {
    var key = keyCode(event.keyCode);
    if (keysDown.indexOf(key) === -1) keysDown.push(key);
  });
  addEventListener("keyup", function(event) {
    var index = keysDown.indexOf(keyCode(event.keyCode));
    if (index > -1) keysDown.splice(index, 1);
  });
  var mc = {
    x: 0,
    y: 0,
  }
  var animate = window.requestAnimationFrame || setTimeout;
  var now = window.performance ? performance.now ? function() {
    return performance.now()
  } : Date.now : Date.now;
  var previous = Date.now(), now, delta;
  var colliders = [
    [[100, 200], [200, 200]],
    [[200, 200], [200, 300]]
  ];
  function frame() {
    now = Date.now()
    delta = now - previous;
    previous = now;
    context.fillStyle = "#fff";
    context.lineWidth = 1;
    context.strokeStyle = "#0f0";
    context.fillRect(0, 0, 800, 600);
    context.beginPath();
    var length = colliders.length;
    for (var i = 0; i < length; i += 1) {
      context.moveTo(colliders[i][0][0], colliders[i][0][1]);
      context.lineTo(colliders[i][1][0], colliders[i][1][1]);
    };
    context.stroke();
    var xMovement = 0, yMovement = 0;
    var speed = keyDown("ShiftLeft") ? 0.5 : 0.2;
    if (keyDown("KeyW") || keyDown("ArrowUp")) yMovement -= 1;
    if (keyDown("KeyS") || keyDown("ArrowDown")) yMovement += 1;
    if (keyDown("KeyA") || keyDown("ArrowLeft")) xMovement -= 1;
    if (keyDown("KeyD") || keyDown("ArrowRight")) xMovement += 1;
    if (xMovement !== 0 && yMovement !== 0) {
      xMovement *= Math.SQRT1_2;
      yMovement *= Math.SQRT1_2;
    };
    xMovement *= delta * speed;
    yMovement *= delta * speed;
    mc.x += xMovement;
    mc.y += yMovement;
    var xCalc = Math.round(mc.x);
    var yCalc = Math.round(mc.y);
    for (var i = 0; i < length; i += 1) {
      var horizontal = colliders[i][0][1] - colliders[i][1][1] === 0;
      if (horizontal && yMovement !== 0) {
        var less = colliders[i][0][0] < colliders[i][1][0] ? colliders[i][0][0] : colliders[i][1][0];
        var more = colliders[i][0][0] > colliders[i][1][0] ? colliders[i][0][0] : colliders[i][1][0];
        if (xCalc + 15 > less && xCalc - 15 < more && yCalc >= colliders[i][0][1] && yCalc - 15 <= colliders[i][0][1]) {
          while (yCalc >= colliders[i][0][1] && yCalc - 15 <= colliders[i][0][1])
            yCalc += yMovement < 0 ? 1 : -1;
          mc.y = yCalc;
        }
      } else if (!horizontal && xMovement !== 0) {
        var less = colliders[i][0][1] < colliders[i][1][1] ? colliders[i][0][1] : colliders[i][1][1];
        var more = colliders[i][0][1] > colliders[i][1][1] ? colliders[i][0][1] : colliders[i][1][1];
        if (yCalc > less && yCalc - 15 < more && xCalc + 15 >= colliders[i][0][0] && xCalc - 15 <= colliders[i][0][0]) {
          while (xCalc + 15 >= colliders[i][0][0] && xCalc - 15 <= colliders[i][0][0])
            xCalc += xMovement < 0 ? 1 : -1;
          mc.x = xCalc;
        }
      }
    };
    context.fillStyle = "#f00";
    context.fillRect(Math.round(mc.x) - 20, Math.round(mc.y) - 80, 40, 80);
    context.fillStyle = "#00f";
    context.fillRect(Math.round(mc.x) - 15, Math.round(mc.y) - 15, 30, 15);
    animate(frame);
  };
});