"use strict";

var game = null;

var rAniFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function petrichor() {
  game = new Game("c");

  var verts = [0.0, 0.7, 0.0, 0.4, 0.6, 0.0, 0.6, 0.2, 0.0, 0.5, -0.1, 0.0, 0.5, -0.4, 0.0, 0.0, -0.7, 0.0, -0.3, -0.4, 0.0, -0.6, -0.2, 0.0, -0.4, -0.1, 0.0, -0.5, 0.0, 0.0, -0.5, 0.3, 0.0, -0.2, 0.5, 0.0];
  var indis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var rock = new ModelShell(game.gl, verts, indis);

  render_loop();
}

function render_loop() {
  rAniFrame(render_loop);
  game.draw();
}
