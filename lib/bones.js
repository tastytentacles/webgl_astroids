"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function Model(gl, v, i) {
  _classCallCheck(this, Model);

  this.vert = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vert);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  this.indi = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indi);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(i), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  this.indi_size = i.length;
};

var GameObj = (function () {
  function GameObj($x, $y, $model) {
    _classCallCheck(this, GameObj);

    this.pos = new Point2D($x, $y);
    this.vec = new Vec2D(Math.random() * 360, Math.random() * 0.5);
    this.model = $model;
  }

  _createClass(GameObj, [{
    key: "logic_loop",
    value: function logic_loop() {
      var gravity = Vec2D.vec_between(new Point2D(0, 0), this.pos);
      gravity.mag = 0.01;
      this.vec = Vec2D.add(this.vec, gravity);
      this.pos = Point2D.add_vec(this.vec, this.pos);
    }
  }]);

  return GameObj;
})();

var Game = (function () {
  function Game(canvas_id) {
    _classCallCheck(this, Game);

    this.gl = null;
    this.prog = null;
    this.model_stack = [];
    this.obj_stack = [];

    this.c = document.getElementById(canvas_id);
    var wgl = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    for (var n = 0; n < wgl.length; ++n) {
      try {
        this.gl = this.c.getContext(wgl[n]);
      } catch (e) {}
      if (this.gl) {
        break;
      }
    }

    if (this.gl == null) {
      alert("dead webGL; RIP");
    }

    var vs = grep_shader(this.gl, "shader-vs");
    var fs = grep_shader(this.gl, "shader-fs");
    this.prog = this.gl.createProgram();
    this.gl.attachShader(this.prog, vs);
    this.gl.attachShader(this.prog, fs);
    this.gl.linkProgram(this.prog);
    if (!this.gl.getProgramParameter(this.prog, this.gl.LINK_STATUS)) {
      alert("Shader died, RIP Shader");
    }
    this.gl.useProgram(this.prog);

    this.prog.pos = this.gl.getAttribLocation(this.prog, "vec_pos");

    this.prog.zoom = this.gl.getUniformLocation(this.prog, "zoom");
    this.prog.asp = this.gl.getUniformLocation(this.prog, "asp");
    this.prog.obj_pos = this.gl.getUniformLocation(this.prog, "obj_pos");

    this.prog.s_time = this.gl.getUniformLocation(this.prog, "time");
  }

  _createClass(Game, [{
    key: "new_model",
    value: function new_model(m) {
      this.model_stack.push(m);
    }
  }, {
    key: "new_obj",
    value: function new_obj($x, $y, $model) {
      var t = new GameObj($x, $y, $model);
      this.obj_stack.push(t);
    }
  }, {
    key: "logic_loop",
    value: function logic_loop() {
      for (var n = 0; n < this.obj_stack.length; n++) {
        this.obj_stack[n].logic_loop();
      }
    }
  }, {
    key: "render_loop",
    value: function render_loop() {
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight;

      this.gl.clearColor(0.05, 0.05, 0.05, 1.0);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      var aspect = [1.0, 1.0, 1.0, 1.0];
      if (this.gl.canvas.width < this.gl.canvas.height) {
        aspect[1] = this.c.width / this.c.height;
      } else {
        aspect[0] = this.c.height / this.c.width;
      }

      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.uniform4fv(this.prog.asp, aspect);
      this.gl.uniform1f(this.prog.zoom, 10.0);
      this.gl.uniform1f(this.prog.s_time, new Date().getMilliseconds());

      for (var n = 0; n < this.obj_stack.length; n++) {
        var m = this.obj_stack[n].model;
        var p = [this.obj_stack[n].pos.x, this.obj_stack[n].pos.y, 0.0];
        this.gl.uniform3fv(this.prog.obj_pos, p);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model_stack[m].vert);
        this.gl.vertexAttribPointer(this.prog.vec_pos, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.prog.vec_pos);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.model_stack[m].indi);
        this.gl.drawElements(this.gl.LINE_LOOP, this.model_stack[m].indi_size, this.gl.UNSIGNED_SHORT, 0);
      }
      // for (var n = 0; n < obj_count; n++) {
      // 	gl.uniform3fv(prog.colour, colour_mat);
      // 	gl.uniform3fv(prog.pos, box_stack[n].pos);
      // 	gl.uniform3fv(prog.scl, box_stack[n].scl);
      // 	gl.uniform1f(prog.rot, box_stack[n].rot);
      //
      // 	gl.bindBuffer(gl.ARRAY_BUFFER, model_stack[0].vert);
      // 	gl.vertexAttribPointer(prog.vecPos, 3, gl.FLOAT, false, 0, 0);
      // 	gl.enableVertexAttribArray(prog.vecPos);
      //
      // 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model_stack[0].indi);
      // 	gl.drawElements(gl.LINE_LOOP, model_stack[0].indi_size, gl.UNSIGNED_SHORT, 0);
      // }
    }
  }]);

  return Game;
})();

function grep_shader(gl, id) {
  var shad_raw = document.getElementById(id);
  var shad_pass = "";
  var k = shad_raw.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      shad_pass += k.textContent;
    }
    k = k.nextSibling;
  }

  var shad_shad = null;
  if (shad_raw.type == "x-shader/x-vertex") {
    shad_shad = gl.createShader(gl.VERTEX_SHADER);
  } else if (shad_raw.type == "x-shader/x-fragment") {
    shad_shad = gl.createShader(gl.FRAGMENT_SHADER);
  } else {
    alert("w/e you just put in me it was not a shader");
  }

  gl.shaderSource(shad_shad, shad_pass);
  gl.compileShader(shad_shad);

  if (!gl.getShaderParameter(shad_shad, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shad_shad));
  }

  return shad_shad;
}

var rAniFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
})();
