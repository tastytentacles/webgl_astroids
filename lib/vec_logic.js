"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point2D = (function () {
  function Point2D(x, y) {
    _classCallCheck(this, Point2D);

    this.x = x;
    this.y = y;
  }

  _createClass(Point2D, null, [{
    key: "add",
    value: function add(a, b) {
      return new Point2D(a.x + b.x, a.y + b.y);
    }
  }, {
    key: "add_vec",
    value: function add_vec(v, p) {
      return Point2D.add(p, Vec2D.to_point(v));
    }
  }]);

  return Point2D;
})();

var Vec2D = (function () {
  function Vec2D(ang, mag) {
    _classCallCheck(this, Vec2D);

    this.ang = ang;
    this.mag = mag;
  }

  _createClass(Vec2D, null, [{
    key: "add",
    value: function add(a, b) {
      var c = Point2D.add(this.to_point(a), this.to_point(b));
      return this.vec_between(new Point2D(0, 0), c);
    }
  }, {
    key: "to_point",
    value: function to_point(a) {
      return new Point2D(Math.cos(a.ang * (Math.PI / 180)) * a.mag, Math.sin(a.ang * (Math.PI / 180)) * a.mag);
    }
  }, {
    key: "vec_between",
    value: function vec_between(a, b) {
      var mag = Math.sqrt(Math.pow(a.x + b.x, 2) + Math.pow(a.y + b.y, 2));
      var ang = Math.atan2(a.x - b.x, a.y - b.y);
      return new Vec2D(ang * (180 / Math.PI), mag);
    }
  }, {
    key: "to_vec",
    value: function to_vec(a) {
      var mag = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
      var ang = Math.atan2(a.x, a.y);
      return new Vec2D(ang, mag);
    }
  }]);

  return Vec2D;
})();
