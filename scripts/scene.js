var scene = {
  x: undefined,
  y: undefined,
  loading: false,
  entities: [],
  scenery: function(x, y) {
    if (x !== scene.x || y !== scene.y) {
      scene.loading = true;
      var length = scene.entities.length;
      for (var i = 0; i < length; i += 1)
        scene.entities[i].destroy();
      scene.entities = [];
      var functionName =
        "x" + x.toString().replace("-", "_") +
        "y" + y.toString().replace("-", "_");
      if (window[functionName]) scene.sceneryObjectGenerate(window[functionName]());
      else {
        utils.load.script("stage/" + x + "." + y + ".js", function() {
          scene.sceneryObjectGenerate(window[functionName]());
        });
      };
    };
  },
  sceneryObjectGenerate: function(sceneObject) {
    var length = sceneObject.length;
    yuri.props.context.lineWidth = 2;
    yuri.props.context.strokeStyle = "#f00";
    yuri.props.context.beginPath();
    for (var i = 0; i < length; i += 1) {
      yuri.props.context.moveTo(sceneObject[i][0][0], sceneObject[i][0][1]);
      yuri.props.context.lineTo(sceneObject[i][1][0], sceneObject[i][1][1]);
    };
    yuri.props.context.stroke();
    scene.loading = false;
  }
};