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
    stateFor: 101,
    temp: {
      x: 0,
      y: 0
    },
    room: {
      x: 0,
      y: 0
    }
  };
  yuri.frame(function(delta) {
    if (scene.loading) {
      mcEntity.shown = false;
      yuri.props.context.fillStyle = "#000";
      yuri.props.context.fillRect(0, 0, 800, 600);
      return;
    } else mcEntity.shown = true;
    var frame = 0;
    var speed = 0.25;
    mcObject.temp.x = 0;
    mcObject.temp.y = 0;
    mcObject.stateFor += delta;
    yuri.props.context.fillStyle = "#fff";
    yuri.props.context.fillRect(0, 0, 800, 600);
    if (yuri.keyboard.isDown("KeyW") || yuri.keyboard.isDown("ArrowUp")) mcObject.temp.y -= delta;
    if (yuri.keyboard.isDown("KeyA") || yuri.keyboard.isDown("ArrowLeft")) mcObject.temp.x -= delta;
    if (yuri.keyboard.isDown("KeyS") || yuri.keyboard.isDown("ArrowDown")) mcObject.temp.y += delta;
    if (yuri.keyboard.isDown("KeyD") || yuri.keyboard.isDown("ArrowRight")) mcObject.temp.x += delta;
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
    mcObject.x += mcObject.temp.x * speed;
    mcObject.y += mcObject.temp.y * speed;
    scene.scenery(mcObject.room.x, mcObject.room.y);
    mcEntity.x = ~~mcObject.x;
    mcEntity.y = ~~mcObject.y;
    if (mcObject.frame > 0) frame = ~~((mcObject.frame % 4) + 1);
    mcEntity.animation = (mcObject.direction * 5) + frame;
  });
};