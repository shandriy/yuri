function game() {
  var mcEntity = yuri.getEntityByName("mc");
  mcEntity.x = 40;
  mcEntity.y = 80;
  var mcObject = {
    x: 40,
    y: 160,
    frame: 0,
    direction: 0,
    standing: true,
    stateFor: 101,
    movementLocked: false,
    temp: {
      x: 0,
      y: 0
    },
    room: {
      x: 0,
      y: 0
    }
  };
  function collides(line, leastX, leastY, mostX, mostY) {
    var horizontal = line[0][1] === line[1][1];
    if (horizontal) {
      var lineY = line[0][1];
      var lineMostX = line[0][0] > line[1][0] ? line[0][0] : line[1][0];
      var lineLeastX = line[0][0] < line[1][0] ? line[0][0] : line[1][0];
      return lineY >= leastY && lineY <= mostY && lineMostX >= leastX && lineLeastX <= mostX;
    };
    var lineX = line[0][0];
    var lineMostY = line[0][1] > line[1][1] ? line[0][1] : line[1][1];
    var lineLeastY = line[0][1] < line[1][1] ? line[0][1] : line[1][1];
    return lineX >= leastX && lineX <= mostX && lineMostY >= leastY && lineLeastY <= mostY;
  };
  yuri.frame(function(delta) {
    var frame = 0;
    var speed = 0.25;
    mcObject.temp.x = 0;
    mcObject.temp.y = 0;
    mcObject.stateFor += delta;
    movementLocked = scene.loading;
    yuri.props.context.fillStyle = "#fff";
    yuri.props.context.fillRect(0, 0, 800, 600);
    if (!movementLocked) {
      if (yuri.keyboard.isDown("KeyW") || yuri.keyboard.isDown("ArrowUp")) mcObject.temp.y -= delta;
      if (yuri.keyboard.isDown("KeyA") || yuri.keyboard.isDown("ArrowLeft")) mcObject.temp.x -= delta;
      if (yuri.keyboard.isDown("KeyS") || yuri.keyboard.isDown("ArrowDown")) mcObject.temp.y += delta;
      if (yuri.keyboard.isDown("KeyD") || yuri.keyboard.isDown("ArrowRight")) mcObject.temp.x += delta;
    };
    if (mcObject.temp.x !== 0 && mcObject.temp.y !== 0) speed *= Math.SQRT1_2;
    if (mcObject.temp.x !== 0 || mcObject.temp.y !== 0) {
      if (mcObject.temp.x < 0) mcObject.direction = 3;
      else if (mcObject.temp.x > 0) mcObject.direction = 2;
      if (mcObject.temp.y < 0) mcObject.direction = 1;
      else if (mcObject.temp.y > 0) mcObject.direction = 0;
      if (mcObject.standing) mcObject.stateFor = mcObject.stateFor > 100 ? 51 : 0;
      else if (mcObject.stateFor > 50) mcObject.frame += delta * 0.006;
      mcObject.standing = false;
    } else {
      if (!mcObject.standing) mcObject.stateFor = 0;
      else if (mcObject.stateFor > 100) mcObject.frame = 0;
      else mcObject.frame += delta * 0.002;
      mcObject.standing = true;
    };
    mcObject.temp.x *= speed;
    mcObject.temp.y *= speed;
    var cornerX = mcObject.temp.x > 0 ? mcObject.x - 15 : mcObject.x + 15;
    var cornerY = mcObject.temp.y > 0 ? mcObject.y - 22 : mcObject.y;
    mcObject.x += mcObject.temp.x;
    mcObject.y += mcObject.temp.y;
    if (mcObject.temp.x > 0) mcObject.temp.x += 30;
    else mcObject.temp.x -= 30;
    if (mcObject.temp.y > 0) mcObject.temp.y += 22;
    else mcObject.temp.y -= 22;
    var mostX = cornerX;
    var mostY = cornerY;
    var leastX = cornerX;
    var leastY = cornerY;
    if (mcObject.temp.x > 0) mostX += mcObject.temp.x;
    else leastX += mcObject.temp.x;
    if (mcObject.temp.y > 0) mostY += mcObject.temp.y;
    else leastY += mcObject.temp.y;
    var viableHitboxes = [];
    var length = scene.hitboxes.length;
    for (var i = 0; i < length; i += 1) {
      if (collides(scene.hitboxes[i], leastX, leastY, mostX, mostY))
        viableHitboxes.push(scene.hitboxes[i]);
    };
    yuri.props.context.lineWidth = 8;
    yuri.props.context.strokeStyle = "#00f";
    yuri.props.context.beginPath();
    for (var i = 0; i < viableHitboxes.length; i += 1) {
      yuri.props.context.moveTo(viableHitboxes[i][0][0], viableHitboxes[i][0][1]);
      yuri.props.context.lineTo(viableHitboxes[i][1][0], viableHitboxes[i][1][1]);
    };
    yuri.props.context.stroke();
    yuri.props.context.fillStyle = "#0f0";
    yuri.props.context.fillRect(leastX, leastY, mostX - leastX, mostY - leastY);
    if (mcObject.x < 0) {
      mcObject.x = 800;
      mcObject.room.x -= 1;
    } else if (mcObject.x > 800) {
      mcObject.x = 0;
      mcObject.room.x += 1;
    };
    if (mcObject.y < 0) {
      mcObject.y = 600;
      mcObject.room.y -= 1;
    } else if (mcObject.y > 600) {
      mcObject.y = 0;
      mcObject.room.y += 1;
    };
    scene.scenery(mcObject.room.x, mcObject.room.y);
    mcEntity.x = ~~mcObject.x;
    mcEntity.y = ~~mcObject.y - 80;
    if (mcObject.frame > 0) frame = ~~((mcObject.frame % 4) + 1);
    mcEntity.animation = (mcObject.direction * 5) + frame;
  });
};