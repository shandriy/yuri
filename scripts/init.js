addEventListener("DOMContentLoaded", function() {
  yuri.init(800, 600, false, "#000");
  var mc;
  var dialogue = new yuri.Entity("dialogue", false, function() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    yuri.props.context.fillStyle = "#000";
    yuri.props.context.fillRect(10, 360, 780, 230);
    yuri.props.context.lineWidth = 3;
    yuri.props.context.strokeStyle = "#fff";
    yuri.props.context.strokeRect(20, 370, 760, 210);
    if (context.fillText) {
    };
  });
  dialogue.z = Infinity;
  var mcSprites = utils.load.image("assets/images/mc_walk.png", function() {
    mc = new yuri.Entity("mc", true, mcSprites, 80, 160);
    var scripts = [
      "scripts/game",
      "scripts/scene",
      "stage/0.0"
    ];
    var length = scripts.length;
    var loadCount = 0;
    utils.load.scripts(scripts, "", ".js", function() {
      loadCount += 1;
      if (loadCount >= length) game();
    })
  });
});