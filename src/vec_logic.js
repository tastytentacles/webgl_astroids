class Point2D {
  constructor($x, $y) {
    this.x = $x;
    this.y = $y;
  }
}

class Vec2D {
  constructor($ang, $mag) {
    this.ang = $ang;
    this.mag = $mag;
  }
}

class PointMath {
  static add($a, $b) {
    return new Point2D($a.x + $b.x, $a.y + $b.y);
  }
}

class VecMath {
  add($a, $b) {

  }

  to_point($a) {

  }
}
