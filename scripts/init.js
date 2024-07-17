addEventListener("DOMContentLoaded", function() {
  yuri.init(800, 600, false, "#000");
  var mc;
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