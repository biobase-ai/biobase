"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserError = exports.EmptySqlError = exports.EmptyResponseError = exports.ContextLengthError = exports.ApplicationError = void 0;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var ApplicationError = exports.ApplicationError = /*#__PURE__*/function (_Error) {
  function ApplicationError(message) {
    var _this;
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, ApplicationError);
    _this = _callSuper(this, ApplicationError, [message]);
    _this.data = data;
    return _this;
  }
  _inherits(ApplicationError, _Error);
  return _createClass(ApplicationError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var ContextLengthError = exports.ContextLengthError = /*#__PURE__*/function (_ApplicationError) {
  function ContextLengthError() {
    _classCallCheck(this, ContextLengthError);
    return _callSuper(this, ContextLengthError, ['LLM context length exceeded']);
  }
  _inherits(ContextLengthError, _ApplicationError);
  return _createClass(ContextLengthError);
}(ApplicationError);
var EmptyResponseError = exports.EmptyResponseError = /*#__PURE__*/function (_ApplicationError2) {
  function EmptyResponseError() {
    _classCallCheck(this, EmptyResponseError);
    return _callSuper(this, EmptyResponseError, ['LLM API response succeeded but returned nothing']);
  }
  _inherits(EmptyResponseError, _ApplicationError2);
  return _createClass(EmptyResponseError);
}(ApplicationError);
var EmptySqlError = exports.EmptySqlError = /*#__PURE__*/function (_ApplicationError3) {
  function EmptySqlError() {
    _classCallCheck(this, EmptySqlError);
    return _callSuper(this, EmptySqlError, ['LLM did not generate any SQL']);
  }
  _inherits(EmptySqlError, _ApplicationError3);
  return _createClass(EmptySqlError);
}(ApplicationError);
var UserError = exports.UserError = /*#__PURE__*/function (_ApplicationError4) {
  function UserError() {
    _classCallCheck(this, UserError);
    return _callSuper(this, UserError, arguments);
  }
  _inherits(UserError, _ApplicationError4);
  return _createClass(UserError);
}(ApplicationError);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBcHBsaWNhdGlvbkVycm9yIiwiZXhwb3J0cyIsIl9FcnJvciIsIm1lc3NhZ2UiLCJfdGhpcyIsImRhdGEiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfY2xhc3NDYWxsQ2hlY2siLCJfY2FsbFN1cGVyIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwiX3dyYXBOYXRpdmVTdXBlciIsIkVycm9yIiwiQ29udGV4dExlbmd0aEVycm9yIiwiX0FwcGxpY2F0aW9uRXJyb3IiLCJFbXB0eVJlc3BvbnNlRXJyb3IiLCJfQXBwbGljYXRpb25FcnJvcjIiLCJFbXB0eVNxbEVycm9yIiwiX0FwcGxpY2F0aW9uRXJyb3IzIiwiVXNlckVycm9yIiwiX0FwcGxpY2F0aW9uRXJyb3I0Il0sInNvdXJjZXMiOlsiLi4vc3JjL2Vycm9ycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwbGljYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHB1YmxpYyBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cbiAgKSB7XG4gICAgc3VwZXIobWVzc2FnZSlcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29udGV4dExlbmd0aEVycm9yIGV4dGVuZHMgQXBwbGljYXRpb25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdMTE0gY29udGV4dCBsZW5ndGggZXhjZWVkZWQnKVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbXB0eVJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBBcHBsaWNhdGlvbkVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ0xMTSBBUEkgcmVzcG9uc2Ugc3VjY2VlZGVkIGJ1dCByZXR1cm5lZCBub3RoaW5nJylcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW1wdHlTcWxFcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignTExNIGRpZCBub3QgZ2VuZXJhdGUgYW55IFNRTCcpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVzZXJFcnJvciBleHRlbmRzIEFwcGxpY2F0aW9uRXJyb3Ige31cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFhQSxnQkFBZ0IsR0FBQUMsT0FBQSxDQUFBRCxnQkFBQSwwQkFBQUUsTUFBQTtFQUMzQixTQUFBRixpQkFDRUcsT0FBZSxFQUVmO0lBQUEsSUFBQUMsS0FBQTtJQUFBLElBRE9DLElBQXlCLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLENBQUMsQ0FBQztJQUFBRyxlQUFBLE9BQUFULGdCQUFBO0lBRXJDSSxLQUFBLEdBQUFNLFVBQUEsT0FBQVYsZ0JBQUEsR0FBTUcsT0FBTztJQUFDQyxLQUFBLENBRlBDLElBQXlCLEdBQXpCQSxJQUF5QjtJQUFBLE9BQUFELEtBQUE7RUFHbEM7RUFBQ08sU0FBQSxDQUFBWCxnQkFBQSxFQUFBRSxNQUFBO0VBQUEsT0FBQVUsWUFBQSxDQUFBWixnQkFBQTtBQUFBLGVBQUFhLGdCQUFBLENBTm1DQyxLQUFLO0FBQUEsSUFTOUJDLGtCQUFrQixHQUFBZCxPQUFBLENBQUFjLGtCQUFBLDBCQUFBQyxpQkFBQTtFQUM3QixTQUFBRCxtQkFBQSxFQUFjO0lBQUFOLGVBQUEsT0FBQU0sa0JBQUE7SUFBQSxPQUFBTCxVQUFBLE9BQUFLLGtCQUFBLEdBQ04sNkJBQTZCO0VBQ3JDO0VBQUNKLFNBQUEsQ0FBQUksa0JBQUEsRUFBQUMsaUJBQUE7RUFBQSxPQUFBSixZQUFBLENBQUFHLGtCQUFBO0FBQUEsRUFIcUNmLGdCQUFnQjtBQUFBLElBTTNDaUIsa0JBQWtCLEdBQUFoQixPQUFBLENBQUFnQixrQkFBQSwwQkFBQUMsa0JBQUE7RUFDN0IsU0FBQUQsbUJBQUEsRUFBYztJQUFBUixlQUFBLE9BQUFRLGtCQUFBO0lBQUEsT0FBQVAsVUFBQSxPQUFBTyxrQkFBQSxHQUNOLGlEQUFpRDtFQUN6RDtFQUFDTixTQUFBLENBQUFNLGtCQUFBLEVBQUFDLGtCQUFBO0VBQUEsT0FBQU4sWUFBQSxDQUFBSyxrQkFBQTtBQUFBLEVBSHFDakIsZ0JBQWdCO0FBQUEsSUFNM0NtQixhQUFhLEdBQUFsQixPQUFBLENBQUFrQixhQUFBLDBCQUFBQyxrQkFBQTtFQUN4QixTQUFBRCxjQUFBLEVBQWM7SUFBQVYsZUFBQSxPQUFBVSxhQUFBO0lBQUEsT0FBQVQsVUFBQSxPQUFBUyxhQUFBLEdBQ04sOEJBQThCO0VBQ3RDO0VBQUNSLFNBQUEsQ0FBQVEsYUFBQSxFQUFBQyxrQkFBQTtFQUFBLE9BQUFSLFlBQUEsQ0FBQU8sYUFBQTtBQUFBLEVBSGdDbkIsZ0JBQWdCO0FBQUEsSUFNdENxQixTQUFTLEdBQUFwQixPQUFBLENBQUFvQixTQUFBLDBCQUFBQyxrQkFBQTtFQUFBLFNBQUFELFVBQUE7SUFBQVosZUFBQSxPQUFBWSxTQUFBO0lBQUEsT0FBQVgsVUFBQSxPQUFBVyxTQUFBLEVBQUFmLFNBQUE7RUFBQTtFQUFBSyxTQUFBLENBQUFVLFNBQUEsRUFBQUMsa0JBQUE7RUFBQSxPQUFBVixZQUFBLENBQUFTLFNBQUE7QUFBQSxFQUFTckIsZ0JBQWdCIiwiaWdub3JlTGlzdCI6W119