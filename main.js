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
    if (code > 64 && code < 91) {
      return "Key" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[code - 65];
    }
  }
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
    speed: 0.2
  }
  var animate = window.requestAnimationFrame || setTimeout;
  var previous = Date.now(), now, delta;
  function frame() {
    now = Date.now()
    delta = now - previous;
    previous = now;
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 800, 600);
    context.fillStyle = "#f00";
    context.fillRect(mc.x, mc.y, 40, 80);
    console.log(keysDown)
    if (keyDown("KeyW") || keyDown("ArrowUp")) mc.y -= delta * mc.speed;
    if (keyDown("KeyS") || keyDown("ArrowDown")) mc.y += delta * mc.speed;
    if (keyDown("KeyA") || keyDown("ArrowLeft")) mc.x -= delta * mc.speed;
    if (keyDown("KeyD") || keyDown("ArrowRight")) mc.x += delta * mc.speed;
    animate(frame);
  };
});