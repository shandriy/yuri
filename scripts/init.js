addEventListener("DOMContentLoaded", function() {
  yuri.init(800, 600, false, "#000");
  var mcSprites = new Image(), mc;
  mcSprites.addEventListener("load", function() {
    mc = new yuri.Entity("mc", true, mcSprites, 80, 160);
    var script = document.createElement("script");
    script.addEventListener("load", function() {
      game();
    });
    script.setAttribute("src", "scripts/game.js");
    document.getElementsByTagName("head")[0].appendChild(script);
  });
  mcSprites.src = "assets/images/mc_walk.png";
});