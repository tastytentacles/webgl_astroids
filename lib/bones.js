"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

var Point2D = function Point2D($x, $y) {
  _classCallCheck(this, Point2D);

  this.x = $x;
  this.y = $y;
};

var GameObj = (function (_Point2D) {
  _inherits(GameObj, _Point2D);

  function GameObj($x, $y, $model) {
    _classCallCheck(this, GameObj);

    _get(Object.getPrototypeOf(GameObj.prototype), "constructor", this).call(this, $x, $y);
    this.model = $model;
  }

  _createClass(GameObj, [{
    key: "logic_loop",
    value: function logic_loop() {
      this.x += 0.01;
    }
  }]);

  return GameObj;
})(Point2D);

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

    this.prog.asp = this.gl.getUniformLocation(this.prog, "asp");
    this.prog.obj_pos = this.gl.getUniformLocation(this.prog, "obj_pos");
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

      var aspect = [this.gl.canvas.height / this.gl.canvas.width, 1.0, 1.0, 1.0];
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.uniform4fv(this.prog.asp, aspect);

      for (var n = 0; n < this.obj_stack.length; n++) {
        var m = this.obj_stack[n].model;
        var p = [this.obj_stack[n].x, this.obj_stack[n].y, 0.0];
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
