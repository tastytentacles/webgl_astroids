"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point2D = function Point2D($x, $y) {
  _classCallCheck(this, Point2D);

  this.x = $x;
  this.y = $y;
};

var Vec2D = function Vec2D($ang, $mag) {
  _classCallCheck(this, Vec2D);

  this.ang = $ang;
  this.mag = $mag;
};

var PointMath = (function () {
  function PointMath() {
    _classCallCheck(this, PointMath);
  }

  _createClass(PointMath, null, [{
    key: "add",
    value: function add($a, $b) {
      return new Point2D($a.x + $b.x, $a.y + $b.y);
    }
  }]);

  return PointMath;
})();

var VecMath = (function () {
  function VecMath() {
    _classCallCheck(this, VecMath);
  }

  _createClass(VecMath, [{
    key: "add",
    value: function add($a, $b) {}
  }, {
    key: "to_point",
    value: function to_point($a) {}
  }]);

  return VecMath;
})();
