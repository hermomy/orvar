/* eslint-disable */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetch = exports.useAsync = exports.statusTypes = exports.createInstance = exports.Settled = exports.Rejected = exports.Pending = exports.Initial = exports.Fulfilled = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

var PropTypes;

try {
  PropTypes = require("prop-types");
} catch (e) {}

var childrenFn = PropTypes && PropTypes.oneOfType([PropTypes.node, PropTypes.func]);
var stateObject = PropTypes && PropTypes.shape({
  initialValue: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.instanceOf(Error),
  value: PropTypes.any,
  startedAt: PropTypes.instanceOf(Date),
  finishedAt: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(["initial", "pending", "fulfilled", "rejected"]),
  isInitial: PropTypes.bool,
  isPending: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFulfilled: PropTypes.bool,
  isResolved: PropTypes.bool,
  isRejected: PropTypes.bool,
  isSettled: PropTypes.bool,
  counter: PropTypes.number,
  cancel: PropTypes.func,
  run: PropTypes.func,
  reload: PropTypes.func,
  setData: PropTypes.func,
  setError: PropTypes.func
});
var propTypes = PropTypes && {
  Async: {
    children: childrenFn,
    promise: PropTypes.instanceOf(Promise),
    promiseFn: PropTypes.func,
    deferFn: PropTypes.func,
    watch: PropTypes.any,
    watchFn: PropTypes.func,
    initialValue: PropTypes.any,
    onResolve: PropTypes.func,
    onReject: PropTypes.func,
    reducer: PropTypes.func,
    dispatcher: PropTypes.func
  },
  Initial: {
    children: childrenFn.isRequired,
    state: stateObject.isRequired,
    persist: PropTypes.bool
  },
  Pending: {
    children: childrenFn.isRequired,
    state: stateObject.isRequired,
    initial: PropTypes.bool
  },
  Fulfilled: {
    children: childrenFn.isRequired,
    state: stateObject.isRequired,
    persist: PropTypes.bool
  },
  Rejected: {
    children: childrenFn.isRequired,
    state: stateObject.isRequired,
    persist: PropTypes.bool
  },
  Settled: {
    children: childrenFn.isRequired,
    state: stateObject.isRequired,
    persist: PropTypes.bool
  }
};

var nullify = function nullify(children) {
  return children === undefined ? null : children;
};

var renderFn = function renderFn(children) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return nullify(typeof children === "function" ? children.apply(void 0, args) : children);
};
/**
 * Renders only when no promise has started or completed yet.
 *
 * @prop {Function|Node} children Function (passing state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show until we have data, even while pending (loading) or when an error occurred
 */


var Initial = function Initial(_ref) {
  var children = _ref.children,
      persist = _ref.persist,
      state = _ref.state;
  return state.isInitial || persist && !state.data ? renderFn(children, state) : null;
};
/**
 * Renders only while pending (promise is loading).
 *
 * @prop {Function|Node} children Function (passing state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} initial Show only on initial load (data is undefined)
 */


exports.Initial = Initial;

var Pending = function Pending(_ref2) {
  var children = _ref2.children,
      initial = _ref2.initial,
      state = _ref2.state;
  return state.isPending && (!initial || !state.value) ? renderFn(children, state) : null;
};
/**
 * Renders only when promise is resolved.
 *
 * @prop {Function|Node} children Function (passing data and state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show old data while pending (promise is loading)
 */


exports.Pending = Pending;

var Fulfilled = function Fulfilled(_ref3) {
  var children = _ref3.children,
      persist = _ref3.persist,
      state = _ref3.state;
  return state.isFulfilled || persist && state.data ? renderFn(children, state.data, state) : null;
};
/**
 * Renders only when promise is rejected.
 *
 * @prop {Function|Node} children Function (passing error and state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show old error while pending (promise is loading)
 */


exports.Fulfilled = Fulfilled;

var Rejected = function Rejected(_ref4) {
  var children = _ref4.children,
      persist = _ref4.persist,
      state = _ref4.state;
  return state.isRejected || persist && state.error ? renderFn(children, state.error, state) : null;
};
/**
 * Renders only when promise is fulfilled or rejected.
 *
 * @prop {Function|Node} children Function (passing state) or React node
 * @prop {Object} state React Async state object
 * @prop {boolean} persist Show old data or error while pending (promise is loading)
 */


exports.Rejected = Rejected;

var Settled = function Settled(_ref5) {
  var children = _ref5.children,
      persist = _ref5.persist,
      state = _ref5.state;
  return state.isSettled || persist && state.value ? renderFn(children, state) : null;
};

exports.Settled = Settled;

if (propTypes) {
  Initial.propTypes = propTypes.Initial;
  Pending.propTypes = propTypes.Pending;
  Fulfilled.propTypes = propTypes.Fulfilled;
  Rejected.propTypes = propTypes.Rejected;
  Settled.propTypes = propTypes.Settled;
}

var statusTypes = {
  initial: "initial",
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected"
};
exports.statusTypes = statusTypes;

var getInitialStatus = function getInitialStatus(value, promise) {
  if (_instanceof(value, Error)) return statusTypes.rejected;
  if (value !== undefined) return statusTypes.fulfilled;
  if (promise) return statusTypes.pending;
  return statusTypes.initial;
};

var getIdleStatus = function getIdleStatus(value) {
  if (_instanceof(value, Error)) return statusTypes.rejected;
  if (value !== undefined) return statusTypes.fulfilled;
  return statusTypes.initial;
};

var getStatusProps = function getStatusProps(status) {
  return {
    status: status,
    isInitial: status === statusTypes.initial,
    isPending: status === statusTypes.pending,
    isLoading: status === statusTypes.pending,
    // alias
    isFulfilled: status === statusTypes.fulfilled,
    isResolved: status === statusTypes.fulfilled,
    // alias
    isRejected: status === statusTypes.rejected,
    isSettled: status === statusTypes.fulfilled || status === statusTypes.rejected
  };
};

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var actionTypes = {
  start: "start",
  cancel: "cancel",
  fulfill: "fulfill",
  reject: "reject"
};

var init = function init(_ref) {
  var initialValue = _ref.initialValue,
      promise = _ref.promise,
      promiseFn = _ref.promiseFn;
  return _objectSpread({
    initialValue: initialValue,
    data: _instanceof(initialValue, Error) ? undefined : initialValue,
    error: _instanceof(initialValue, Error) ? initialValue : undefined,
    value: initialValue,
    startedAt: promise || promiseFn ? new Date() : undefined,
    finishedAt: initialValue ? new Date() : undefined
  }, getStatusProps(getInitialStatus(initialValue, promise || promiseFn)), {
    counter: 0
  });
};

var reducer = function reducer(state, _ref2) {
  var type = _ref2.type,
      payload = _ref2.payload,
      meta = _ref2.meta;

  switch (type) {
    case actionTypes.start:
      return _objectSpread({}, state, {
        startedAt: new Date(),
        finishedAt: undefined
      }, getStatusProps(statusTypes.pending), {
        counter: meta.counter
      });

    case actionTypes.cancel:
      return _objectSpread({}, state, {
        startedAt: undefined,
        finishedAt: undefined
      }, getStatusProps(getIdleStatus(state.error || state.data)), {
        counter: meta.counter
      });

    case actionTypes.fulfill:
      return _objectSpread({}, state, {
        data: payload,
        value: payload,
        error: undefined,
        finishedAt: new Date()
      }, getStatusProps(statusTypes.fulfilled));

    case actionTypes.reject:
      return _objectSpread({}, state, {
        error: payload,
        value: payload,
        finishedAt: new Date()
      }, getStatusProps(statusTypes.rejected));

    default:
      return state;
  }
};

var dispatchMiddleware = function dispatchMiddleware(dispatch) {
  return function (action) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    dispatch.apply(void 0, [action].concat(args));

    if (action.type === actionTypes.start && typeof action.payload === "function") {
      action.payload();
    }
  };
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * createInstance allows you to create instances of Async that are bound to a specific promise.
 * A unique instance also uses its own React context for better nesting capability.
 */


var createInstance = function createInstance() {
  var defaultProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var displayName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Async";

  var _React$createContext = _react.default.createContext(),
      Consumer = _React$createContext.Consumer,
      Provider = _React$createContext.Provider;

  var Async =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Async, _React$Component);

    function Async(props) {
      var _this;

      _classCallCheck(this, Async);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Async).call(this, props));
      _this.start = _this.start.bind(_assertThisInitialized(_this));
      _this.load = _this.load.bind(_assertThisInitialized(_this));
      _this.run = _this.run.bind(_assertThisInitialized(_this));
      _this.cancel = _this.cancel.bind(_assertThisInitialized(_this));
      _this.onResolve = _this.onResolve.bind(_assertThisInitialized(_this));
      _this.onReject = _this.onReject.bind(_assertThisInitialized(_this));
      _this.setData = _this.setData.bind(_assertThisInitialized(_this));
      _this.setError = _this.setError.bind(_assertThisInitialized(_this));
      var promise = props.promise;
      var promiseFn = props.promiseFn || defaultProps.promiseFn;
      var initialValue = props.initialValue || defaultProps.initialValue;
      _this.mounted = false;
      _this.counter = 0;
      _this.args = [];
      _this.abortController = {
        abort: function abort() {}
      };
      _this.state = _objectSpread$1({}, init({
        initialValue: initialValue,
        promise: promise,
        promiseFn: promiseFn
      }), {
        cancel: _this.cancel,
        run: _this.run,
        reload: function reload() {
          var _this2;

          _this.load();

          (_this2 = _this).run.apply(_this2, _toConsumableArray(_this.args));
        },
        setData: _this.setData,
        setError: _this.setError
      });

      var _reducer = props.reducer || defaultProps.reducer;

      var _dispatcher = props.dispatcher || defaultProps.dispatcher;

      var reducer$1 = _reducer ? function (state, action) {
        return _reducer(state, action, reducer);
      } : reducer;
      var dispatch = dispatchMiddleware(function (action, callback) {
        _this.setState(function (state) {
          return reducer$1(state, action);
        }, callback);
      });
      _this.dispatch = _dispatcher ? function (action) {
        return _dispatcher(action, dispatch, props);
      } : dispatch;
      return _this;
    }

    _createClass(Async, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.mounted = true;

        if (this.props.promise || !this.state.initialValue) {
          this.load();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props = this.props,
            watch = _this$props.watch,
            _this$props$watchFn = _this$props.watchFn,
            watchFn = _this$props$watchFn === void 0 ? defaultProps.watchFn : _this$props$watchFn,
            promise = _this$props.promise,
            promiseFn = _this$props.promiseFn;
        if (watch !== prevProps.watch) this.load();
        if (watchFn && watchFn(_objectSpread$1({}, defaultProps, this.props), _objectSpread$1({}, defaultProps, prevProps))) this.load();

        if (promise !== prevProps.promise) {
          if (promise) this.load();else this.cancel();
        }

        if (promiseFn !== prevProps.promiseFn) {
          if (promiseFn) this.load();else this.cancel();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.cancel();
        this.mounted = false;
      }
    }, {
      key: "getMeta",
      value: function getMeta(meta) {
        return _objectSpread$1({
          counter: this.counter
        }, meta);
      }
    }, {
      key: "start",
      value: function start(promiseFn) {
        var _this3 = this;

        if ("AbortController" in window) {
          this.abortController.abort();
          this.abortController = new window.AbortController();
        }

        this.counter++;
        return new Promise(function (resolve, reject) {
          if (!_this3.mounted) return;

          var executor = function executor() {
            return promiseFn().then(resolve, reject);
          };

          _this3.dispatch({
            type: actionTypes.start,
            payload: executor,
            meta: _this3.getMeta()
          });
        });
      }
    }, {
      key: "load",
      value: function load() {
        var _this4 = this;

        var promise = this.props.promise;

        if (promise) {
          return this.start(function () {
            return promise;
          }).then(this.onResolve(this.counter), this.onReject(this.counter));
        }

        var promiseFn = this.props.promiseFn || defaultProps.promiseFn;

        if (promiseFn) {
          var props = _objectSpread$1({}, defaultProps, this.props);

          return this.start(function () {
            return promiseFn(props, _this4.abortController);
          }).then(this.onResolve(this.counter), this.onReject(this.counter));
        }
      }
    }, {
      key: "run",
      value: function run() {
        var _this5 = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var deferFn = this.props.deferFn || defaultProps.deferFn;

        if (deferFn) {
          this.args = args;

          var props = _objectSpread$1({}, defaultProps, this.props);

          return this.start(function () {
            return deferFn(args, props, _this5.abortController);
          }).then(this.onResolve(this.counter), this.onReject(this.counter));
        }
      }
    }, {
      key: "cancel",
      value: function cancel() {
        this.counter++;
        this.abortController.abort();
        this.mounted && this.dispatch({
          type: actionTypes.cancel,
          meta: this.getMeta()
        });
      }
    }, {
      key: "onResolve",
      value: function onResolve(counter) {
        var _this6 = this;

        return function (data) {
          if (_this6.counter === counter) {
            var onResolve = _this6.props.onResolve || defaultProps.onResolve;

            _this6.setData(data, function () {
              return onResolve && onResolve(data);
            });
          }

          return data;
        };
      }
    }, {
      key: "onReject",
      value: function onReject(counter) {
        var _this7 = this;

        return function (error) {
          if (_this7.counter === counter) {
            var onReject = _this7.props.onReject || defaultProps.onReject;

            _this7.setError(error, function () {
              return onReject && onReject(error);
            });
          }

          return error;
        };
      }
    }, {
      key: "setData",
      value: function setData(data, callback) {
        this.mounted && this.dispatch({
          type: actionTypes.fulfill,
          payload: data,
          meta: this.getMeta()
        }, callback);
        return data;
      }
    }, {
      key: "setError",
      value: function setError(error, callback) {
        this.mounted && this.dispatch({
          type: actionTypes.reject,
          payload: error,
          error: true,
          meta: this.getMeta()
        }, callback);
        return error;
      }
    }, {
      key: "render",
      value: function render() {
        var children = this.props.children;

        if (typeof children === "function") {
          return _react.default.createElement(Provider, {
            value: this.state
          }, children(this.state));
        }

        if (children !== undefined && children !== null) {
          return _react.default.createElement(Provider, {
            value: this.state
          }, children);
        }

        return null;
      }
    }]);

    return Async;
  }(_react.default.Component);

  if (propTypes) Async.propTypes = propTypes.Async;

  var AsyncInitial = function AsyncInitial(props) {
    return _react.default.createElement(Consumer, null, function (st) {
      return _react.default.createElement(Initial, _extends({}, props, {
        state: st
      }));
    });
  };

  var AsyncPending = function AsyncPending(props) {
    return _react.default.createElement(Consumer, null, function (st) {
      return _react.default.createElement(Pending, _extends({}, props, {
        state: st
      }));
    });
  };

  var AsyncFulfilled = function AsyncFulfilled(props) {
    return _react.default.createElement(Consumer, null, function (st) {
      return _react.default.createElement(Fulfilled, _extends({}, props, {
        state: st
      }));
    });
  };

  var AsyncRejected = function AsyncRejected(props) {
    return _react.default.createElement(Consumer, null, function (st) {
      return _react.default.createElement(Rejected, _extends({}, props, {
        state: st
      }));
    });
  };

  var AsyncSettled = function AsyncSettled(props) {
    return _react.default.createElement(Consumer, null, function (st) {
      return _react.default.createElement(Settled, _extends({}, props, {
        state: st
      }));
    });
  };

  AsyncInitial.displayName = "".concat(displayName, ".Initial");
  AsyncPending.displayName = "".concat(displayName, ".Pending");
  AsyncFulfilled.displayName = "".concat(displayName, ".Fulfilled");
  AsyncRejected.displayName = "".concat(displayName, ".Rejected");
  AsyncSettled.displayName = "".concat(displayName, ".Settled");
  Async.displayName = displayName;
  Async.Initial = AsyncInitial;
  Async.Pending = AsyncPending;
  Async.Loading = AsyncPending; // alias

  Async.Fulfilled = AsyncFulfilled;
  Async.Resolved = AsyncFulfilled; // alias

  Async.Rejected = AsyncRejected;
  Async.Settled = AsyncSettled;
  return Async;
};

exports.createInstance = createInstance;
var Async = createInstance();

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$2(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var noop = function noop() {};

var useAsync = function useAsync(arg1, arg2) {
  var options = typeof arg1 === "function" ? _objectSpread$2({}, arg2, {
    promiseFn: arg1
  }) : arg1;
  var counter = (0, _react.useRef)(0);
  var isMounted = (0, _react.useRef)(true);
  var lastArgs = (0, _react.useRef)(undefined);
  var prevOptions = (0, _react.useRef)(undefined);
  var abortController = (0, _react.useRef)({
    abort: noop
  });
  var reducer$1 = options.reducer,
      dispatcher = options.dispatcher;

  var _useReducer = (0, _react.useReducer)(reducer$1 ? function (state, action) {
    return reducer$1(state, action, reducer);
  } : reducer, options, init),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      _dispatch = _useReducer2[1];

  var dispatch = dispatcher ? function (action) {
    return dispatcher(action, dispatchMiddleware(_dispatch), options);
  } : dispatchMiddleware(_dispatch);

  var getMeta = function getMeta(meta) {
    return _objectSpread$2({
      counter: counter.current
    }, meta);
  };

  var setData = function setData(data) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    if (isMounted.current) {
      dispatch({
        type: actionTypes.fulfill,
        payload: data,
        meta: getMeta()
      });
      callback();
    }

    return data;
  };

  var setError = function setError(error) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    if (isMounted.current) {
      dispatch({
        type: actionTypes.reject,
        payload: error,
        error: true,
        meta: getMeta()
      });
      callback();
    }

    return error;
  };

  var onResolve = options.onResolve,
      onReject = options.onReject;

  var handleResolve = function handleResolve(count) {
    return function (data) {
      return count === counter.current && setData(data, function () {
        return onResolve && onResolve(data);
      });
    };
  };

  var handleReject = function handleReject(count) {
    return function (error) {
      return count === counter.current && setError(error, function () {
        return onReject && onReject(error);
      });
    };
  };

  var start = function start(promiseFn) {
    if ("AbortController" in window) {
      abortController.current.abort();
      abortController.current = new window.AbortController();
    }

    counter.current++;
    return new Promise(function (resolve, reject) {
      if (!isMounted.current) return;

      var executor = function executor() {
        return promiseFn().then(resolve, reject);
      };

      dispatch({
        type: actionTypes.start,
        payload: executor,
        meta: getMeta()
      });
    });
  };

  var promise = options.promise,
      promiseFn = options.promiseFn,
      initialValue = options.initialValue;

  var load = function load() {
    if (promise) {
      return start(function () {
        return promise;
      }).then(handleResolve(counter.current), handleReject(counter.current));
    }

    var isPreInitialized = initialValue && counter.current === 0;

    if (promiseFn && !isPreInitialized) {
      return start(function () {
        return promiseFn(options, abortController.current);
      }).then(handleResolve(counter.current), handleReject(counter.current));
    }
  };

  var deferFn = options.deferFn;

  var run = function run() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (deferFn) {
      lastArgs.current = args;
      return start(function () {
        return deferFn(args, options, abortController.current);
      }).then(handleResolve(counter.current), handleReject(counter.current));
    }
  };

  var cancel = function cancel() {
    counter.current++;
    abortController.current.abort();
    isMounted.current && dispatch({
      type: actionTypes.cancel,
      meta: getMeta()
    });
  };

  var watch = options.watch,
      watchFn = options.watchFn;
  (0, _react.useEffect)(function () {
    if (watchFn && prevOptions.current && watchFn(options, prevOptions.current)) load();
  });
  (0, _react.useEffect)(function () {
    promise || promiseFn ? load() : cancel();
  }, [promise, promiseFn, watch]);
  (0, _react.useEffect)(function () {
    return function () {
      return isMounted.current = false;
    };
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      return abortController.current.abort();
    };
  }, []);
  (0, _react.useEffect)(function () {
    return (prevOptions.current = options) && undefined;
  });
  (0, _react.useDebugValue)(state, function (_ref2) {
    var status = _ref2.status;
    return "[".concat(counter.current, "] ").concat(status);
  });
  return (0, _react.useMemo)(function () {
    return _objectSpread$2({}, state, {
      cancel: cancel,
      run: run,
      reload: function reload() {
        return lastArgs.current ? run.apply(void 0, _toConsumableArray(lastArgs.current)) : load();
      },
      setData: setData,
      setError: setError
    });
  }, [state, deferFn, onResolve, onReject, dispatcher, reducer$1]);
};

var parseResponse = function parseResponse(accept, json) {
  return function (res) {
    if (!res.ok) return Promise.reject(res);
    if (json === false) return res;
    if (json === true || accept === "application/json") return res.json();
    return res;
  };
};

var useAsyncFetch = function useAsyncFetch(input, init) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var defer = _ref.defer,
      json = _ref.json,
      options = _objectWithoutProperties(_ref, ["defer", "json"]);

  var method = input.method || init && init.method;
  var headers = input.headers || init && init.headers || {};
  var accept = headers["Accept"] || headers["accept"] || headers.get && headers.get("accept");

  var doFetch = function doFetch(input, init) {
    return window.fetch(input, init).then(parseResponse(accept, json));
  };

  var isDefer = defer === true || ~["POST", "PUT", "PATCH", "DELETE"].indexOf(method);
  var fn = defer === false || !isDefer ? "promiseFn" : "deferFn";
  var state = useAsync(_objectSpread$2({}, options, _defineProperty2({}, fn, (0, _react.useCallback)(function (_, props, ctrl) {
    return doFetch(input, _objectSpread$2({
      signal: ctrl ? ctrl.signal : props.signal
    }, init));
  }, [JSON.stringify(input), JSON.stringify(init)]))));
  (0, _react.useDebugValue)(state, function (_ref3) {
    var counter = _ref3.counter,
        status = _ref3.status;
    return "[".concat(counter, "] ").concat(status);
  });
  return state;
};

var unsupported = function unsupported() {
  throw new Error("useAsync requires React v16.8 or up. Upgrade your React version or use the <Async> component instead.");
};

var useAsync$1 = _react.useEffect ? useAsync : unsupported;
exports.useAsync = useAsync$1;
var useFetch = _react.useEffect ? useAsyncFetch : unsupported;
exports.useFetch = useFetch;
var _default = Async;
exports.default = _default;