addEventListener("DOMContentLoaded", function() {
  var COLLIDER_WIDTH = 20;
  var COLLIDER_HEIGHT = 15;
  var addedWidth = COLLIDER_WIDTH / 2;
  var canvas = document.getElementsByTagName("canvas")[0];
  var context = canvas.getContext("2d", { alpha: false });
  canvas.width = 800;
  canvas.height = 600;
  var dialogue = false;
  var canvasText = !!context.fillText, lastDialogue = dialogue, dialogueDiv;
  if (!canvasText) {
    dialogueDiv = document.createElement("div");
    document.body.appendChild(dialogueDiv);
  };
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
    if (!canvasText) {
      var multiplier = outWidth / 800;
      dialogueDiv.style.top = (top + (384 * multiplier)) + "px";
      dialogueDiv.style.left = (left + (40 * multiplier)) + "px";
      dialogueDiv.style.fontSize = (25 * multiplier) + "px";
    };
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
    "temp.jpg",
    "bok-su.png"
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
  addEventListener("blur", function() {
    keysDown = [];
  });
  var mc = {
    x: 0,
    y: 0,
    direction: 0,
    walking: 0,
    standingFor: 0,
    walkingFor: 0,
    sprites: imageArray[1]
  };
  var animate = window.requestAnimationFrame || setTimeout;
  var getNow = window.performance ? performance.now ? function() {
    return performance.now()
  } : Date.now : Date.now;
  var previous = getNow(), now, delta;
  var colliders = [
    [[100, 200], [200, 200]],
    [[200, 200], [200, 300]],
    [[200, 300], [180, 300]],
    [[180, 300], [180, 220]],
    [[180, 220], [100, 220]],
    [[100, 220], [100, 200]]
  ];
  var lastX = mc.x, lastY = mc.y;
  function frame() {
    now = getNow();
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
    var speed = keyDown("ShiftLeft") ? 0.5 : 0.25;
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
    xMovement = Math.round(xMovement);
    yMovement = Math.round(yMovement);
    mc.x += xMovement;
    mc.y += yMovement;
    function collides() {
      for (var i = 0; i < length; i += 1) {
        var horizontal = colliders[i][0][1] - colliders[i][1][1] === 0;
        if (horizontal && yMovement !== 0) {
          var less = colliders[i][0][0] < colliders[i][1][0] ? colliders[i][0][0] : colliders[i][1][0];
          var more = colliders[i][0][0] > colliders[i][1][0] ? colliders[i][0][0] : colliders[i][1][0];
          if (
            mc.x + addedWidth >= less &&
            mc.x - addedWidth <= more &&
            mc.y >= colliders[i][0][1] &&
            mc.y - COLLIDER_HEIGHT <= colliders[i][0][1]
          ) return true;
        } else if (!horizontal && xMovement !== 0) {
          var less = colliders[i][0][1] < colliders[i][1][1] ? colliders[i][0][1] : colliders[i][1][1];
          var more = colliders[i][0][1] > colliders[i][1][1] ? colliders[i][0][1] : colliders[i][1][1];
          if (
            mc.y >= less &&
            mc.y - COLLIDER_HEIGHT <= more &&
            mc.x + addedWidth >= colliders[i][0][0] &&
            mc.x - addedWidth <= colliders[i][0][0]
          ) return true;
        };
      };
      return false;
    };
    if (collides()) {
      mc.x -= xMovement;
      if (collides()) {
        mc.x += xMovement;
        mc.y -= yMovement;
        if (collides()) {
          mc.x -= xMovement;
          if (collides()) {
            mc.x += xMovement;
            mc.y += yMovement;
          } else {
            mc.x += xMovement;
            mc.y += yMovement;
            while (collides()) {
              mc.x += xMovement < 0 ? 1 : -1;
              mc.y += yMovement < 0 ? 1 : -1;
            };
          };
        } else {
          mc.y += yMovement;
          while (collides()) mc.y += yMovement < 0 ? 1 : -1;
        };
      } else {
        mc.x += xMovement;
        while (collides()) mc.x += xMovement < 0 ? 1 : -1;
      };
    };
    var xChange = mc.x - lastX;
    var yChange = mc.y - lastY;
    lastX = mc.x;
    lastY = mc.y;
    var directionX, directionY;
    if (xChange === 0 && yChange === 0) {
      directionX = xMovement;
      directionY = yMovement;
    } else {
      directionX = xChange;
      directionY = yChange;
    };
    if (directionX > 0) mc.direction = 2;
    else if (directionX < 0) mc.direction = 1;
    if (directionY > 0) mc.direction = 0;
    else if (directionY < 0) mc.direction = 3;
    if (xChange === 0 && yChange === 0) {
      mc.walkingFor = 0;
      mc.standingFor += delta;
      if (mc.standingFor > 100)
        mc.walking = 1;
      else
        mc.walking = ((mc.walking + 1 + (delta * 0.002)) % 5) - 1;
    } else {
      mc.standingFor = 0;
      mc.walkingFor += delta;
      if (mc.walkingFor > 50)
        mc.walking = ((mc.walking + 1 + (delta * 0.006)) % 5) - 1;
    };
    context.drawImage(mc.sprites, Math.ceil(mc.walking) * 77, mc.direction * 161, 77, 161, mc.x - 40, mc.y - 160, 80, 160);
    dialogue = keyDown("KeyT");
    if (dialogue) {
      var lines = ["\"Hello World!\"", "... lines of text"];
      var length = lines.length;
      context.fillStyle = "#000";
      context.fillRect(10, 360, 780, 230);
      context.lineWidth = 3;
      context.strokeStyle = "#fff";
      context.strokeRect(20, 370, 760, 210);
      if (canvasText) {
        context.fillStyle = "#fff";
        context.font = "25px 'Times New Roman'";
        for (var i = 0; i < length; i += 1)
          context.fillText(lines[i], 40, 407 + (i * 30));
      } else if (!lastDialogue) {
        dialogueDiv.innerHTML = "";
        for (var i = 0; i < length; i += 1)
          dialogueDiv.innerHTML += "<p>" + lines[i] + "</p>";
      };
    } else if (lastDialogue && !canvasText) {
      dialogueDiv.innerHTML = "";
    };
    lastDialogue = dialogue;
    animate(frame);
  };
});