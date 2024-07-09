addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementsByTagName("canvas")[0];
  var context = canvas.getContext("2d", { alpha: false });
  function resize() {
    var outWidth = innerWidth, outHeight = innerHeight;
    var top = 0, left = 0;
    if (innerWidth * 3 > innerHeight * 4) {
      outWidth = innerHeight * (4 / 3);
      left = (innerWidth - outWidth) / 2;
    } else {
      outHeight = innerWidth / (4 / 3);
      top = (innerHeight - outHeight) / 2;
    };
    canvas.style.top = top + "px";
    canvas.style.left = left + "px";
    canvas.style.width = outWidth + "px";
    canvas.style.height = outHeight + "px";
  };
  resize();
  addEventListener("resize", resize);
  addEventListener("focus", resize);
})