attribute vec3 vec_pos;

uniform float zoom;
uniform vec4 asp;
uniform vec3 obj_pos;

void main(void) {
  vec4 zoom_vec4 = vec4(zoom, zoom, 1.0, 1.0);

  gl_Position = (asp * vec4((vec_pos + obj_pos), 1.0)) / zoom_vec4;
}
