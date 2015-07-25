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
  let rock = new ModelShell(game.gl, verts, indis);
  game.model_stack.push(rock);

  render_loop();
}

function render_loop() {
  rAniFrame(render_loop);
  game.draw();
}
