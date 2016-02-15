'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Saga = exports.Sagas = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.saga = saga;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// top level component

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

// <Saga saga={generator} {...props}/>
// simple!


Sagas.propTypes = {
  // as returned from redux-saga:createSagaMiddleware
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
      if (!this.context.sagas) {
        throw new Error('did you forget to include <Sagas/>?');
      }
      this.runningSaga = this.context.sagas.run(this.props.saga, this.props);
    } // todo - test fpr generator

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
      if (this.runningSaga) {
        this.runningSaga.cancel();
        delete this.runningSaga;
      }
    }
  }]);

  return Saga;
}(_react.Component);

// decorator version


Saga.propTypes = {
  saga: _react.PropTypes.func.isRequired };
Saga.contextTypes = {
  sagas: _react.PropTypes.func.isRequired
};
function saga(run) {
  return function (Target) {
    var _class, _temp;

    return _temp = _class = function (_Component3) {
      _inherits(SagaDecorator, _Component3);

      function SagaDecorator() {
        _classCallCheck(this, SagaDecorator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SagaDecorator).apply(this, arguments));
      }

      _createClass(SagaDecorator, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            Saga,
            _extends({ saga: run }, this.props),
            _react2.default.createElement(Target, this.props)
          );
        }
      }]);

      return SagaDecorator;
    }(_react.Component), _class.displayName = 'saga:' + (Target.displayName || Target.name), _temp;
  };
}