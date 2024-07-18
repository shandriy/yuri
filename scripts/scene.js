var scene = {
  x: undefined,
  y: undefined,
  loading: false,
  entities: [],
  hitboxes: [],
  scenery: function(x, y) {
    if (x !== scene.x || y !== scene.y) {
      scene.x = x;
      scene.y = y;
      scene.loading = true;
      var loadingBlackOverlay = new yuri.Entity("loading-black-overlay", true, function() {
        yuri.props.context.fillStyle = "#000";
        yuri.props.context.fillRect(0, 0, 800, 600);
      });
      loadingBlackOverlay.z = Infinity;
      var length = scene.entities.length;
      for (var i = 0; i < length; i += 1)
        scene.entities[i].destroy();
      scene.entities = [];
      var functionName =
        "x" + x.toString().replace("-", "_") +
        "y" + y.toString().replace("-", "_");
      if (window[functionName]) {
        var out = window[functionName]();
        scene.hitboxes = out;
        scene.sceneryObjectGenerate(out);
      } else {
        utils.load.script("stage/" + x + "." + y + ".js", function() {
          var out = window[functionName]();
          scene.hitboxes = out;
          scene.sceneryObjectGenerate(out);
        });
      };
    };
  },
  sceneryObjectGenerate: function(sceneObject) {
    var length = sceneObject.length;
    var entity = new yuri.Entity("walls", true, function() {
      yuri.props.context.lineWidth = 2;
      yuri.props.context.strokeStyle = "#f00";
      yuri.props.context.beginPath();
      for (var i = 0; i < length; i += 1) {
        yuri.props.context.moveTo(sceneObject[i][0][0], sceneObject[i][0][1]);
        yuri.props.context.lineTo(sceneObject[i][1][0], sceneObject[i][1][1]);
      };
      yuri.props.context.stroke();
    });
    entity.z = -1;
    scene.entities.push(entity);
    scene.loading = false;
    var loadingBlackOverlay = yuri.getEntityByName("loading-black-overlay");
    if (loadingBlackOverlay) loadingBlackOverlay.destroy();
  }
};