'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Saga = exports.Sagas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sagas = exports.Sagas = function (_Component) {
  _inherits(Sagas, _Component);

  function Sagas() {
    _classCallCheck(this, Sagas);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sagas).apply(this, arguments));
  }

  _createClass(Sagas, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        sagas: this.props.middleware
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return Sagas;
}(_react.Component);

Sagas.propTypes = {
  middleware: _react.PropTypes.func.isRequired
};
Sagas.childContextTypes = {
  sagas: _react.PropTypes.func.isRequired
};

var Saga = exports.Saga = function (_Component2) {
  _inherits(Saga, _Component2);

  function Saga() {
    _classCallCheck(this, Saga);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Saga).apply(this, arguments));
  }

  _createClass(Saga, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.runningSaga = this.context.sagas.run(this.props.saga, this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      // ??
    }
  }, {
    key: 'render',
    value: function render() {
      return !this.props.children ? null : _react.Children.only(this.props.children);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.runningSaga.cancel();
      delete this.runningSaga;
    }
  }]);

  return Saga;
}(_react.Component);

Saga.propTypes = {
  saga: _react.PropTypes.func.isRequired
};
Saga.contextTypes = {
  sagas: _react.PropTypes.func.isRequired
};