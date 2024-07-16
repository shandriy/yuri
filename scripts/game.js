function game() {
  var mcEntity = yuri.getEntityByName("mc");
  mcEntity.x = 40;
  mcEntity.y = 80;
  var mcObject = {
    x: 40,
    y: 80,
    frame: 0,
    direction: 0,
    standing: true,
    stateFor: 0,
    temp: {
      x: 0,
      y: 0
    }
  };
  yuri.frame(function(delta) {
    var frame = 0;
    var speed = 0.25;
    mcObject.stateFor += delta;
    yuri.props.context.fillStyle = "#fff";
    yuri.props.context.fillRect(0, 0, 800, 600);
    var keyUpPressed = yuri.keyboard.isDown("KeyW") || yuri.keyboard.isDown("ArrowUp");
    var keyLeftPressed = yuri.keyboard.isDown("KeyA") || yuri.keyboard.isDown("ArrowLeft");
    var keyDownPressed = yuri.keyboard.isDown("KeyS") || yuri.keyboard.isDown("ArrowDown");
    var keyRightPressed = yuri.keyboard.isDown("KeyD") || yuri.keyboard.isDown("ArrowRight");
    if (keyUpPressed) mcObject.temp.y -= delta;
    if (keyLeftPressed) mcObject.temp.x -= delta;
    if (keyDownPressed) mcObject.temp.y += delta;
    if (keyRightPressed) mcObject.temp.x += delta;
    if (mcObject.temp.x < 0) mcObject.direction = 3;
    if (mcObject.temp.x > 0) mcObject.direction = 2;
    if (mcObject.temp.y < 0) mcObject.direction = 1;
    if (mcObject.temp.y > 0) mcObject.direction = 0;
    if (mcObject.temp.x !== 0 && mcObject.temp.y !== 0) speed *= Math.SQRT1_2;
    if (mcObject.temp.x !== 0 || mcObject.temp.y !== 0) {
      if (mcObject.standing) mcObject.stateFor = mcObject.stateFor > 100 ? 51 : 0;
      else if (mcObject.stateFor > 50) mcObject.frame += delta * 0.006;
      mcObject.standing = false;
    } else {
      if (!mcObject.standing) mcObject.stateFor = 0;
      else if (mcObject.stateFor > 100) mcObject.frame = 0;
      else mcObject.frame += delta * 0.002;
      mcObject.standing = true;
    };
    mcObject.x += mcObject.temp.x * speed;
    mcObject.y += mcObject.temp.y * speed;
    mcObject.temp.x = 0;
    mcObject.temp.y = 0;
    mcEntity.x = Math.round(mcObject.x);
    mcEntity.y = Math.round(mcObject.y);
    if (mcObject.frame > 0) frame = ~~((mcObject.frame % 4) + 1);
    mcEntity.animation = (mcObject.direction * 5) + frame;
  });
};