function game() {
  var mcEntity = yuri.getEntityByName("mc");
  mcEntity.x = 40;
  mcEntity.y = 80;
  var mcObject = {
    x: 40,
    y: 80,
    frame: 0,
    direction: 0,
    temp: {
      moving: 0
    }
  };
  yuri.frame(function(delta) {
    yuri.props.context.fillStyle = "#fff";
    yuri.props.context.fillRect(0, 0, 800, 600);
    var speed = 0.2;
    var move = delta * speed;
    if (yuri.keyboard.isDown("KeyW")) mcObject.y -= move;
    if (yuri.keyboard.isDown("KeyS")) mcObject.y += move;
    if (yuri.keyboard.isDown("KeyA")) mcObject.x -= move;
    if (yuri.keyboard.isDown("KeyD")) mcObject.x += move;
    mcEntity.x = Math.round(mcObject.x);
    mcEntity.y = Math.round(mcObject.y);
    mcEntity.animation = (mcObject.direction * 5) + mcObject.frame;
  });
};