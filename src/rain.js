let game = null;

function petrichor() {
  game = new Game("c");

  let verts =  [
    0.0, 0.7, 0.0,
    0.4, 0.6, 0.0,
    0.6, 0.2, 0.0,
    0.5, -0.1, 0.0,
    0.5, -0.4, 0.0,
    0.0, -0.7, 0.0,
    -0.3, -0.4, 0.0,
    -0.6, -0.2, 0.0,
    -0.4, -0.1, 0.0,
    -0.5, 0.0, 0.0,
    -0.5, 0.3, 0.0,
    -0.2, 0.5, 0.0 ];
  let indis = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
  let rock = new Model(game.gl, verts, indis);
  game.new_model(rock);

  for (var n = 0; n < 64; n++) {
    game.new_obj((Math.random() * 2) - 1, (Math.random() * 2) - 1, 0);
  }

  setInterval(logic_loop, 16);
  render_loop();
}

function render_loop() {
  rAniFrame(render_loop);
  game.render_loop();
}

function logic_loop() {
  game.logic_loop();
}
