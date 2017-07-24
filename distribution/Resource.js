'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observer = function () {
  function Observer(listener) {
    _classCallCheck(this, Observer);

    this._state = {};
    this.listener = listener;
  }

  _createClass(Observer, [{
    key: 'add',
    value: function add(el) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

      this._state[el[key]] = el;
      this.listener();
    }
  }, {
    key: 'override',
    value: function override(newState) {
      this._state = newState;
      this.listener();
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      delete this._state[id];
      this.listener();
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this._state[key];
    }
  }, {
    key: 'update',
    value: function update() {
      this.listener();
    }
  }]);

  return Observer;
}();

var Resource = function () {
  function Resource() {
    _classCallCheck(this, Resource);

    this.cache = new Observer(this.listener.bind(this));
    this.cache.listener();
  }

  _createClass(Resource, [{
    key: 'listener',
    value: function listener() {
      var _this = this;

      this.data = Object.keys(this.cache._state).map(function (key) {
        return _this.cache._state[key];
      });
    }
  }, {
    key: 'fromArray',
    value: function fromArray(array) {
      var _this2 = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

      array.forEach(function (el) {
        return _this2.add(el, key);
      });
    }
  }, {
    key: 'fromObject',
    value: function fromObject(object) {
      this.cache.override(Object.assign(this.cache._state, object));
    }
  }, {
    key: 'removeMultiple',
    value: function removeMultiple(arrayOfIds) {
      var _this3 = this;

      arrayOfIds.forEach(function (id) {
        return _this3.remove(id);
      });
    }
  }, {
    key: 'update',
    value: function update(newEl, key) {
      var oldEl = this.get(key);
      Object.assign(oldEl, newEl);
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      this.cache.remove(id);
    }
  }, {
    key: 'add',
    value: function add(el) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

      // do not override the object pointer
      if (this.get(el[key])) this.update(el, el[key]);else {
        this.cache.add(el, key);
      }
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this.cache.get(key);
    }
  }]);

  return Resource;
}();

exports.default = Resource;