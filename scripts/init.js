addEventListener("DOMContentLoaded", function() {
  yuri.init(800, 600, false, "#000");
  var mcSprites = new Image(), mc;
  mcSprites.addEventListener("load", function() {
    mc = new yuri.Entity("mc", true, mcSprites, 80, 160);
    var scripts = ["game", "stage", "scene"];
    var length = scripts.length;
    var loadCount = 0;
    function countUp() {
      loadCount += 1;
      if (loadCount >= length) game();
    };
    for (var i = 0; i < length; i += 1) {
      var script = document.createElement("script");
      script.addEventListener("load", countUp);
      script.setAttribute("src", "scripts/" + scripts[i] + ".js");
      document.getElementsByTagName("head")[0].appendChild(script);
    };
  });
  mcSprites.src = "assets/images/mc_walk.png";
});