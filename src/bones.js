class ModelShell {
  constructor(gl, v, i) {
    this.vert = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vert);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.indi = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indi);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(i), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    this.indi_size = i.length;
  }
}

class Game {
  constructor(canvas_id) {
    this.gl = null;
    this.prog = null;
    this.model_stack = [];

    this.c = document.getElementById(canvas_id);
    var wgl = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    for (var n = 0; n < wgl.length; ++n) {
      try { this.gl = this.c.getContext(wgl[n]); }
      catch (e) {}
      if (this.gl) { break; }
    }

    if (this.gl == null)
      { alert("dead webGL; RIP"); }


    var vs = grep_shader(this.gl, "shader-vs");
    var fs = grep_shader(this.gl, "shader-fs");
    this.prog = this.gl.createProgram();
    this.gl.attachShader(this.prog, vs);
    this.gl.attachShader(this.prog, fs);
    this.gl.linkProgram(this.prog);
    if (!this.gl.getProgramParameter(this.prog, this.gl.LINK_STATUS))
      { alert("Shader died, RIP Shader"); }
    this.gl.useProgram(this.prog);

    this.prog.pos = this.gl.getUniformLocation(this.prog, "vecPos");
  }

  new_model(m) {
    this.model_stack.push(m);
  }

  draw() {
    this.c.width  = window.innerWidth;
    this.c.height = window.innerHeight;

    this.gl.clearColor(1.0, 0.0, 1.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
}

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
	if (shad_raw.type == "x-shader/x-vertex")
		{ shad_shad = gl.createShader(gl.VERTEX_SHADER); }
	else if (shad_raw.type == "x-shader/x-fragment")
		{ shad_shad = gl.createShader(gl.FRAGMENT_SHADER); }
	else { alert("w/e you just put in me it was not a shader"); }

	gl.shaderSource(shad_shad, shad_pass);
	gl.compileShader(shad_shad);

	if (!gl.getShaderParameter(shad_shad, gl.COMPILE_STATUS))
		{ alert(gl.getShaderInfoLog(shad_shad)); }

	return shad_shad;
}
