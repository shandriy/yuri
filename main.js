addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementsByTagName("canvas")[0];
  var context = canvas.getContext("2d", { alpha: false });
  canvas.width = 800;
  canvas.height = 600;
  function resize() {
    var outWidth, outHeight, top, left;
    if (innerWidth * 3 > innerHeight * 4) {
      outWidth = innerHeight * (4 / 3);
      outHeight = innerHeight;
      left = (innerWidth - outWidth) / 2;
      top = 0;
    } else {
      outHeight = innerWidth / (4 / 3);
      outWidth = innerWidth;
      top = (innerHeight - outHeight) / 2;
      left = 0;
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