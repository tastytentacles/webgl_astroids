class Point2D {
  constructor(_x, _y, _ang, _mag) {
    this.x = _x; this.y = _y; this.ang = _ang; this.mag = _mag; }

  add_point(a) {
    this.ang = 
    this.mag =

    this.x += a.x; this.y += a.y;
  }
}

// class Point2D {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//
//   static add(a, b) {
//     return new Point2D(a.x + b.x, a.y + b.y);
//   }
//
//   static add_vec(v, p) {
//     return Point2D.add(p, Vec2D.to_point(v));
//   }
// }
//
// class Vec2D {
//   constructor(ang, mag) {
//     this.ang = ang;
//     this.mag = mag;
//   }
//
//   static add(a, b) {
//     new Vec2D(
//       Math.cos(a.ang * (Math.PI / 180)) * a.mag + Math.cos(b.ang * (Math.PI / 180)) * b.mag,
//       );
//   }
//
//   static to_point(a) {
//     return new Point2D(Math.cos(a.ang * (Math.PI / 180)) * a.mag,
//     Math.sin(a.ang * (Math.PI / 180)) * a.mag);
//   }
//
//   static vec_between(a, b) {
//     let mag = Math.sqrt(Math.pow(a.x + b.x, 2) + Math.pow(a.y + b.y, 2));
//     let ang = Math.atan2(a.x - b.x, a.y - b.y);
//     return new Vec2D(ang * (180 / Math.PI), mag);
//   }
//
//   static to_vec(a) {
//     let mag = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
//     let ang = Math.atan2(a.x, a.y);
//     return new Vec2D(ang, mag);
//   }
// }
