addEventListener("DOMContentLoaded", function() {
  yuri.init(800, 600, false, "#000");
  var mc;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var fillText = !!context.fillText;
  var dialogue = new yuri.Entity("dialogue", false, function() {
    var lines = ["\"Hello World!\"", "... lines of text"];
    var length = lines.length;
    yuri.props.context.fillStyle = "#000";
    yuri.props.context.fillRect(10, 360, 780, 230);
    yuri.props.context.lineWidth = 3;
    yuri.props.context.strokeStyle = "#fff";
    yuri.props.context.strokeRect(20, 370, 760, 210);
    if (fillText) {
      yuri.props.context.fillStyle = "#fff";
      yuri.props.context.font = "25px 'Times New Roman'";
      for (var i = 0; i < length; i += 1)
        yuri.props.context.fillText(lines[i], 40, 407 + (i * 30));
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