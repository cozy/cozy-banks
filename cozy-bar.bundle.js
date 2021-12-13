(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cozy-bar"],{

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/format.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/format.js ***!
  \*********************************************************************************************************/
/*! exports provided: initFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFormat", function() { return initFormat; });
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/index.js");



var getWarningMessage = function getWarningMessage(lang) {
  return "The \"".concat(lang, "\" locale isn't supported by date-fns. or has not been included in the build. Check if you have configured a ContextReplacementPlugin that is too restrictive.");
};

var initFormat = function initFormat(lang) {
  var defaultLang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_LANG"];
  var locales = {};

  try {
    locales[defaultLang] = __webpack_require__("./node_modules/date-fns/locale sync recursive (en|fr|es)\\/index\\.js")("./".concat(defaultLang, "/index.js"));
  } catch (err) {
    console.warn(getWarningMessage(defaultLang));
  }

  if (lang && lang !== defaultLang) {
    try {
      locales[lang] = __webpack_require__("./node_modules/date-fns/locale sync recursive (en|fr|es)\\/index\\.js")("./".concat(lang, "/index.js"));
    } catch (e) {
      console.warn(getWarningMessage(lang));
    }
  }

  return function (date, formatStr) {
    return date_fns_format__WEBPACK_IMPORTED_MODULE_0___default()(date, formatStr, {
      locale: locales[lang]
    });
  };
};

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/index.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/index.js ***!
  \********************************************************************************************************/
/*! exports provided: DEFAULT_LANG, I18nContext, I18n, translate, useI18n, createUseI18n, initTranslation, extend, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LANG", function() { return DEFAULT_LANG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18nContext", function() { return I18nContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18n", function() { return I18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useI18n", function() { return useI18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUseI18n", function() { return createUseI18n; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! node-polyglot */ "./node_modules/node-polyglot/index.js");
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var cozy_ui_transpiled_react_I18n_translation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n/translation */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/translation.js");
/* harmony import */ var cozy_ui_transpiled_react_I18n_format__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n/format */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/format.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initTranslation", function() { return cozy_ui_transpiled_react_I18n_translation__WEBPACK_IMPORTED_MODULE_11__["initTranslation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return cozy_ui_transpiled_react_I18n_translation__WEBPACK_IMPORTED_MODULE_11__["extend"]; });

/**
 * Provides an I18n helper using a Higher Order Component.
 */















var DEFAULT_LANG = 'en';
var I18nContext = react__WEBPACK_IMPORTED_MODULE_8___default.a.createContext(); // Provider root component

var I18n = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(I18n, _Component);

  function I18n(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, I18n);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(I18n).call(this, props));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "UNSAFE_componentWillReceiveProps", function (nextProps) {
      if (nextProps.lang !== _this.props.lang) {
        _this.init(nextProps);
      }
    });

    _this.init(_this.props);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(I18n, [{
    key: "init",
    value: function init(props) {
      var polyglot = props.polyglot,
          lang = props.lang,
          dictRequire = props.dictRequire,
          context = props.context,
          defaultLang = props.defaultLang;
      this.translator = polyglot || Object(cozy_ui_transpiled_react_I18n_translation__WEBPACK_IMPORTED_MODULE_11__["initTranslation"])(lang, dictRequire, context, defaultLang);
      this.format = Object(cozy_ui_transpiled_react_I18n_format__WEBPACK_IMPORTED_MODULE_12__["initFormat"])(lang, defaultLang);
      this.t = this.translator.t.bind(this.translator);
      this.contextValue = this.getContextValue(props);
    }
  }, {
    key: "getContextValue",
    value: function getContextValue(props) {
      return {
        t: this.t,
        f: this.format,
        lang: (props || this.props).lang
      };
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return this.contextValue;
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(I18nContext.Provider, {
        value: this.contextValue
      }, this.props.children);
    }
  }]);

  return I18n;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);
I18n.propTypes = {
  lang: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string.isRequired,
  // current language.
  polyglot: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object,
  // A polyglot instance.
  dictRequire: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  // A callback to load locales.
  context: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  // current context.
  defaultLang: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string // default language. By default is 'en'

};
I18n.defaultProps = {
  defaultLang: DEFAULT_LANG
};
I18n.childContextTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  f: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  lang: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string
}; // higher order decorator for components that need `t` and/or `f`

var translate = function translate() {
  return function (WrappedComponent) {
    var Wrapper = function Wrapper(props) {
      var i18nContext = Object(react__WEBPACK_IMPORTED_MODULE_8__["useContext"])(I18nContext);
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        t: i18nContext && i18nContext.t,
        f: i18nContext && i18nContext.f,
        lang: i18nContext && i18nContext.lang
      }));
    };

    Wrapper.displayName = "withI18n(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
    return Wrapper;
  };
};
var useI18n = function useI18n() {
  return Object(react__WEBPACK_IMPORTED_MODULE_8__["useContext"])(I18nContext);
};
var createUseI18n = function createUseI18n(locales) {
  return function () {
    var _ref = useI18n() || {
      lang: DEFAULT_LANG
    },
        lang = _ref.lang;

    return Object(react__WEBPACK_IMPORTED_MODULE_8__["useMemo"])(function () {
      var polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_10___default.a({
        lang: lang,
        phrases: locales[lang]
      });
      var f = Object(cozy_ui_transpiled_react_I18n_format__WEBPACK_IMPORTED_MODULE_12__["initFormat"])(lang);
      var t = polyglot.t.bind(polyglot);
      return {
        t: t,
        f: f,
        lang: lang
      };
    }, [lang]);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (I18n);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/translation.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/translation.js ***!
  \**************************************************************************************************************/
/*! exports provided: _polyglot, initTranslation, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_polyglot", function() { return _polyglot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTranslation", function() { return initTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-polyglot */ "./node_modules/node-polyglot/index.js");
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/index.js");


var _polyglot;
var initTranslation = function initTranslation(lang, dictRequire, context) {
  var defaultLang = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_LANG"];
  _polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_0___default.a({
    phrases: dictRequire(defaultLang),
    locale: defaultLang
  }); // Load global locales

  if (lang && lang !== defaultLang) {
    try {
      var dict = dictRequire(lang);

      _polyglot.extend(dict);

      _polyglot.locale(lang);
    } catch (e) {
      console.warn("The dict phrases for \"".concat(lang, "\" can't be loaded"));
    }
  } // Load context locales


  if (context) {
    try {
      var _dict = dictRequire(lang, context);

      _polyglot.extend(_dict);
    } catch (e) {
      console.warn("The context ".concat(context, " cannot be loaded for lang ").concat(lang));
    }
  }

  return _polyglot;
};
var extend = function extend(dict) {
  return _polyglot && _polyglot.extend(dict);
};

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/icons-sprite.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/icons-sprite.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// GENERATED FILE, DO NOT EDIT THIS FILE BY HAND
// Use yarn sprite to regenerate
module.exports = "<svg><defs>\n        <path d=\"M164,261 C164,258.790861 165.790861,257 168,257 C170.209139,257 172,258.790861 172,261 C174.209139,261 176,262.790861 176,265 C176,267.209139 174.209139,269 172,269 L164,269 C161.790861,269 160,267.209139 160,265 C160,262.790861 161.790861,261 164,261 Z M165.146447,264.853553 C165.300738,265.007845 165.568968,265.222429 165.939431,265.434122 C166.557029,265.787035 167.249166,266 168,266 C168.750834,266 169.442971,265.787035 170.060569,265.434122 C170.431032,265.222429 170.699262,265.007845 170.853553,264.853553 C171.048816,264.658291 171.048816,264.341709 170.853553,264.146447 C170.658291,263.951184 170.341709,263.951184 170.146447,264.146447 C170.050738,264.242155 169.850218,264.402571 169.564431,264.565878 C169.088279,264.837965 168.561666,265 168,265 C167.438334,265 166.911721,264.837965 166.435569,264.565878 C166.149782,264.402571 165.949262,264.242155 165.853553,264.146447 C165.658291,263.951184 165.341709,263.951184 165.146447,264.146447 C164.951184,264.341709 164.951184,264.658291 165.146447,264.853553 Z\" id=\"path-1\"/>\n    \n    <path id=\"file-none-a\" d=\"M10,5.0999 L10,2 L4,2 C3.45,2 3,2.45 3,3 L3,13 C3,13.55 3.45,14 4,14 L12,14 C12.55,14 13,13.55 13,13 L13,6 L11.1001,6 L11.5,6.3999 L9.4,8.4999 L11.5,10.5999 L10.1,11.9999 L8,9.8999 L5.9,11.9999 L4.5,10.5999 L6.6,8.4999 L4.5,6.3999 L5.9,4.9999 L8,7.0999 L10,5.0999 Z M15,5 L15,15.004 C15,15.555 14.55,16 13.993,16 L2.007,16 C1.451,16 1,15.556 1,14.999 L1,1.001 C1,0.448 1.446,0 1.998,0 L10,0 L11,0 L15,4 L15,5 Z\"/>\n  \n    <path id=\"file-a\" d=\"M1,1.00087166 C1,0.448105505 1.4463114,0 1.99754465,0 L10,0 L10,5 L15,5 L15,15.0044225 C15,15.5542648 14.5500512,16 13.9931545,16 L2.00684547,16 C1.45078007,16 1,15.5553691 1,14.9991283 L1,1.00087166 Z M11,4 L11,0 L15,4 L11,4 Z\"/>\n  \n    <path id=\"hourglass-a\" d=\"M4.4997,13 C4.4997,12.453 4.8397,11.709 5.2597,11.349 L7.9997,9 L10.7407,11.349 C11.1637,11.712 11.4997,12.447 11.4997,13 L4.4997,13 Z M11.4997,3 C11.4997,3.547 11.1597,4.292 10.7407,4.651 L10.3327,5 L5.6667,5 L5.2597,4.651 C4.8357,4.288 4.4997,3.552 4.4997,3 L11.4997,3 Z M12.9997,13 C12.9997,12.443 12.6837,11.684 12.2937,11.294 L8.9997,8 L12.2937,4.706 C12.6837,4.316 12.9997,3.556 12.9997,3 L12.9997,2 C13.5507,2 13.9997,1.556 13.9997,1 C13.9997,0.448 13.5437,0 12.9977,0 L3.0027,0 C2.4487,0 1.9997,0.444 1.9997,1 C1.9997,1.552 2.4557,2 3.0027,2 L2.9997,3 C2.9997,3.552 3.3127,4.312 3.7057,4.706 L6.9997,8 L3.7057,11.294 C3.3127,11.688 2.9997,12.447 2.9997,13 L2.9997,14 C2.4557,14 1.9997,14.447 1.9997,15 C1.9997,15.556 2.4487,16 3.0027,16 L12.9977,16 C13.5437,16 13.9997,15.553 13.9997,15 C13.9997,14.443 13.5507,14 12.9977,14 L12.9997,13 Z\"/>\n  <path id=\"info\" d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM7 4a1 1 0 1 0 2 0 1 1 0 1 0-2 0zm1 2H6v2h1v4a1 1 0 0 0 1 1h2v-2H9V7a1 1 0 0 0-1-1z\"/>\n    <path id=\"pen\" d=\"M9.5 3.5l3 3L3.04 16H0v-2.97L9.5 3.5zM14.91.92l.18.17c.77.78.78 2.05 0 2.84L14.03 5 11 2 12.09.91a2 2 0 0 1 2.82 0z\"/>\n  \n        <path id=\"plus-small\" d=\"M4 4V1a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2H6v3a1 1 0 1 1-2 0V6H1a1 1 0 1 1 0-2h3z\"/>\n    \n    <polygon id=\"plus-a\" points=\"7 0 9 0 9 7 16 7 16 9 9 9 9 16 7 16 7 9 0 9 0 7 7 7\"/>\n  </defs><symbol id=\"bottom-select\" viewBox=\"0 0 24 24\">\n  <g fill=\"#95999d\" fill-rule=\"evenodd\" transform=\"translate(12.285714, 12.000000) rotate(90.000000) translate(-12.285714, -12.000000)\">\n    <path d=\"M6.46026077,20.3174036 C5.84657974,20.9310847 5.84657974,21.9260582 6.46026077,22.5397392 C7.0739418,23.1534203 8.06891534,23.1534203 8.68259637,22.5397392 L18.1111678,13.1111678 C18.7248488,12.4974868 18.7248488,11.5025132 18.1111678,10.8888322 L8.68259637,1.46026077 C8.06891534,0.846579743 7.0739418,0.846579743 6.46026077,1.46026077 C5.84657974,2.0739418 5.84657974,3.06891534 6.46026077,3.68259637 L14.7776644,12 L6.46026077,20.3174036 Z\"/>\n  </g>\n</symbol><symbol id=\"check-white\" viewBox=\"0 0 20 20\">\n    <path d=\"M3 10.019l4.523 4.523 9.541-9.541\" stroke=\"#FFF\" stroke-width=\"2\" fill=\"none\"/>\n</symbol><symbol id=\"cloud-broken\" viewBox=\"0 0 160 160\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#93BEF8\" d=\"M61.763 130.593l-3.174 7.933h59.045-.003c23.356 0 42.369-19.126 42.369-42.634 0-22.218-16.977-40.52-38.56-42.467a42.494 42.494 0 0 0-12.426-25.27 42.873 42.873 0 0 0-4.68-3.992l-3.156 7.892c7.203 6.153 11.888 15.26 12.12 25.41.055 2.478 2.056 4.446 4.499 4.446h.34c18.71 0 33.93 15.405 33.93 34.338 0 18.936-15.22 34.34-33.93 34.34h-.324l-.01.004h-56.04zm39.415-106.538l3.157-7.892C97.128 10.86 88.462 8 79.387 8 68.245 8 57.724 12.311 49.76 20.158c-6.974 6.868-11.308 15.77-12.438 25.4-9.568 1.135-18.411 5.5-25.239 12.514C4.29 66.086 0 76.677 0 87.89c0 23.511 19 42.637 42.366 42.637H58.59l3.174-7.933H42.537c-.097-.007-.194-.007-.292-.007l-.107.007h-.275c-18.71 0-33.93-15.405-33.93-34.341 0-18.507 14.863-33.905 33.132-34.331 2.406-.056 4.343-2.017 4.398-4.45.419-18.494 15.638-33.538 33.92-33.538 8.248 0 15.873 3.062 21.795 8.122z\"/><path stroke=\"#297EF1\" stroke-linecap=\"round\" stroke-width=\"8\" d=\"M50 156L110 4\"/></g></symbol><symbol id=\"cloud-sync\" viewBox=\"0 0 32 32\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <g>\n            <path fill=\"#B2D3FF\" d=\"M8.889 27.892c-4.91 0-8.889-3.98-8.889-8.889 0-4.353 3.129-7.975 7.26-8.74.765-4.13 4.387-7.26 8.74-7.26 4.353 0 7.975 3.13 8.74 7.26 4.131.765 7.26 4.387 7.26 8.74 0 4.822-3.839 8.747-8.627 8.885l-.262.004H8.89z\"/>\n            <path fill=\"#297EF1\" d=\"M22.052 19.17c.44.217.621.75.405 1.19-1.201 2.435-3.707 4.032-6.457 4.032-2.103 0-4.04-.962-5.373-2.471-.091.394-.427.693-.85.693-.49 0-.888-.398-.888-.889V18.17c0-.056.014-.106.023-.158.005-.024.004-.048.01-.071.028-.106.072-.201.132-.285l.022-.024c.056-.073.124-.134.198-.186.022-.016.044-.03.068-.043.184-.104.399-.142.613-.098.024.005.047.012.07.018.077.022.149.057.22.102.024.015.048.026.071.043.01.008.021.011.031.02l2.667 2.221c.377.314.427.875.113 1.252-.166.2-.4.301-.64.313.96.832 2.198 1.34 3.513 1.34 2.065 0 3.958-1.206 4.862-3.04.217-.44.75-.621 1.19-.404zm1.031-2.589c-.003.018-.002.036-.007.053-.03.105-.077.198-.138.28-.011.016-.024.026-.035.039-.055.067-.12.124-.19.171-.023.016-.043.03-.067.043-.092.05-.191.087-.295.103-.003 0-.005.002-.007.003-.008 0-.015-.003-.023-.002-.096.012-.194.004-.292-.018-.024-.005-.046-.01-.07-.018-.077-.024-.153-.062-.225-.11-.02-.014-.042-.023-.06-.038-.007-.005-.015-.006-.02-.012l-2.668-2.223c-.376-.313-.428-.874-.113-1.251.183-.22.449-.314.713-.305-.96-.838-2.22-1.348-3.586-1.348-2.103 0-4.007 1.213-4.89 3.06-.21.444-.741.631-1.184.42-.443-.211-.631-.742-.42-1.184C10.682 11.78 13.21 10.17 16 10.17c2.127 0 4.061.93 5.385 2.412.11-.364.436-.634.837-.634.49 0 .889.398.889.888v3.556c0 .068-.014.128-.028.19z\"/>\n        </g>\n    </g>\n</symbol><symbol id=\"cozy-logo\" viewBox=\"0 0 101 30\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <path d=\"M0-5h101v40H0z\"/>\n        <path fill=\"#297EF1\" d=\"M29.408 30H10.592C4.75 30 0 25.317 0 19.56c0-2.745 1.072-5.338 3.02-7.3a10.589 10.589 0 0 1 6.31-3.064 10.316 10.316 0 0 1 3.11-6.22A10.607 10.607 0 0 1 19.847 0a10.61 10.61 0 0 1 7.406 2.976 10.324 10.324 0 0 1 3.107 6.187C35.756 9.64 40 14.121 40 19.561 40 25.317 35.247 30 29.408 30zm-.226-2.5h.079c4.543 0 8.239-3.612 8.239-8.05 0-4.438-3.696-8.048-8.239-8.048h-.083a1.08 1.08 0 0 1-1.092-1.043C27.983 6.025 24.289 2.5 19.85 2.5c-4.44 0-8.135 3.526-8.237 7.86a1.08 1.08 0 0 1-1.068 1.044c-4.436.1-8.045 3.709-8.045 8.047 0 4.438 3.696 8.049 8.239 8.049h.067l.026-.002c.024 0 .047 0 .07.002H29.183zm-3.127-8.333v-.002c.199.12.255.366.125.55a.453.453 0 0 1-.594.116 2.329 2.329 0 0 1-.485-.387c-1.448 1.204-3.28 1.806-5.11 1.806-1.827 0-3.654-.6-5.1-1.798a2.31 2.31 0 0 1-.476.378.455.455 0 0 1-.595-.115c-.13-.183-.074-.428.125-.549.732-.438.767-1.247.767-1.279.008-.217.206-.393.44-.386.235.005.423.185.419.402 0 .03-.013.414-.214.866 2.603 2.255 6.684 2.252 9.282-.014-.196-.446-.208-.824-.21-.853-.005-.217.184-.398.422-.402.238-.003.432.169.437.388.002.035.038.84.767 1.279zm33.222-4.905a1.405 1.405 0 0 1-.227.227.516.516 0 0 1-.319.085.756.756 0 0 1-.436-.162 5.113 5.113 0 0 0-1.404-.702c-.325-.109-.725-.163-1.202-.163-.624 0-1.174.113-1.651.338a3.179 3.179 0 0 0-1.19.962c-.316.416-.556.923-.721 1.521a7.592 7.592 0 0 0-.247 2.015c0 .771.087 1.458.26 2.06.173.603.42 1.11.741 1.521.32.412.71.724 1.17.937.46.212.97.318 1.534.318.546 0 .997-.067 1.352-.202.355-.134.65-.279.884-.435.234-.156.429-.301.585-.436.156-.134.316-.201.481-.201.208 0 .368.078.481.234l.728.936a4.903 4.903 0 0 1-1.02.949c-.378.26-.778.472-1.203.637a6.792 6.792 0 0 1-1.332.364 8.488 8.488 0 0 1-1.411.117 5.846 5.846 0 0 1-2.308-.455 5.228 5.228 0 0 1-1.858-1.326c-.525-.58-.939-1.293-1.242-2.139-.303-.845-.455-1.804-.455-2.879 0-.98.136-1.885.41-2.717a6.046 6.046 0 0 1 1.209-2.151 5.588 5.588 0 0 1 1.969-1.418c.78-.342 1.673-.513 2.678-.513.945 0 1.777.152 2.496.455.72.303 1.36.732 1.924 1.287l-.676.936zm8.814-2.678c.97 0 1.848.158 2.633.474a5.489 5.489 0 0 1 2.001 1.366c.55.593.973 1.308 1.268 2.145.295.836.442 1.774.442 2.814s-.147 1.98-.442 2.821c-.295.84-.717 1.556-1.267 2.145a5.527 5.527 0 0 1-2.002 1.358c-.785.317-1.662.475-2.633.475-.98 0-1.861-.158-2.645-.474a5.59 5.59 0 0 1-2.009-1.359c-.555-.59-.981-1.304-1.28-2.145-.3-.84-.449-1.781-.449-2.821 0-1.04.15-1.978.449-2.814a6.11 6.11 0 0 1 1.28-2.146 5.55 5.55 0 0 1 2.008-1.365c.785-.316 1.667-.474 2.646-.474zm0 11.622c1.248 0 2.18-.42 2.795-1.261.615-.84.923-2.024.923-3.549s-.308-2.71-.923-3.556c-.615-.845-1.547-1.267-2.795-1.267-1.265 0-2.208.422-2.828 1.267-.62.846-.929 2.03-.929 3.556 0 1.525.31 2.708.93 3.549.62.84 1.562 1.261 2.827 1.261zM86.46 12.858c0 .182-.032.36-.097.533-.066.173-.15.32-.254.442l-6.929 9.178h7.046V25H76.203v-1.066c0-.121.03-.266.091-.436.06-.169.147-.327.26-.474l6.968-9.243h-6.916v-1.989h9.854v1.066zm14.144-1.066l-7.332 17.043a1.07 1.07 0 0 1-.312.442c-.13.104-.32.156-.572.156h-1.885l2.418-5.265L87.5 11.792h2.21c.217 0 .386.052.507.156a.906.906 0 0 1 .26.351l3.354 7.93c.07.2.136.4.201.605a6.6 6.6 0 0 1 .163.604 14.609 14.609 0 0 1 .416-1.222l3.237-7.917a.84.84 0 0 1 .286-.364.729.729 0 0 1 .442-.143h2.028z\"/>\n    </g>\n</symbol><symbol id=\"cozy\" viewBox=\"0 0 52 52\">\n  <path fill=\"#297EF2\" fill-rule=\"evenodd\" d=\"M558.23098,44 L533.76902,44 C526.175046,44 520,37.756072 520,30.0806092 C520,26.4203755 521.393962,22.9628463 523.927021,20.3465932 C526.145918,18.0569779 529.020185,16.6317448 532.129554,16.2609951 C532.496769,13.1175003 533.905295,10.2113693 536.172045,7.96901668 C538.760238,5.40737823 542.179607,4 545.800788,4 C549.420929,4 552.841339,5.40737823 555.429532,7.96796639 C557.686919,10.2008665 559.091284,13.0912433 559.467862,16.2179336 C566.482405,16.8533543 572,22.8284102 572,30.0816594 C572,37.756072 565.820793,44 558.22994,44 L558.23098,44 Z M558.068077,40.9989547 L558.171599,40.9989547 C564.142748,40.9989547 569,36.0883546 569,30.0520167 C569,24.0167241 564.142748,19.1061239 558.171599,19.1061239 L558.062901,19.1061239 C557.28338,19.1061239 556.644649,18.478972 556.627051,17.6887604 C556.492472,11.7935317 551.63729,7 545.802791,7 C539.968291,7 535.111039,11.7956222 534.977495,17.690851 C534.959896,18.4664289 534.34187,19.0914904 533.573737,19.1092597 C527.743378,19.2451426 523,24.1536522 523,30.0530619 C523,36.0893999 527.857252,41 533.828401,41 L533.916395,41 L533.950557,40.9979094 C533.981614,40.9979094 534.01267,40.9979094 534.043727,41 L558.064971,41 L558.068077,40.9989547 Z M553.766421,29.2227318 C552.890676,28.6381003 552.847676,27.5643091 552.845578,27.5171094 C552.839285,27.2253301 552.606453,26.9957683 552.32118,27.0000592 C552.035908,27.0054228 551.809368,27.2467844 551.814612,27.5364185 C551.81671,27.5750363 551.831393,28.0792139 552.066323,28.6735 C548.949302,31.6942753 544.051427,31.698566 540.928113,28.6917363 C541.169336,28.0888684 541.185068,27.576109 541.185068,27.5374911 C541.190312,27.2478572 540.964821,27.0086409 540.681646,27.0011319 C540.401618,26.9925502 540.163541,27.2264027 540.154102,27.5160368 C540.154102,27.5589455 540.11215,28.6370275 539.234308,29.2216592 C538.995183,29.3825669 538.92806,29.7097461 539.08433,29.9532532 C539.182917,30.1077246 539.346529,30.1924694 539.516434,30.1924694 C539.612923,30.1924694 539.710461,30.1645787 539.797512,30.1066519 C540.023003,29.9564713 540.211786,29.7848363 540.370154,29.6024742 C542.104862,31.2008247 544.296845,32 546.488828,32 C548.686055,32 550.883282,31.1976066 552.621136,29.5917471 C552.780553,29.7762546 552.971434,29.9521804 553.203218,30.1066519 C553.289219,30.1645787 553.387806,30.1924694 553.484295,30.1924694 C553.652102,30.1924694 553.816763,30.1066519 553.916399,29.9521804 C554.07162,29.7076006 554.004497,29.3793488 553.766421,29.2205864 L553.766421,29.2227318 Z\" transform=\"translate(-520)\"/>\n</symbol><symbol id=\"cross-white\" viewBox=\"0 0 24 24\">\n  <path fill=\"#FFF\" fill-rule=\"evenodd\" d=\"M106.585786,44 L96.2928932,33.7071068 C95.9023689,33.3165825 95.9023689,32.6834175 96.2928932,32.2928932 C96.6834175,31.9023689 97.3165825,31.9023689 97.7071068,32.2928932 L108,42.5857864 L118.292893,32.2928932 C118.683418,31.9023689 119.316582,31.9023689 119.707107,32.2928932 C120.097631,32.6834175 120.097631,33.3165825 119.707107,33.7071068 L109.414214,44 L119.707107,54.2928932 C120.097631,54.6834175 120.097631,55.3165825 119.707107,55.7071068 C119.316582,56.0976311 118.683418,56.0976311 118.292893,55.7071068 L108,45.4142136 L97.7071068,55.7071068 C97.3165825,56.0976311 96.6834175,56.0976311 96.2928932,55.7071068 C95.9023689,55.3165825 95.9023689,54.6834175 96.2928932,54.2928932 L106.585786,44 Z\" transform=\"translate(-96 -32)\"/>\n</symbol><symbol id=\"dash-white\" viewBox=\"0 0 20 20\"><path d=\"M3.497 10h13.006\" stroke=\"#FFF\" stroke-width=\"2\"/></symbol><symbol id=\"device-browser\" viewBox=\"0 0 32 32\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <circle cx=\"16\" cy=\"16\" r=\"16\" fill=\"#D9DDE1\"/>\n        <path fill=\"#95999D\" d=\"M22.76 2.84l.3-1.202.089.044c.115.058.23.117.344.177l.335.184.33.19.338.207.325.209c.231.153.459.312.682.477l.261.198.317.251.359.3.237.208.264.242.238.228.246.245.163.17.221.237.273.306.188.22.314.386.167.217.248.336.189.268.183.271.25.39.19.317.086.149c.135.236.264.476.388.72l.18.368.133.287.166.382.156.387c.173.447.327.903.461 1.369l.032.114c-.575.89-1.613 1.055-2.356.605l-.12-.08-.838-.613c-.074-.055-.168-.072-.255-.05l-.063.024-1.075.551c-.003.006-.002.024.002.03l.3.111c.025.01.049.021.07.036.88.611.968 1.649.451 2.339l-.087.106-.758.852c-.502.563-1.342.71-2.01.37l-.13-.074-2.045-1.288c-.007-.005-.011-.007-.023-.002l-.01.008-.161.95v.012l.007.01 1.067.974c.55.502.678 1.291.331 1.929l-.081.134-1.697 2.51-.049.15-.148 3.609c-.014.36-.15.7-.386.973l-.107.113-2.316 2.215c-.316.303-.734.46-1.156.46-.23 0-.459-.046-.674-.14l-.159-.08-1.5-.859c-.353-.201-.616-.525-.74-.902l-.039-.143-.69-3.08-.663-1.739-.007-.01-.013-.005-3.03-.257c-.482-.041-.919-.287-1.198-.666l-.087-.131-1.724-2.902c-.16-.27-.236-.583-.22-.893l.016-.155.434-2.815c.056-.367.237-.697.513-.945l.124-.101 2.648-1.95c.423-.312.978-.404 1.48-.253l.149.052 2.524 1.029.04.013.043.007 3.411.363.207-.053 2.268-1.587.009-.013-.001-.015-.219-.477-.008-.01-.012-.004-6.61-.353c-.255-.014-.507-.086-.729-.21-.582-.326-.903-.955-.817-1.605.08-.599.489-1.096 1.06-1.303l.147-.046 1.918-.504.127-.07 2.376-2.19c.225-.207.509-.349.811-.408l.153-.022 3.652-.367c.01-.001.019-.008.02-.018z\"/>\n    </g>\n</symbol><symbol id=\"device-laptop\" viewBox=\"0 0 32 32\">\n  <g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(0 4)\">\n    <path fill=\"#32363F\" d=\"M2,21 L2,1.99456145 C2,0.892995579 2.89989752,0 3.99124431,0 L28.0087557,0 C29.1084896,0 30,0.90234375 30,1.99456145 L30,21 L2,21 Z\"/>\n    <rect width=\"24\" height=\"16\" x=\"4\" y=\"2\" fill=\"#5D6165\"/>\n    <path fill=\"#95999D\" d=\"M19,20.5 C19,20.7761424 18.7670975,21 18.4965773,21 L12.5034227,21 C12.22539,21 12,20.7680664 12,20.5 L12,20.5 C12,20.2238576 11.7709994,20 11.4996527,20 L0.500347316,20 C0.224013124,20 0,20.2150574 0,20.4904785 L0,22 C0,23.1045695 0.889261723,24 2.00174332,24 L29.9982567,24 C31.103789,24 32,23.1122704 32,22 L32,20.4904785 C32,20.2195947 31.7743607,20 31.506259,20 L19.493741,20 C19.2210554,20 19,20.2319336 19,20.5 L19,20.5 Z\"/>\n  </g>\n</symbol><symbol id=\"device-phone\" viewBox=\"0 0 32 32\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <path fill=\"#95999D\" d=\"M23.333 32H8.667C7.193 32 6 30.753 6 29.217V2.783C6 1.247 7.193 0 8.667 0h14.666C24.805 0 26 1.247 26 2.783v26.434C26 30.753 24.805 32 23.333 32z\"/>\n        <path fill=\"#F5F6F7\" fill-rule=\"nonzero\" d=\"M14 2.001a.5.5 0 1 1 0-1L18 1a.5.5 0 1 1 0 1l-4 .001z\"/>\n        <path fill=\"#F5F6F7\" d=\"M17.5 29.5a1.5 1.5 0 1 1-3.001-.001 1.5 1.5 0 0 1 3.001.001z\"/>\n        <path fill=\"#32363F\" d=\"M7 3h18v25H7z\"/>\n    </g>\n</symbol><symbol id=\"device-tablet\" viewBox=\"0 0 32 32\">\n    <g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(4)\">\n        <rect width=\"24\" height=\"32\" fill=\"#32363F\" rx=\"2\"/>\n        <path fill=\"#5D6165\" d=\"M2 3h20v26H2z\"/>\n        <path fill=\"#95999D\" fill-rule=\"nonzero\" d=\"M10 31.001a.5.5 0 1 1 0-1L14 30a.5.5 0 0 1 0 1l-4 .001zM11.5 1.501a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0z\"/>\n    </g>\n</symbol><symbol id=\"dots-white\" viewBox=\"0 0 16 16\">\n  <path fill=\"#FFFFFF\" fill-rule=\"evenodd\" d=\"M34,74 C35.1045695,74 36,73.1045695 36,72 C36,70.8954305 35.1045695,70 34,70 C32.8954305,70 32,70.8954305 32,72 C32,73.1045695 32.8954305,74 34,74 Z M46,74 C47.1045695,74 48,73.1045695 48,72 C48,70.8954305 47.1045695,70 46,70 C44.8954305,70 44,70.8954305 44,72 C44,73.1045695 44.8954305,74 46,74 Z M40,74 C41.1045695,74 42,73.1045695 42,72 C42,70.8954305 41.1045695,70 40,70 C38.8954305,70 38,70.8954305 38,72 C38,73.1045695 38.8954305,74 40,74 Z\" transform=\"translate(-32 -64)\"/>\n</symbol><symbol id=\"file-type-audio\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(1 1)\"><rect width=\"30\" height=\"30\" fill=\"#ACF6F7\" rx=\"2\"/><path fill=\"#0CCBD0\" d=\"M8 19.998c-1.105 0-2 .888-2 2 0 1.105.898 2 1.998 2H9c1.657 0 3-1.35 3-2.997v-7.679a.63.63 0 0 1 .492-.601l6.016-1.129c.272-.05.492.124.492.418v5.478c0 .282-.215.51-.49.51H17c-1.105 0-2 .904-2 1.997v-.179a2 2 0 0 0 1.998 1.997H18c1.657 0 3-1.349 3-2.993V7c0-.554-.445-.921-.976-.825L10.976 7.82C10.437 7.918 10 8.454 10 9v10.498c0 .276-.215.5-.49.5H8z\"/></g></symbol><symbol id=\"file-type-bin\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#D1D5DB\" d=\"M3 2.002C3 .896 3.89 0 4.997 0H22l7 7v22.996A2 2 0 0 1 27.003 32H4.997A1.995 1.995 0 0 1 3 29.998V2.002z\"/><path fill=\"#A3ACB8\" d=\"M21.5 0c-.276 0-.5.23-.5.5V8h7.5c.276 0 .5-.232.5-.5V7l-7-7h-.5z\"/><path fill=\"#4F5B69\" d=\"M7 15.568c0-.597.06-1.12.178-1.568.118-.449.285-.82.5-1.115.215-.295.473-.516.772-.664.3-.147.633-.221 1.001-.221.786 0 1.391.29 1.815.87.424.58.636 1.479.636 2.698 0 .602-.059 1.128-.177 1.577-.119.449-.286.822-.501 1.12-.215.298-.474.521-.776.669a2.265 2.265 0 0 1-1.006.22c-.792 0-1.397-.306-1.815-.918C7.209 17.623 7 16.734 7 15.568zm3.705 0a9.152 9.152 0 0 0-.019-.58l-2.292 2.191c.193.597.546.895 1.057.895.4 0 .708-.2.926-.6.219-.4.328-1.035.328-1.906zm-2.507 0a7.965 7.965 0 0 0 .018.55l2.283-2.192c-.187-.563-.54-.845-1.057-.845-.4 0-.707.202-.922.605-.215.402-.322 1.03-.322 1.882zm5.35 0c0-.597.06-1.12.179-1.568.118-.449.285-.82.5-1.115.215-.295.473-.516.772-.664.3-.147.633-.221 1.001-.221.786 0 1.39.29 1.815.87.424.58.636 1.479.636 2.698 0 .602-.06 1.128-.178 1.577-.118.449-.285.822-.5 1.12-.215.298-.474.521-.777.669a2.265 2.265 0 0 1-1.005.22c-.792 0-1.397-.306-1.815-.918-.418-.613-.627-1.502-.627-2.668zm3.706 0a9.153 9.153 0 0 0-.02-.58l-2.291 2.191c.193.597.546.895 1.057.895.4 0 .708-.2.926-.6.218-.4.328-1.035.328-1.906zm-2.508 0a7.965 7.965 0 0 0 .02.55l2.282-2.192c-.187-.563-.54-.845-1.057-.845-.4 0-.707.202-.922.605-.215.402-.323 1.03-.323 1.882zm5.988 2.368h1.431v-4.295l-1.235.993-.561-.786 2.133-1.71h.823v5.798h1.404v1.081h-3.995v-1.08zM7 24.413c0-.596.06-1.119.178-1.568.118-.449.285-.82.5-1.115.215-.295.473-.516.772-.664.3-.147.633-.22 1.001-.22.786 0 1.391.29 1.815.869.424.58.636 1.48.636 2.698 0 .603-.059 1.128-.177 1.577-.119.449-.286.822-.501 1.12-.215.299-.474.521-.776.669A2.265 2.265 0 0 1 9.442 28c-.792 0-1.397-.306-1.815-.919C7.209 26.468 7 25.58 7 24.413zm3.705 0a9.152 9.152 0 0 0-.019-.58l-2.292 2.192c.193.596.546.894 1.057.894.4 0 .708-.2.926-.6.219-.4.328-1.035.328-1.906zm-2.507 0a7.965 7.965 0 0 0 .018.55l2.283-2.192c-.187-.563-.54-.845-1.057-.845-.4 0-.707.202-.922.605-.215.403-.322 1.03-.322 1.882zm5.987 2.368h1.431v-4.295l-1.235.993-.56-.786 2.132-1.71h.824v5.798h1.403v1.081h-3.995v-1.08zm5.913-2.368c0-.596.059-1.119.177-1.568.119-.449.286-.82.501-1.115.215-.295.472-.516.772-.664.3-.147.633-.22 1-.22.787 0 1.392.29 1.816.869.424.58.636 1.48.636 2.698 0 .603-.06 1.128-.178 1.577-.118.449-.285.822-.5 1.12-.215.299-.474.521-.777.669A2.265 2.265 0 0 1 22.54 28c-.793 0-1.398-.306-1.815-.919-.418-.613-.627-1.502-.627-2.668zm3.704 0a9.152 9.152 0 0 0-.018-.58l-2.292 2.192c.193.596.545.894 1.057.894.399 0 .708-.2.926-.6.218-.4.327-1.035.327-1.906zm-2.507 0a7.965 7.965 0 0 0 .019.55l2.283-2.192c-.187-.563-.54-.845-1.057-.845-.4 0-.707.202-.922.605-.215.403-.323 1.03-.323 1.882z\"/></g></symbol><symbol id=\"file-type-code\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#E6D5FF\" d=\"M3 2.002C3 .896 3.89 0 4.997 0H22l7 7v22.996A2 2 0 0 1 27.003 32H4.997A1.995 1.995 0 0 1 3 29.998V2.002z\"/><path fill=\"#9C59FF\" d=\"M21.5 0c-.276 0-.5.23-.5.5V8h7.5c.276 0 .5-.232.5-.5V7l-7-7h-.5z\"/><g stroke=\"#9C59FF\" stroke-width=\"2\"><path stroke-linejoin=\"round\" d=\"M12 22l-4-4 4-4M20 22l4-4-4-4\"/><path d=\"M14 25l4-14\"/></g></g></symbol><symbol id=\"file-type-files\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#D1D5DB\" d=\"M3 2.002C3 .896 3.89 0 4.997 0H22l7 7v22.996A2 2 0 0 1 27.003 32H4.997A1.995 1.995 0 0 1 3 29.998V2.002z\"/><path fill=\"#A3ACB8\" d=\"M21.5 0c-.276 0-.5.23-.5.5V8h7.5c.276 0 .5-.232.5-.5V7l-7-7h-.5z\"/></g></symbol><symbol id=\"file-type-folder\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(0 2)\"><rect width=\"32\" height=\"26\" y=\"2\" fill=\"#B2D3FF\" rx=\"2\"/><path fill=\"#197BFF\" d=\"M0 .99C0 .445.45 0 1.007 0h11.986c.556 0 1.32.313 1.718.71l.578.58c.393.392 1.156.71 1.712.71h13.005C31.107 2 32 2.895 32 4H17c-.552 0-1.313.313-1.71.71l-.58.58c-.392.392-1.16.71-1.717.71H1.007A1.004 1.004 0 0 1 0 5.01V.99z\"/></g></symbol><symbol id=\"file-type-image\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(0 3)\"><rect width=\"32\" height=\"26\" fill=\"#8EE39B\" rx=\"2\"/><path fill=\"#1EC737\" d=\"M0 20l6.29-6.29a.999.999 0 0 1 1.416-.004L11 17l8.294-8.294a1.003 1.003 0 0 1 1.412 0L32 20v4.002C32 25.106 31.11 26 29.998 26H2.002A2.002 2.002 0 0 1 0 24.002V20z\"/><circle cx=\"8\" cy=\"7\" r=\"3\" fill=\"#FFF\"/><path stroke=\"#8EE39B\" d=\"M11 16l-5.5 5.5L11 16z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></symbol><symbol id=\"file-type-note\" viewBox=\"0 0 32 32\"><path d=\"M2 2a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z\" fill=\"#acf5f7\" fill-rule=\"evenodd\"/><path d=\"M8 8h14v2H8zm0 4h8v2H8zm0 4h14v2H8zm0 4h10v2H8zM1.5 4h2A1.54 1.54 0 0 1 5 5.5 1.54 1.54 0 0 1 3.5 7h-2A1.54 1.54 0 0 1 0 5.5 1.54 1.54 0 0 1 1.5 4zM1.5 11h2A1.54 1.54 0 0 1 5 12.5 1.54 1.54 0 0 1 3.5 14h-2A1.54 1.54 0 0 1 0 12.5 1.54 1.54 0 0 1 1.5 11zM1.5 18h2A1.54 1.54 0 0 1 5 19.5 1.54 1.54 0 0 1 3.5 21h-2A1.54 1.54 0 0 1 0 19.5 1.54 1.54 0 0 1 1.5 18zM1.5 25h2A1.54 1.54 0 0 1 5 26.5 1.54 1.54 0 0 1 3.5 28h-2A1.54 1.54 0 0 1 0 26.5 1.54 1.54 0 0 1 1.5 25zM31.4 18.4l-2.8-2.8a2 2 0 0 1 2.8 2.8zM30.7 19.1L20.8 29l-2.5.9a1 1 0 0 1-1.3-.6.85.85 0 0 1 0-.7l.9-2.5 9.9-9.9z\" fill=\"#0dcbcf\" fill-rule=\"evenodd\"/></symbol><symbol id=\"file-type-pdf\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#FCD0D5\" d=\"M3 2.002C3 .896 3.89 0 4.997 0H22l7 7v22.996A2 2 0 0 1 27.003 32H4.997A1.995 1.995 0 0 1 3 29.998V2.002z\"/><path fill=\"#F1132D\" d=\"M21.5 0c-.276 0-.5.23-.5.5V8h7.5c.276 0 .5-.232.5-.5V7l-7-7h-.5zM9 11h14v2H9v-2zm0 4h12v2H9v-2zm.066 4.784h1.904c.283 0 .548.028.796.084.248.056.464.15.648.28.184.13.33.304.436.52.107.216.16.481.16.796 0 .304-.055.568-.164.792-.11.224-.257.408-.444.552a1.89 1.89 0 0 1-.648.32 2.87 2.87 0 0 1-.784.104h-.728V25H9.066v-5.216zm1.832 2.512c.64 0 .96-.277.96-.832 0-.272-.081-.464-.244-.576-.163-.112-.401-.168-.716-.168h-.656v1.576h.656zm3.016-2.512h1.472c.4 0 .76.05 1.08.152.32.101.595.257.824.468.23.21.405.479.528.804.123.325.184.712.184 1.16 0 .448-.061.837-.184 1.168-.123.33-.296.604-.52.82a2.137 2.137 0 0 1-.804.484c-.312.107-.66.16-1.044.16h-1.536v-5.216zm1.4 4.264c.224 0 .427-.03.608-.088.181-.059.336-.153.464-.284.128-.13.228-.303.3-.516.072-.213.108-.477.108-.792 0-.31-.036-.57-.108-.78a1.263 1.263 0 0 0-.3-.504 1.092 1.092 0 0 0-.464-.268 2.152 2.152 0 0 0-.608-.08h-.224v3.312h.224zm3.68-4.264h3.288v.992H20.17v1.208h1.808v.992H20.17V25h-1.176v-5.216z\"/></g></symbol><symbol id=\"file-type-sheet\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#9FE6A2\" d=\"M3 2.002C3 .896 3.89 0 4.997 0H22l7 7v22.996A2 2 0 0 1 27.003 32H4.997A1.995 1.995 0 0 1 3 29.998V2.002z\"/><path fill=\"#0FC016\" d=\"M21.5 0c-.276 0-.5.23-.5.5V8h7.5c.276 0 .5-.232.5-.5V7l-7-7h-.5zM8 9h4v2H8V9zm0-4h4v2H8V5zm0 8h4v2H8v-2zm0 4h4v2H8v-2zm0 4h4v2H8v-2zm0 4h4v2H8v-2zm6-16h4v2h-4V9zm0-4h4v2h-4V5zm0 8h4v2h-4v-2zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2zm6-12h4v2h-4v-2zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2z\"/></g></symbol><symbol id=\"file-type-slide\" viewBox=\"0 0 32 32\">\n    <title>icons/files/presentation</title>\n    <g id=\"icons/files/presentation\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"file-02\" transform=\"translate(3.000000, 0.000000)\">\n            <path d=\"M0,2.00174332 C0,0.89621101 0.890925393,0 1.99742191,0 L19,0 L26,7 L26,29.9964051 C26,31.10296 25.1050211,32 24.0029953,32 L1.99700466,32 C0.89408944,32 0,31.1107383 0,29.9982567 L0,2.00174332 Z\" id=\"Rectangle-2\" fill=\"#FFDEC1\"/>\n            <path d=\"M18.5,8.57092175e-14 C18.2238576,1.33045111e-13 18,0.230796814 18,0.500435829 L18,8 L25.4995642,8 C25.7759472,8 26,7.76806641 26,7.5 L26,7 L19,0 L18.5,8.57092175e-14 Z\" id=\"Path-2\" fill=\"#FF9433\"/>\n        </g>\n        <path d=\"M22.9962158,24 L22.9962158,26 L12.9962158,26 L12.9962158,24 L22.9962158,24 Z M11,24 L11,26 L9,26 L9,24 L11,24 Z M22.9962158,20 L22.9962158,22 L12.9962158,22 L12.9962158,20 L22.9962158,20 Z M11,20 L11,22 L9,22 L9,20 L11,20 Z M16,10 L16,14 L20,14 C20,16.209139 18.209139,18 16,18 C13.790861,18 12,16.209139 12,14 C12,11.790861 13.790861,10 16,10 L16,10 Z M17,9 C19,9 21.0000002,11 21,13 L17,13 L17,9 L17,9 Z\" id=\"text\" fill=\"#FF9433\"/>\n    </g>\n</symbol><symbol id=\"file-type-text\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#B2D3FF\" d=\"M3 2.002C3 .896 3.89 0 4.997 0H22l7 7v22.996A2 2 0 0 1 27.003 32H4.997A1.995 1.995 0 0 1 3 29.998V2.002z\"/><path fill=\"#197BFF\" d=\"M21.5 0c-.276 0-.5.23-.5.5V8h7.5c.276 0 .5-.232.5-.5V7l-7-7h-.5zM9 11h14v2H9v-2zm0 4h12v2H9v-2zm0 4h14v2H9v-2zm0 4h10v2H9v-2z\"/></g></symbol><symbol id=\"file-type-video\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#FFC5CE\" d=\"M1 2.992C1 1.892 1.898 1 2.992 1h26.016C30.108 1 31 1.898 31 2.992v26.016c0 1.1-.898 1.992-1.992 1.992H2.992C1.892 31 1 30.102 1 29.008V2.992zm1 12.017C2 14.452 2.443 14 3.01 14h1.98c.558 0 1.01.443 1.01 1.01v1.98C6 17.549 5.557 18 4.99 18H3.01C2.451 18 2 17.557 2 16.99v-1.98zm24 0c0-.557.443-1.009 1.01-1.009h1.98c.558 0 1.01.443 1.01 1.01v1.98c0 .558-.443 1.01-1.01 1.01h-1.98c-.558 0-1.01-.443-1.01-1.01v-1.98zM2 9A1 1 0 0 1 3.01 8h1.98C5.549 8 6 8.444 6 9v3a1 1 0 0 1-1.01 1H3.01C2.451 13 2 12.556 2 12V9zm24 0A1 1 0 0 1 27.01 8h1.98c.558 0 1.01.444 1.01 1v3a1 1 0 0 1-1.01 1h-1.98c-.558 0-1.01-.444-1.01-1V9zM2 26A1 1 0 0 1 3.01 25h1.98c.558 0 1.01.444 1.01 1v3a1 1 0 0 1-1.01 1H3.01C2.451 30 2 29.556 2 29v-3zm24 0A1 1 0 0 1 27.01 25h1.98c.558 0 1.01.444 1.01 1v3a1 1 0 0 1-1.01 1h-1.98c-.558 0-1.01-.444-1.01-1v-3zM2 3A1 1 0 0 1 3.01 2h1.98C5.549 2 6 2.444 6 3v3a1 1 0 0 1-1.01 1H3.01C2.451 7 2 6.556 2 6V3zm24 0A1 1 0 0 1 27.01 2h1.98c.558 0 1.01.444 1.01 1v3a1 1 0 0 1-1.01 1h-1.98C26.451 7 26 6.556 26 6V3zM2 20A1 1 0 0 1 3.01 19h1.98c.558 0 1.01.444 1.01 1v3a1 1 0 0 1-1.01 1H3.01C2.451 24 2 23.556 2 23v-3zm24 0A1 1 0 0 1 27.01 19h1.98c.558 0 1.01.444 1.01 1v3a1 1 0 0 1-1.01 1h-1.98c-.558 0-1.01-.444-1.01-1v-3z\"/><path fill=\"#FF405D\" d=\"M12 10.615c0-.554.38-.775.853-.491l8.294 4.977c.471.282.473.739 0 1.023L12.853 21.1c-.471.282-.853.055-.853-.491v-9.995z\"/></g></symbol><symbol id=\"file-type-zip\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(3)\"><rect width=\"26\" height=\"32\" fill=\"#D1D5DB\" rx=\"2\"/><path fill=\"#4F5B69\" d=\"M11 1h2v2h-2V1zm0 4h2v2h-2V5zm0 4h2v2h-2V9zm2-6h2v2h-2V3zm0 4h2v2h-2V7zm-2 5h4v7h-4v-7zm1 1h2v2h-2v-2z\"/></g></symbol><symbol id=\"forbidden-sign\" viewBox=\"0 0 96 96\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#FFDEC1\" d=\"M24.6 3.51L3.51 24.61A12 12 0 0 0 0 33.08V62.9a12 12 0 0 0 3.52 8.49l21.08 21.1A12 12 0 0 0 33.1 96h29.8a12 12 0 0 0 8.49-3.51l21.09-21.1A12 12 0 0 0 96 62.92V33.1a12 12 0 0 0-3.51-8.49l-21.1-21.1A12 12 0 0 0 62.92 0H33.1a12 12 0 0 0-8.49 3.51z\"/><path fill=\"#FF9433\" fill-rule=\"nonzero\" d=\"M55.35 81H43.77c-3.97 0-7.79-1.5-10.7-4.2L13.3 58.43a4.06 4.06 0 0 1-.62-5.22 3.61 3.61 0 0 1 4.87-1.09l10.97 6.64V23.5l.02-.45a3.83 3.83 0 0 1 7.62 0l.03.45v18.02c0 .54.37 1 .88 1.12l.26.03h1.54c.63 0 1.15-.52 1.15-1.15V15.83l.02-.44a3.83 3.83 0 0 1 7.62 0l.03.44v25.69c0 .54.37 1 .88 1.12l.26.03h1.54c.63 0 1.15-.52 1.15-1.15V19.67l.02-.45a3.83 3.83 0 0 1 7.62 0l.03.45v21.85c0 .54.37 1 .88 1.12l.26.03h1.54c.63 0 1.15-.52 1.15-1.15V27.33l.02-.44a3.83 3.83 0 0 1 7.62 0l.03.44v38.34c0 8.47-6.87 15.33-15.34 15.33z\"/></g></symbol><symbol id=\"google\" viewBox=\"0 0 16 16\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <path fill=\"#3E82F1\" d=\"M15.526 6.413h-7.38v3.03h4.22a3.651 3.651 0 0 1-1.565 2.365l2.53 1.959a7.053 7.053 0 0 0 1.934-3.076 9.064 9.064 0 0 0 .261-4.288v.01z\"/>\n        <path fill=\"#32A753\" d=\"M10.801 11.808a4.714 4.714 0 0 1-2.654.747h-.033A4.592 4.592 0 0 1 4.49 10.7a4.698 4.698 0 0 1-.695-1.306c0-.026-.023-.052-.033-.081L1.988 10.7l-.855.657a7.883 7.883 0 0 0 2.651 2.991 7.787 7.787 0 0 0 4.33 1.326h.033a7.484 7.484 0 0 0 5.185-1.897l-2.53-1.97z\"/>\n        <path fill=\"#F9BB00\" d=\"M3.761 6.348L1.988 4.973l-.855-.656c-.105.212-.2.43-.288.653a7.79 7.79 0 0 0 0 5.727c.088.226.183.444.288.653l.845-.653 1.773-1.374a4.649 4.649 0 0 1 0-2.978l.01.003z\"/>\n        <path fill=\"#E74133\" d=\"M8.147 0h-.033a7.836 7.836 0 0 0-6.981 4.317l.845.653 1.774 1.375c0-.03.022-.056.032-.082a4.7 4.7 0 0 1 .696-1.306 4.591 4.591 0 0 1 3.624-1.855h.033a4.246 4.246 0 0 1 2.994 1.17l2.244-2.215A7.54 7.54 0 0 0 8.147 0\"/>\n    </g>\n</symbol><symbol id=\"keychain\" viewBox=\"0 0 32 32\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#D1D5DB\" d=\"M22 0h.28A10 10 0 0 1 32 9.72v.56A10 10 0 0 1 22.28 20h-.56a9.96 9.96 0 0 1-3.42-.7L7.18 30.77A4 4 0 0 1 4.3 32H2a2 2 0 0 1-2-2v-3.8c0-.45.18-.88.5-1.2l.05-.05a2 2 0 0 1 1.08-.56l.89-.14A1.77 1.77 0 0 0 4 22.5V22a1 1 0 0 1 1-1h.5c.83 0 1.5-.67 1.5-1.5V19a1 1 0 0 1 1-1h.75c.69 0 1.25-.56 1.25-1.25v-.42a2 2 0 0 1 .59-1.42l1.88-1.88A10 10 0 0 1 22 0zm.14 4c-.46 0-.93.05-1.39.17a2 2 0 0 0-1.04 3.25l.1.11 4.66 4.66a2 2 0 0 0 3.32-.8l.04-.14c.45-1.84 0-3.85-1.36-5.33l-.19-.2A5.83 5.83 0 0 0 22.42 4h-.28z\"/><path fill=\"#95999D\" d=\"M15.45 17.55c.54.47 1.13.89 1.77 1.23L4 32H2a2 2 0 0 1-.82-.18l14.27-14.27z\"/></g></symbol><symbol id=\"logout-large\" viewBox=\"0 0 44 44\"><g fill=\"none\" fill-rule=\"evenodd\"><rect width=\"27.5\" height=\"32.5\" x=\"1.25\" y=\"1.25\" fill=\"#D9DDE1\" rx=\"2\"/><path fill=\"#95999D\" d=\"M4.74 1.45l13.75 5.91c.92.4 1.51 1.3 1.51 2.29v27.61a2.5 2.5 0 01-3.49 2.29L2.76 33.64a2.49 2.49 0 01-1.51-2.29V3.74a2.5 2.5 0 013.49-2.29z\"/><path fill=\"#95999D\" fill-rule=\"nonzero\" d=\"M34.3 12.92l.15.13 5 5c.69.69.73 1.77.13 2.5l-.13.15-5 5-.14.13a1.88 1.88 0 01-2.64-2.64l.13-.14 1.8-1.8h-7.98a1.88 1.88 0 01-.18-3.74l.18-.01h7.98l-1.8-1.8a1.87 1.87 0 012.5-2.78z\"/></g></symbol><symbol id=\"share-grey08\" viewBox=\"0 0 16 16\">\n  <g fill=\"#32363F\" fill-rule=\"evenodd\" transform=\"translate(-160 -32)\">\n    <path d=\"M165.082611,42.1593397 C164.543049,42.6798471 163.808912,43 163,43 C161.343146,43 160,41.6568542 160,40 C160,38.3431458 161.343146,37 163,37 C163.808912,37 164.543049,37.3201529 165.082611,37.8406603 L170.022669,35.3706317 C170.007705,35.2491857 170,35.1254927 170,35 C170,33.3431458 171.343146,32 173,32 C174.656854,32 176,33.3431458 176,35 C176,36.6568542 174.656854,38 173,38 C172.191088,38 171.456951,37.6798471 170.917389,37.1593397 L165.977331,39.6293683 C165.992295,39.7508143 166,39.8745073 166,40 C166,40.1254927 165.992295,40.2491857 165.977331,40.3706317 L170.917389,42.8406603 C171.456951,42.3201529 172.191088,42 173,42 C174.656854,42 176,43.3431458 176,45 C176,46.6568542 174.656854,48 173,48 C171.343146,48 170,46.6568542 170,45 C170,44.8745073 170.007705,44.7508143 170.022669,44.6293683 L165.082611,42.1593397 Z\"/>\n    <path d=\"M165.082611,42.1593397 C164.543049,42.6798471 163.808912,43 163,43 C161.343146,43 160,41.6568542 160,40 C160,38.3431458 161.343146,37 163,37 C163.808912,37 164.543049,37.3201529 165.082611,37.8406603 L170.022669,35.3706317 C170.007705,35.2491857 170,35.1254927 170,35 C170,33.3431458 171.343146,32 173,32 C174.656854,32 176,33.3431458 176,35 C176,36.6568542 174.656854,38 173,38 C172.191088,38 171.456951,37.6798471 170.917389,37.1593397 L165.977331,39.6293683 C165.992295,39.7508143 166,39.8745073 166,40 C166,40.1254927 165.992295,40.2491857 165.977331,40.3706317 L170.917389,42.8406603 C171.456951,42.3201529 172.191088,42 173,42 C174.656854,42 176,43.3431458 176,45 C176,46.6568542 174.656854,48 173,48 C171.343146,48 170,46.6568542 170,45 C170,44.8745073 170.007705,44.7508143 170.022669,44.6293683 L165.082611,42.1593397 Z\"/>\n  </g>\n</symbol><symbol id=\"top-select\" viewBox=\"0 0 24 24\">\n  <g fill=\"#95999d\" fill-rule=\"evenodd\" transform=\"translate(12.285714, 12.000000) rotate(270.000000) translate(-12.285714, -12.000000)\">\n    <path d=\"M6.46026077,20.3174036 C5.84657974,20.9310847 5.84657974,21.9260582 6.46026077,22.5397392 C7.0739418,23.1534203 8.06891534,23.1534203 8.68259637,22.5397392 L18.1111678,13.1111678 C18.7248488,12.4974868 18.7248488,11.5025132 18.1111678,10.8888322 L8.68259637,1.46026077 C8.06891534,0.846579743 7.0739418,0.846579743 6.46026077,1.46026077 C5.84657974,2.0739418 5.84657974,3.06891534 6.46026077,3.68259637 L14.7776644,12 L6.46026077,20.3174036 Z\"/>\n  </g>\n</symbol><symbol id=\"album-add\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M65,99.0094776 C65,97.347389 66.3423789,96 68.0033512,96 L77.9931545,96 C78.5492199,96 79,96.4438648 79,97 C79,97.5522847 78.544239,98 77.9975267,98 L68.0024733,98 C67.4488226,98 67,98.4438648 67,99 C67,99.5522847 67.455761,100 68.0024733,100 L77.9975267,100 C78.5511774,100 79,100.455761 79,101.002473 L79,110.997527 C79,111.551177 78.5500512,112 77.9931545,112 L68.0033512,112 C66.3446462,112 65,110.663369 65,108.990522 L65,99.0094776 Z M72,102 L74,102 L74,105 L77,105 L77,107 L74,107 L74,110 L72,110 L72,107 L69,107 L69,105 L72,105 L72,102 Z\" transform=\"translate(-64 -96)\"/>\n</symbol><symbol id=\"album-remove\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M65,99.009C65,97.347 66.342,96 68.003,96L77.993,96C78.549,96 79,96.444 79,97C79,97.552 78.544,98 77.998,98L68.002,98C67.449,98 67,98.444 67,99C67,99.552 67.456,100 68.002,100L77.998,100C78.551,100 79,100.456 79,101.002L79,110.998C79,111.551 78.55,112 77.993,112L68.003,112C66.345,112 65,110.663 65,108.991L65,99.009ZM72,105L77,105L77,107L74,107L72,107L69,107L69,105L72,105Z\" transform=\"translate(-64 -96)\"/>\n</symbol><symbol id=\"album\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M33,99.0094776 C33,97.347389 34.3423789,96 36.0033512,96 L45.9931545,96 C46.5492199,96 47,96.4438648 47,97 L47,97 C47,97.5522847 46.544239,98 45.9975267,98 L36.0024733,98 C35.4488226,98 35,98.4438648 35,99 L35,99 C35,99.5522847 35.4509752,100 35.990778,100 L40.5089948,100 C40.7801695,100 41,100.22788 41,100.491005 L41,106 L42.5,105 L44,106 L44,100.491005 C44,100.219831 44.2157526,100 44.495389,100 L46.0010434,100 C46.5527519,100 47,100.455761 47,101.002473 L47,110.997527 C47,111.551177 46.5500512,112 45.9931545,112 L36.0033512,112 C34.3446462,112 33,110.663369 33,108.990522 L33,99.0094776 Z\" transform=\"translate(-32 -96)\"/>\n</symbol><symbol id=\"answer\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M11.586 7H7a3 3 0 0 0-3 3v4a1 1 0 0 1-2 0v-4a5 5 0 0 1 5-5h4.586L9.293 2.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 1 1-1.414-1.414L11.586 7z\"/>\n</symbol><symbol id=\"apple\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M11.88 8.5c.023 2.422 2.125 3.227 2.148 3.238-.018.056-.336 1.148-1.107 2.275-.667.975-1.36 1.946-2.45 1.966-1.07.02-1.415-.635-2.64-.635s-1.607.615-2.622.655c-1.052.04-1.853-1.054-2.526-2.025C1.31 11.987.26 8.36 1.67 5.912c.7-1.215 1.952-1.985 3.31-2.005 1.034-.02 2.01.695 2.641.695.632 0 1.817-.86 3.063-.733.522.022 1.986.21 2.927 1.587-.076.047-1.748 1.02-1.73 3.044M9.868 2.555c.559-.677.935-1.618.832-2.555-.805.032-1.779.537-2.357 1.213-.517.598-.97 1.556-.848 2.475.897.069 1.814-.457 2.373-1.133\"/>\n</symbol><symbol id=\"archive\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M1 4h14v10.004a1 1 0 0 1-1.007.996H2.007A1 1 0 0 1 1 14.004V4zM0 2c0-.552.445-1 1-1h14c.552 0 1 .444 1 1v1H0V2zm5 4v2h6V6H5z\"/>\n</symbol><symbol id=\"attachment\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2.43 14.43C.457 12.457.337 9.385 2.16 7.56l6.3-6.3c1.327-1.325 3.563-1.237 4.997.197 1.434 1.434 1.522 3.67.196 4.996l-5.1 5.1c-.828.828-2.227.773-3.123-.123-.895-.895-.95-2.294-.122-3.122l4.5-4.5 1.298 1.298L6.552 9.66c-.33.33.319.979.649.649l5.154-5.154c.66-.66.616-1.784-.098-2.498-.714-.714-1.838-.758-2.498-.098l-6.3 6.3c-1.158 1.158-1.081 3.119.171 4.371 1.253 1.253 3.214 1.33 4.372.172l5.7-5.7L15 9l-5.7 5.7c-1.824 1.824-4.897 1.703-6.87-.27z\"/>\n</symbol><symbol id=\"attention\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 2l8 12H0L8 2zM7 6v4h2V6H7zm0 5v2h2v-2H7z\"/>\n</symbol><symbol id=\"banking-add\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 11.003l3-.001c0 .702.127 1.372.35 1.998H1.996A2.003 2.003 0 0 1 0 11.003V1.997C0 .898.9 0 1.997 0h12.006C15.101 0 16 .898 16 1.997v5.689a6.031 6.031 0 0 0-1.999-1.876V6H1.998L2 11.003zM1.997 2v1H14V2H1.997zM11 8h2v3h3v2h-3v3h-2v-3H8v-2h3V8z\"/>\n</symbol><symbol id=\"banking\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 8v5h12V4H2v1h12v3H2zm0-6h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\"/>\n</symbol><symbol id=\"bank\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7.979 0L0 5.066v1.966h15.958V5.066L7.979 0zm4 13.063h2v-5h-2v5zm-5 0h2v-5h-2v5zm-5 0h2v-5h-2v5zm-1.979 3h15.958v-2H0v2z\"/>\n</symbol><symbol id=\"bell\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13.993 13H2.007A1.001 1.001 0 1 1 2 11V9c0-2.45 1.333-5.566 4-6.627v-.379C6 .893 6.888 0 8 0c1.105 0 2 .895 2 1.994v.38C12.667 3.433 14 6.55 14 9v2c.552 0 1 .444 1 1 0 .552-.45 1-1.007 1zM6 14h4v.006A1.992 1.992 0 0 1 8 16c-1.105 0-2-.895-2-1.994V14z\"/>\n</symbol><symbol id=\"bill\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13 8c1.025 0 1.96.386 2.669 1.02l.159.151-1.414 1.415C14.052 10.224 13.551 10 13 10c-.68 0-1.276.345-1.637.866l-.085.134H13v2h-1.722c.347.595.985 1 1.722 1 .49 0 .94-.178 1.288-.47l.125-.116 1.415 1.415C15.104 15.553 14.104 16 13 16c-1.793 0-3.298-1.185-3.804-2.81L9.142 13H8v-2h1.142C9.587 9.278 11.138 8 13 8zm-8 4c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h4zm0-4c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h4zm10-8c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h14zm0 4c.552 0 1 .448 1 1s-.448 1-1 1H1c-.552 0-1-.448-1-1s.448-1 1-1h14z\"/>\n</symbol><symbol id=\"bottom\" viewBox=\"0 0 24 24\">\n  <g fill-rule=\"evenodd\" transform=\"translate(12.285714, 12.000000) rotate(90.000000) translate(-12.285714, -12.000000)\">\n    <path d=\"M6.46026077,20.3174036 C5.84657974,20.9310847 5.84657974,21.9260582 6.46026077,22.5397392 C7.0739418,23.1534203 8.06891534,23.1534203 8.68259637,22.5397392 L18.1111678,13.1111678 C18.7248488,12.4974868 18.7248488,11.5025132 18.1111678,10.8888322 L8.68259637,1.46026077 C8.06891534,0.846579743 7.0739418,0.846579743 6.46026077,1.46026077 C5.84657974,2.0739418 5.84657974,3.06891534 6.46026077,3.68259637 L14.7776644,12 L6.46026077,20.3174036 Z\"/>\n  </g>\n</symbol><symbol id=\"browser-brave\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14.808 5.161l-.314 1.212-1.435 5.491a2.805 2.805 0 0 1-1.079 1.569s-1.536 1.09-3.482 2.365c-.154.101-.313.17-.483.17-.17 0-.33-.069-.484-.17a124.63 124.63 0 0 1-3.482-2.36 2.788 2.788 0 0 1-1.084-1.568L1.519 6.379 1.2 5.172l.489-1.334-.356-.797a.214.214 0 0 1 .048-.234l.946-.957c.41-.42 1.02-.564 1.573-.367l.255.09L5.575.021 7.999 0h.016l2.408.016 1.424 1.541.26-.09a1.507 1.507 0 0 1 1.563.362l.93.94a.27.27 0 0 1 .054.293l-.34.765.494 1.334zM8.323 9.823a.648.648 0 0 0-.154-.048h-.17a.648.648 0 0 0-.154.048l-.692.287c-.063.027-.17.075-.233.107l-1.042.542c-.064.032-.07.09-.01.133l.919.648c.058.043.149.112.202.16l.409.35.191.17.394.352a.146.146 0 0 0 .191 0l.404-.351.191-.17.41-.357c.053-.047.143-.117.202-.159l.92-.654c.058-.042.052-.1-.011-.133l-1.042-.531a4.547 4.547 0 0 0-.234-.107l-.691-.287zm4.987-4.425c.02-.069.02-.095.02-.095 0-.07-.004-.186-.015-.255l-.053-.155a1.86 1.86 0 0 0-.128-.223l-.6-.888a2.608 2.608 0 0 0-.155-.207l-.776-.973c-.042-.053-.085-.1-.09-.095h-.01l-.128.021-1.186.234c-.069.016-.18.037-.25.048l-.02.005a.662.662 0 0 1-.25-.016l-.995-.319a5.863 5.863 0 0 0-.244-.069s-.202-.048-.367-.043c-.165 0-.367.043-.367.043-.069.016-.18.048-.244.07l-.994.318a.662.662 0 0 1-.25.016l-.021-.005c-.07-.01-.181-.038-.25-.048L4.74 2.539a1.062 1.062 0 0 0-.128-.022h-.01a.532.532 0 0 0-.09.096l-.777.973c-.042.053-.111.149-.154.207l-.6.888a3.04 3.04 0 0 0-.128.223l-.053.154c-.01.07-.022.186-.016.255 0 0 0 .022.021.096a.858.858 0 0 0 .128.245c.042.053.122.143.17.19l1.76 1.872a.22.22 0 0 1 .036.213l-.366.866a.368.368 0 0 0-.006.24l.101.27c.085.229.229.43.42.585l.356.287a.218.218 0 0 0 .213.027l1.127-.537c.064-.032.16-.096.213-.144l.807-.728a.286.286 0 0 0 .016-.404L6.086 7.248a.148.148 0 0 1-.048-.186l.744-1.403a.31.31 0 0 0 .01-.229l-.09-.207a.365.365 0 0 0-.17-.165L4.348 4.24c-.064-.027-.064-.054.005-.059l1.409-.133c.069-.005.18.006.25.021l1.254.351c.069.022.111.09.1.16l-.435 2.386c-.01.07-.01.165.005.218.016.054.085.101.154.117l.872.186c.07.016.18.016.25 0l.813-.186c.07-.016.138-.069.154-.117a.493.493 0 0 0 .006-.218l-.43-2.386c-.011-.07.031-.144.1-.16l1.255-.35c.069-.022.18-.027.25-.022l1.408.133c.07.005.075.032.005.059l-2.184.829a.342.342 0 0 0-.17.165l-.09.207c-.027.064-.027.17.01.228l.75 1.404a.15.15 0 0 1-.048.186L8.345 8.407a.281.281 0 0 0 .016.404l.808.728a.912.912 0 0 0 .212.138l1.133.537c.063.032.16.016.212-.026l.356-.293c.192-.154.335-.356.415-.584l.101-.271a.369.369 0 0 0-.005-.24l-.367-.866a.22.22 0 0 1 .037-.213l1.76-1.87.17-.192c-.01-.016.085-.133.117-.26z\"/>\n</symbol><symbol id=\"browser-chrome\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4.036 6.978l-2.29-3.966A7.985 7.985 0 0 1 8 .001a7.996 7.996 0 0 1 6.883 3.921H8.356a4.101 4.101 0 0 0-4.32 3.055zm6.828-1.9h4.585a8 8 0 0 1-7.359 10.92l3.273-5.665a4.081 4.081 0 0 0-.498-5.254zm-5.77 2.923A2.91 2.91 0 0 1 8 5.094a2.91 2.91 0 0 1 2.906 2.907A2.91 2.91 0 0 1 8 10.907 2.91 2.91 0 0 1 5.094 8zm4.003 3.944l-2.29 3.967a8.002 8.002 0 0 1-5.78-11.834l3.266 5.657a4.099 4.099 0 0 0 4.804 2.21z\"/>\n</symbol><symbol id=\"browser-duckduckgo\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 .013a8 8 0 0 1 1.942 15.761l-.223-.43a18.303 18.303 0 0 1-.7-.256.164.164 0 0 1-.053.068.491.491 0 0 1-.06.034c-.016.063-.041.11-.078.134-.216.144-.828.216-1.152.144a.295.295 0 0 1-.13-.06c-.552.306-1.346.714-1.507.622-.252-.144-.291-2.184-.252-2.521.04-.337.263-.486.317-.501a.102.102 0 0 0-.053.086c-.036.468 0 2.376.252 2.52.161.093.954-.315 1.506-.621a.295.295 0 0 0 .131.06c.324.072.936 0 1.152-.144.036-.024.061-.072.078-.135a.495.495 0 0 0 .06-.033.164.164 0 0 0 .054-.068 23.637 23.637 0 0 0 .287.109l.024.009.004.002.022.008.007.002a28.042 28.042 0 0 0 .03.011l.019.007.01.004.019.006.011.005.018.006.013.005.017.006.013.004.017.007.013.004.018.006.014.005.016.006.015.005.016.006a9.84 9.84 0 0 1 .03.01l.016.006.029.01.017.006.014.004.018.006.014.005.017.006.014.004.017.006.014.005.017.005.014.005.018.006.013.004.018.005.014.005.017.005a4.139 4.139 0 0 1 .03.01l.014.004.018.006.012.004.019.005.012.004.02.006.01.003.025.007.004.002.03.008.005.002.024.006.01.003.019.005.01.003.018.005.011.003.017.005c.004 0 .007.002.011.003.006 0 .011.002.017.004a4.868 4.868 0 0 0 .115.027l.015.004a1.763 1.763 0 0 0 .025.005l.01.001.016.004.007.001a2 2 0 0 0 .02.004h.003l.022.004h.005l.016.003h.007l.014.003h.007l.013.002h.008l.01.002h.009a.515.515 0 0 0 .018.001h.01a.38.38 0 0 0 .016.001h.03l.006-.001.008-.001h.006l.007-.002h.005l.008-.003h.003a.071.071 0 0 0 .022-.009l.001-.001a.09.09 0 0 0 .01-.008l.002-.001a.122.122 0 0 0 .021-.024.338.338 0 0 0 .04-.077c.183-.488.094-2.305-.193-2.37-.259-.058-1.25.641-1.641.926a1.18 1.18 0 0 0-.042-.144c-.027-.068-.224-.09-.457-.073-.468-1.098-.832-2.39-.625-3.295l.002.002c.273.19 2.094.804 2.997.787.904-.017 2.39-.571 2.226-1.015-.162-.443-1.637.392-3.175.25-1.139-.107-1.34-.617-1.088-.99.317-.468.895.09 1.848-.196.955-.285 2.29-.794 2.785-1.071 1.145-.638-.48-.903-.863-.726-.363.168-1.63.487-2.216.629.33-1.16-.462-3.18-1.345-4.063-.288-.288-.731-.47-1.23-.565-.192-.263-.502-.515-.94-.748a4.42 4.42 0 0 0-2.76-.449c-.135.018-.208.067-.31.084.113.01.542.21.811.32-.131.05-.311.08-.452.138a.661.661 0 0 0-.162.046c-.132.06-.231.288-.23.395.643-.065 1.596-.02 2.292.188-.493.069-.946.197-1.274.37a2.438 2.438 0 0 0-.047.025c-.037.015-.072.03-.103.047-1.05.553-1.513 1.844-1.237 3.391.26 1.448 1.344 6.493 1.797 8.668A8.003 8.003 0 0 1 0 8.013a8 8 0 0 1 8-8zM5.077 5.132c-.425.267-.409.54-.409.54s-.226-.503.376-.75c.602-.246.896.14.896.14s-.438-.197-.863.07zm.805 1.419a.15.15 0 1 0 .3 0 .15.15 0 1 0-.3 0zm-.107.774a.58.58 0 0 1 0-1.16v-.001a.58.58 0 0 1 0 1.16zm4.101-1.22a.13.13 0 1 0 .003.26c.071-.001.128-.06.127-.13a.129.129 0 0 0-.13-.13zm-.721.296a.5.5 0 1 1 0 .001zm.328-1.749c.347.058.47.37.47.37s-.314-.179-.558-.176c-.5.007-.638.228-.638.228s.085-.528.726-.422z\"/>\n</symbol><symbol id=\"browser-edge-chromium\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M13.4967 10.1297C11.9007 10.5367 10.834 10.403 10.1674 10.173C9.93103 10.0932 9.73878 9.91834 9.637 9.69061C9.53522 9.46288 9.53318 9.20299 9.63136 8.97369C10.0067 8.07802 10.2684 6.40502 8.18802 4.75536C8.18709 4.75477 8.18619 4.75398 8.18531 4.7532C8.18368 4.75176 8.18209 4.75036 8.18036 4.75036C4.49602 2.43436 1.52736 4.45569 0.794024 5.04236C0.770077 5.0613 0.736554 5.06235 0.71147 5.04494C0.686386 5.02752 0.675647 4.99575 0.685024 4.96669C1.01569 3.95236 2.74602 -0.15831 9.05102 0.0293567C13.598 0.164357 16.196 4.30269 15.744 7.38402C15.5937 8.41069 14.885 9.59136 13.5064 10.1267C13.5047 10.1274 13.5031 10.128 13.5014 10.1285C13.4998 10.129 13.4983 10.1294 13.4967 10.1297ZM8.34102 6.62836C8.74669 6.71436 6.36169 4.73436 3.42536 5.18036C2.40436 5.33536 0.0543578 6.22102 0.251691 9.38036C0.605024 15.049 5.20402 15.877 6.73669 15.9954C6.81162 16.0014 6.88227 15.9597 6.9131 15.8912C6.94394 15.8226 6.92829 15.742 6.87402 15.69C6.76117 15.5819 6.62131 15.4624 6.46538 15.3291L6.46537 15.3291C5.49338 14.4984 3.89724 13.1342 4.32869 10.6797C4.78102 8.10836 6.62636 6.26669 8.34102 6.62836ZM9.93669 15.7797C7.98736 15.883 6.15402 14.4864 5.65936 12.5334C5.32447 11.2105 5.52325 9.97369 6.25569 8.82302C6.26451 8.80935 6.27273 8.7935 6.28121 8.77717C6.31408 8.71382 6.35072 8.64322 6.44002 8.66469C6.50151 8.67967 6.50417 8.74249 6.50662 8.80043C6.50728 8.81599 6.50793 8.83119 6.50969 8.84502C6.70502 10.3297 7.55202 11.3634 8.83802 12.0367C10.6654 12.9934 12.5227 12.946 14.3714 12.0597C14.4048 12.0437 14.4388 12.0243 14.4733 12.0046L14.4733 12.0046C14.6236 11.9188 14.7822 11.8284 14.9357 11.993C15.107 12.1759 14.9866 12.3478 14.8775 12.5034C14.8603 12.5279 14.8434 12.552 14.828 12.5757C13.8414 14.088 12.5737 15.2384 10.757 15.667C10.584 15.708 10.408 15.738 10.2324 15.7644C10.1341 15.7745 10.0354 15.7796 9.93669 15.7797Z\"/>\n</symbol><symbol id=\"browser-edge\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M15.27 7.592c0-1.517-.31-2.831-.928-3.943-.66-1.178-1.534-2.08-2.623-2.708C10.63.313 9.399 0 8.025 0c-.88 0-1.702.128-2.466.383a6.575 6.575 0 0 0-1.994 1.048 7.578 7.578 0 0 0-1.494 1.57 8.157 8.157 0 0 0-1.026 1.936 9.791 9.791 0 0 0-.52 2.14c.36-.517.768-.998 1.22-1.443.458-.45.981-.867 1.57-1.254a8.07 8.07 0 0 1 1.993-.932 8.673 8.673 0 0 1 2.316-.397l.196.011c.131.006.298.032.5.076.201.044.425.106.668.183.245.076.484.198.719.365.234.165.444.364.629.593.184.228.324.53.419.905.096.374.12.79.072 1.248H5.162c.095-.558.231-1.034.41-1.423.179-.389.41-.762.696-1.12-1.255.583-2.222 1.38-2.9 2.392-.677 1.01-1.008 2.235-.99 3.675.012 1.165.382 2.273 1.111 3.32.729 1.045 1.655 1.786 2.779 2.22.839.321 1.778.479 2.82.473 1.04-.006 1.97-.12 2.787-.34.817-.22 1.5-.493 2.047-.82v-3.363c-.435.303-.95.554-1.548.753-.598.2-1.216.339-1.856.415a7.04 7.04 0 0 1-1.9-.027 5.815 5.815 0 0 1-1.69-.508 2.988 2.988 0 0 1-1.218-1.092c-.313-.486-.471-1.058-.477-1.718H15.27V7.592z\"/>\n        <path fill-rule=\"nonzero\" d=\"M.536 7.144h.029l.007-.05-.036.05z\"/>\n    </g>\n</symbol><symbol id=\"browser-firefox\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M15.79 5.961a.13.13 0 0 0-.14.075l-.178.395c-.067-.519-.193-1.355-.359-1.903a3.664 3.664 0 0 0-.812-1.412.13.13 0 0 0-.22.12l.139.626c-.334-.349-.87-.85-1.4-1.093a9.105 9.105 0 0 0-.37-.168 6.264 6.264 0 0 0-4.164-1.588 6.246 6.246 0 0 0-5.293 2.902 1.16 1.16 0 0 1-.352-.467c-.16-.393-.241-.834-.242-.838a.13.13 0 0 0-.219-.072c-.96.921-.865 2.357-.83 2.682a7.072 7.072 0 0 0-.794 1.048C.134 6.944.006 8.125 0 8.175a.13.13 0 0 0 .225.103l.28-.297c-.03.114-.06.243-.09.388C.29 8.996.328 9.967.33 10.008a.13.13 0 0 0 .249.05l.165-.35c.122.853.59 2.666 2.385 4.337 1.33 1.238 3.179 1.949 5.073 1.949 1.84 0 3.576-.658 5.021-1.902 1.71-1.473 2.347-3.576 2.58-5.08.251-1.625.104-2.885.098-2.937a.13.13 0 0 0-.11-.114zm-2.919.047c.002.003.18.235.218.83.027.445-.065 1.158-.122 1.547l-.349-.404a.13.13 0 0 0-.229.101c.002.01.12 1.017-.08 1.891a2.791 2.791 0 0 1-.369.902l.049-.659a.13.13 0 0 0-.25-.064c-.005.013-.609 1.31-2.262 1.823-.231.07-.474.107-.723.107-.882 0-1.682-.45-2.136-.766l.116.003c.65 0 1.15-.28 1.552-.505.106-.059.206-.115.302-.162.577-.29.846-.315 1.052-.315a.216.216 0 0 0 .22-.166c.064-.251-.238-.7-.611-.904a1.254 1.254 0 0 0-.623-.148c-.381 0-.854.12-1.531.304a1.42 1.42 0 0 1-.365.05c-.415 0-.69-.201-.846-.37-.212-.226-.332-.526-.314-.78.008-.117.053-.236.33-.236.246 0 .52.1.522.102a.13.13 0 0 0 .046.008h.001a.13.13 0 0 0 .13-.151L6.561 6.9c.132-.084.448-.29.751-.51.735-.534.833-.738.755-.893-.104-.212-.379-.246-.696-.286a3.054 3.054 0 0 1-.573-.11c-.388-.129-.643-.463-.701-.545a.784.784 0 0 1 .073-.499c.123-.216.549-.55.702-.662a.13.13 0 0 0-.062-.236c-.013-.001-.404-.04-1.042.171-.52.174-.922.456-1.06.56a3.823 3.823 0 0 0-.332-.045 5.202 5.202 0 0 1 3.909-1.762 5.15 5.15 0 0 1 3.033.973l-.879.147a.13.13 0 0 0-.017.254c.012.003 1.182.373 2.055 1.047.195.152.372.349.529.585.145.313.26.635.34.962l-.294-.229a.131.131 0 0 0-.182.185z\"/>\n</symbol><symbol id=\"browser-ie\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M15.826 8.135a7.08 7.08 0 0 0-.89-3.448c2.417-5.472-2.591-4.67-2.87-4.616a12.737 12.737 0 0 0-2.949.964A7.114 7.114 0 0 0 1.782 6.54C3.563 4.542 4.81 3.736 5.556 3.413c-.119.106-.236.214-.35.323l-.113.108c-.076.073-.151.146-.225.22l-.13.131-.194.2-.134.143a17.71 17.71 0 0 0-.89 1.024l-.139.173-.132.167-.12.159-.136.179c-.032.042-.062.084-.093.127-.281.383-.538.76-.77 1.12l-.002.003c-.06.095-.12.189-.177.282l-.01.015a22.37 22.37 0 0 0-.168.276l-.006.01c-.146.243-.282.479-.404.7-.64 1.16-.952 1.972-.966 2.02-2.022 7.231 4.29 4.177 5.171 3.722a7.114 7.114 0 0 0 9.849-3.998H11.68c-.553.934-1.617 1.566-2.84 1.566-1.792 0-3.244-1.357-3.244-3.032h10.172c.038-.3.058-.606.058-.916zm-1.329-6.998c.613.413 1.104 1.062.26 3.248a7.136 7.136 0 0 0-3.473-2.883c.659-.317 2.288-.99 3.213-.365zM1.482 14.5c-.499-.512-.587-1.758.514-4.028a7.133 7.133 0 0 0 3.097 3.785c-.713.392-2.605 1.275-3.61.243zM5.58 7.106c.056-1.628 1.473-2.93 3.213-2.93s3.157 1.302 3.214 2.93H5.58z\"/>\n</symbol><symbol id=\"browser-opera\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8.617 2.144a5.126 5.126 0 0 1 2.278-.539 5.16 5.16 0 0 1 2.642.737 7.891 7.891 0 0 1 2.298 5.576 7.892 7.892 0 0 1-2.298 5.576 5.16 5.16 0 0 1-2.642.736 5.124 5.124 0 0 1-2.279-.54c2.014-.415 3.559-2.841 3.559-5.772 0-2.932-1.545-5.358-3.558-5.774zM7.54 15.826A7.917 7.917 0 0 1 7.918 0h.03a7.888 7.888 0 0 1 5.247 2.016 5.713 5.713 0 0 0-3.174-.97c-1.885 0-3.574.935-4.71 2.41-.875 1.033-1.442 2.56-1.48 4.275v.373c.038 1.714.605 3.242 1.48 4.275 1.136 1.475 2.825 2.41 4.71 2.41 1.16 0 2.245-.353 3.173-.969a7.89 7.89 0 0 1-5.654 2.006z\"/>\n</symbol><symbol id=\"browser-safari\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8.806 8.806L7.194 7.194l-.807 2.419 2.42-.807zM8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 14.667A6.674 6.674 0 0 0 14.667 8 6.674 6.674 0 0 0 8 1.333 6.674 6.674 0 0 0 1.333 8 6.674 6.674 0 0 0 8 14.667zM4.28 11.72L6.14 6.14l5.58-1.86-1.86 5.58-5.58 1.86z\"/>\n</symbol><symbol id=\"burger\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 3c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H1c-.552 0-1-.444-1-1zm0 10c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H1c-.552 0-1-.444-1-1zm0-5c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H1c-.552 0-1-.444-1-1z\"/>\n</symbol><symbol id=\"calendar\" viewBox=\"0 0 16 16\"><path d=\"M13 1h3v2H0V1h3V0h2v1h6V0h2v1zM0 4h16v10.998A1 1 0 0 1 15 16H1c-.552 0-1-.456-1-1.002V4zm2 2v8h12V6H2zm6 3h5v4H8V9z\" fill-rule=\"nonzero\"/></symbol><symbol id=\"camera\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M5.5 1h5l2 2H14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h1.5l2-2zM8 13c2.208 0 4-1.792 4-4s-1.792-4-4-4-4 1.792-4 4 1.792 4 4 4zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z\"/>\n</symbol><symbol id=\"carbonCopy\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M5.58 1.38a2.8 2.8 0 0 1 4.83-.02l.1.18.03.06h.07a2.8 2.8 0 0 1 2.93 2.29l.02.17.02.17a2.8 2.8 0 0 1-.36 1.54l-.1.17-.04.06.13.22a2.8 2.8 0 0 1-.6 3.5l-.14.12-.15.1c-.4.26-.85.42-1.32.46v5.3a.3.3 0 0 1-.48.23L8 14l-2.52 1.93a.3.3 0 0 1-.48-.24v-5.3a2.8 2.8 0 0 1-2.53-2.27l-.03-.18-.02-.17a2.8 2.8 0 0 1 .36-1.53l.1-.18.04-.06-.04-.06a2.8 2.8 0 0 1 .5-3.66l.15-.12.15-.1c.45-.3.97-.46 1.5-.47h.2l.08.01.12-.22zm2.78.7a.8.8 0 0 0-1.02.26l-.06.1-.62 1.24-1.4-.08a.8.8 0 0 0-.76 1.14l.05.1L5.32 6l-.77 1.16a.8.8 0 0 0 .62 1.24h.1l1.39-.08.62 1.25a.8.8 0 0 0 .6.43h.25a.8.8 0 0 0 .53-.33l.06-.1.62-1.25 1.4.08a.8.8 0 0 0 .76-1.14l-.05-.1L10.68 6l.77-1.16a.8.8 0 0 0-.62-1.24h-.1l-1.39.08-.62-1.25a.8.8 0 0 0-.36-.36z\"/></symbol><symbol id=\"car\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13.92 2.01C13.72 1.42 13.16 1 12.5 1h-9c-.66 0-1.21.42-1.42 1.01L.11 6.68c-.07.21-.11.43-.11.66v6.16c0 .83.67 1.5 1.5 1.5S3 14.33 3 13.5V13h10v.5c0 .82.67 1.5 1.5 1.5.82 0 1.5-.67 1.5-1.5V7.34c0-.22-.04-.45-.11-.66l-1.97-4.67zM3.5 11C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8 5 8.67 5 9.5 4.33 11 3.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S11.67 8 12.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM2 6l1.27-2.82c.14-.4.52-.68.95-.68h7.56c.43 0 .81.28.95.68L14 6H2z\"/>\n</symbol><symbol id=\"categories\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3.243 6.034L.671 4.842a.779.779 0 0 1-.396-.397c-.197-.496 0-.894.396-1.093L7.792.075c.198-.1.395-.1.594 0l7.12 3.277a.746.746 0 0 1 .494.696.746.746 0 0 1-.494.695l-2.67 1.291-.594.298-3.856 1.887a.694.694 0 0 1-.693 0c-.198-.105-3.857-1.887-3.857-1.887l-.593-.298zm12.03 4.807c.78.4.675 1.345-.086 1.756L8.421 15.9a.985.985 0 0 1-.864 0L.572 12.49a.779.779 0 0 1-.396-.397c-.197-.497 0-.894.396-1.093l.89-.397 2.472 1.192 3.627 1.73a.984.984 0 0 0 .857-.005l3.725-1.825 2.373-1.19.756.336zm.53-3.218c.197.397 0 .894-.594 1.192l-2.274 1.092-.594.3-4.058 2.036a.98.98 0 0 1-.883 0l-4.058-2.037-.594-.299L.474 8.815a.777.777 0 0 1-.396-.398c-.198-.496 0-.894.396-1.092l1.285-.596 2.176.993 3.626 1.73a.986.986 0 0 0 .858-.005l4.12-2.023 1.582-.794 1.286.596a.771.771 0 0 1 .396.397z\"/>\n</symbol><symbol id=\"certified\" viewBox=\"0 0 12 12\">\n    <path fill-rule=\"nonzero\" d=\"M11.806 5.468c.259.295.259.737 0 1.032l-.714.812a.782.782 0 0 0-.19.588L11 8.976a.782.782 0 0 1-.606.835l-1.057.24a.782.782 0 0 0-.5.363l-.553.93a.782.782 0 0 1-.98.32l-.995-.427a.782.782 0 0 0-.619 0l-.993.43a.782.782 0 0 1-.983-.318l-.553-.929a.782.782 0 0 0-.499-.363l-1.057-.24A.782.782 0 0 1 1 8.982L1.1 7.9a.782.782 0 0 0-.191-.587l-.715-.814a.782.782 0 0 1 0-1.031l.715-.819a.782.782 0 0 0 .19-.587L1 2.988a.782.782 0 0 1 .608-.836l1.054-.236a.782.782 0 0 0 .501-.364l.552-.93c.201-.337.62-.473.982-.318l.995.427c.197.085.42.085.617 0l.995-.427a.782.782 0 0 1 .981.319l.553.93c.11.185.29.316.5.363l1.057.24a.782.782 0 0 1 .606.835l-.1 1.076c-.02.214.05.427.191.588l.714.813zm-7.526.001a.75.75 0 0 0-1.06 1.062l1.5 1.497a.75.75 0 0 0 1.06 0l3-2.997a.75.75 0 1 0-1.06-1.062L5.25 6.42l-.97-.95z\"/>\n</symbol><symbol id=\"checkbox\" viewBox=\"0 0 16 16\">\n<path d=\"M14 14V8.24267L16 6.24267V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2C0 0.895431 0.895431 0 2 0H13.7574L11.7574 2H2V14H14Z\"/>\n<path d=\"M4.70711 7.29289C4.31658 6.90237 3.68342 6.90237 3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L6.29289 11.7071C6.68342 12.0976 7.31658 12.0976 7.70711 11.7071L15.7071 3.70711C16.0976 3.31658 16.0976 2.68342 15.7071 2.29289C15.3166 1.90237 14.6834 1.90237 14.2929 2.29289L7 9.58579L4.70711 7.29289Z\"/>\n</symbol><symbol id=\"check-circle\" viewBox=\"0 0 48 48\"><path fill-rule=\"evenodd\" d=\"M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z M13.4142136,24.5857864 C12.633165,23.8047379 11.366835,23.8047379 10.5857864,24.5857864 C9.80473785,25.366835 9.80473785,26.633165 10.5857864,27.4142136 L17.5857864,34.4142136 C18.366835,35.1952621 19.633165,35.1952621 20.4142136,34.4142136 L35.4142136,19.4142136 C36.1952621,18.633165 36.1952621,17.366835 35.4142136,16.5857864 C34.633165,15.8047379 33.366835,15.8047379 32.5857864,16.5857864 L19,30.1715729 L13.4142136,24.5857864 Z\"/></symbol><symbol id=\"check-list\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7 1h9v2H7V1zm0 6h9v2H7V7zm0 6h9v2H7v-2zM1.825 3.716L.66 2.72a.918.918 0 0 1-.017-1.407 1.23 1.23 0 0 1 1.587-.014l.372.307L4.085.292a1.223 1.223 0 0 1 1.586 0 .915.915 0 0 1 0 1.405l-2.269 2.01A1.19 1.19 0 0 1 2.61 4a1.2 1.2 0 0 1-.785-.284zM1 12h4v4H1v-4zm1 1v2h2v-2H2zM1 6h4v4H1V6zm1 1v2h2V7H2z\"/>\n</symbol><symbol id=\"check-square\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M64,129.99406 C64,128.892771 64.8945138,128 65.9940603,128 L78.0059397,128 C79.1072288,128 80,128.894514 80,129.99406 L80,142.00594 C80,143.107229 79.1054862,144 78.0059397,144 L65.9940603,144 C64.8927712,144 64,143.105486 64,142.00594 L64,129.99406 Z M67.7071068,137.292893 C67.3165825,136.902369 66.6834175,136.902369 66.2928932,137.292893 C65.9023689,137.683418 65.9023689,138.316582 66.2928932,138.707107 L68.2928932,140.707107 C68.6834175,141.097631 69.3165825,141.097631 69.7071068,140.707107 L77.7071068,132.707107 C78.0976311,132.316582 78.0976311,131.683418 77.7071068,131.292893 C77.3165825,130.902369 76.6834175,130.902369 76.2928932,131.292893 L69,138.585786 L67.7071068,137.292893 Z\" transform=\"translate(-64 -128)\"/>\n</symbol><symbol id=\"check\" viewBox=\"0 0 16 16\">\n  <g transform=\"translate(-32 -128)\">\n    <path d=\"M33.7071068,138.292893 C33.3165825,137.902369 32.6834175,137.902369 32.2928932,138.292893 C31.9023689,138.683418 31.9023689,139.316582 32.2928932,139.707107 L35.2928932,142.707107 C35.6834175,143.097631 36.3165825,143.097631 36.7071068,142.707107 L47.7071068,131.707107 C48.0976311,131.316582 48.0976311,130.683418 47.7071068,130.292893 C47.3165825,129.902369 46.6834175,129.902369 46.2928932,130.292893 L36,140.585786 L33.7071068,138.292893 Z\"/>\n  </g>\n</symbol><symbol id=\"circle-filled\" viewBox=\"0 0 16 16\">\n    <circle cx=\"8\" cy=\"8\" r=\"8\" fill-rule=\"evenodd\"/>\n</symbol><symbol id=\"clock\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M136,48 C140.418278,48 144,44.418278 144,40 C144,35.581722 140.418278,32 136,32 C131.581722,32 128,35.581722 128,40 C128,44.418278 131.581722,48 136,48 Z M135,40 C135,40.2652165 135.105357,40.5195704 135.292893,40.7071068 L138.292893,43.7071068 C138.683418,44.0976311 139.316582,44.0976311 139.707107,43.7071068 C140.097631,43.3165825 140.097631,42.6834175 139.707107,42.2928932 L137,39.6004639 L137,36 C137,35.4477153 136.552285,35 136,35 C135.447715,35 135,35.4477153 135,36 L135,40 Z\" transform=\"translate(-128 -32)\"/>\n</symbol><symbol id=\"cloud-happy\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4 6a4 4 0 1 1 8 0 4 4 0 1 1 0 8H4a4 4 0 1 1 0-8zm1 3s0 2 3 2 3-2 3-2H5z\"/>\n</symbol><symbol id=\"cloud\" viewBox=\"0 0 16 16\">\n    \n    <g id=\"16px\" stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\" transform=\"translate(-160.000000, -255.000000)\">\n        <g id=\"slices\" transform=\"translate(32.000000, 32.000000)\"/>\n        <mask id=\"mask-2\" fill=\"white\">\n            <use xlink:href=\"#path-1\"/>\n        </mask>\n        <use id=\"Mask\" xlink:href=\"#path-1\"/>\n    </g>\n</symbol><symbol id=\"collect\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14.56 5.575c.279.756.44 1.571.44 2.425 0 .926-.184 1.807-.51 2.616.309.275.51.678.51 1.134 0 .828-.648 1.5-1.448 1.5a1.4 1.4 0 0 1-.712-.201 6.971 6.971 0 0 1-3.438 1.81C9.246 15.513 8.68 16 8 16c-.68 0-1.246-.487-1.402-1.141a6.971 6.971 0 0 1-3.438-1.81 1.4 1.4 0 0 1-.712.201c-.8 0-1.448-.672-1.448-1.5 0-.456.201-.859.51-1.134A6.979 6.979 0 0 1 1 8c0-.854.161-1.669.44-2.425A1.52 1.52 0 0 1 1 4.5C1 3.671 1.648 3 2.448 3c.194 0 .377.041.546.112a6.98 6.98 0 0 1 3.604-1.971C6.754.487 7.32 0 8 0c.68 0 1.246.487 1.402 1.141a6.98 6.98 0 0 1 3.604 1.971c.169-.071.352-.112.546-.112.8 0 1.448.671 1.448 1.5 0 .422-.169.802-.44 1.075zM2 8c0 .797.159 1.555.44 2.251l.008-.001c.8 0 1.448.671 1.448 1.5 0 .188-.037.365-.097.53.01.011.021.019.032.029a6.226 6.226 0 0 1 8.338 0l.032-.029a1.544 1.544 0 0 1-.097-.53c0-.829.648-1.5 1.448-1.5l.008.001a5.952 5.952 0 0 0 .087-4.261c-.032.002-.063.01-.095.01-.8 0-1.448-.672-1.448-1.5 0-.255.067-.492.175-.702a5.98 5.98 0 0 0-2.977-1.652C9.068 2.649 8.576 3 8 3c-.576 0-1.068-.351-1.302-.854a5.98 5.98 0 0 0-2.977 1.652c.108.21.175.447.175.702 0 .828-.648 1.5-1.448 1.5-.032 0-.063-.008-.095-.01A5.952 5.952 0 0 0 2 8zm6 1.757c-1.439 0-2.607-1.29-2.607-2.878 0-1.59 1.168-2.88 2.607-2.88 1.439 0 2.607 1.29 2.607 2.88 0 1.589-1.168 2.878-2.607 2.878z\"/>\n</symbol><symbol id=\"comment\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 .999A.997.997 0 0 1 1 0h14a1 1 0 0 1 1 .999V12c0 .552-.453.999-.997.999H8l-6 3v-3H1a1 1 0 0 1-1-.999V1zM4 5c0 .556.446 1 .997 1h6.006c.544 0 .997-.448.997-1 0-.556-.446-1-.997-1H4.997C4.453 4 4 4.448 4 5zm0 3c0 .556.444 1 .99 1h4.02A1 1 0 0 0 10 8c0-.556-.444-1-.99-1H4.99A1 1 0 0 0 4 8z\"/>\n</symbol><symbol id=\"company\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M10 0v16H0V0h10zM4 12v-2H2v2h2zm0-4V6H2v2h2zm0-4V2H2v2h2zm4 0V2H6v2h2zm0 4V6H6v2h2zm0 4v-2H6v2h2zm3-8h5v12h-5V4zm3.5 8v-2h-2v2h2zm0-4V6h-2v2h2z\"/>\n</symbol><symbol id=\"compass\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7.864 10.663a2.667 2.667 0 0 0 2.8-2.8l1.22-3.175c.197-.51-.058-.77-.572-.573L8.136 5.337a2.667 2.667 0 0 0-2.8 2.8l-1.22 3.175c-.197.51.058.77.572.573l3.176-1.222zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-6.667a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666z\"/>\n</symbol><symbol id=\"connector\" viewBox=\"0 0 20 27\">\n<title>collect</title>\n<desc>Created with Sketch.</desc>\n<g id=\"_xD83D__xDCE6_-components\">\n\t<g id=\"icons_x2F_apps_x2F_connector-box\" transform=\"translate(-50.000000, -46.000000)\">\n\t\t<g id=\"icons_x2F_connect-data-pastille_x2F_box\" transform=\"translate(40.000000, 40.000000)\">\n\t\t\t<g id=\"collect\" transform=\"translate(10.000000, 6.250000)\">\n\t\t\t\t<g id=\"Combined-Shape\">\n\t\t\t\t\t<path id=\"path-1_1_\" d=\"M9.7,13.2c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1l6.2-5.8c0.1-0.1,0.1-0.2,0.1-0.3\n\t\t\t\t\t\tc0-0.1,0-0.1,0-0.2c-0.1-0.2-0.2-0.3-0.4-0.3h-3V0.4c0-0.2-0.2-0.4-0.4-0.4H7C6.8,0,6.6,0.2,6.6,0.4v6.2H3.8\n\t\t\t\t\t\tc-0.2,0-0.3,0.1-0.4,0.3c0,0.1,0,0.1,0,0.2c0,0.1,0,0.2,0.1,0.3L9.7,13.2z\"/>\n\t\t\t\t</g>\n\t\t\t\t<path id=\"Shape\" d=\"M19.7,11.5l-3.3-1.6l-1.8,1.7l2.9,1.4L10,16.7l-7.5-3.7l2.9-1.4L3.6,9.8l-3.3,1.6C0.1,11.6,0,11.8,0,12v9.3\n\t\t\t\t\tc0,0.2,0.1,0.5,0.3,0.6l9.4,4.7c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1l9.4-4.7c0.2-0.1,0.3-0.3,0.3-0.6V12\n\t\t\t\t\tC20,11.8,19.9,11.6,19.7,11.5z\"/>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</g>\n</symbol><symbol id=\"contract\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M12.5 4h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3h-9a.5.5 0 0 1 0-1h9a.5.5 0 0 1 0 1zm0 3h-9a.5.5 0 0 1 0-1h9a.5.5 0 0 1 0 1zM3 5V2h4v6L5 6 3 8V5zm11-5H2c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z\"/>\n</symbol><symbol id=\"contrast\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M12.444 11.111H8v1.333h4.444v-1.333zM14 14H2L14 2v12zM2.222 4H4V2.222h1.333V4h1.778v1.333H5.333v1.778H4V5.333H2.222V4zm12-4H1.778C.79 0 0 .791 0 1.778v12.444C0 15.204.796 16 1.778 16h12.444c.982 0 1.778-.796 1.778-1.778V1.778C16 .79 15.2 0 14.222 0z\"/>\n</symbol><symbol id=\"cozy-laugh\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4 6a4 4 0 1 1 8 0 4 4 0 1 1 0 8H4a4 4 0 1 1 0-8zm1 3s0 2 3 2 3-2 3-2H5z\"/>\n</symbol><symbol id=\"cozy-text\" viewBox=\"0 0 52 19\"><path d=\"M10.277 3.262c-.067.084-.143.16-.227.227a.516.516 0 01-.319.085.756.756 0 01-.436-.162 5.113 5.113 0 00-1.404-.702c-.325-.109-.725-.163-1.202-.163-.624 0-1.174.113-1.651.338-.47.219-.878.55-1.19.962-.316.416-.556.923-.721 1.521a7.592 7.592 0 00-.247 2.015c0 .771.087 1.458.26 2.06.173.603.42 1.11.741 1.521.32.412.71.724 1.17.937.46.212.97.318 1.534.318.546 0 .997-.067 1.352-.202.355-.134.65-.279.884-.435a5.93 5.93 0 00.585-.436c.156-.134.316-.201.481-.201.208 0 .368.078.481.234l.728.936a4.903 4.903 0 01-1.02.949 5.85 5.85 0 01-1.203.637c-.43.166-.877.288-1.332.364a8.488 8.488 0 01-1.411.117 5.846 5.846 0 01-2.308-.455 5.228 5.228 0 01-1.858-1.326c-.525-.58-.939-1.293-1.242-2.139C.419 9.417.267 8.458.267 7.383c0-.98.136-1.885.41-2.717a6.046 6.046 0 011.209-2.151 5.588 5.588 0 011.969-1.418C4.635.755 5.528.584 6.533.584c.945 0 1.777.152 2.496.455.72.303 1.36.732 1.924 1.287l-.676.936zM19.091.584c.97 0 1.848.158 2.633.474.76.3 1.444.767 2.001 1.366.55.593.973 1.308 1.268 2.145.295.836.442 1.774.442 2.814s-.147 1.98-.442 2.821c-.295.84-.717 1.556-1.267 2.145a5.527 5.527 0 01-2.002 1.358c-.785.317-1.662.475-2.633.475-.98 0-1.861-.158-2.645-.474a5.59 5.59 0 01-2.009-1.359c-.555-.59-.981-1.304-1.28-2.145-.3-.84-.449-1.781-.449-2.821 0-1.04.15-1.978.449-2.814a6.11 6.11 0 011.28-2.146 5.55 5.55 0 012.008-1.365c.785-.316 1.667-.474 2.646-.474zm0 11.622c1.248 0 2.18-.42 2.795-1.261.615-.84.923-2.024.923-3.549s-.308-2.71-.923-3.556c-.615-.845-1.547-1.267-2.795-1.267-1.265 0-2.208.422-2.828 1.267-.62.846-.929 2.03-.929 3.556 0 1.525.31 2.708.93 3.549.62.84 1.562 1.261 2.827 1.261zM37.46 1.858c0 .182-.032.36-.097.533-.066.173-.15.32-.254.442l-6.929 9.178h7.046V14H27.203v-1.066c0-.121.03-.266.091-.436.06-.169.147-.327.26-.474l6.968-9.243h-6.916V.792h9.854v1.066zM51.604.792l-7.332 17.043a1.07 1.07 0 01-.312.442c-.13.104-.32.156-.572.156h-1.885l2.418-5.265L38.5.792h2.21c.217 0 .386.052.507.156a.906.906 0 01.26.351l3.354 7.93c.07.2.136.4.201.605.064.199.118.4.163.604.12-.413.26-.821.416-1.222l3.237-7.917a.84.84 0 01.286-.364.73.73 0 01.442-.143h2.028z\" fill-rule=\"nonzero\"/></symbol><symbol id=\"credit-card-add\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 11.003l3-.001c0 .702.127 1.372.35 1.998H1.996A2.003 2.003 0 0 1 0 11.003V1.997C0 .898.9 0 1.997 0h12.006C15.101 0 16 .898 16 1.997v5.689a6.031 6.031 0 0 0-1.999-1.876V6H1.998L2 11.003zM1.997 2v1H14V2H1.997zM11 8h2v3h3v2h-3v3h-2v-3H8v-2h3V8z\"/>\n</symbol><symbol id=\"credit-card\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 8v5h12V4H2v1h12v3H2zm0-6h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\"/>\n</symbol><symbol id=\"credit\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M3.414 10H11a1 1 0 0 1 0 2H3.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414L3.414 10z\" opacity=\".322\"/>\n        <path d=\"M12.586 4l-1.293-1.293a1 1 0 1 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L12.586 6H5a1 1 0 1 1 0-2h7.586z\"/>\n    </g>\n</symbol><symbol id=\"crop\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4 15v1H0v-4h1V4H0V0h4v1h8V0h4v4h-1v8h1v4h-4v-1H4zm0-2h8v-1h1V4h-1V3H4v1H3v8h1v1zM1 1v2h2V1H1zm12 0v2h2V1h-2zm0 12v2h2v-2h-2zM1 13v2h2v-2H1z\"/>\n</symbol><symbol id=\"cross-circle\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM5.707 4.293l-.094-.083a1 1 0 0 0-1.226 0l-.094.083-.083.094-.07.102c-.206.345-.185.788.062 1.114l.09.104L6.586 8l-2.292 2.293a1 1 0 0 0 1.32 1.497l.094-.083L8 9.415l2.293 2.292.094.083a1 1 0 0 0 1.226 0l.094-.083.083-.094a1 1 0 0 0 0-1.226l-.083-.094L9.415 8l2.292-2.293a1 1 0 0 0-1.32-1.497l-.094.083L8 6.585 5.707 4.293l-.094-.083.094.083z\"/>\n</symbol><symbol id=\"cross-medium\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M8 6.59l5.3-5.3a1 1 0 0 1 1.4 1.42L9.42 8l5.3 5.3a1 1 0 0 1-1.42 1.4L8 9.42l-5.3 5.3a1 1 0 1 1-1.4-1.42L6.58 8l-5.3-5.3A1 1 0 1 1 2.7 1.3L8 6.58z\"/>\n</symbol><symbol id=\"cross-small\" viewBox=\"0 0 12 12\">\n  <path d=\"M6 4.59l2.3-2.3a1 1 0 0 1 1.4 1.42L7.42 6l2.3 2.3A1 1 0 1 1 8.3 9.7L6 7.42l-2.3 2.3A1 1 0 1 1 2.3 8.3L4.58 6l-2.3-2.3A1 1 0 0 1 3.7 2.3L6 4.58z\"/>\n</symbol><symbol id=\"cross\" viewBox=\"0 0 24 24\">\n  <path fill-rule=\"evenodd\" d=\"M106.585786,44 L96.2928932,33.7071068 C95.9023689,33.3165825 95.9023689,32.6834175 96.2928932,32.2928932 C96.6834175,31.9023689 97.3165825,31.9023689 97.7071068,32.2928932 L108,42.5857864 L118.292893,32.2928932 C118.683418,31.9023689 119.316582,31.9023689 119.707107,32.2928932 C120.097631,32.6834175 120.097631,33.3165825 119.707107,33.7071068 L109.414214,44 L119.707107,54.2928932 C120.097631,54.6834175 120.097631,55.3165825 119.707107,55.7071068 C119.316582,56.0976311 118.683418,56.0976311 118.292893,55.7071068 L108,45.4142136 L97.7071068,55.7071068 C97.3165825,56.0976311 96.6834175,56.0976311 96.2928932,55.7071068 C95.9023689,55.3165825 95.9023689,54.6834175 96.2928932,54.2928932 L106.585786,44 Z\" transform=\"translate(-96 -32)\"/>\n</symbol><symbol id=\"cube\" viewBox=\"0 0 16 16\">\n  <path d=\"M1,11.0086308 L1,5.50051502 C1,4.95127159 1.3905874,4.72776572 1.87240137,5.00308799 L7.12759863,8.00605786 C7.60359323,8.27805477 8,8.95047139 8,9.50051502 L8,15.0086308 C8,15.5578743 7.6094126,15.7813801 7.12759863,15.5060579 L1.87240137,12.503088 C1.39640677,12.2310911 1,11.5586745 1,11.0086308 Z M16,11.0086308 C16,11.5586745 15.6035932,12.2310911 15.1275986,12.503088 L9.87240137,15.5060579 C9.3905874,15.7813801 9,15.5578743 9,15.0086308 L9,9.50051502 C9,8.95047139 9.39640677,8.27805477 9.87240137,8.00605786 L15.1275986,5.00308799 C15.6094126,4.72776572 16,4.95127159 16,5.50051502 L16,11.0086308 Z M9.34976149,6.98164278 C8.88045118,7.27044912 8.11286116,7.26633364 7.65023851,6.98164278 L2.84976149,4.02750307 C2.38045118,3.73869673 2.38713884,3.29611355 2.87661892,3.03254735 L7.62338108,0.476598498 C8.10752434,0.215905973 8.88713884,0.213032303 9.37661892,0.476598498 L14.1233811,3.03254735 C14.6075243,3.29323988 14.6128612,3.74281221 14.1502385,4.02750307 L9.34976149,6.98164278 Z\" id=\"path-1\"/>\n</symbol><symbol id=\"dashboard\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M9.118 10h4.532S14 8.722 14 8A6 6 0 1 0 2 8c0 .705.345 2 .345 2h4.537l2.224-4.447a1 1 0 0 1 1.788.894L9.118 10zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\"/>\n</symbol><symbol id=\"dash\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 7h12a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2z\"/>\n</symbol><symbol id=\"data-control\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14.792.198A.625.625 0 0 1 15 .667v7.999c0 .598-.122 1.189-.366 1.776a6.574 6.574 0 0 1-.909 1.564c-.361.454-.79.896-1.289 1.328a14.745 14.745 0 0 1-2.708 1.88 19.53 19.53 0 0 1-.979.515c-.193.09-.348.161-.465.208A.646.646 0 0 1 8 16a.643.643 0 0 1-.284-.063 9.866 9.866 0 0 1-.465-.208 19 19 0 0 1-.98-.515 14.743 14.743 0 0 1-2.707-1.88 10.006 10.006 0 0 1-1.29-1.328 6.538 6.538 0 0 1-.908-1.564A4.588 4.588 0 0 1 1 8.666V.667c0-.181.069-.337.208-.469A.69.69 0 0 1 1.7 0h12.6a.69.69 0 0 1 .492.198zM5 6.998a1 1 0 1 0 2 0V4.414l.293.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-1.999-2a1 1 0 0 0-1.416 0l-1.999 2a.999.999 0 1 0 1.414 1.414L5 4.413v2.586zm5.708 5.708l1.999-1.999a.999.999 0 1 0-1.414-1.414L11 9.586V7a1 1 0 1 0-2 0v2.586l-.293-.293a.999.999 0 1 0-1.414 1.414l1.999 1.999a.99.99 0 0 0 .326.217.991.991 0 0 0 1.09-.217z\"/>\n</symbol><symbol id=\"debit\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M3.414 10H11a1 1 0 0 1 0 2H3.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L3.414 10z\"/>\n        <path d=\"M12.586 4l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L12.586 6H5a1 1 0 1 1 0-2h7.586z\" opacity=\".316\"/>\n    </g>\n</symbol><symbol id=\"devices\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M9.734 5.995c0-.55.45-.995.99-.995h4.02a1 1 0 0 1 .99.995v8.01c0 .55-.451.995-.99.995h-4.02a1 1 0 0 1-.99-.995v-8.01zm2 1.005v6h2V7h-2zm-11-5.002c0-.551.447-.998.998-.998h11.003c.552 0 .999.444.999 1v1h-11v6h5v4H.73c-.55 0-.858-.417-.68-.95L.733 10V1.998z\"/>\n</symbol><symbol id=\"dots\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M34,74 C35.1045695,74 36,73.1045695 36,72 C36,70.8954305 35.1045695,70 34,70 C32.8954305,70 32,70.8954305 32,72 C32,73.1045695 32.8954305,74 34,74 Z M46,74 C47.1045695,74 48,73.1045695 48,72 C48,70.8954305 47.1045695,70 46,70 C44.8954305,70 44,70.8954305 44,72 C44,73.1045695 44.8954305,74 46,74 Z M40,74 C41.1045695,74 42,73.1045695 42,72 C42,70.8954305 41.1045695,70 40,70 C38.8954305,70 38,70.8954305 38,72 C38,73.1045695 38.8954305,74 40,74 Z\" transform=\"translate(-32 -64)\"/>\n</symbol><symbol id=\"download\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M231,103.414214 L229.707107,104.707107 C229.316582,105.097631 228.683418,105.097631 228.292893,104.707107 C227.902369,104.316582 227.902369,103.683418 228.292893,103.292893 L231.292893,100.292893 C231.683418,99.9023689 232.316582,99.9023689 232.707107,100.292893 L235.707107,103.292893 C236.097631,103.683418 236.097631,104.316582 235.707107,104.707107 C235.316582,105.097631 234.683418,105.097631 234.292893,104.707107 L233,103.414214 L233,111 C233,111.552285 232.552285,112 232,112 C231.447715,112 231,111.552285 231,111 L231,103.414214 Z M225,99 L239,99 C239.552285,99 240,98.5522847 240,98 C240,97.4477153 239.552285,97 239,97 L225,97 C224.447715,97 224,97.4477153 224,98 C224,98.5522847 224.447715,99 225,99 Z\" transform=\"matrix(1 0 0 -1 -224 113)\"/>\n</symbol><symbol id=\"down\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M5 0v8H0l8 8 8-8h-5V0z\"/>\n</symbol><symbol id=\"drawing-arrow-up\" viewBox=\"0 0 40 36\"><path d=\"M4.008 0l.07.12h.034l.047.016.035.02.029.026L5.945 2.19l1.153 1.326a92.633 92.633 0 002.778 3.052l.676.698.494.5.406.425 1.622 1.768.586.626.526.541c1.012 1.016 1.834 1.682 2.53 2.004.228.105.264.525.03.609-2.223.79-4.188.908-5.798-.02l-.208-.127.126.463c1.819 6.009 6.042 10.741 12.236 14.28 5.583 3.188 11.23 4.584 16.135 3.567l.385-.085.094.014.037.017c.182.106.27.239.242.39a.456.456 0 01-.17.258l-.075.06-.22.096-.571.264-.49.184-.966.352c-8.112 2.89-13.91 3.289-19.627.42-6.312-3.166-11.194-10.25-12.474-17.744l-.066-.409-.059-.41c-.896 1.616-2.631 2.519-4.937 2.987-.242.049-.432-.327-.292-.536.427-.636.768-1.589 1.102-2.989l.072-.307.143-.656.545-2.778.054-.263.101-.469.233-1.004.195-.89c.191-.897.371-1.826.562-2.9l.097-.548.228-1.339.54-3.351.017-.048.007-.011.037-.049.033-.018L4.008 0zm1.885 13.409H5.85l.019.04.015.043.1.364.068.258.218.904.264.778.76 2.311.269.801.296.858c.722 2.046 1.311 3.398 2.093 4.736l.159.268.286.461c2.357 3.705 5.486 6.507 9.028 7.886 5.467 2.129 11.574 1.933 17.96-.202a19.56 19.56 0 01-4.353-.009l-.554-.069 2.21.854-.845.179-2.074-.708-1.449-.507-1.723-.615-1.912-.694-9.578-3.53-4.485-1.636-1.849-.686-.084-.087-.176-.263-.282-.456-.182-.301.799.296 1.26.311c1.263.319 2.533.656 3.807 1.011l1.276.362-1.1-.462-1.531-.651-.596-.248a51.461 51.461 0 00-4.401-1.596 3.325 3.325 0 01-.21-.346l-.056-.107-.186-.395-.136-.299-.236-.541 1.625.525c.909.301 1.81.611 2.703.93l1.335.487 1.324.5-.4-.398c-.392-.4-.766-.806-1.12-1.219a81.77 81.77 0 00-4.845-1.181l-.77-.155-.091-.075-.216-.552.138-.164.692.134c.926.186 1.873.4 2.855.646l.743.19-4.78-1.886-.07-.074-.298-.863 5.155 2.05-.269-.388a17.112 17.112 0 01-.488-.77l-.225-.385-4.295-1.052-.086-.08-.182-.55.147-.158 3.975 1.01-.154-.314-.147-.316L6.76 16l-.072-.075-.317-.928-.017-.071.16-.143 3.877 1.328-.052-.108-.054-.116-.052-.123-4.077-1.816-.068-.08-.102-.377-.02-.042a.114.114 0 00-.074-.041zm5.059 12.397l20.87 8.426-.467.06-.54.064-.175.019.01.002-.328.028-.699.053-.44.025-.448.018-14.502-4.91-.202-.181-.355-.334-.31-.31-.354-.365 15.16 5.138-16.368-6.602a9.298 9.298 0 01-.32-.396l-.145-.194-.387-.54zm3.377 3.921l10.263 4.59-1.006-.185a22.441 22.441 0 01-2.129-.495l-.516-.154-3.883-1.735a17.885 17.885 0 01-1.634-1.13l-.388-.31-.707-.58zm2.994-2.561l3.456 1.309 1.2.445-.55-.337-.537-.343a178.07 178.07 0 00-2.38-.725l-1.189-.35zm-3.95-3.095l1.634.654 1.182.46 1.144.434-.059-.05-1.297-.515-.653-.253-.655-.25-1.296-.48zm2.353.093l.188.179.308.122-.193-.183-.303-.118zm-3.014-2.773l.767.302.217.061-.1-.126-.884-.237zm.181-.703l-.174-.07.11.15.17.069-.106-.15zM4.286.98l.01.736c.025 4.164-.555 8.238-1.67 11.907-.282.93-.622 1.812-.973 2.51l-.132.252-.13.231.07-.112.155-.266.082-.151.083-.16.14-.064.563.142.003-.02c.003-.011.008-.019.022-.029l.075-.043.229-.126.394-.226a6.22 6.22 0 00.74-.501l.125-.104-1.502-.587-.072-.156.106-.304.096-.297.158-.08 1.934.664.133-.184.128-.195.115-.317-2.058-.934-.068-.144.128-.46.016-.007-.01-.02.109-.459.157-.088 5.586 1.78-.676-.332-.256-.123-.823-.386-3.508-1.599-.182-.084-.069-.137.1-.52.173-.088 1.108.509c.61.282 1.227.57 1.853.865l.946.447 1.786.849-.022-.258v-.061l.01-.059-5.666-2.69-.068-.134.088-.462.174-.09 8.563 4.06.21.003.22-.001 1.116-.039.197-.005c.25-.005.46-.003.658.007a11.406 11.406 0 01-1.465-.966l-.266-.206-9.278-2.92-.085-.136.07-.459.158-.099 7.777 2.445-.342-.32-.335-.323L8.732 8.76 4.21 6.73l-.072-.125.05-.466.173-.1 5.495 2.454-.096-.102-.522-.575a38.552 38.552 0 01-1.011-1.183c-.993-.31-2.03-.623-3.085-.919l-.793-.218-.09-.13.031-.457.082-.06-.07-.113.032-.48.17-.107 2.637 1.113-.116-.152-.396-.538-.385-.54-.586-.144-1.2-.306-.093-.124.018-.642.156-.116.854.248.142.042-.273-.421-.255-.02-.256-.036-.253-.042-.103-.122-.004-.337.06-.05-.061-.086-.005-.338.16-.119-.26-.44zm5.632 13.887l.04.13.074.034.032-.011-.032-.1-.114-.053zm-4.894-2.221l4.894 2.22-.026-.084-.085-.316-.077-.322-4.706-1.498zm4.456-.077l.012.12.448.21-.356-.17-.014-.12-.09-.04zm.767-.46l.104.092.233.195.14.11-.121-.098a6.117 6.117 0 01-.307-.27.137.137 0 00-.049-.028z\"/></symbol><symbol id=\"dropdown-close\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 8c0-4.416 3.584-8 8-8s8 3.584 8 8-3.584 8-8 8-8-3.584-8-8zm6.293 2.293a1 1 0 0 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414l-3-3a1 1 0 0 0-1.414 1.414L8.586 8l-2.293 2.293z\"/>\n</symbol><symbol id=\"dropdown-open\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 0c4.416 0 8 3.584 8 8s-3.584 8-8 8-8-3.584-8-8 3.584-8 8-8zM5.707 6.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 1 0-1.414-1.414L8 8.586 5.707 6.293z\"/>\n</symbol><symbol id=\"dropdown\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 5h12l-6 7z\"/>\n</symbol><symbol id=\"dropup\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14 12H2l6-7z\"/>\n</symbol><symbol id=\"email-notification\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14 5.95V6v-.05a2.5 2.5 0 1 1 0 0zM10.073 4c.222 1.418.95 2.336 2.18 2.748L7 9 0 6V5c0-.552.45-1 1.007-1h9.066zM0 8l7 3 7-3v5.997c0 .554-.45 1.003-1.007 1.003H1.007A.998.998 0 0 1 0 13.997V8z\"/>\n</symbol><symbol id=\"email\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 2.999A.998.998 0 0 1 1 2h14c.552 0 1 .443 1 .999V5L8 8 0 5V2.999zM0 7l8 3 8-3v7.003c0 .55-.445.997-1 .997H1c-.552 0-1-.453-1-.997V7z\"/>\n</symbol><symbol id=\"euro\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14.684 2.904C13.518 1.232 12 0 9.316 0 6.192 0 3.948 2.134 3.068 5.104H1v1.87h1.716c-.044.33-.044.682-.044 1.012 0 .286 0 .572.022.836H1v1.892h2.002c.858 3.124 3.146 5.214 6.402 5.214 2.508 0 4.07-1.276 5.324-3.102l-1.936-1.43c-1.012 1.342-1.892 2.112-3.366 2.112-1.716 0-2.97-1.056-3.586-2.794h4.752V8.822h-5.17C5.4 8.536 5.4 8.25 5.4 7.942c0-.33 0-.66.044-.968h5.148v-1.87h-4.73C6.478 3.454 7.688 2.42 9.25 2.42c1.54 0 2.442.704 3.388 2.002l2.046-1.518z\"/>\n</symbol><symbol id=\"eu\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2.343 2.343l1.227.625.974-.973-.216 1.36 1.227.625-1.36.215-.215 1.36-.625-1.227-1.36.216.973-.974-.625-1.227zM8 0l.426 1.31h1.376l-1.114.809.426 1.31L8 2.619l-1.114.81.425-1.31-1.114-.81h1.377L8 0zM1.31 7.574V6.197l.809 1.114 1.31-.425L2.619 8l.81 1.114-1.31-.426-.81 1.114V8.425L0 8l1.31-.426zm1.033 6.083l.625-1.227-.973-.974 1.36.216.625-1.227.215 1.36 1.36.215-1.227.625.216 1.36-.974-.973-1.227.625zm11.314 0l-1.227-.625-.974.973.216-1.36-1.227-.625 1.36-.215.215-1.36.625 1.227 1.36-.216-.973.974.625 1.227zM8 13.38l1.114-.81-.426 1.31 1.114.81H8.425L8 16l-.426-1.31H6.197l1.115-.809-.426-1.31 1.114.81zm5.881-6.07l.81-1.114v1.377L16 8l-1.31.425v1.377l-.809-1.114-1.31.426.81-1.114-.81-1.114 1.31.425zm-.224-4.968l-.625 1.227.973.974-1.36-.216-.625 1.227-.215-1.36-1.36-.215 1.227-.625-.216-1.36.974.973 1.227-.625z\"/>\n</symbol><symbol id=\"exchange\" viewBox=\"0 0 20 20\">\n<g id=\"Mask\">\n\t<path id=\"path-1_1_\" d=\"M4.3,12.5h9.5c0.7,0,1.2,0.6,1.2,1.2S14.4,15,13.8,15H4.3l1.6,1.6c0.5,0.5,0.5,1.3,0,1.8\n\t\tc-0.5,0.5-1.3,0.5-1.8,0l-3.8-3.8c-0.5-0.5-0.5-1.3,0-1.8l3.8-3.8c0.5-0.5,1.3-0.5,1.8,0s0.5,1.3,0,1.8L4.3,12.5z M15.7,7.5H6.2\n\t\tC5.6,7.5,5,6.9,5,6.2S5.6,5,6.2,5h9.5l-1.6-1.6c-0.5-0.5-0.5-1.3,0-1.8s1.3-0.5,1.8,0l3.8,3.8c0.5,0.5,0.5,1.3,0,1.8l-3.8,3.8\n\t\tc-0.5,0.5-1.3,0.5-1.8,0s-0.5-1.3,0-1.8L15.7,7.5z\"/>\n</g>\n</symbol><symbol id=\"eye-closed\" viewBox=\"0 0 20 20\">\n  <g fill-rule=\"evenodd\" transform=\"translate(1 4)\">\n    <path d=\"M0,6 C0,6 3,-4.8985872e-16 9,0 C15,4.89858741e-16 18,6 18,6 C18,6 15,12 9,12 C3,12 0,6 0,6 Z M9,10 C11.2091391,10 13,8.20913911 13,6 C13,3.79086089 11.2091391,2 9,2 C6.79086089,2 5,3.79086089 5,6 C5,8.20913911 6.79086089,10 9,10 Z M9,8 C10.1045696,8 11,7.10456955 11,6 C11,4.89543045 10.1045696,4 9,4 C7.89543045,4 7,4.89543045 7,6 C7,7.10456955 7.89543045,8 9,8 Z\"/>\n    <path stroke=\"#FFFFFF\" stroke-width=\"4\" d=\"M2,13 L16,0\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <path transform=\"translate(-1 -4)\" d=\"M16.32,3.267c0.966,-0.832 2.311,0.514 1.36,1.466l-14,13c-0.992,0.854 -2.31,-0.516 -1.36,-1.466l14,-13Z\" style=\"fill-rule:nonzero;\"/>\n  </g>\n</symbol><symbol id=\"eye\" viewBox=\"0 0 20 20\">\n  <path fill-rule=\"evenodd\" d=\"M21,10 C21,10 24,4 30,4 C36,4 39,10 39,10 C39,10 36,16 30,16 C24,16 21,10 21,10 Z M30,14 C32.2091391,14 34,12.2091391 34,10 C34,7.79086089 32.2091391,6 30,6 C27.7908609,6 26,7.79086089 26,10 C26,12.2091391 27.7908609,14 30,14 Z M30,12 C31.1045696,12 32,11.1045696 32,10 C32,8.89543045 31.1045696,8 30,8 C28.8954304,8 28,8.89543045 28,10 C28,11.1045696 28.8954304,12 30,12 Z\" transform=\"translate(-20)\"/>\n</symbol><symbol id=\"file-add\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M1 1c0-.552.446-1 .998-1H10v5h5v10.004a1 1 0 0 1-1.007.996H2.007A1.002 1.002 0 0 1 1 15V1zm10 3V0l4 4h-4zM7 6v3H4v2h3v3h2v-3h3V9H9V6H7z\"/>\n</symbol><symbol id=\"file-duotone\" viewBox=\"0 0 26 32\">\n    <g id=\"files-colored\" fill-rule=\"evenodd\">\n        <g id=\"Path-files-colored\">\n            <path d=\"M-5.99272714e-05,2.002 C-5.99272714e-05,0.896 0.89,0 1.997,0 L19,0 L26.0000198,7 L26.0000198,29.996 C26.0010618,30.5266063 25.7912287,31.0358875 25.4166897,31.4117394 C25.0421506,31.7875913 24.5336067,31.9992052 24.003,32 L1.997,32 C1.46633154,32.0005353 0.957317,31.7896225 0.582547003,31.4139142 C0.207777006,31.0382058 -0.00186226549,30.5286655 -5.99272714e-05,29.998 C0.0481256825,16.0000829 -5.99272714e-05,16 -5.99272714e-05,2.002 Z\" fill=\"#FFFFFF\"/>\n            <path d=\"M18.5,0 C18.224,0 18,0.23 18,0.5 L18,8 L25.5,8 C25.776,8 26,7.768 26,7.5 L26,7 L19,0 L18.5,0 Z\" fill=\"#FFFFFF\"/>\n            <path d=\"M0,2.002 C0,0.896 0.890059927,0 1.99705993,0 L19.0000599,0 L26.0000797,7 L26.0000797,29.996 C26.0011217,30.5266063 25.7912886,31.0358875 25.4167496,31.4117394 C25.0422105,31.7875913 24.5336667,31.9992052 24.0030599,32 L1.99705993,32 C1.46639147,32.0005353 0.957376927,31.7896225 0.58260693,31.4139142 C0.207836933,31.0382058 -0.00180233822,30.5286655 0,29.998 C0.0481856097,16.0000829 0,16 0,2.002 Z\" opacity=\"0.242466518\"/>\n            <path d=\"M18.5000599,0 C18.2240599,0 18.0000599,0.23 18.0000599,0.5 L18.0000599,8 L25.5000599,8 C25.7760599,8 26.0000599,7.768 26.0000599,7.5 L26.0000599,7 L19.0000599,0 L18.5000599,0 Z\"/>\n        </g>\n    </g>\n</symbol><symbol id=\"file-new\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M1 1c0-.552.446-1 .998-1H10v5h5v10.004a1 1 0 0 1-1.007.996H2.007A1.002 1.002 0 0 1 1 15V1zm10 3V0l4 4h-4zM7 6v3H4v2h3v3h2v-3h3V9H9V6H7z\"/>\n</symbol><symbol id=\"file-none\" viewBox=\"0 0 16 16\">\n  \n  <g fill-rule=\"evenodd\">\n    <use xlink:href=\"#file-none-a\"/>\n  </g>\n</symbol><symbol id=\"file-outline\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13 5h-3V2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5zm2-.999v11.003a1 1 0 0 1-1.007.996H2.007A1.001 1.001 0 0 1 1 14.999V1.001A.999.999 0 0 1 1.998 0H11l4 4.001z\"/>\n</symbol><symbol id=\"file\" viewBox=\"0 0 16 16\">\n  \n  <g fill-rule=\"evenodd\">\n    <use xlink:href=\"#file-a\"/>\n  </g>\n</symbol><symbol id=\"filter\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 0h12a1 1 0 0 1 1 1v.581a1 1 0 0 1-.299.713L10 6.92V16l-4-3.09v-6L1.3 2.294A1 1 0 0 1 1 1.58V1a1 1 0 0 1 1-1z\"/>\n</symbol><symbol id=\"fingerprint\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M15.904 3.955a.513.513 0 0 1-.123.72.512.512 0 0 1-.721-.124 8.208 8.208 0 0 0-2.958-2.566C9.6.703 6.377.706 3.89 1.995A8.29 8.29 0 0 0 .921 4.578a.455.455 0 0 1-.404.215.534.534 0 0 1-.296-.09.504.504 0 0 1-.213-.33.525.525 0 0 1 .087-.393 9.187 9.187 0 0 1 3.33-2.903c2.78-1.435 6.372-1.437 9.15-.009a9.208 9.208 0 0 1 3.33 2.886zM7.97 2.091c4.048 0 7.341 3.127 7.341 6.972 0 1.468-1.25 2.663-2.787 2.663s-2.787-1.195-2.787-2.663c0-.902-.789-1.635-1.758-1.635S6.22 8.161 6.22 9.063a5.48 5.48 0 0 0 1.625 3.918c.831.822 1.63 1.275 2.848 1.611.13.034.24.118.308.235a.517.517 0 0 1 .052.394.499.499 0 0 1-.485.39.58.58 0 0 1-.133-.02c-1.41-.39-2.339-.915-3.31-1.869a6.508 6.508 0 0 1-1.935-4.65c0-1.469 1.251-2.665 2.788-2.665s2.787 1.196 2.787 2.664c0 .901.79 1.634 1.758 1.634.97 0 1.758-.733 1.758-1.634 0-3.276-2.832-5.94-6.312-5.94-2.479 0-4.738 1.375-5.755 3.505-.34.708-.513 1.527-.513 2.435 0 .684.061 1.754.586 3.154a.507.507 0 0 1-.013.4.492.492 0 0 1-.288.26.508.508 0 0 1-.658-.3A9.877 9.877 0 0 1 .681 9.07c0-1.065.204-2.037.606-2.886C2.473 3.698 5.095 2.091 7.97 2.091zM4.784 12.426c.55.988.933 1.422 1.618 2.116a.53.53 0 0 1 0 .728.564.564 0 0 1-.38.156.487.487 0 0 1-.363-.158c-.765-.764-1.183-1.259-1.78-2.339-.611-1.089-.934-2.423-.934-3.858 0-2.659 2.27-4.822 5.06-4.822 2.79 0 5.06 2.163 5.06 4.822a.51.51 0 0 1-.515.515.51.51 0 0 1-.515-.515c0-2.09-1.808-3.792-4.03-3.792-2.222 0-4.03 1.701-4.03 3.792 0 1.256.279 2.417.809 3.355zm8.458.245a.503.503 0 0 1 .38.082.525.525 0 0 1 .217.338.517.517 0 0 1-.423.598 6.024 6.024 0 0 1-1.078.107c-1.069 0-2-.268-2.773-.797-1.332-.904-2.129-2.372-2.129-3.928a.51.51 0 0 1 .515-.515.51.51 0 0 1 .515.515c0 1.22.627 2.37 1.676 3.074.61.413 1.33.613 2.196.613.187 0 .535-.023.904-.087z\"/>\n</symbol><symbol id=\"flag-outlined\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8.98 2H15v10H8l-.979-2H3v6H1V0h7l.98 2zM3 8h5l1.03 2H13V4H8L6.997 2H3v6z\"/>\n</symbol><symbol id=\"flag\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8.98 2L8 0H1v16h2v-6h4.021L8 12h7V2z\"/>\n</symbol><symbol id=\"flash-auto\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13.714 0L16 7h-1.357l-.5-1.556h-2.286L11.357 7H10l2.286-7h1.428zM12.18 4.1h1.642L13 1.453 12.179 4.1zM2 0h7L6 7h3l-5 9V8H2V0z\"/>\n</symbol><symbol id=\"flashlight\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M6 7.003L3 3h10l-3 4.003H6zM13 2H3V0h10v2zM6 16V7h4v9H6z\"/>\n</symbol><symbol id=\"folder-add\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 2.007C0 1.45.451 1 .99 1H5.51c.271 0 .648.157.84.348l1.303 1.304c.192.192.579.348.848.348h6.503c.55 0 .997.456.997 1.002v8.99C16 14.1 15.105 15 14.006 15H1.994A2 2 0 0 1 0 12.994V2.007zM9 5v3H6v2h3v3h2v-3h3V8h-3V5H9z\"/>\n</symbol><symbol id=\"folder\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-32 -32)\">\n    <path d=\"M32,34.0068455 C32,33.4507801 32.4509752,33 32.990778,33 L37.5089948,33 C37.7801695,33 38.1569366,33.1569366 38.3483734,33.3483734 L39.6516266,34.6516266 C39.8440279,34.8440279 40.2307968,35 40.5004358,35 L47.0029699,35 C47.5536144,35 48,35.455761 48,36.0024733 L48,44.9914698 C48,46.1007504 47.1054862,47 46.0059397,47 L33.9940603,47 C32.8927712,47 32,46.1029399 32,44.9941413 L32,34.0068455 Z M32,37 L48,37 L48,38 L32,38 L32,37 Z\"/>\n    <path d=\"M32,34.0068455 C32,33.4507801 32.4509752,33 32.990778,33 L37.5089948,33 C37.7801695,33 38.1569366,33.1569366 38.3483734,33.3483734 L39.6516266,34.6516266 C39.8440279,34.8440279 40.2307968,35 40.5004358,35 L47.0029699,35 C47.5536144,35 48,35.455761 48,36.0024733 L48,44.9914698 C48,46.1007504 47.1054862,47 46.0059397,47 L33.9940603,47 C32.8927712,47 32,46.1029399 32,44.9941413 L32,34.0068455 Z M32,37 L48,37 L48,38 L32,38 L32,37 Z\"/>\n  </g>\n</symbol><symbol id=\"forbidden\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3.11 4.523a6 6 0 0 0 8.367 8.367L3.109 4.524zM4.522 3.11l8.368 8.368A6 6 0 0 0 4.524 3.11zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\"/>\n</symbol><symbol id=\"from-user\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M11 0h5v5l-1.793-1.793-2.451 2.452-.265-.149c-.264 1.889-1.706 3.338-3.46 3.338-1.941 0-3.515-1.771-3.515-3.955C4.516 2.708 6.09.937 8.031.937c.191 0 .373.031.555.063l1 1-1.793 1.793 1.414 1.414 1.995-1.995c.018.041.026.088.041.131l1.55-1.55L11 0zm.547 9.727c1.758 0 3.516 2.637 3.516 3.516s0 1.757-.88 1.757H1.88c-.88 0-.88-.878-.88-1.757 0-.88 1.759-3.516 3.517-3.516s.879.879 3.515.879c2.637 0 1.758-.88 3.516-.88z\"/>\n</symbol><symbol id=\"gear\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-224 -32)\">\n    <path d=\"M238.249356,39.0782973 C238.301407,39.3371436 238.327432,39.6459602 238.327432,40.0037478 C238.327432,40.3615353 238.301407,40.6693526 238.249356,40.9291983 L239.869946,42.2624067 C240.000074,42.3483557 240.032105,42.4652862 239.968042,42.6141978 C239.642723,43.5646335 239.109199,44.4401137 238.36647,45.2416378 C238.262368,45.3655642 238.137246,45.3965458 237.995106,45.335582 L235.964113,44.6679784 C235.443602,45.0637434 234.884053,45.37256 234.284464,45.5944283 L233.875062,47.5932415 C233.849037,47.7401543 233.757948,47.8271027 233.601794,47.8520878 C233.041244,47.9520285 232.507721,48 232.000222,48 C231.492724,48 230.9582,47.9510291 230.398651,47.8520878 C230.242497,47.8281021 230.151408,47.7411537 230.125382,47.5932415 L229.715981,45.5944283 C229.077354,45.3605672 228.517805,45.0507511 228.036332,44.6679784 L226.005339,45.335582 C225.861197,45.3975452 225.738077,45.3655642 225.633974,45.2416378 C224.892246,44.4401137 224.358723,43.5646335 224.032403,42.6141978 C223.967339,42.4662856 224.000371,42.3483557 224.130499,42.2624067 L225.751089,40.9291983 C225.699038,40.6693526 225.673013,40.3625347 225.673013,40.0037478 C225.673013,39.6459602 225.699038,39.3371436 225.751089,39.0782973 L224.130499,37.7460883 C224.000371,37.6601393 223.967339,37.5422093 224.032403,37.3942971 C224.357722,36.4448609 224.891245,35.5683813 225.633974,34.7668572 C225.738077,34.6439302 225.862198,34.6129486 226.005339,34.6739124 L228.036332,35.3405166 C228.516804,34.9577438 229.077354,34.6499266 229.715981,34.4150661 L230.125382,32.4162528 C230.151408,32.2683407 230.242497,32.1823917 230.398651,32.1574065 C231.465698,31.9475312 232.533746,31.9475312 233.600793,32.1574065 C233.756947,32.1813923 233.848036,32.2683407 233.874061,32.4162528 L234.283463,34.4150661 C234.883052,34.6379337 235.442601,34.945751 235.963112,35.3405166 L237.994105,34.6739124 C238.137246,34.6119492 238.261367,34.6439302 238.36547,34.7668572 C239.107197,35.5693807 239.640721,36.4448609 239.967041,37.3942971 C240.031104,37.5422093 239.999073,37.6601393 239.868945,37.7460883 L238.249356,39.0782973 L238.249356,39.0782973 Z M232,36.5 C230.067125,36.5 228.5,38.067125 228.5,40 C228.5,41.932875 230.067125,43.5 232,43.5 C233.932875,43.5 235.5,41.932875 235.5,40 C235.5,38.067125 233.932875,36.5 232,36.5 L232,36.5 Z\"/>\n    <path d=\"M238.249356,39.0782973 C238.301407,39.3371436 238.327432,39.6459602 238.327432,40.0037478 C238.327432,40.3615353 238.301407,40.6693526 238.249356,40.9291983 L239.869946,42.2624067 C240.000074,42.3483557 240.032105,42.4652862 239.968042,42.6141978 C239.642723,43.5646335 239.109199,44.4401137 238.36647,45.2416378 C238.262368,45.3655642 238.137246,45.3965458 237.995106,45.335582 L235.964113,44.6679784 C235.443602,45.0637434 234.884053,45.37256 234.284464,45.5944283 L233.875062,47.5932415 C233.849037,47.7401543 233.757948,47.8271027 233.601794,47.8520878 C233.041244,47.9520285 232.507721,48 232.000222,48 C231.492724,48 230.9582,47.9510291 230.398651,47.8520878 C230.242497,47.8281021 230.151408,47.7411537 230.125382,47.5932415 L229.715981,45.5944283 C229.077354,45.3605672 228.517805,45.0507511 228.036332,44.6679784 L226.005339,45.335582 C225.861197,45.3975452 225.738077,45.3655642 225.633974,45.2416378 C224.892246,44.4401137 224.358723,43.5646335 224.032403,42.6141978 C223.967339,42.4662856 224.000371,42.3483557 224.130499,42.2624067 L225.751089,40.9291983 C225.699038,40.6693526 225.673013,40.3625347 225.673013,40.0037478 C225.673013,39.6459602 225.699038,39.3371436 225.751089,39.0782973 L224.130499,37.7460883 C224.000371,37.6601393 223.967339,37.5422093 224.032403,37.3942971 C224.357722,36.4448609 224.891245,35.5683813 225.633974,34.7668572 C225.738077,34.6439302 225.862198,34.6129486 226.005339,34.6739124 L228.036332,35.3405166 C228.516804,34.9577438 229.077354,34.6499266 229.715981,34.4150661 L230.125382,32.4162528 C230.151408,32.2683407 230.242497,32.1823917 230.398651,32.1574065 C231.465698,31.9475312 232.533746,31.9475312 233.600793,32.1574065 C233.756947,32.1813923 233.848036,32.2683407 233.874061,32.4162528 L234.283463,34.4150661 C234.883052,34.6379337 235.442601,34.945751 235.963112,35.3405166 L237.994105,34.6739124 C238.137246,34.6119492 238.261367,34.6439302 238.36547,34.7668572 C239.107197,35.5693807 239.640721,36.4448609 239.967041,37.3942971 C240.031104,37.5422093 239.999073,37.6601393 239.868945,37.7460883 L238.249356,39.0782973 L238.249356,39.0782973 Z M232,36.5 C230.067125,36.5 228.5,38.067125 228.5,40 C228.5,41.932875 230.067125,43.5 232,43.5 C233.932875,43.5 235.5,41.932875 235.5,40 C235.5,38.067125 233.932875,36.5 232,36.5 L232,36.5 Z\"/>\n  </g>\n</symbol><symbol id=\"globe\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7.889 13.999L7 10 6 9 4 6l-.355-2.128A6 6 0 0 0 7.888 14zm.238-11.998L10 3.5V5L8 6.5l-1.5 1 .5 1 3 .5 1 1v1.5l-1.549 2.323A6 6 0 0 0 8.127 2.001zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z\"/>\n</symbol><symbol id=\"graph-circle\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7 16A7 7 0 0 1 7 2v7h7a7 7 0 0 1-7 7zm2-9V0a7 7 0 0 1 7 7H9z\"/>\n</symbol><symbol id=\"grid\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 0h4v4H0V0zm0 6h4v4H0V6zm0 6h4v4H0v-4zM6 0h4v4H6V0zm0 6h4v4H6V6zm0 6h4v4H6v-4zm6-12h4v4h-4V0zm0 6h4v4h-4V6zm0 6h4v4h-4v-4z\"/>\n</symbol><symbol id=\"group-list\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M6 1h10v2H6V1zm0 6h10v2H6V7zm0 6h10v2H6v-2zM2 4L.195 1.854a.901.901 0 0 1 0-1.121c.261-.31.682-.31.943 0L2 1.758 2.862.733c.26-.31.682-.31.943 0 .26.31.26.81 0 1.12L2 4zm0 6L.195 7.854a.901.901 0 0 1 0-1.121c.261-.31.682-.31.943 0L2 7.758l.862-1.025c.26-.31.682-.31.943 0 .26.31.26.81 0 1.12L2 10zm0 6L.195 13.854a.901.901 0 0 1 0-1.121c.261-.31.682-.31.943 0L2 13.758l.862-1.025c.26-.31.682-.31.943 0 .26.31.26.81 0 1.12L2 16z\"/>\n</symbol><symbol id=\"groups\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2.944 3.473a1.473 1.473 0 1 1-2.946-.002 1.473 1.473 0 0 1 2.946.002zM5 4.722v-2.5h11v2.5H5zm0 4.64v-2.5h11v2.5H5zM5 14v-2.5h11V14H5z\"/>\n</symbol><symbol id=\"heart\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M1.467 8.096a4.023 4.023 0 0 1-.699-.738L.724 7.31l.007-.006a4 4 0 1 1 7.21-2.994 6.685 6.685 0 0 1 .118 0 4.001 4.001 0 1 1 7.21 2.995l.005.005-.036.038a4.023 4.023 0 0 1-.713.753L8 15 1.467 8.096z\"/>\n</symbol><symbol id=\"help\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm1-7.198C10.122 8.355 11 7.21 11 6c0-1.552-1.448-3-3-3S5 4.448 5 6h2c0-.448.552-1 1-1 .448 0 1 .552 1 1 0 .448-.552 1-1 1a1 1 0 0 0-1 1v2h2V8.802zM7 11v2h2v-2H7z\"/>\n</symbol><symbol id=\"history\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 0c4.411 0 8 3.589 8 8s-3.589 8-8 8a8.039 8.039 0 0 1-7.229-4.571 1 1 0 1 1 1.806-.858A6.031 6.031 0 0 0 8 14c3.309 0 6-2.691 6-6s-2.691-6-6-6c-1.482 0-2.866.571-3.938 1.507a.989.989 0 0 1 .706.353 1 1 0 0 1-.128 1.408l-3 2.5A1 1 0 0 1 0 7V3a1 1 0 0 1 1-1c.481 0 .865.348.96.801C3.452 1.08 5.636 0 8 0zm0 4a1 1 0 0 1 1 1v2.586l1.707 1.707a.999.999 0 1 1-1.414 1.414l-2-1.999A1.025 1.025 0 0 1 7 8V5a1 1 0 0 1 1-1z\"/>\n</symbol><symbol id=\"home\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M.416 7.584C-.366 8.366-.105 9 1 9v5.997A.999.999 0 0 0 2 16h4v-5h4v5h4c.552 0 1-.438 1-1.003V9c1.105 0 1.367-.633.584-1.416L8 0 .416 7.584z\"/>\n</symbol><symbol id=\"hourglass\" viewBox=\"0 0 16 16\">\n  \n  <g fill-rule=\"evenodd\">\n    <use xlink:href=\"#hourglass-a\"/>\n  </g>\n</symbol><symbol id=\"image\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M65.0008717,65 C64.4481055,65 64,65.4499488 64,66.0068455 L64,77.9931545 C64,78.5492199 64.4446309,79 65.0008717,79 L78.9991283,79 C79.5518945,79 80,78.5500512 80,77.9931545 L80,66.0068455 C80,65.4507801 79.5553691,65 78.9991283,65 L65.0008717,65 Z M69,72 L71,74 L75,70 L78,73 L78,75.9906311 C78,76.5480902 77.544239,77 76.9975267,77 L67.0024733,77 C66.4488226,77 66,76.5561352 66,76 L66,75 L69,72 Z M69.5,70 C70.3284272,70 71,69.3284272 71,68.5 C71,67.6715728 70.3284272,67 69.5,67 C68.6715728,67 68,67.6715728 68,68.5 C68,69.3284272 68.6715728,70 69.5,70 Z\" transform=\"translate(-64 -64)\"/>\n</symbol><symbol id=\"info-outlined\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM7 4c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm1.001 2C8.553 6 9 6.444 9 7v4h1v2H7.999A.997.997 0 0 1 7 12V8H6V6h2.001z\"/>\n</symbol><symbol id=\"info\" viewBox=\"0 0 16 16\"><use fill-rule=\"evenodd\" xlink:href=\"#info\"/></symbol><symbol id=\"key\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M9 9.584V10H7v2H5v2H3v2H0v-3l6.297-6.297A5 5 0 1 1 9 9.584zM11 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z\"/>\n</symbol><symbol id=\"laptop\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3 4v5h10V4H3zm11.5 7h-13a.5.5 0 0 1-.5-.5V4c0-1.103.896-2 2-2h10c1.102 0 2 .897 2 2v6.5a.5.5 0 0 1-.5.5zm-4 1h5a.5.5 0 0 1 .5.5c0 .827-.674 1.5-1.5 1.5h-13C.673 14 0 13.327 0 12.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5h4v-.5a.5.5 0 0 1 .5-.5z\"/>\n</symbol><symbol id=\"left\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M10.70725,2.70725 C11.09825,2.31625 11.09825,1.68425 10.70725,1.29325 C10.31625,0.90225 9.68425,0.90225 9.29325,1.29325 L3.29325,7.29325 C2.90225,7.68425 2.90225,8.31625 3.29325,8.70725 L9.29325,14.70725 C9.68425,15.09825 10.31625,15.09825 10.70725,14.70725 C11.09825,14.31625 11.09825,13.68425 10.70725,13.29325 L5.41425,8.00025 L10.70725,2.70725 Z\"/>\n</symbol><symbol id=\"lightbulb\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4.977 12.513s.103-1.083-.956-2.022a6 6 0 1 1 7.99-.028c-.674.605-.907 2.05-.907 2.05a.635.635 0 0 1-.595.487H5.491a.524.524 0 0 1-.514-.487zM11 14l-1.652 1.652a1.355 1.355 0 0 1-.853.348h-.99c-.279 0-.662-.157-.853-.348L5 14h6zm1-8a4 4 0 0 0-4-4 1 1 0 1 0 0 2 2 2 0 0 1 2 2 1 1 0 0 0 2 0z\"/>\n</symbol><symbol id=\"link-out\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-128 -160)\">\n    <path d=\"M137,160 L137,162 L140.5,162 L134,168.5 L135.5,170 L142,163.5 L142,167 L144,167 L144,161.002929 C144,160.449027 143.562119,160 142.997071,160 L137,160 Z M135,162 L135,160 L129.002929,160 C128.449027,160 128,160.444631 128,161.000872 L128,174.999128 C128,175.551894 128.444631,176 129.000872,176 L142.999128,176 C143.551894,176 144,175.562119 144,174.997071 L144,169 L142,169 L142,174 L130,174 L130,162 L135,162 Z\"/>\n  </g>\n</symbol><symbol id=\"link\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M9.259 4.045a1.043 1.043 0 1 1-1.475-1.474L9.44.915a3.126 3.126 0 0 1 4.417-.002l1.23 1.23a3.126 3.126 0 0 1-.007 4.422l-3.612 3.612c-1.6 1.6-4.244 1.65-5.77.124a1.043 1.043 0 1 1 1.475-1.474c.699.698 2.023.673 2.82-.125l3.613-3.612a1.04 1.04 0 0 0 .006-1.473l-1.23-1.23a1.04 1.04 0 0 0-1.468.003L9.26 4.045zm-2.518 7.91a1.043 1.043 0 0 1 1.475 1.474L6.56 15.085a3.126 3.126 0 0 1-4.417.002l-1.23-1.23a3.126 3.126 0 0 1 .006-4.422l3.613-3.612c1.6-1.6 4.243-1.65 5.77-.124a1.043 1.043 0 0 1-1.475 1.474c-.7-.698-2.023-.673-2.82.125L2.393 10.91a1.04 1.04 0 0 0-.007 1.473l1.23 1.23a1.04 1.04 0 0 0 1.469-.003l1.655-1.655z\"/>\n</symbol><symbol id=\"list\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 0h4v4H0V0zm6 0h10v4H6V0zM0 6h4v4H0V6zm6 0h10v4H6V6zm-6 6h4v4H0v-4zm6 0h10v4H6v-4z\"/>\n</symbol><symbol id=\"location\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 0c3.99 0 7 2.866 7 6.667 0 4.782-6.508 9.089-6.784 9.27a.398.398 0 0 1-.432 0C7.507 15.756 1 11.45 1 6.667 1 2.866 4.01 0 8 0zm0 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z\"/>\n</symbol><symbol id=\"lock\" viewBox=\"0 0 16 16\">\n  <g stroke=\"none\" stroke-width=\"1\" fill-rule=\"evenodd\">\n      <path d=\"M2,15.0046024 C2,15.5543453 2.45576096,16 3.00247329,16 L12.9975267,16 C13.5511774,16 14,15.5443356 14,15.0046024 L14,6.99539757 C14,6.44565467 13.5561352,6 13,6 L12,6 L12,4 C12,1.794 10.2053333,0 8,0 C5.794,0 4,1.794 4,4 L4,6 L3,6 C2.44771525,6 2,6.4556644 2,6.99539757 L2,15.0046024 Z M6,4.5 C6,3.1215 6.8968,2 8,2 C9.1028,2 10,3.1215 10,4.5 L10,6 L6,6 L6,4.5 Z M8,8.5 C8.8265,8.5 9.5,9.172 9.5,10 C9.5,10.552 9.1955,11.032 8.75,11.29 L8.75,13.75 C8.75,14.1625 8.4125,14.5 8,14.5 C7.586,14.5 7.25,14.1625 7.25,13.75 L7.25,11.29 C6.803,11.032 6.5,10.552 6.5,10 C6.5,9.172 7.172,8.5 8,8.5 Z\"/>\n  </g>\n</symbol><symbol id=\"logout\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M12.586 9H5a1 1 0 1 1 0-2h7.586l-1.293-1.293a1 1 0 1 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L12.586 9zM0 1a1 1 0 1 1 2 0v14a1 1 0 0 1-2 0V1z\"/>\n</symbol><symbol id=\"magic-trick\" viewBox=\"0 0 24 24\"><g fill-rule=\"nonzero\"><path d=\"M16.236 5.87a.631.631 0 0 0-.893 0L.185 21.026a.631.631 0 0 0 0 .893l1.895 1.895a.629.629 0 0 0 .893 0L18.13 8.657a.631.631 0 0 0 0-.893l-1.895-1.895zm-1.71 4.605l-1.001-1.001 2.264-2.265 1.002 1.002-2.265 2.264zM14.326 2.494l.648.216.216.647a.631.631 0 0 0 1.199 0l.216-.647.648-.216a.631.631 0 0 0 0-1.198l-.648-.216-.216-.648a.631.631 0 0 0-1.199 0l-.216.648-.648.216a.631.631 0 0 0 0 1.198zM9.274 5.02l.648.216.216.648a.631.631 0 0 0 1.198 0l.216-.648.648-.216a.631.631 0 0 0 0-1.198l-.648-.216-.216-.648a.631.631 0 0 0-1.198 0l-.216.648-.648.216a.631.631 0 0 0 0 1.198zM22.305 11.4l-.648-.215-.216-.648a.631.631 0 0 0-1.198 0l-.216.648-.648.216a.631.631 0 0 0 0 1.198l.648.216.216.648a.631.631 0 0 0 1.198 0l.216-.648.648-.216a.631.631 0 0 0 0-1.198zM23.568 4.454l-1.121-.374-.374-1.122a.631.631 0 0 0-1.198 0L20.5 4.08l-1.122.374a.631.631 0 0 0 0 1.198l1.122.374.374 1.12a.631.631 0 0 0 1.198 0l.374-1.12 1.121-.374a.631.631 0 0 0 0-1.198z\"/></g></symbol><symbol id=\"magnet\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M11 3h4v6A7 7 0 1 1 1 9V3h4v6c0 1.654 1.346 3 3 3s3-1.346 3-3V3zm0-1V0h4.001v2H11zM1 2V0h4v2H1z\"/>\n</symbol><symbol id=\"magnifier\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M10.472 10H11.5l3.294 3.294a.996.996 0 0 1 0 1.412l-.088.088a1 1 0 0 1-1.412 0L10 11.5v-1.028a6 6 0 1 1 .472-.472zM6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z\"/>\n</symbol><symbol id=\"merge\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 0L4 3.997h3.064V9.18L2 14.59 3.32 16l5.616-5.999V3.997H12L8 0zm1.488 12.59L12.68 16 14 14.591l-3.191-3.411-1.32 1.41z\"/>\n</symbol><symbol id=\"movement-in\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M3.414 10H11a1 1 0 0 1 0 2H3.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414L3.414 10z\" opacity=\".322\"/>\n        <path d=\"M12.586 4l-1.293-1.293a1 1 0 1 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L12.586 6H5a1 1 0 1 1 0-2h7.586z\"/>\n    </g>\n</symbol><symbol id=\"movement-out\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M3.414 10H11a1 1 0 0 1 0 2H3.414l1.293 1.293a1 1 0 0 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L3.414 10z\"/>\n        <path d=\"M12.586 4l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L12.586 6H5a1 1 0 1 1 0-2h7.586z\" opacity=\".316\"/>\n    </g>\n</symbol><symbol id=\"moveto\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M295.5,102.914214 L294.207107,104.207107 C293.816582,104.597631 293.183418,104.597631 292.792893,104.207107 C292.402369,103.816582 292.402369,103.183418 292.792893,102.792893 L295.792893,99.7928932 C296.183418,99.4023689 296.816582,99.4023689 297.207107,99.7928932 L300.207107,102.792893 C300.597631,103.183418 300.597631,103.816582 300.207107,104.207107 C299.816582,104.597631 299.183418,104.597631 298.792893,104.207107 L297.5,102.914214 L297.5,110.5 C297.5,111.052285 297.052285,111.5 296.5,111.5 C295.947715,111.5 295.5,111.052285 295.5,110.5 L295.5,102.914214 Z M289.5,98.5 L303.5,98.5 C304.052285,98.5 304.5,98.0522847 304.5,97.5 C304.5,96.9477153 304.052285,96.5 303.5,96.5 L289.5,96.5 C288.947715,96.5 288.5,96.9477153 288.5,97.5 C288.5,98.0522847 288.947715,98.5 289.5,98.5 Z\" transform=\"rotate(90 200.5 -88)\"/>\n</symbol><symbol id=\"multi-files\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M5.007 14A2.006 2.006 0 0 1 3 11.999V3H1.998A.999.999 0 0 0 1 4.001v10.998C1 15.556 1.45 16 2.007 16h8.986A1 1 0 0 0 12 15.004V14H5.007zM4 1.001A.999.999 0 0 1 4.998 0H10v5h5v7.005a1 1 0 0 1-1.007.995H5.007A1.001 1.001 0 0 1 4 11.999V1.001zM11 4V0l4 4h-4z\"/>\n</symbol><symbol id=\"music\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 12h1.51c.275 0 .49-.228.49-.51V2.838c0-.54.437-1.075.976-1.173L14.024.02c.531-.096.976.271.976.825v10.084a2.997 2.997 0 0 1-3 3.007h-1.002A2 2 0 0 1 9 11.94v.18c0-1.094.895-1.998 2-1.998h1.51a.49.49 0 0 0 .49-.493V5.467c0-.273-.22-.453-.492-.402L6.492 6.193A.62.62 0 0 0 6 6.781v6.225A3.004 3.004 0 0 1 3 16H1.998C.898 16 0 15.105 0 14c0-1.112.895-2 2-2z\"/>\n</symbol><symbol id=\"new\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M15.785 9.637a.413.413 0 0 1 0 .726L12.28 12.28l-1.917 3.505a.414.414 0 0 1-.726 0L7.72 12.28l-3.505-1.917a.413.413 0 0 1 0-.726L7.72 7.72l1.917-3.505a.414.414 0 0 1 .726 0L12.28 7.72l3.505 1.917zm-8.91-6.349a.241.241 0 0 1 0 .424L4.83 4.83 3.712 6.874a.241.241 0 0 1-.424 0L2.17 4.83.126 3.712a.241.241 0 0 1 0-.424L2.17 2.17 3.288.126a.242.242 0 0 1 .424 0L4.83 2.17l2.044 1.118z\"/>\n</symbol><symbol id=\"next\" viewBox=\"0 0 16 16\">\n    <g stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M3.41421356,7 L14.9931545,7 C15.5492199,7 16,7.44386482 16,8 C16,8.55228475 15.5500512,9 14.9931545,9 L3.41421356,9 L8.70710678,14.2928932 C9.09763107,14.6834175 9.09763107,15.3165825 8.70710678,15.7071068 C8.31658249,16.0976311 7.68341751,16.0976311 7.29289322,15.7071068 L0.292893219,8.70710678 C-0.0976310729,8.31658249 -0.0976310729,7.68341751 0.292893219,7.29289322 L7.29289322,0.292893219 C7.68341751,-0.0976310729 8.31658249,-0.0976310729 8.70710678,0.292893219 C9.09763107,0.683417511 9.09763107,1.31658249 8.70710678,1.70710678 L3.41421356,7 Z\" transform=\"translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) \"/>\n    </g>\n</symbol><symbol id=\"note\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14 0c.552 0 1 .448 1 1v1.024l-2 2.011V2H3v12h10v-3.05l2-2.011V15c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1v-2H.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5H1v-2H.5c-.276 0-.5-.224-.5-.5S.224 9 .5 9H1V7H.5C.224 7 0 6.776 0 6.5S.224 6 .5 6H1V4H.5C.224 4 0 3.776 0 3.5S.224 3 .5 3H1V1c0-.552.448-1 1-1h12zm1.612 4.299l.09.09c.396.396.399 1.046.002 1.448L9.55 12H8v-1.518l6.17-6.184c.399-.398 1.044-.397 1.442 0zM7 11v1H5v-1h2zm0-2v1H5V9h2zm2-2v1H5V7h4zm2-2v1H5V5h6z\"/>\n</symbol><symbol id=\"notification-email\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14 5.95V6v-.05a2.5 2.5 0 1 1 0 0zM10.073 4c.222 1.418.95 2.336 2.18 2.748L7 9 0 6V5c0-.552.45-1 1.007-1h9.066zM0 8l7 3 7-3v5.997c0 .554-.45 1.003-1.007 1.003H1.007A.998.998 0 0 1 0 13.997V8z\"/>\n</symbol><symbol id=\"offline\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3.113 2.707l10.61 10.61a.996.996 0 0 1-1.43 1.39l-2.435-2.435c.09.227.142.471.142.728a2 2 0 1 1-2-2c.257 0 .501.053.727.142L6.541 8.955a4.123 4.123 0 0 0-1.627.981 1.085 1.085 0 0 1-1.532-1.533 6.55 6.55 0 0 1 1.492-1.115L3.191 5.605a8.811 8.811 0 0 0-1.342 1.1A1.083 1.083 0 0 1 .317 5.173a10.92 10.92 0 0 1 1.326-1.115L.293 2.707a.999.999 0 1 1 1.414-1.414l1.39 1.39c.006.007.008.017.016.024zm4.312 1.484l-1.901-1.9a10.769 10.769 0 0 1 10.115 2.882 1.085 1.085 0 0 1-1.532 1.532 8.611 8.611 0 0 0-6.13-2.538c-.185 0-.368.011-.552.024zm5.148 4.212c.317.317.397.783.238 1.175l-2.72-2.72a6.471 6.471 0 0 1 2.482 1.545z\"/>\n</symbol><symbol id=\"online\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M10 13a2 2 0 1 1-4.001-.001A2 2 0 0 1 10 13zm4.873-5.978c-.277 0-.555-.104-.767-.317a8.604 8.604 0 0 0-6.129-2.538A8.603 8.603 0 0 0 1.85 6.704 1.085 1.085 0 0 1 .317 5.173a10.76 10.76 0 0 1 7.66-3.172c2.894 0 5.616 1.126 7.662 3.172a1.085 1.085 0 0 1-.766 1.85zm-3.065 3.23c-.277 0-.555-.104-.766-.316-1.635-1.637-4.492-1.637-6.128 0a1.084 1.084 0 0 1-1.532-1.532A6.457 6.457 0 0 1 7.978 6.5c1.737 0 3.369.676 4.596 1.904a1.083 1.083 0 0 1-.766 1.849z\"/>\n</symbol><symbol id=\"openwith\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-128 -160)\">\n    <path d=\"M137,160 L137,162 L140.5,162 L134,168.5 L135.5,170 L142,163.5 L142,167 L144,167 L144,161.002929 C144,160.449027 143.562119,160 142.997071,160 L137,160 Z M135,162 L135,160 L129.002929,160 C128.449027,160 128,160.444631 128,161.000872 L128,174.999128 C128,175.551894 128.444631,176 129.000872,176 L142.999128,176 C143.551894,176 144,175.562119 144,174.997071 L144,169 L142,169 L142,174 L130,174 L130,162 L135,162 Z\"/>\n  </g>\n</symbol><symbol id=\"palette\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M12.889 8a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667zm-2.667-3.556a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666zm-4.444 0a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666zM3.11 8a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667zM8 0a8 8 0 1 0 0 16c.736 0 1.333-.597 1.333-1.333 0-.347-.133-.658-.346-.89a1.333 1.333 0 0 1 .996-2.222h1.573A4.444 4.444 0 0 0 16 7.112C16 3.182 12.418 0 8 0z\"/>\n</symbol><symbol id=\"paperplane\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-256 -64)\">\n    <polygon points=\"272 64 266 79 263.5 76.5 260 79 259 75 269 66.5 259 72.5 256 70\"/>\n  </g>\n</symbol><symbol id=\"password\" viewBox=\"0 0 32 32\"><path fill-rule=\"evenodd\" d=\"M30 4a2 2 0 012 2v20a2 2 0 11-4 0V6a2 2 0 012-2zM12.102 14.434a2.002 2.002 0 01-1.284 2.52l-1.582.514.978 1.344a2.001 2.001 0 01-3.238 2.352L6 19.82l-.978 1.344c-.39.538-1 .824-1.62.824a2.002 2.002 0 01-1.616-3.176l.978-1.344-1.582-.514a2.002 2.002 0 01-1.284-2.52 2.002 2.002 0 012.52-1.284L4 13.664V12a2 2 0 114 0v1.664l1.582-.514a2 2 0 012.52 1.284zm14.2 0a2.002 2.002 0 01-1.284 2.52l-1.582.514.978 1.344a2.001 2.001 0 01-3.238 2.352L20.2 19.82l-.978 1.344c-.39.538-1 .824-1.62.824a2.002 2.002 0 01-1.616-3.176l.978-1.344-1.582-.514a2.002 2.002 0 01-1.284-2.52 2.002 2.002 0 012.52-1.284l1.582.514V12a2 2 0 114 0v1.664l1.582-.514a2 2 0 012.52 1.284z\"/></symbol><symbol id=\"pen\" viewBox=\"0 0 16 16\">\n  \n  <use fill-rule=\"evenodd\" xlink:href=\"#pen\"/>\n</symbol><symbol id=\"people\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M136,73 C138.209139,73 140,70.9852814 140,68.5 C140,66.0147186 138.209139,64 136,64 C133.790861,64 132,66.0147186 132,68.5 C132,70.9852814 133.790861,73 136,73 Z M128,78 C128,77 130,74 132,74 C134,74 133,75 136,75 C139,75 138,74 140,74 C142,74 144,77 144,78 C144,79 144,80 143,80 L129,80 C128,80 128,79 128,78 Z\" transform=\"translate(-128 -64)\"/>\n</symbol><symbol id=\"percent-circle\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM9.9 4h1.2l-5 8H4.9l5-8zm1.704 6.604a.82.82 0 0 0 .25-.604.82.82 0 0 0-.25-.604.82.82 0 0 0-.604-.25.821.821 0 0 0-.605.25.82.82 0 0 0-.25.604.82.82 0 0 0 .25.604c.166.167.368.25.605.25a.82.82 0 0 0 .604-.25zm.813.81A1.925 1.925 0 0 1 11 12a1.925 1.925 0 0 1-1.414-.586A1.926 1.926 0 0 1 9 10c0-.552.195-1.023.586-1.414C9.976 8.195 10.448 8 11 8c.551 0 1.023.195 1.414.586.39.391.586.862.586 1.414 0 .552-.195 1.023-.583 1.414zm-6.813-4.81A.818.818 0 0 0 5.855 6a.818.818 0 0 0-.25-.604A.818.818 0 0 0 5 5.145a.818.818 0 0 0-.605.251.82.82 0 0 0-.25.604.82.82 0 0 0 .25.604.818.818 0 0 0 .605.251.818.818 0 0 0 .604-.251zm.813.81C6.027 7.805 5.555 8 5 8a1.925 1.925 0 0 1-1.414-.586A1.926 1.926 0 0 1 3 6c0-.552.195-1.023.586-1.414C3.976 4.195 4.448 4 5 4c.551 0 1.023.195 1.414.586C6.804 4.977 7 5.448 7 6c0 .552-.195 1.023-.583 1.414z\"/>\n</symbol><symbol id=\"percent\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM9.9 4h1.2l-5 8H4.9l5-8zm1.704 6.604a.82.82 0 0 0 .25-.604.82.82 0 0 0-.25-.604.82.82 0 0 0-.604-.25.821.821 0 0 0-.605.25.82.82 0 0 0-.25.604.82.82 0 0 0 .25.604c.166.167.368.25.605.25a.82.82 0 0 0 .604-.25zm.813.81A1.925 1.925 0 0 1 11 12a1.925 1.925 0 0 1-1.414-.586A1.926 1.926 0 0 1 9 10c0-.552.195-1.023.586-1.414C9.976 8.195 10.448 8 11 8c.551 0 1.023.195 1.414.586.39.391.586.862.586 1.414 0 .552-.195 1.023-.583 1.414zm-6.813-4.81A.818.818 0 0 0 5.855 6a.818.818 0 0 0-.25-.604A.818.818 0 0 0 5 5.145a.818.818 0 0 0-.605.251.82.82 0 0 0-.25.604.82.82 0 0 0 .25.604.818.818 0 0 0 .605.251.818.818 0 0 0 .604-.251zm.813.81C6.027 7.805 5.555 8 5 8a1.925 1.925 0 0 1-1.414-.586A1.926 1.926 0 0 1 3 6c0-.552.195-1.023.586-1.414C3.976 4.195 4.448 4 5 4c.551 0 1.023.195 1.414.586C6.804 4.977 7 5.448 7 6c0 .552-.195 1.023-.583 1.414z\"/>\n</symbol><symbol id=\"personal-data\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M12.375 16C13 16 13 15.5 13 15s-1.25-2-2.5-2-.625.5-2.5.5-1.25-.5-2.5-.5S3 14.5 3 15s0 1 .625 1H2.007A1.002 1.002 0 0 1 1 15V1c0-.552.446-1 .998-1H10v5h5v10.004a1 1 0 0 1-1.007.996h-1.618zM8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm3-8V0l4 4h-4z\"/>\n</symbol><symbol id=\"phone-download\" viewBox=\"0 0 16 16\">\n  <g transform=\"translate(-64 -160)\">\n    <path d=\"M71,168.585786 L71,164 C71,163.447715 71.4477153,163 72,163 C72.5522847,163 73,163.447715 73,164 L73,168.585786 L73.2928932,168.292893 C73.6834175,167.902369 74.3165825,167.902369 74.7071068,168.292893 C75.0976311,168.683418 75.0976311,169.316582 74.7071068,169.707107 L72.7071068,171.707107 C72.3165825,172.097631 71.6834175,172.097631 71.2928932,171.707107 L69.2928932,169.707107 C68.9023689,169.316582 68.9023689,168.683418 69.2928932,168.292893 C69.6834175,167.902369 70.3165825,167.902369 70.7071068,168.292893 L71,168.585786 Z M66,161.000872 C66,160.448106 66.455761,160 67.0024733,160 L76.9975267,160 C77.5511774,160 78,160.444631 78,161.000872 L78,174.999128 C78,175.551894 77.544239,176 76.9975267,176 L67.0024733,176 C66.4488226,176 66,175.555369 66,174.999128 L66,161.000872 Z M68,162 L68,173 L76,173 L76,162 L68,162 Z\"/>\n  </g>\n</symbol><symbol id=\"phone\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 1c0-.552.456-1 1.002-1h9.996A1 1 0 0 1 14 1v14c0 .552-.456 1-1.002 1H3.002A1 1 0 0 1 2 15V1zm2 1v10h8V2H4zm4 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"/>\n</symbol><symbol id=\"pie-chart\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7 16A7 7 0 0 1 7 2v7h7a7 7 0 0 1-7 7zm2-9V0a7 7 0 0 1 7 7H9z\"/>\n</symbol><symbol id=\"pin\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4 1c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H11v4l2 2v2H9v4l-2 2v-6H3V8l2-2V2c-.552 0-1-.444-1-1z\"/>\n</symbol><symbol id=\"plus-small\" viewBox=\"0 0 12 12\">\n    \n    <use fill-rule=\"evenodd\" transform=\"translate(1 1)\" xlink:href=\"#plus-small\"/>\n</symbol><symbol id=\"plus\" viewBox=\"0 0 16 16\">\n  \n  <g fill-rule=\"evenodd\">\n    <use xlink:href=\"#plus-a\"/>\n  </g>\n</symbol><symbol id=\"previous\" viewBox=\"0 0 16 16\">\n    <g stroke-width=\"1\" fill-rule=\"evenodd\">\n        <path d=\"M3.41421356,7 L14.9931545,7 C15.5492199,7 16,7.44386482 16,8 C16,8.55228475 15.5500512,9 14.9931545,9 L3.41421356,9 L8.70710678,14.2928932 C9.09763107,14.6834175 9.09763107,15.3165825 8.70710678,15.7071068 C8.31658249,16.0976311 7.68341751,16.0976311 7.29289322,15.7071068 L0.292893219,8.70710678 C-0.0976310729,8.31658249 -0.0976310729,7.68341751 0.292893219,7.29289322 L7.29289322,0.292893219 C7.68341751,-0.0976310729 8.31658249,-0.0976310729 8.70710678,0.292893219 C9.09763107,0.683417511 9.09763107,1.31658249 8.70710678,1.70710678 L3.41421356,7 Z\"/>\n    </g>\n</symbol><symbol id=\"printer\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13 12v3c0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 3 15v-3H1c-.552 0-1-.438-1-1.003V6.003A1 1 0 0 1 1 5h14c.552 0 1 .438 1 1.003v4.994A1 1 0 0 1 15 12h-2zM3 1.01C3 .451 3.456 0 3.995 0h8.01c.55 0 .995.443.995 1.01V4H3V1.01zM5 10v4h6v-4H5zm9-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"/>\n</symbol><symbol id=\"qualify\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 2h8.002a2 2 0 0 1 1.414.586l4 4a2 2 0 0 1 0 2.828l-4 4a2 2 0 0 1-1.414.586H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\"/>\n</symbol><symbol id=\"rename\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M201.5,99.5 L192,109.025391 L192,112 L195.03772,112 L204.5,102.5 L201.5,99.5 Z M206.912154,96.9121541 C206.132243,96.1322429 204.869144,96.1308556 204.089264,96.9107361 L203,98 L206.030762,101 L207.092271,99.9252663 C207.869738,99.1381134 207.863777,97.8637772 207.087846,97.0878459 L206.912154,96.9121541 Z M199,110 L204.997071,110 C205.550973,110 206,110.443865 206,111 C206,111.552285 205.553689,112 205.002455,112 L197,112 L199,110 Z\" transform=\"translate(-192 -96)\"/>\n</symbol><symbol id=\"repare\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M15.493 2.49L13 5h-2V3L13.556.501c-1.722-.88-3.914-.601-5.356.84a4.587 4.587 0 0 0-.854 5.327l-6.93 6.926a1.408 1.408 0 1 0 1.989 1.993l6.922-6.924a4.582 4.582 0 0 0 6.166-6.173z\"/>\n</symbol><symbol id=\"reply\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path id=\"w2s7pgbo5a\" d=\"M10.054 4.266c-5.39.75-8.705 4.012-10.021 7.685-.184.513.45.912.851.542 2.155-2 5.465-2.93 9.17-2.93v2.496c0 .276.224.5.5.5.13 0 .255-.051.349-.142l4.752-4.634c.455-.443.464-1.171.021-1.626l-4.773-4.655c-.198-.193-.514-.189-.707.009-.091.093-.142.219-.142.349v2.406z\"/>\n    </g>\n</symbol><symbol id=\"restore\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(1 2)\">\n    <path d=\"M-1.33226763e-14,13 L6.02479339,13 L8,13 C12.0522847,13 15,10.0522847 15,6 C15,1.94771525 12.0522847,-1 8,-1 C3.94771525,-1 1,1.94771525 1,6 C1,6.55228475 1.44771525,7 2,7 C2.55228475,7 3,6.55228475 3,6 C3,3.05228475 5.05228475,1 8,1 C10.9477153,1 13,3.05228475 13,6 C13,8.94771525 10.9477153,11 8,11 L-1.57651669e-14,11 C-0.55228475,11 -1,11.4477153 -1,12 C-1,12.5522847 -0.55228475,13 -1.33226763e-14,13 Z\"/>\n    <path d=\"M0.832050294,2.4452998 C0.525697835,1.98577112 -0.0951715076,1.86159725 -0.554700196,2.16794971 C-1.01422888,2.47430216 -1.13840275,3.09517151 -0.832050294,3.5547002 L1.16794971,6.5547002 C1.47430216,7.01422888 2.09517151,7.13840275 2.5547002,6.83205029 L5.5547002,4.83205029 C6.01422888,4.52569784 6.13840275,3.90482849 5.83205029,3.4452998 C5.52569784,2.98577112 4.90482849,2.86159725 4.4452998,3.16794971 L2.2773501,4.61324951 L0.832050294,2.4452998 Z\"/>\n  </g>\n</symbol><symbol id=\"right\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M12.707,7.2929 L6.707,1.2929 C6.316,0.9019 5.684,0.9019 5.293,1.2929 C4.902,1.6839 4.902,2.3159 5.293,2.7069 L10.586,7.9999 L5.293,13.2929 C4.902,13.6839 4.902,14.3159 5.293,14.7069 C5.684,15.0979 6.316,15.0979 6.707,14.7069 L12.707,8.7069 C13.098,8.3159 13.098,7.6839 12.707,7.2929\"/>\n</symbol><symbol id=\"rise\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M4 2v2.001h6.59L2 12.5 3.5 14l8.499-8.59V12H14V2z\"/>\n</symbol><symbol id=\"rotate-left\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8.116.547a1.044 1.044 0 0 1 .23-.289c.03-.024.051-.052.082-.072a.97.97 0 0 1 .305-.142c.025-.006.051-.006.076-.01C8.872.02 8.931.004 9 .004L13 0a.998.998 0 0 1 1.001.996.984.984 0 0 1-.789.957c1.7 1.495 2.785 3.67 2.788 6.03.004 3.085-1.79 5.902-4.528 7.252a.997.997 0 1 1-.886-1.789c2.062-1.017 3.417-3.143 3.414-5.462-.002-1.47-.57-2.855-1.502-3.93a.987.987 0 0 1-.352.705 1.001 1.001 0 0 1-1.408-.126l-2.505-2.99c-.002-.003-.003-.007-.006-.01-.044-.053-.074-.112-.106-.173a.986.986 0 0 1-.06-.128.988.988 0 0 1-.045-.172A1.056 1.056 0 0 1 8.01.974c.002-.043-.012-.083-.005-.127.007-.043.032-.076.044-.117.018-.063.038-.124.068-.183zM4.574.705a1 1 0 0 1 1.333.47.996.996 0 0 1-.47 1.33 5.977 5.977 0 0 0-1.686 1.227L2.111 2.56A7.981 7.981 0 0 1 4.573.706zm-.832 11.533l-1.185 1.659a8.094 8.094 0 0 1-2.222-3.61l2.003-.335a6.075 6.075 0 0 0 1.404 2.286zM.965 4.2l1.637 1.168A6.086 6.086 0 0 0 2 7.98l-1.986.332C.01 8.209 0 8.106 0 8A8.067 8.067 0 0 1 .965 4.2zm6.179 9.79a1 1 0 0 1-.271 1.978 7.803 7.803 0 0 1-2.7-.892l1.182-1.655a5.796 5.796 0 0 0 1.789.569z\"/>\n</symbol><symbol id=\"rotate-right\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M7.884.547c.03.06.05.12.068.183.012.041.037.074.044.117.007.044-.007.084-.005.127.002.062.002.123-.007.186a.988.988 0 0 1-.045.172.986.986 0 0 1-.06.128c-.032.061-.062.12-.106.173-.003.003-.004.007-.006.01l-2.505 2.99a1.001 1.001 0 0 1-1.408.126.987.987 0 0 1-.352-.705C2.57 5.13 2.002 6.514 2 7.984c-.003 2.32 1.352 4.445 3.414 5.462a.997.997 0 1 1-.886 1.79C1.79 13.885-.004 11.067 0 7.981c.003-2.36 1.088-4.534 2.788-6.029a.984.984 0 0 1-.79-.957A.998.998 0 0 1 3 0l4 .005c.069 0 .128.016.19.028.026.005.052.005.077.011a.97.97 0 0 1 .305.142c.03.02.053.048.082.072a1.044 1.044 0 0 1 .23.29zm3.542.158a7.981 7.981 0 0 1 2.464 1.856l-1.641 1.17a5.977 5.977 0 0 0-1.686-1.225.996.996 0 0 1-.47-1.331 1 1 0 0 1 1.333-.47zm.832 11.533a6.075 6.075 0 0 0 1.404-2.286l2.003.335a8.094 8.094 0 0 1-2.222 3.61l-1.185-1.66zM15.035 4.2A8.067 8.067 0 0 1 16 8c0 .106-.01.209-.015.313L14 7.98a6.086 6.086 0 0 0-.6-2.613L15.034 4.2zm-6.179 9.79a5.796 5.796 0 0 0 1.79-.57l1.18 1.656c-.82.45-1.73.76-2.699.892a1 1 0 1 1-.27-1.978z\"/>\n</symbol><symbol id=\"sad-cozy\" viewBox=\"0 0 52 52\"><path d=\"M38.231 40H13.769C6.175 40 0 33.756 0 26.08c0-3.66 1.394-7.117 3.927-9.733 2.219-2.29 5.093-3.715 8.203-4.086a13.887 13.887 0 014.042-8.292A13.608 13.608 0 0125.801 0c3.62 0 7.04 1.407 9.629 3.968a13.897 13.897 0 014.038 8.25C46.482 12.853 52 18.828 52 26.082 52 33.756 45.82 40 38.23 40h.001zm-.163-3.001h.104c5.97 0 10.828-4.91 10.828-10.947 0-6.035-4.857-10.946-10.828-10.946h-.11c-.779 0-1.417-.627-1.435-1.417C36.492 7.794 31.637 3 25.803 3 19.968 3 15.11 7.796 14.977 13.69a1.445 1.445 0 01-1.403 1.42C7.744 15.244 3 20.153 3 26.052 3 32.09 7.857 37 13.828 37h.088l.035-.002c.03 0 .062 0 .093.002h24.021l.003-.001zm-4.302-11.222c-.875.585-.918 1.659-.92 1.706a.52.52 0 01-.525.517.523.523 0 01-.506-.536c.002-.039.016-.543.251-1.137a7.99 7.99 0 00-11.138-.019c.241.603.257 1.116.257 1.155a.523.523 0 01-.503.536.526.526 0 01-.528-.515c0-.043-.042-1.121-.92-1.706a.536.536 0 01-.15-.731.51.51 0 01.714-.154c.225.15.414.322.572.505a9.006 9.006 0 0112.251.01c.16-.184.35-.36.582-.515a.503.503 0 01.281-.085c.168 0 .333.085.432.24a.537.537 0 01-.15.731v-.002z\" fill-rule=\"evenodd\"/></symbol><symbol id=\"safe\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M14 0a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-1v1h-3v-1H6v1H3v-1H2a2 2 0 0 1-2-2V2C0 .9.9 0 2 0h12zm0 1H3a1 1 0 0 0-1 .88V3H1v3h1v3H1v3h1v1a1 1 0 0 0 .88 1H14a1 1 0 0 0 1-.88V2a1 1 0 0 0-.88-1H14zm0 1v11H3v-2H2v-1h1V5H2V4h1V2h11zM8.5 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 1a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z\"/></symbol><symbol id=\"select-all\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M14.7 8.713a1 1 0 1 0-1.4-1.427l-4.391 4.312L7.7 10.411A.999.999 0 1 0 6.3 11.838l1.909 1.875a.997.997 0 0 0 1.4 0l5.092-5zM15 4c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h10zm-3-2H5C3.346 2 2 3.346 2 5v7H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v1z\"/>\n</symbol><symbol id=\"setting\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M0 13v2h5v-2H0zM0 1v2h9V1H0zm9 15v-1h7v-2H9v-1H7v4h2zM3 6v1H0v2h3v1h2V6H3zm13 3V7H7v2h9zm-5-5h2V3h3V1h-3V0h-2v4z\"/>\n</symbol><symbol id=\"share-circle\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM6.541 6.92a1.5 1.5 0 1 0 0 2.16l2.47 1.235a1.5 1.5 0 1 0 .447-.894l-2.47-1.236a1.515 1.515 0 0 0 0-.37l2.47-1.235a1.5 1.5 0 1 0-.447-.894L6.541 6.92z\"/>\n</symbol><symbol id=\"share-ios\" viewBox=\"0 0 16 16\">\n    <g fill-rule=\"evenodd\">\n        <path d=\"M5 6v2H3v6h10V8h-2V6h2c1.105 0 2 .895 2 2v6c0 1.105-.895 2-2 2H3c-1.105 0-2-.895-2-2V8c0-1.105.895-2 2-2h2zM8.707.293L11.5 3.086c.39.39.39 1.023 0 1.414-.39.39-1.024.39-1.414 0L9 3.414V11c0 .552-.448 1-1 1s-1-.448-1-1V3.414L6 4.5c-.39.39-1.024.39-1.414 0-.39-.39-.39-1.024 0-1.414L7.293.293c.39-.39 1.024-.39 1.414 0z\"/>\n    </g>\n</symbol><symbol id=\"share\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-160 -32)\">\n    <path d=\"M165.082611,42.1593397 C164.543049,42.6798471 163.808912,43 163,43 C161.343146,43 160,41.6568542 160,40 C160,38.3431458 161.343146,37 163,37 C163.808912,37 164.543049,37.3201529 165.082611,37.8406603 L170.022669,35.3706317 C170.007705,35.2491857 170,35.1254927 170,35 C170,33.3431458 171.343146,32 173,32 C174.656854,32 176,33.3431458 176,35 C176,36.6568542 174.656854,38 173,38 C172.191088,38 171.456951,37.6798471 170.917389,37.1593397 L165.977331,39.6293683 C165.992295,39.7508143 166,39.8745073 166,40 C166,40.1254927 165.992295,40.2491857 165.977331,40.3706317 L170.917389,42.8406603 C171.456951,42.3201529 172.191088,42 173,42 C174.656854,42 176,43.3431458 176,45 C176,46.6568542 174.656854,48 173,48 C171.343146,48 170,46.6568542 170,45 C170,44.8745073 170.007705,44.7508143 170.022669,44.6293683 L165.082611,42.1593397 Z\"/>\n    <path d=\"M165.082611,42.1593397 C164.543049,42.6798471 163.808912,43 163,43 C161.343146,43 160,41.6568542 160,40 C160,38.3431458 161.343146,37 163,37 C163.808912,37 164.543049,37.3201529 165.082611,37.8406603 L170.022669,35.3706317 C170.007705,35.2491857 170,35.1254927 170,35 C170,33.3431458 171.343146,32 173,32 C174.656854,32 176,33.3431458 176,35 C176,36.6568542 174.656854,38 173,38 C172.191088,38 171.456951,37.6798471 170.917389,37.1593397 L165.977331,39.6293683 C165.992295,39.7508143 166,39.8745073 166,40 C166,40.1254927 165.992295,40.2491857 165.977331,40.3706317 L170.917389,42.8406603 C171.456951,42.3201529 172.191088,42 173,42 C174.656854,42 176,43.3431458 176,45 C176,46.6568542 174.656854,48 173,48 C171.343146,48 170,46.6568542 170,45 C170,44.8745073 170.007705,44.7508143 170.022669,44.6293683 L165.082611,42.1593397 Z\"/>\n  </g>\n</symbol><symbol id=\"shield\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\">\n    <path d=\"M8 0C9.20521 0 10.3958 0.161508 11.7816 0.497858C13.0017 0.79361 14.2524 1.21086 15.5333 1.74843C15.8038 1.84297 16 2.08508 16 2.3672C16 5.70315 15.5174 8.29912 14.3128 10.4515C13.1076 12.6172 11.2094 14.3253 8.40627 15.8989C8.16596 16.0337 7.84964 16.0337 7.60833 15.8989C4.80591 14.3253 2.90797 12.6172 1.70243 10.4515C0.49722 8.29912 0 5.70315 0 2.3672C0 2.12034 0.15019 1.90412 0.379636 1.79059L0.482616 1.74843C1.7479 1.21086 2.99826 0.79361 4.23334 0.497858C5.60485 0.161508 6.81039 0 8 0ZM8 2C6.98556 2 5.93935 2.13874 4.69909 2.44287C3.89685 2.63497 3.08355 2.88465 2.2592 3.19225L2.014 3.286L2.02834 3.64806C2.1358 5.97025 2.55108 7.75457 3.31204 9.22285L3.44993 9.47871C4.34101 11.0795 5.72634 12.4281 7.84879 13.723L8.007 13.818L8.16353 13.7244C10.1711 12.5 11.5185 11.2287 12.4142 9.73979L12.5676 9.47474C13.4082 7.97259 13.8602 6.12463 13.9721 3.65506L13.985 3.283L13.7512 3.19376C13.0851 2.94655 12.4311 2.73671 11.7891 2.564L11.3099 2.44143C10.0547 2.13679 9.02322 2 8 2ZM8 4C8.76147 4 9.53815 4.09217 10.4778 4.30112L10.8381 4.385L11.2935 4.50163L11.7186 4.62187L11.893 4.675L11.8889 4.73299C11.7379 6.17337 11.4298 7.31061 10.9557 8.24741L10.8223 8.49801L10.6832 8.73794L10.5465 8.95553C10.0314 9.74198 9.31695 10.4776 8.33818 11.203L8.007 11.44L7.999 11.435L8 4Z\"/>\n  </g>\n</symbol><symbol id=\"sound\" viewBox=\"0 0 16 16\">\n  <path d=\"M7.937 13.323a.718.718 0 0 1-.72.719.72.72 0 0 1-.46-.166l-3.939-3.258H.72A.72.72 0 0 1 0 9.9V7.034a.72.72 0 0 1 .72-.72h2.098l3.939-3.257a.72.72 0 0 1 1.18.554v9.712zm2.769-1.124a.72.72 0 0 1-.561-.209l-.097-.096a.718.718 0 0 1-.07-.937c.54-.726.825-1.587.825-2.49 0-.971-.323-1.882-.935-2.634a.718.718 0 0 1 .05-.962l.096-.096a.722.722 0 0 1 1.067.053 5.681 5.681 0 0 1 1.297 3.64 5.705 5.705 0 0 1-1.147 3.444.721.721 0 0 1-.525.287zm2.978 2.222a.722.722 0 0 1-1.06.045l-.094-.094a.718.718 0 0 1-.042-.972 7.669 7.669 0 0 0 1.802-4.933 7.648 7.648 0 0 0-1.93-5.08.718.718 0 0 1 .03-.985l.094-.094a.721.721 0 0 1 1.049.03 9.212 9.212 0 0 1 2.332 6.13 9.23 9.23 0 0 1-2.18 5.953z\"/>\n</symbol><symbol id=\"spinner\" viewBox=\"0 0 32 32\">\n  <path opacity=\".25\" d=\"M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24\"/>\n  <path d=\"M16 0a16 16 0 0 1 16 16h-4a12 12 0 0 0-12-12z\"/>\n</symbol><symbol id=\"stack\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3.243 6.034L.671 4.842a.779.779 0 0 1-.396-.397c-.197-.496 0-.894.396-1.093L7.792.075c.198-.1.395-.1.594 0l7.12 3.277a.746.746 0 0 1 .494.696.746.746 0 0 1-.494.695l-2.67 1.291-.594.298-3.856 1.887a.694.694 0 0 1-.693 0c-.198-.105-3.857-1.887-3.857-1.887l-.593-.298zm12.03 4.807c.78.4.675 1.345-.086 1.756L8.421 15.9a.985.985 0 0 1-.864 0L.572 12.49a.779.779 0 0 1-.396-.397c-.197-.497 0-.894.396-1.093l.89-.397 2.472 1.192 3.627 1.73a.984.984 0 0 0 .857-.005l3.725-1.825 2.373-1.19.756.336zm.53-3.218c.197.397 0 .894-.594 1.192l-2.274 1.092-.594.3-4.058 2.036a.98.98 0 0 1-.883 0l-4.058-2.037-.594-.299L.474 8.815a.777.777 0 0 1-.396-.398c-.198-.496 0-.894.396-1.092l1.285-.596 2.176.993 3.626 1.73a.986.986 0 0 0 .858-.005l4.12-2.023 1.582-.794 1.286.596a.771.771 0 0 1 .396.397z\"/>\n</symbol><symbol id=\"star\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M8 12l-4.702 2.472.898-5.236L.392 5.528l5.257-.764L8 0l2.351 4.764 5.257.764-3.804 3.708.898 5.236z\"/>\n</symbol><symbol id=\"stats\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M13 4h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1M7 0h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1M1 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1\"/>\n</symbol><symbol id=\"sync-cozy\" viewBox=\"0 0 16 16\">\n    <g fill=\"none\" fill-rule=\"evenodd\">\n        <g fill=\"#297EF1\">\n            <path d=\"M8 2c2.21 0 4 1.79 4 4 2.21 0 4 1.79 4 4s-1.79 4-4 4H4c-2.21 0-4-1.79-4-4s1.79-4 4-4c0-2.21 1.79-4 4-4zM4.6 9.014c-.12-.025-.242-.004-.345.055l-.038.024c-.042.029-.08.063-.112.104l-.012.014c-.034.047-.059.1-.074.16l-.006.04C4.008 9.441 4 9.469 4 9.5v2c0 .276.224.5.5.5.237 0 .426-.168.478-.39C5.728 12.459 6.818 13 8 13c1.547 0 2.956-.899 3.632-2.268.122-.247.02-.547-.228-.67-.248-.121-.547-.02-.67.228C10.227 11.322 9.162 12 8 12c-.74 0-1.436-.286-1.976-.754.135-.007.267-.064.36-.176.177-.212.148-.527-.064-.704l-1.5-1.25c-.005-.005-.012-.006-.017-.011l-.04-.024c-.04-.025-.08-.045-.124-.057zM8 5c-1.57 0-2.992.906-3.653 2.291-.119.25-.013.548.236.667.25.118.548.013.667-.236C5.746 6.682 6.817 6 8 6c.769 0 1.477.287 2.017.758-.149-.005-.298.048-.401.172-.177.212-.148.527.064.704l1.5 1.25.011.007c.01.008.023.013.034.02.04.028.083.05.127.063l.04.01c.054.012.11.017.163.01.005 0 .009.002.013.001.063-.01.118-.031.17-.059.014-.007.025-.016.038-.024.04-.027.076-.059.107-.097l.02-.021c.034-.047.06-.1.077-.158.003-.01.002-.02.004-.03.008-.034.016-.068.016-.106v-2c0-.276-.224-.5-.5-.5-.226 0-.41.152-.471.357C10.284 5.523 9.196 5 7.999 5z\"/>\n        </g>\n    </g>\n</symbol><symbol id=\"sync\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M16 7.2V3c0-.6-.4-1-1-1-.5 0-.8.3-.9.7A8.09 8.09 0 0 0 8 0C4.9 0 2 1.8.7 4.6c-.2.5 0 1.1.5 1.3.5.2 1.1 0 1.3-.5C3.5 3.4 5.6 2 8 2c1.5 0 3 .6 4 1.5-.3 0-.6.1-.8.3-.4.4-.3 1.1.1 1.4l3 2.5h.1c.1.1.2.1.3.1h.4c.1 0 .2-.1.3-.1h.1c.1-.1.2-.1.2-.2.2 0 .2-.1.3-.3 0 .1 0 0 0 0m-1.2 2.9c-.5-.2-1.1 0-1.3.5A6 6 0 0 1 8 14c-1.5 0-2.9-.6-4-1.5.3 0 .5-.1.7-.4.4-.4.3-1.1-.1-1.4l-3-2.5h-.1L1.3 8h-.1c-.2 0-.5 0-.7.1H.4c-.1.1-.1.2-.2.3-.1.1-.1.2-.2.3V13c0 .6.4 1 1 1 .5 0 .9-.3 1-.8C3.5 14.9 5.6 16 8 16c3.1 0 5.9-1.8 7.3-4.5.2-.5 0-1.1-.5-1.4\"/></symbol><symbol id=\"target\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M9 12.899V12a1 1 0 0 0-2 0v.899A5.016 5.016 0 0 1 3.101 9H4a1 1 0 0 0 0-2h-.899A5.016 5.016 0 0 1 7 3.101V4a1 1 0 0 0 2 0v-.899A5.016 5.016 0 0 1 12.899 7H12a1 1 0 0 0 0 2h.899A5.016 5.016 0 0 1 9 12.899zM16 7h-1.08A7.005 7.005 0 0 0 9 1.08V1a1 1 0 0 0-2 0v.08A7.005 7.005 0 0 0 1.08 7H1a1 1 0 0 0 0 2h.08A7.004 7.004 0 0 0 7 14.92V15a1 1 0 0 0 2 0v-.08A7.004 7.004 0 0 0 14.92 9H16V7z\"/>\n</symbol><symbol id=\"team\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M11.145 7.75C10.263 7.285 9.647 6.23 9.647 5c0-1.657 1.12-3 2.5-3 1.381 0 2.5 1.343 2.5 3 0 1.231-.618 2.29-1.502 2.752V9l1.105.553c.49.245 1.095.848 1.342 1.342l.106.21c.245.49 0 .895-.55.895H9.142c-.544 0-.797-.4-.55-.895l.106-.21c.245-.49.848-1.095 1.342-1.342L11.145 9V7.75zM4.647 10.8c-1.165-.48-2-1.776-2-3.3 0-1.933 1.343-3.5 3-3.5s3 1.567 3 3.5c0 1.524-.835 2.82-2 3.3V12l2.051.684c.532.177 1.15.717 1.397 1.21l.105.211c.245.49.002.895-.548.895h-8.01c-.539 0-.794-.4-.547-.895l.105-.21c.245-.49.872-1.037 1.397-1.211L4.647 12v-1.2z\"/>\n</symbol><symbol id=\"telephone\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M5.88 4.655a1.68 1.68 0 0 0 .001-2.377L4.097.492a1.685 1.685 0 0 0-2.38 0l-.98.979A2.521 2.521 0 0 0 .42 4.646 39.038 39.038 0 0 0 11.356 15.58c.999.662 2.328.53 3.175-.316l.979-.979a1.681 1.681 0 0 0 0-2.379l-1.785-1.784a1.679 1.679 0 0 0-2.379 0l-.594.593A40.017 40.017 0 0 1 5.285 5.25l.595-.595z\"/>\n</symbol><symbol id=\"top\" viewBox=\"0 0 24 24\">\n  <g fill-rule=\"evenodd\" transform=\"translate(12.285714, 12.000000) rotate(270.000000) translate(-12.285714, -12.000000)\">\n    <path d=\"M6.46026077,20.3174036 C5.84657974,20.9310847 5.84657974,21.9260582 6.46026077,22.5397392 C7.0739418,23.1534203 8.06891534,23.1534203 8.68259637,22.5397392 L18.1111678,13.1111678 C18.7248488,12.4974868 18.7248488,11.5025132 18.1111678,10.8888322 L8.68259637,1.46026077 C8.06891534,0.846579743 7.0739418,0.846579743 6.46026077,1.46026077 C5.84657974,2.0739418 5.84657974,3.06891534 6.46026077,3.68259637 L14.7776644,12 L6.46026077,20.3174036 Z\"/>\n  </g>\n</symbol><symbol id=\"to-the-cloud\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M12.112 5.665a4.132 4.132 0 0 0-1.239-2.475A4.227 4.227 0 0 0 7.918 2c-1.112 0-2.16.422-2.955 1.19-.237.229-.43.487-.603.756l2.847 2.847L9 5v5H4l1.793-1.793-2.452-2.451a4.21 4.21 0 0 0-2.136 1.148A4.124 4.124 0 0 0 0 9.824C0 12.127 1.895 14 4.225 14h7.507c2.33 0 4.227-1.873 4.227-4.176 0-2.176-1.694-3.968-3.847-4.159\"/>\n</symbol><symbol id=\"trash\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-96 -32)\">\n    <path d=\"M100.5,33 L98.0068455,33 C97.4499488,33 97,33.4477153 97,34 L97,35 L111,35 L111,34 C111,33.4438648 110.54922,33 109.993155,33 L107.5,33 L107,32 L101,32 L100.5,33 Z M98,36 L110,36 L110,45.9914698 C110,47.1007504 109.09805,48 107.99147,48 L100.00853,48 C98.8992496,48 98,47.0980496 98,45.9914698 L98,36 Z\"/>\n    <path d=\"M100.5,33 L98.0068455,33 C97.4499488,33 97,33.4477153 97,34 L97,35 L111,35 L111,34 C111,33.4438648 110.54922,33 109.993155,33 L107.5,33 L107,32 L101,32 L100.5,33 Z M98,36 L110,36 L110,45.9914698 C110,47.1007504 109.09805,48 107.99147,48 L100.00853,48 C98.8992496,48 98,47.0980496 98,45.9914698 L98,36 Z\"/>\n  </g>\n</symbol><symbol id=\"trophy\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3 2V1c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1v1h2.001a1 1 0 0 1 .999.99v3.012c0 1.104-.852 2.282-1.9 2.631L13 9l-4 3v2h.508c.548 0 1.26.358 1.593.802L12 16H4l.899-1.198C5.23 14.359 5.942 14 6.492 14H7v-2L3 9l-1.1-.367C.85 8.283 0 7.102 0 6.003V2.99C0 2.444.443 2 .999 2H3zm0 2H2v2.505c0 .273.232.495.5.495H3V4zm10 0v3h.5c.268 0 .5-.222.5-.495V4h-1z\"/>\n</symbol><symbol id=\"unlink\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M.151 2.849l1.414-1.414 13 13-1.414 1.414-4.453-4.452c-1.099.059-2.202-.298-3-1.095a1.044 1.044 0 0 1 0-1.475c.077-.076.168-.124.26-.172L5.302 8l-2.909 2.91a1.04 1.04 0 0 0-.007 1.472l1.23 1.23a1.04 1.04 0 0 0 1.468-.002l1.656-1.656a1.042 1.042 0 1 1 1.474 1.475L6.56 15.085a3.126 3.126 0 0 1-4.418.002l-1.229-1.23A3.125 3.125 0 0 1 .92 9.437l2.91-2.91L.15 2.849zm10.15 2.85a1.044 1.044 0 0 1 0 1.475c-.033.034-.078.048-.115.076L7.53 4.595c1.023 0 2.03.362 2.77 1.104zm4.786-3.556a3.126 3.126 0 0 1-.007 4.422l-2.79 2.79-1.474-1.474 2.79-2.79a1.04 1.04 0 0 0 .006-1.473l-1.23-1.23a1.042 1.042 0 0 0-1.468.002L9.259 4.045A1.042 1.042 0 1 1 7.784 2.57L9.44.915a3.127 3.127 0 0 1 4.418-.001l1.229 1.229z\"/>\n</symbol><symbol id=\"unlock\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M3 6h7V4.5C10 3.122 9.103 2 8 2S6 3.122 6 4.5H4V4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v2h1c.556 0 1 .446 1 .995v8.01c0 .54-.449.995-1.002.995H3.002A1.003 1.003 0 0 1 2 15.005v-8.01C2 6.455 2.448 6 3 6zm5 2.5A1.5 1.5 0 0 0 6.5 10c0 .552.303 1.032.75 1.29v2.46a.751.751 0 0 0 1.5 0v-2.46c.445-.258.75-.738.75-1.29 0-.828-.674-1.5-1.5-1.5z\"/>\n</symbol><symbol id=\"upload\" viewBox=\"0 0 16 16\">\n  <path fill-rule=\"evenodd\" d=\"M263,102.414214 L261.707107,103.707107 C261.316582,104.097631 260.683418,104.097631 260.292893,103.707107 C259.902369,103.316582 259.902369,102.683418 260.292893,102.292893 L263.292893,99.2928932 C263.683418,98.9023689 264.316582,98.9023689 264.707107,99.2928932 L267.707107,102.292893 C268.097631,102.683418 268.097631,103.316582 267.707107,103.707107 C267.316582,104.097631 266.683418,104.097631 266.292893,103.707107 L265,102.414214 L265,110 C265,110.552285 264.552285,111 264,111 C263.447715,111 263,110.552285 263,110 L263,102.414214 Z M257,98 L271,98 C271.552285,98 272,97.5522847 272,97 C272,96.4477153 271.552285,96 271,96 L257,96 C256.447715,96 256,96.4477153 256,97 C256,97.5522847 256.447715,98 257,98 Z\" transform=\"translate(-256 -96)\"/>\n</symbol><symbol id=\"up\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M11 16V8h5L8 0 0 8h5v8z\"/>\n</symbol><symbol id=\"videos\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M1 1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm.5 1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zm3-11a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zm3-11a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zm3-11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zm0 11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zm3-11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zm0 11a.5.5 0 1 0 0 1h1a.5.5 0 1 0 0-1h-1zM6 11.066a.5.5 0 0 0 .777.416l4.599-3.064a.5.5 0 0 0 0-.832L6.777 4.52A.5.5 0 0 0 6 4.935v6.131z\"/>\n</symbol><symbol id=\"wallet-add\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 0h11a1 1 0 0 1 1 1v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm1 2a1 1 0 1 0 0 2h9V2H3zm4 4v3H4v2h3v3h2v-3h3V9H9V6H7z\"/>\n</symbol><symbol id=\"wallet-new\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 0h11a1 1 0 0 1 1 1v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm1 2a1 1 0 1 0 0 2h9V2H3zm4 4v3H4v2h3v3h2v-3h3V9H9V6H7z\"/>\n</symbol><symbol id=\"wallet\" viewBox=\"0 0 16 16\">\n    <path fill-rule=\"evenodd\" d=\"M2 0h11a1 1 0 0 1 1 1v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm1 2a1 1 0 1 0 0 2h9V2H3zm8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"/>\n</symbol><symbol id=\"warning-circle\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M8 0a8 8 0 110 16A8 8 0 018 0zm0 9.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM8 4a1 1 0 00-.993.883L7 5v3a1 1 0 001.993.117L9 8V5a1 1 0 00-1-1z\"/></symbol><symbol id=\"warning\" viewBox=\"0 0 16 16\">\n  <g fill-rule=\"evenodd\" transform=\"translate(-288 -128)\">\n    <path d=\"M295.021699,129.735659 C295.564898,128.777255 296.450192,128.78566 296.988422,129.735659 L303.52045,141.26497 C304.063442,142.223374 303.613566,143.000315 302.503518,143.000315 L289.50373,143.000315 C288.399102,143.000315 287.948739,142.214969 288.487174,141.26497 L295.021699,129.735659 Z M295.003624,141.000315 C295.003624,140.44803 295.447489,140.000315 296.003624,140.000315 C296.555909,140.000315 297.003624,140.444179 297.003624,141.000315 C297.003624,141.552599 296.559759,142.000315 296.003624,142.000315 C295.45134,142.000315 295.003624,141.55645 295.003624,141.000315 Z M295.003624,133.003244 C295.003624,132.449341 295.447489,132.000315 296.003624,132.000315 C296.555909,132.000315 297.003624,132.438196 297.003624,133.003244 L297.003624,137.997385 C297.003624,138.551288 296.559759,139.000315 296.003624,139.000315 C295.45134,139.000315 295.003624,138.562433 295.003624,137.997385 L295.003624,133.003244 Z\"/>\n  </g>\n</symbol><symbol id=\"warn\" viewBox=\"0 0 48 48\"><path fill-rule=\"evenodd\" d=\"M24,48 C37.254834,48 48,37.254834 48,24 C48,10.745166 37.254834,0 24,0 C10.745166,0 0,10.745166 0,24 C0,37.254834 10.745166,48 24,48 Z M22.4965402,13.1030164 C23.3271937,11.6654101 24.6721035,11.6623183 25.5044703,13.1030164 L35.4961011,30.3969836 C36.3266815,31.8345899 35.6568766,33 33.9920699,33 L14.0079301,33 C12.3466962,33 11.6715912,31.8376817 12.5040311,30.3969836 L22.4965402,13.1030164 Z M22.5792265,18.4260768 C22.5354709,17.6384763 23.1362228,17 23.9297104,17 L24.0702896,17 C24.8598969,17 25.464841,17.6328625 25.4207735,18.4260768 L25.0554191,25.0024554 C25.024812,25.553384 24.5561352,26 24,26 C23.4477153,26 22.9752049,25.5536886 22.9445809,25.0024554 L22.5792265,18.4260768 Z M22.5,29 C22.5,28.1715729 23.1657972,27.5 24,27.5 C24.8284271,27.5 25.5,28.1657972 25.5,29 C25.5,29.8284271 24.8342028,30.5 24,30.5 C23.1715729,30.5 22.5,29.8342028 22.5,29 Z\"/></symbol><symbol id=\"wrench-circle\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M8 0a8 8 0 110 16A8 8 0 018 0zm1.91 4.182a4.052 4.052 0 00-4.636-.773l2.262 2.262.072.086a.62.62 0 01-.072.793l-.99.99-.078.068a.61.61 0 01-.801-.067L3.404 5.279l-.09.199a4.05 4.05 0 00.87 4.43 4.055 4.055 0 004.293.923l2.422 2.423a6.029 6.029 0 002.326-2.302l-2.41-2.414.072-.2a4.054 4.054 0 00-.976-4.156z\"/></symbol></svg>";

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/index.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/index.js ***!
  \********************************************************************************************************/
/*! exports provided: iconPropType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iconPropType", function() { return iconPropType; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);





var styles = {
  "icon--spin": "styles__icon--spin___ybfC1",
  "spin": "styles__spin___2Vvw3",
  "icon": "styles__icon___23x3R",
  "icon--preserveColor": "styles__icon--preserveColor___3gBz6",
  "shake": "styles__shake___wT_3z"
};

var DEFAULT_SIZE = '16';

function getSvgObject(icon) {
  var anchor;

  if (icon.id) {
    anchor = "#".concat(icon.id);
  } else if (icon[0] === '#') {
    anchor = icon;
  } else {
    anchor = '#' + icon;
  }

  if (!anchor) {
    console.warn("Icon not found ".concat(icon, "."));
    return null;
  }

  return function (props) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("svg", props, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("use", {
      xlinkHref: anchor
    }));
  };
}

function isFunction(obj) {
  return obj instanceof Function;
}

function Icon(props) {
  var icon = props.icon,
      width = props.width,
      height = props.height,
      color = props.color,
      className = props.className,
      preserveColor = props.preserveColor,
      rotate = props.rotate,
      size = props.size,
      spin = props.spin,
      restProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(props, ["icon", "width", "height", "color", "className", "preserveColor", "rotate", "size", "spin"]);

  var Svg = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return isFunction(icon) ? icon : getSvgObject(icon);
  }, [icon]);
  var style = props.style;
  style = Object.assign({}, style);

  if (color) {
    style['fill'] = color;
  }

  if (rotate) {
    style['transform'] = "rotate(".concat(rotate, "deg)");
  }

  var iconClassName = preserveColor ? 'icon--preserveColor' : 'icon';
  var iconClass = classnames__WEBPACK_IMPORTED_MODULE_5___default()(className, styles[iconClassName], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, styles['icon--spin'], spin));
  return Svg ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Svg, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    className: iconClass,
    style: style,
    width: width || size || DEFAULT_SIZE,
    height: height || size || DEFAULT_SIZE
  }, restProps)) : null;
}

Icon.isProperIcon = function (icon) {
  var isSvgSymbol = icon && !!icon.id;
  var isIconIdentifier = typeof icon === 'string';
  var isSvgr = isFunction(icon);
  return isSvgSymbol || isIconIdentifier || isSvgr;
};

var iconPropType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func]);
Icon.propTypes = {
  icon: iconPropType.isRequired,
  width: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  height: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  color: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object]),
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  preserveColor: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /** Shorthand for both width and height */
  size: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  spin: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};
Icon.defaultProps = {
  spin: false
};
/* harmony default export */ __webpack_exports__["default"] = (Icon);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Cross.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Cross.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/cross.svg` to regenerate;


function SvgCross(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 24 24"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M10.586 12L.293 1.707A1 1 0 011.707.293L12 10.586 22.293.293a1 1 0 011.414 1.414L13.414 12l10.293 10.293a1 1 0 01-1.414 1.414L12 13.414 1.707 23.707a1 1 0 01-1.414-1.414L10.586 12z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgCross);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Cube.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Cube.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/cube.svg` to regenerate;


function SvgCube(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M1 11.009V5.5c0-.55.39-.773.872-.498l5.256 3.003c.476.272.872.944.872 1.495v5.508c0 .549-.39.772-.872.497l-5.256-3.003C1.396 12.231 1 11.56 1 11.01zm15 0c0 .55-.396 1.222-.872 1.494l-5.256 3.003c-.481.275-.872.052-.872-.497V9.5c0-.55.396-1.223.872-1.495l5.256-3.003c.481-.275.872-.052.872.498v5.508zM9.35 6.982c-.47.288-1.237.284-1.7 0l-4.8-2.954c-.47-.29-.463-.732.027-.995L7.623.477c.485-.261 1.264-.264 1.754 0l4.746 2.556c.485.26.49.71.027.995l-4.8 2.954z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgCube);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Previous.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Previous.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/previous.svg` to regenerate;


function SvgPrevious(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M3.414 7h11.58C15.548 7 16 7.444 16 8c0 .552-.45 1-1.007 1H3.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 111.414 1.414L3.414 7z",
    fillRule: "evenodd"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgPrevious);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Spinner.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Spinner.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/spinner.svg` to regenerate;


function SvgSpinner(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 32 32"
  }, props, {
    role: "progressbar",
    "aria-busy": "true"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    opacity: 0.25,
    d: "M16 0a16 16 0 000 32 16 16 0 000-32m0 4a12 12 0 010 24 12 12 0 010-24"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M16 0a16 16 0 0116 16h-4A12 12 0 0016 4z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgSpinner);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/AnimatedContentHeader.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/AnimatedContentHeader.js ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);







var AnimatedContentHeader = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AnimatedContentHeader, _Component);

  function AnimatedContentHeader() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AnimatedContentHeader);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(AnimatedContentHeader).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AnimatedContentHeader, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimatedContentHeader;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (AnimatedContentHeader);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalBackButton.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalBackButton.js ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cozy-ui/transpiled/react/Button */ "../overrides/cozy-ui/transpiled/react/Button/index.jsx");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Previous__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Previous */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Previous.js");
/* harmony import */ var cozy_ui_transpiled_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cozy-ui/transpiled/react/hooks/useBreakpoints */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/hooks/useBreakpoints/index.js");





var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};



var DumbModalBackButton = function DumbModalBackButton(props) {
  var _useBreakpoints = Object(cozy_ui_transpiled_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_6__["default"])(),
      isMobile = _useBreakpoints.isMobile;

  var className = props.className,
      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, ["className"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_4__["Button"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    icon: cozy_ui_transpiled_react_Icons_Previous__WEBPACK_IMPORTED_MODULE_5__["default"],
    iconOnly: true,
    extension: "narrow",
    theme: "text",
    label: "back",
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles['c-modal-back-button'], 'u-m-0 u-pos-absolute', {
      'u-p-1': isMobile,
      'u-p-half': !isMobile,
      'u-h-3': isMobile
    }, className)
  }, rest));
};

var ModalBackButton = DumbModalBackButton;
/* harmony default export */ __webpack_exports__["default"] = (ModalBackButton);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalButtons.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalButtons.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cozy-ui/transpiled/react/Button */ "../overrides/cozy-ui/transpiled/react/Button/index.jsx");

var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};



var ModalButtons = function ModalButtons(_ref) {
  var secondaryText = _ref.secondaryText,
      secondaryAction = _ref.secondaryAction,
      secondaryType = _ref.secondaryType,
      primaryText = _ref.primaryText,
      primaryAction = _ref.primaryAction,
      primaryType = _ref.primaryType,
      children = _ref.children,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('u-flex', 'u-flex-wrap-reverse', 'u-flex-justify-end', styles['c-modal-footer--button'], className)
  }, children, secondaryText && secondaryAction && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    theme: secondaryType,
    onClick: secondaryAction,
    label: secondaryText,
    className: "u-flex-auto-s"
  }), primaryText && primaryAction && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    theme: primaryType,
    onClick: primaryAction,
    label: primaryText,
    className: "u-flex-auto-s"
  }));
};

ModalButtons.defaultProps = {
  primaryType: 'regular',
  secondaryType: 'secondary'
};
/* harmony default export */ __webpack_exports__["default"] = (ModalButtons);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalContent.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalContent.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_transpiled_react_Modal_AnimatedContentHeader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/AnimatedContentHeader */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/AnimatedContentHeader.js");









var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};


function _getChildrenToRender(children) {
  return react__WEBPACK_IMPORTED_MODULE_7___default.a.Children.map(children, function (child) {
    return child && child.nodeName !== cozy_ui_transpiled_react_Modal_AnimatedContentHeader__WEBPACK_IMPORTED_MODULE_9__["default"] ? child : null;
  });
}

function _getAnimatedHeader(children) {
  return react__WEBPACK_IMPORTED_MODULE_7___default.a.Children.toArray(children).find(function (child) {
    return child && child.nodeName === cozy_ui_transpiled_react_Modal_AnimatedContentHeader__WEBPACK_IMPORTED_MODULE_9__["default"];
  });
}

var ModalContent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ModalContent, _Component);

  function ModalContent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ModalContent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ModalContent).call(this, props));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "UNSAFE_componentWillUpdate", function (nextProps) {
      var children = nextProps.children;

      _this.refreshComputedParts(children);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "handleScroll", function () {
      if (!_this.contentHeader) return;

      var _assertThisInitialize = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this),
          headerHeight = _assertThisInitialize.headerHeight;

      if (!headerHeight && _this.contentHeader.clientHeight) {
        _this.headerHeight = _this.contentHeader.clientHeight;
        return;
      }

      if (!_this.state.displayGhostHeader && _this.scrollingContent.scrollTop > headerHeight - 20) {
        _this.setState(function () {
          return {
            displayGhostHeader: true
          };
        });
      } else if (_this.state.displayGhostHeader && _this.scrollingContent.scrollTop < headerHeight - 20) {
        _this.setState(function () {
          return {
            displayGhostHeader: false
          };
        });
      }
    });

    var _children = _this.props.children;

    _this.refreshComputedParts(_children);

    _this.state = {
      displayGhostHeader: false
    };
    return _this;
  } // for preact
  // eslint-disable-next-line react/no-deprecated


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ModalContent, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      this.UNSAFE_componentWillUpdate(nextProps, nextState);
    }
  }, {
    key: "refreshComputedParts",
    value: function refreshComputedParts(children) {
      var animatedHeader = _getAnimatedHeader(children);

      this.animatedHeader = animatedHeader;
      this.childrenToRender = animatedHeader ? _getChildrenToRender(children) : children;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollingContent.addEventListener('scroll', this.handleScroll, {
        passive: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.scrollingContent.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          fixed = _this$props.fixed;
      var displayGhostHeader = this.state.displayGhostHeader;
      var animatedHeader = this.animatedHeader,
          childrenToRender = this.childrenToRender;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles["c-modal-content".concat(fixed ? '-fixed' : '')], className),
        ref: function ref(div) {
          _this2.scrollingContent = div;
        }
      }, animatedHeader && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: animatedHeader.attributes.className,
        ref: function ref(div) {
          _this2.contentHeader = div;
        }
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h2", {
        className: styles['c-modal-illu-header']
      }, animatedHeader.children), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()(styles['c-modal-illu-header--ghost'], animatedHeader.attributes.activeClassName, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()({}, styles['is-active'], displayGhostHeader))
      }, animatedHeader.children)), childrenToRender);
    }
  }]);

  return ModalContent;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ModalContent);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalCross.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalCross.js ***!
  \**************************************************************************************************************/
/*! exports provided: ModalCrossIcon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalCrossIcon", function() { return ModalCrossIcon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cozy-ui/transpiled/react/palette */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/palette.js");
/* harmony import */ var cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_transpiled_react_Icons_Cross__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Cross */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Cross.js");
/* harmony import */ var cozy_ui_transpiled_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cozy-ui/transpiled/react/hooks/useBreakpoints */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/hooks/useBreakpoints/index.js");

var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};





var ModalCrossIcon = function ModalCrossIcon(props) {
  var _useBreakpoints = Object(cozy_ui_transpiled_react_hooks_useBreakpoints__WEBPACK_IMPORTED_MODULE_5__["default"])(),
      isMobile = _useBreakpoints.isMobile;

  var color = props.color;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
    icon: cozy_ui_transpiled_react_Icons_Cross__WEBPACK_IMPORTED_MODULE_4__["default"],
    size: isMobile ? '16' : '24',
    color: color || cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_3___default.a['coolGrey']
  });
};

var ModalCross = function ModalCross(_ref) {
  var onClick = _ref.onClick,
      color = _ref.color,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(styles['c-modal-close'], className),
    onClick: onClick,
    type: "button",
    "aria-label": "close"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ModalCrossIcon, {
    color: color
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ModalCross);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalFooter.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalFooter.js ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);

var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};


var ModalFooter = function ModalFooter(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(styles['c-modal-footer'], className)
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (ModalFooter);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalHeader.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalHeader.js ***!
  \***************************************************************************************************************/
/*! exports provided: default, ModalHeader, ModalBrandedHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalHeader", function() { return ModalHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalBrandedHeader", function() { return ModalBrandedHeader; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);


var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};


var ModalHeader = function ModalHeader(_ref) {
  var title = _ref.title,
      children = _ref.children,
      className = _ref.className,
      appIcon = _ref.appIcon,
      appName = _ref.appName,
      appEditor = _ref.appEditor,
      style = _ref.style,
      id = _ref.id;
  var isTitle = typeof children === 'string';
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles['c-modal-header'], className),
    style: style,
    id: id
  }, title && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, title), isTitle ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, children) : children, appName && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
    className: styles['c-modal-app']
  }, appIcon && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    className: styles['c-modal-app-icon'],
    src: appIcon
  }), appEditor && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: styles['c-app-editor']
  }, appEditor, "\xA0"), appName));
};

var ModalBrandedHeader = function ModalBrandedHeader(_ref2) {
  var logo = _ref2.logo,
      bg = _ref2.bg,
      className = _ref2.className,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles['c-modal-header--branded'], className),
    style: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({
      background: bg
    }, style)
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: logo,
    alt: ""
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ModalHeader);


/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalSection.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalSection.js ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);

var styles = {
  "CozyTheme--inverted": "styles__CozyTheme--inverted___e9x-M",
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};


var ModalSection = function ModalSection(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(styles['c-modal-content'], styles['c-modal-section'], className)
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (ModalSection);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Overlay/index.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Overlay/index.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash/omit */ "./node_modules/lodash/omit.js");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_remove_scroll__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-remove-scroll */ "./node_modules/react-remove-scroll/dist/es2015/index.js");









var styles = {
  "c-overlay": "styles__c-overlay___31iWd"
};




var ESC_KEYCODE = 27;
var nonDOMProps = ['onEscape', 'children', 'className'];

var bodyTallerThanWindow = function bodyTallerThanWindow() {
  return document.body.getBoundingClientRect().height > window.innerHeight;
};
/**
 * Display a black overlay on the screen. Stops
 * scrolling on the html/body while displayed.
 *
 * Can react to Escape key
 */


var Overlay = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Overlay, _Component);

  function Overlay() {
    var _getPrototypeOf2;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Overlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Overlay)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "handleKeydown", function (e) {
      if (e.keyCode === ESC_KEYCODE) {
        _this.props.onEscape();
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "handleClick", function (e) {
      if (_this.props.onClick && e.target === e.currentTarget) {
        _this.props.onClick();
      }
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Overlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.onEscape) {
        document.addEventListener('keydown', this.handleKeydown);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.onEscape) {
        document.removeEventListener('keydown', this.handleKeydown);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className;
      var domProps = lodash_omit__WEBPACK_IMPORTED_MODULE_10___default()(this.props, nonDOMProps); // We use Overlay when opening an ActionMenu.
      // We don't want to block the scroll on Desktop if the ActionMenu
      // is displayed. So no RemoveScroll if the content is too small
      // @todo Overlay should not RemoveScroll by itself. It should
      // be done by lower component (like ActionMenu / Dialog / Modal...)

      var Wrapper = bodyTallerThanWindow() ? react__WEBPACK_IMPORTED_MODULE_8___default.a.Fragment : react_remove_scroll__WEBPACK_IMPORTED_MODULE_12__["RemoveScroll"];
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
        onClick: this.handleClick,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(styles['c-overlay'], className)
      }, domProps), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Wrapper, null, children));
    }
  }]);

  return Overlay;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

Overlay.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.node,
  onEscape: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Overlay);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Portal/index.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Portal/index.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);


var Portal = function Portal(_ref) {
  var into = _ref.into,
      children = _ref.children;
  var targetElement = document.querySelector(into);
  return react_dom__WEBPACK_IMPORTED_MODULE_0___default.a.createPortal(children, targetElement);
};

/* harmony default export */ __webpack_exports__["default"] = (Portal);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Typography/index.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Typography/index.js ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");

/* harmony default export */ __webpack_exports__["default"] = (_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/helpers/appDataset.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/helpers/appDataset.js ***!
  \****************************************************************************************************************/
/*! exports provided: readApplicationDataset, readCozyData, readCozyDataFromDOM, resetCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readApplicationDataset", function() { return readApplicationDataset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readCozyData", function() { return readCozyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readCozyDataFromDOM", function() { return readCozyDataFromDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetCache", function() { return resetCache; });
/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/memoize */ "./node_modules/lodash/memoize.js");
/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_0__);

var readApplicationDataset = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var root = document.querySelector('[role=application]');
  return root && root.dataset;
});
var readCozyData = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var dataset = readApplicationDataset();

  if (dataset && dataset.cozy) {
    return JSON.parse(dataset.cozy);
  }

  return null;
});
/**
 * Reads an attribute set by the stack from the DOM
 *
 * A cozy app must receives on data from the stack, typically on the
 * [role=application] node. Here, we try first to read from data-cozy
 * and we fallback on data-[attrName].
 */

var readCozyDataFromDOM = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(function (attrName) {
  var data = readCozyData();

  if (data && data[attrName] !== undefined) {
    return data[attrName] === 'true' || data[attrName] === 'false' ? JSON.parse(data[attrName]) : data[attrName];
  }

  var appDataset = readApplicationDataset();

  if (!appDataset) {
    return;
  }

  var attrName2 = "cozy".concat(attrName[0].toUpperCase()).concat(attrName.substring(1));
  var value = appDataset[attrName2];
  return value === undefined ? undefined : value === '' || JSON.parse(value);
});
var resetCache = function resetCache() {
  readCozyDataFromDOM.cache = new lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default.a.Cache();
  readCozyData.cache = new lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default.a.Cache();
  readApplicationDataset.cache = new lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default.a.Cache();
};

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/helpers/migrateProps.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/helpers/migrateProps.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




var migrate = function migrate(oldProps, options) {
  var newProps, msg;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      if (option.src && option.dest) {
        // simple mode
        var src = option.src;
        var dest = option.dest;
        var oldProp = oldProps[src];

        if (oldProp === undefined) {
          continue;
        }

        newProps = newProps || _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, oldProps); // copy props only if we change them

        newProps[dest] = oldProps[src];
        delete newProps[src];
        msg = "`".concat(src, "` is deprecated and has been migrated automatically, you should use `").concat(dest, "` now");
      } else if (option.fn) {
        // advanced mode
        var res = option.fn(newProps || oldProps);

        if (res.length !== 2) {
          throw new Error('migrateOption `fn` should return [newProps, msg].');
        }

        ;

        var _res = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(res, 2);

        newProps = _res[0];
        msg = _res[1];
      } else {
        console.warn('migrateProps option is not valid, valid properties are `src`, `dest`, `fn`. You passed', option);
      }

      if (( true) && msg) {
        console.warn("Deprecation: ".concat(msg));
        msg = null;
      }
    } // It is possible that no migration has been made, in this case newProps is undefined and we simply
    // return the oldProps

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newProps || oldProps;
};
/**
 * HOC to migrate old props for deprecation purpose.
 *
 * @example
 * Let's say we deprecated the property `withCross` of Modal and replaced
 * it with `closable`. To preserve backward compatibility we use the `migrate`
 * HOC, and provide an array of migrations to perform on the old props.
 *
 * ```
 * const migrateOptions = [{ src: 'withCross', dest: 'closable'}]
 * const Modal = migrate(migrateOptions)(_Modal)
 * ```
 *
 * Here we only have one migration, to rename `withCross` (source) to `closable` (destination).
 * For more complex migration, it is possible to use the `fn` property of a migration. In this
 * case you are responsible for providing a warning message as part of the return value of `fn`.
 *
 * ```
 * const migrateClosableAndReverse = oldProps => {
 *   let newProps
 *   if (oldProps.withoutCross) {
 *     newProps = {...oldProps}
 *     newProps.closable = !oldProps.withoutCross
 *     return [newProps, '`withoutCross` is deprecated. Use `closable` now. Be careful closable = !withoutCross']
 *   } else {
 *     return [oldProps, null]
 *   }
 *   return newProps || oldProps
 * }
 *
 * const migrateOptions = [{ fn: migrateClosableAndReverse }]
 * const Modal = migrate(migrateOptions)(_Modal)
 * ```
 *
 * @param  {Array} migrateOptions - Prop migrations that will be done on the old props
 * @return {HOC}
 */


/* harmony default export */ __webpack_exports__["default"] = (function (migrateOptions) {
  return function (Component) {
    var Wrapped = function Wrapped(oldProps) {
      var newProps = migrate(oldProps, migrateOptions, Component);
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, newProps);
    };

    Wrapped.displayName = Component.displayName || Component.name;
    return Wrapped;
  };
});

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/hooks/useBreakpoints/index.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/hooks/useBreakpoints/index.js ***!
  \************************************************************************************************************************/
/*! exports provided: BreakpointsProvider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakpointsProvider", function() { return BreakpointsProvider; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cozy-ui/transpiled/react/helpers/breakpoints */ "../overrides/cozy-ui/transpiled/react/helpers/breakpoints.js");





var getBreakpointsStatus = function getBreakpointsStatus() {
  return Object(cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_3__["getBreakpointsStatus"])(cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_3__["default"]);
};

var BreakpointsCtx = Object(react__WEBPACK_IMPORTED_MODULE_1__["createContext"])(null);
var BreakpointsProvider = function BreakpointsProvider(_ref) {
  var children = _ref.children;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(getBreakpointsStatus()),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      breakpoints = _useState2[0],
      setBreakpoints = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var handleResize = lodash_throttle__WEBPACK_IMPORTED_MODULE_2___default()(function () {
      setBreakpoints(getBreakpointsStatus());
    }, 100);
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(BreakpointsCtx.Provider, {
    value: breakpoints
  }, children);
};

var useBreakpoints = function useBreakpoints() {
  var v = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(BreakpointsCtx);

  if (v === null) {
    throw new Error('Cannot use useBreakpoints without BreakpointsProvider. The component must have a BreakpointsProvider above it.');
  }

  return v;
};

/* harmony default export */ __webpack_exports__["default"] = (useBreakpoints);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/palette.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/palette.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// GENERATED AUTOMATICALLY FROM stylus/settings/palette.json
module.exports = {
  "black": "var(--black)",
  "white": "var(--white)",
  "paleGrey": "var(--paleGrey)",
  "silver": "var(--silver)",
  "coolGrey": "var(--coolGrey)",
  "slateGrey": "var(--slateGrey)",
  "charcoalGrey": "var(--charcoalGrey)",
  "overlay": "var(--overlay)",
  "primaryColor": "var(--primaryColor)",
  "primaryColorLight": "var(--primaryColorLight)",
  "primaryContrastTextColor": "var(--primaryContrastTextColor)",
  "success": "var(--successColor)",
  "warning": "var(--warningColor)",
  "error": "var(--errorColor)",
  "info": "var(--infoColor)",
  "errorBackground": "var(--errorBackground)",
  "primaryBackgroundLight": "var(--primaryBackgroundLight)",
  "neutralBackground": "var(--neutralBackground)",
  "zircon": "#F5FAFF",
  "frenchPass": "#C2DCFF",
  "dodgerBlue": "#297EF2",
  "scienceBlue": "#0B61D6",
  "puertoRico": "#0DCBCF",
  "grannyApple": "#DEF7E7",
  "emerald": "#35CE68",
  "malachite": "#08b442",
  "seafoamGreen": "#3DA67E",
  "brightSun": "#FFC644",
  "texasRose": "#FFAE5F",
  "chablis": "#FFF2F2",
  "yourPink": "#FDCBCB",
  "fuchsia": "#FC4C83",
  "pomegranate": "#F52D2D",
  "monza": "#DD0505",
  "portage": "#9169F2",
  "azure": "#1FA8F1",
  "melon": "#FD7461",
  "blazeOrange": "#FC6D00",
  "mango": "#FF962F",
  "pumpkinOrange": "#FF7F1B",
  "lavender": "#C2ADF4",
  "darkPeriwinkle": "#6984CE",
  "purpley": "#7F6BEE",
  "lightishPurple": "#B449E7",
  "barney": "#922BC2",
  "weirdGreen": "#40DE8E"
};

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/proptypes.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/proptypes.js ***!
  \*******************************************************************************************************/
/*! exports provided: AppDoctype, FileDoctype */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppDoctype", function() { return AppDoctype; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDoctype", function() { return FileDoctype; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var AppDoctype = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  slug: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  developer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  links: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    icon: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  }),
  latest_version: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    version: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  })
});
var FileDoctype = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  _id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  class: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  mime: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/AppIcon/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/AppIcon/index.js ***!
  \**************************************************************************************/
/*! exports provided: AppIcon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppIcon", function() { return AppIcon; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-client */ "./node_modules/cozy-client/dist/index.js");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Cube__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Cube */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Cube.js");
/* harmony import */ var cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! cozy-ui/transpiled/react/palette */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/palette.js");
/* harmony import */ var cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var cozy_ui_transpiled_react_proptypes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! cozy-ui/transpiled/react/proptypes */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/proptypes.js");













var styles = {
  "c-loading-placeholder": "styles__c-loading-placeholder___3L6Gz",
  "placeHolderShimmer": "styles__placeHolderShimmer___3Rei_",
  "c-app-icon": "styles__c-app-icon___2_O40",
  "c-app-icon-default": "styles__c-app-icon-default___3CEmt"
};




var DONE = 'done';
var ERRORED = 'errored';
var FETCHING = 'fetching';
var AppIcon = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(AppIcon, _Component);

  function AppIcon(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, AppIcon);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(AppIcon).call(this, props, context));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      error: null,
      icon: null,
      status: _this.props.client ? FETCHING : ERRORED
    });

    _this.isUnmounting = false;
    _this.handleError = _this.handleError.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    _this.fetchIcon = _this.fetchIcon.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(AppIcon, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isUnmounting = false;
      this.load();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.fetchIcon !== prevProps.fetchIcon) {
        this.load();
      }
    }
  }, {
    key: "fetchIcon",
    value: function fetchIcon() {
      var _this$props = this.props,
          app = _this$props.app,
          type = _this$props.type,
          priority = _this$props.priority,
          client = _this$props.client;
      return client.getStackClient().getIconURL({
        type: type,
        slug: app.slug || app,
        priority: priority
      });
    }
  }, {
    key: "handleError",
    value: function handleError() {
      this.setState({
        status: ERRORED
      });
    }
  }, {
    key: "load",
    value: function () {
      var _load = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this$props2, app, fetchIcon, onReady, client, loadFn, loadedUrl, loadError, domain, secure, cozyURL;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, app = _this$props2.app, fetchIcon = _this$props2.fetchIcon, onReady = _this$props2.onReady, client = _this$props2.client;
                loadFn = fetchIcon || this.fetchIcon;
                _context.prev = 2;

                if (client) {
                  cozyURL = new URL(client.getStackClient().uri);
                  domain = cozyURL.host;
                  secure = cozyURL.protocol === 'https:';
                }

                _context.next = 6;
                return loadFn(app, domain, secure);

              case 6:
                loadedUrl = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                loadError = _context.t0;

              case 12:
                if (!this.isUnmounting) {
                  this.setState({
                    error: loadError,
                    icon: loadedUrl,
                    status: loadError ? ERRORED : DONE
                  });

                  if (typeof onReady === 'function') {
                    onReady();
                  }
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          alt = _this$props3.alt,
          className = _this$props3.className,
          fallbackIcon = _this$props3.fallbackIcon;
      var _this$state = this.state,
          icon = _this$state.icon,
          status = _this$state.status;

      switch (status) {
        case FETCHING:
          return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
            role: "progressbar",
            className: classnames__WEBPACK_IMPORTED_MODULE_11___default()(styles['c-loading-placeholder'], styles['c-app-icon'], className)
          });

        case DONE:
          return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
            alt: alt,
            className: classnames__WEBPACK_IMPORTED_MODULE_11___default()(styles['c-app-icon'], className),
            src: icon,
            onError: this.handleError
          });

        case ERRORED:
        default:
          return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_13__["default"], {
            className: classnames__WEBPACK_IMPORTED_MODULE_11___default()(styles['c-app-icon'], styles['c-app-icon-default'], className),
            height: "100%",
            icon: fallbackIcon || cozy_ui_transpiled_react_Icons_Cube__WEBPACK_IMPORTED_MODULE_14__["default"],
            width: "100%",
            color: cozy_ui_transpiled_react_palette__WEBPACK_IMPORTED_MODULE_15___default.a['coolGrey']
          });
      }
    }
  }]);

  return AppIcon;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);
AppIcon.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,

  /** Required if fetchIcon is not provided */
  app: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOfType([cozy_ui_transpiled_react_proptypes__WEBPACK_IMPORTED_MODULE_16__["AppDoctype"], prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string]),

  /** Icon to fallback on error (optional), default cube icon */
  fallbackIcon: cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_13__["iconPropType"],

  /** Custom implementation of how to fetch icon */
  fetchIcon: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,
  client: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.object.isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.string,
  onReady: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.func,

  /** Type of application */
  type: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOf(['app', 'konnector']),

  /** First source to fetch the icon. If nothing is found, there is a second try with the other source */
  priority: prop_types__WEBPACK_IMPORTED_MODULE_10___default.a.oneOf(['stack', 'registry'])
};
AppIcon.defaultProps = {
  type: 'app',
  priority: 'stack'
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_client__WEBPACK_IMPORTED_MODULE_12__["withClient"])(AppIcon));

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js ***!
  \***********************************************************************************/
/*! exports provided: DEFAULT_LANG, I18nContext, I18n, translate, useI18n, createUseI18n, initTranslation, extend, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LANG", function() { return DEFAULT_LANG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18nContext", function() { return I18nContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18n", function() { return I18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useI18n", function() { return useI18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUseI18n", function() { return createUseI18n; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! node-polyglot */ "./node_modules/node-polyglot/index.js");
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var cozy_ui_transpiled_react_I18n_translation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n/translation */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/translation.js");
/* harmony import */ var cozy_ui_transpiled_react_I18n_format__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n/format */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/format.js");
/* harmony import */ var _translation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./translation */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/translation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initTranslation", function() { return _translation__WEBPACK_IMPORTED_MODULE_13__["initTranslation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return _translation__WEBPACK_IMPORTED_MODULE_13__["extend"]; });

/**
 * Provides an I18n helper using a Higher Order Component.
 */















var DEFAULT_LANG = 'en';
var I18nContext = react__WEBPACK_IMPORTED_MODULE_8___default.a.createContext(); // Provider root component

var I18n = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(I18n, _Component);

  function I18n(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, I18n);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(I18n).call(this, props));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "UNSAFE_componentWillReceiveProps", function (nextProps) {
      if (nextProps.lang !== _this.props.lang) {
        _this.init(nextProps);
      }
    });

    _this.init(_this.props);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(I18n, [{
    key: "init",
    value: function init(props) {
      var polyglot = props.polyglot,
          lang = props.lang,
          dictRequire = props.dictRequire,
          context = props.context,
          defaultLang = props.defaultLang;
      this.translator = polyglot || Object(cozy_ui_transpiled_react_I18n_translation__WEBPACK_IMPORTED_MODULE_11__["initTranslation"])(lang, dictRequire, context, defaultLang);
      this.format = Object(cozy_ui_transpiled_react_I18n_format__WEBPACK_IMPORTED_MODULE_12__["initFormat"])(lang, defaultLang);
      this.t = this.translator.t.bind(this.translator);
      this.contextValue = this.getContextValue(props);
    }
  }, {
    key: "getContextValue",
    value: function getContextValue(props) {
      return {
        t: this.t,
        f: this.format,
        lang: (props || this.props).lang
      };
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return this.contextValue;
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(I18nContext.Provider, {
        value: this.contextValue
      }, this.props.children);
    }
  }]);

  return I18n;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);
I18n.propTypes = {
  lang: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string.isRequired,
  // current language.
  polyglot: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.object,
  // A polyglot instance.
  dictRequire: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  // A callback to load locales.
  context: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string,
  // current context.
  defaultLang: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string // default language. By default is 'en'

};
I18n.defaultProps = {
  defaultLang: DEFAULT_LANG
};
I18n.childContextTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  f: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func,
  lang: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.string
}; // higher order decorator for components that need `t` and/or `f`

var translate = function translate() {
  return function (WrappedComponent) {
    var Wrapper = function Wrapper(props) {
      var i18nContext = Object(react__WEBPACK_IMPORTED_MODULE_8__["useContext"])(I18nContext);
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        t: i18nContext && i18nContext.t,
        f: i18nContext && i18nContext.f,
        lang: i18nContext && i18nContext.lang
      }));
    };

    Wrapper.displayName = "withI18n(".concat(WrappedComponent.displayName || WrappedComponent.name, ")");
    return Wrapper;
  };
};
var useI18n = function useI18n() {
  return Object(react__WEBPACK_IMPORTED_MODULE_8__["useContext"])(I18nContext);
};
var createUseI18n = function createUseI18n(locales) {
  return function () {
    var _ref = useI18n() || {
      lang: DEFAULT_LANG
    },
        lang = _ref.lang;

    return Object(react__WEBPACK_IMPORTED_MODULE_8__["useMemo"])(function () {
      var polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_10___default.a({
        lang: lang,
        phrases: locales[lang]
      });
      var f = Object(cozy_ui_transpiled_react_I18n_format__WEBPACK_IMPORTED_MODULE_12__["initFormat"])(lang);
      var t = polyglot.t.bind(polyglot);
      return {
        t: t,
        f: f,
        lang: lang
      };
    }, [lang]);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (I18n);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/translation.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/translation.js ***!
  \*****************************************************************************************/
/*! exports provided: _polyglot, initTranslation, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_polyglot", function() { return _polyglot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTranslation", function() { return initTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-polyglot */ "./node_modules/node-polyglot/index.js");
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/index.js");


var _polyglot;
var initTranslation = function initTranslation(lang, dictRequire, context) {
  var defaultLang = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_LANG"];
  _polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_0___default.a({
    phrases: dictRequire(defaultLang),
    locale: defaultLang
  }); // Load global locales

  if (lang && lang !== defaultLang) {
    try {
      var dict = dictRequire(lang);

      _polyglot.extend(dict);

      _polyglot.locale(lang);
    } catch (e) {
      console.warn("The dict phrases for \"".concat(lang, "\" can't be loaded"));
    }
  } // Load context locales


  if (context) {
    try {
      var _dict = dictRequire(lang, context);

      _polyglot.extend(_dict);
    } catch (e) {
      console.warn("The context ".concat(context, " cannot be loaded for lang ").concat(lang));
    }
  }

  return _polyglot;
};
var extend = function extend(dict) {
  return _polyglot && _polyglot.extend(dict);
};

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/Sprite.js":
/*!************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/Sprite.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cozy_ui_transpiled_react_Icon_icons_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon/icons-sprite */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/icons-sprite.js");
/* harmony import */ var cozy_ui_transpiled_react_Icon_icons_sprite__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_ui_transpiled_react_Icon_icons_sprite__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var displayNone = {
  display: 'none'
};

var IconSprite = function IconSprite() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: displayNone,
    dangerouslySetInnerHTML: {
      __html: cozy_ui_transpiled_react_Icon_icons_sprite__WEBPACK_IMPORTED_MODULE_0___default.a
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (IconSprite);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/index.js ***!
  \***********************************************************************************/
/*! exports provided: iconPropType, default, Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iconPropType", function() { return iconPropType; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Sprite */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/Sprite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return _Sprite__WEBPACK_IMPORTED_MODULE_6__["default"]; });






var styles = {
  "icon--spin": "styles__icon--spin___ybfC1",
  "spin": "styles__spin___2Vvw3",
  "icon": "styles__icon___23x3R",
  "icon--preserveColor": "styles__icon--preserveColor___3gBz6",
  "shake": "styles__shake___wT_3z"
};

var DEFAULT_SIZE = '16';

function getSvgObject(icon) {
  var anchor;

  if (icon.id) {
    anchor = "#".concat(icon.id);
  } else if (icon[0] === '#') {
    anchor = icon;
  } else {
    anchor = '#' + icon;
  }

  if (!anchor) {
    console.warn("Icon not found ".concat(icon, "."));
    return null;
  }

  return function (props) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("svg", props, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("use", {
      xlinkHref: anchor
    }));
  };
}

function isFunction(obj) {
  return obj instanceof Function;
}

function Icon(props) {
  var icon = props.icon,
      width = props.width,
      height = props.height,
      color = props.color,
      className = props.className,
      preserveColor = props.preserveColor,
      rotate = props.rotate,
      size = props.size,
      spin = props.spin,
      restProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(props, ["icon", "width", "height", "color", "className", "preserveColor", "rotate", "size", "spin"]);

  var Svg = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return isFunction(icon) ? icon : getSvgObject(icon);
  }, [icon]);
  var style = props.style;
  style = Object.assign({}, style);

  if (color) {
    style['fill'] = color;
  }

  if (rotate) {
    style['transform'] = "rotate(".concat(rotate, "deg)");
  }

  var iconClassName = preserveColor ? 'icon--preserveColor' : 'icon';
  var iconClass = classnames__WEBPACK_IMPORTED_MODULE_5___default()(className, styles[iconClassName], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, styles['icon--spin'], spin));
  return Svg ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Svg, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    className: iconClass,
    style: style,
    width: width || size || DEFAULT_SIZE,
    height: height || size || DEFAULT_SIZE
  }, restProps)) : null;
}

Icon.isProperIcon = function (icon) {
  var isSvgSymbol = icon && !!icon.id;
  var isIconIdentifier = typeof icon === 'string';
  var isSvgr = isFunction(icon);
  return isSvgSymbol || isIconIdentifier || isSvgr;
};

var iconPropType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func]);
Icon.propTypes = {
  icon: iconPropType.isRequired,
  width: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  height: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  color: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object]),
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
  preserveColor: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /** Shorthand for both width and height */
  size: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number]),
  spin: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
};
Icon.defaultProps = {
  spin: false
};
/* harmony default export */ __webpack_exports__["default"] = (Icon);


/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Bottom.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Bottom.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/bottom.svg` to regenerate;


function SvgBottom(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 24 24"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M3.968 6.175a1.571 1.571 0 00-2.222 2.222l9.429 9.428a1.571 1.571 0 002.222 0l9.428-9.428a1.571 1.571 0 00-2.222-2.222l-8.317 8.317-8.318-8.317z",
    fillRule: "evenodd"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgBottom);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Cloud.js":
/*!************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Cloud.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/cloud.svg` to regenerate;


function SvgCloud(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("defs", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M164 261a4 4 0 118 0 4 4 0 110 8h-8a4 4 0 110-8zm1.146 3.854c.155.154.423.368.793.58.618.353 1.31.566 2.061.566.75 0 1.443-.213 2.06-.566.371-.212.64-.426.794-.58a.5.5 0 10-.708-.708 2.934 2.934 0 01-.582.42A3.136 3.136 0 01168 265a3.136 3.136 0 01-1.564-.434 2.934 2.934 0 01-.582-.42.5.5 0 10-.708.708z",
    id: "cloud_svg__a"
  })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g", {
    fillRule: "evenodd",
    transform: "translate(-160 -255)"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("use", {
    xlinkHref: "#cloud_svg__a"
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgCloud);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/CloudHappy.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/CloudHappy.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/cloud-happy.svg` to regenerate;


function SvgCloudHappy(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M4 6a4 4 0 118 0 4 4 0 110 8H4a4 4 0 110-8zm1 3s0 2 3 2 3-2 3-2H5z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgCloudHappy);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Gear.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Gear.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/gear.svg` to regenerate;


function SvgGear(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("g", {
    fillRule: "evenodd"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M14.25 7.078c.051.26.077.568.077.926 0 .358-.026.665-.078.925l1.62 1.333c.131.086.163.203.099.352-.325.95-.859 1.826-1.602 2.628-.104.124-.229.155-.37.094l-2.032-.668c-.52.396-1.08.705-1.68.926l-.409 2c-.026.146-.117.233-.273.258-.56.1-1.094.148-1.602.148a9.21 9.21 0 01-1.601-.148c-.157-.024-.248-.11-.274-.259l-.409-1.999a5.98 5.98 0 01-1.68-.926l-2.03.668c-.145.062-.268.03-.372-.094C.892 12.44.359 11.565.032 10.614c-.065-.148-.032-.266.098-.352L1.751 8.93a4.761 4.761 0 01-.078-.925c0-.358.026-.667.078-.926L.131 5.746C0 5.66-.034 5.542.031 5.394c.326-.95.86-1.826 1.602-2.627.104-.123.228-.154.371-.093l2.031.667a5.99 5.99 0 011.68-.926l.41-1.999c.025-.148.116-.234.273-.259a8.221 8.221 0 013.202 0c.156.024.247.111.273.26l.41 1.998c.6.223 1.159.53 1.68.926l2.03-.667c.143-.062.267-.03.371.093.742.802 1.276 1.678 1.602 2.627.064.148.032.266-.098.352l-1.62 1.332zM8 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M14.25 7.078c.051.26.077.568.077.926 0 .358-.026.665-.078.925l1.62 1.333c.131.086.163.203.099.352-.325.95-.859 1.826-1.602 2.628-.104.124-.229.155-.37.094l-2.032-.668c-.52.396-1.08.705-1.68.926l-.409 2c-.026.146-.117.233-.273.258-.56.1-1.094.148-1.602.148a9.21 9.21 0 01-1.601-.148c-.157-.024-.248-.11-.274-.259l-.409-1.999a5.98 5.98 0 01-1.68-.926l-2.03.668c-.145.062-.268.03-.372-.094C.892 12.44.359 11.565.032 10.614c-.065-.148-.032-.266.098-.352L1.751 8.93a4.761 4.761 0 01-.078-.925c0-.358.026-.667.078-.926L.131 5.746C0 5.66-.034 5.542.031 5.394c.326-.95.86-1.826 1.602-2.627.104-.123.228-.154.371-.093l2.031.667a5.99 5.99 0 011.68-.926l.41-1.999c.025-.148.116-.234.273-.259a8.221 8.221 0 013.202 0c.156.024.247.111.273.26l.41 1.998c.6.223 1.159.53 1.68.926l2.03-.667c.143-.062.267-.03.371.093.742.802 1.276 1.678 1.602 2.627.064.148.032.266-.098.352l-1.62 1.332zM8 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgGear);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Help.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Help.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/help.svg` to regenerate;


function SvgHelp(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M8 16A8 8 0 118 0a8 8 0 010 16zm1-7.198C10.122 8.355 11 7.21 11 6c0-1.552-1.448-3-3-3S5 4.448 5 6h2c0-.448.552-1 1-1 .448 0 1 .552 1 1 0 .448-.552 1-1 1a1 1 0 00-1 1v2h2V8.802zM7 11v2h2v-2H7z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgHelp);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Logout.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Logout.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/logout.svg` to regenerate;


function SvgLogout(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M12.586 9H5a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 111.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.586 9zM0 1a1 1 0 112 0v14a1 1 0 01-2 0V1z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgLogout);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/People.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/People.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/people.svg` to regenerate;


function SvgPeople(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M8 9c2.21 0 4-2.015 4-4.5S10.21 0 8 0 4 2.015 4 4.5 5.79 9 8 9zm-8 5c0-1 2-4 4-4s1 1 4 1 2-1 4-1 4 3 4 4 0 2-1 2H1c-1 0-1-1-1-2z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgPeople);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Phone.js":
/*!************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Phone.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/phone.svg` to regenerate;


function SvgPhone(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 16 16"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M2 1c0-.552.456-1 1.002-1h9.996A1 1 0 0114 1v14c0 .552-.456 1-1.002 1H3.002A1 1 0 012 15V1zm2 1v10h8V2H4zm4 13a1 1 0 100-2 1 1 0 000 2z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgPhone);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Top.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Top.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Automatically created, please run `scripts/generate-svg-icon.sh assets/icons/ui/top.svg` to regenerate;


function SvgTop(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    viewBox: "0 0 24 24"
  }, props), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    d: "M20.603 17.825a1.571 1.571 0 002.222-2.222l-9.428-9.428a1.571 1.571 0 00-2.222 0l-9.429 9.428a1.571 1.571 0 002.222 2.222l8.318-8.317 8.317 8.317z",
    fillRule: "evenodd"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgTop);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Modal/index.js":
/*!************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Modal/index.js ***!
  \************************************************************************************/
/*! exports provided: BODY_CLASS, default, ModalContent, ModalSection, ModalFooter, ModalHeader, AnimatedContentHeader, ModalTitle, ModalButtons, ModalBrandedHeader, ModalDescription, ModalBackButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BODY_CLASS", function() { return BODY_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalTitle", function() { return ModalTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDescription", function() { return ModalDescription; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var cozy_ui_transpiled_react_Overlay__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! cozy-ui/transpiled/react/Overlay */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Overlay/index.js");
/* harmony import */ var cozy_ui_transpiled_react_helpers_migrateProps__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! cozy-ui/transpiled/react/helpers/migrateProps */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/helpers/migrateProps.js");
/* harmony import */ var cozy_ui_transpiled_react_Portal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! cozy-ui/transpiled/react/Portal */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Portal/index.js");
/* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lodash/uniqueId */ "./node_modules/lodash/uniqueId.js");
/* harmony import */ var lodash_uniqueId__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqueId__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalContent__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalContent */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalContent", function() { return cozy_ui_transpiled_react_Modal_ModalContent__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalSection__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalSection */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalSection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalSection", function() { return cozy_ui_transpiled_react_Modal_ModalSection__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalHeader */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalHeader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalHeader", function() { return cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBrandedHeader", function() { return cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalBrandedHeader"]; });

/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalCross__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalCross */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalCross.js");
/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalFooter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalFooter */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalFooter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalFooter", function() { return cozy_ui_transpiled_react_Modal_ModalFooter__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalButtons__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalButtons */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalButtons.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalButtons", function() { return cozy_ui_transpiled_react_Modal_ModalButtons__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var cozy_ui_transpiled_react_Modal_AnimatedContentHeader__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/AnimatedContentHeader */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/AnimatedContentHeader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatedContentHeader", function() { return cozy_ui_transpiled_react_Modal_AnimatedContentHeader__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var cozy_ui_transpiled_react_Modal_ModalBackButton__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal/ModalBackButton */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Modal/ModalBackButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBackButton", function() { return cozy_ui_transpiled_react_Modal_ModalBackButton__WEBPACK_IMPORTED_MODULE_24__["default"]; });


















var styles = {
  "CozyTheme--normal": "styles__CozyTheme--normal___3KdKA",
  "c-modal": "styles__c-modal___33aV9",
  "c-modal-content": "styles__c-modal-content___2av1P",
  "c-modal-header": "styles__c-modal-header___hTCm5",
  "c-modal-header--branded": "styles__c-modal-header--branded___1wwof",
  "c-modal-footer": "styles__c-modal-footer___2Z4Tc",
  "c-modal-container": "styles__c-modal-container___31zmi",
  "c-modal-wrapper": "styles__c-modal-wrapper___8PyE9",
  "c-modal--xsmall": "styles__c-modal--xsmall___1lu1t",
  "c-modal--small": "styles__c-modal--small___XUfOM",
  "c-modal--medium": "styles__c-modal--medium___1dS6h",
  "c-modal--large": "styles__c-modal--large___3arEs",
  "c-modal--xlarge": "styles__c-modal--xlarge___1XePQ",
  "c-modal--xxlarge": "styles__c-modal--xxlarge___3Xp1K",
  "c-modal-wrapper--fullscreen": "styles__c-modal-wrapper--fullscreen___3ygpX",
  "c-modal--fullscreen": "styles__c-modal--fullscreen___8xZVw",
  "c-modal-illu-header": "styles__c-modal-illu-header___3oi9k",
  "c-modal-illu-header--ghost": "styles__c-modal-illu-header--ghost___3E9lu",
  "is-active": "styles__is-active___1fLce",
  "c-modal--small-spacing": "styles__c-modal--small-spacing___1foWa",
  "c-modal--large-spacing": "styles__c-modal--large-spacing___n2gNs",
  "c-modal-app": "styles__c-modal-app___1e4sV",
  "c-app-editor": "styles__c-app-editor___JFuCk",
  "c-modal-app-icon": "styles__c-modal-app-icon___3MjON",
  "c-modal-content-fixed": "styles__c-modal-content-fixed___3wKzQ",
  "c-modal-footer--button": "styles__c-modal-footer--button___1sIa4",
  "c-modal-section": "styles__c-modal-section___2QNq3",
  "c-modal-close": "styles__c-modal-close___1v2bp",
  "c-modal--closable": "styles__c-modal--closable___29CLQ",
  "c-modal-close--notitle": "styles__c-modal-close--notitle___1rqne",
  "c-modal--overflowHidden": "styles__c-modal--overflowHidden___3H87t",
  "c-modal-back-button": "styles__c-modal-back-button___aIF_M",
  "spin": "styles__spin___lXiub",
  "shake": "styles__shake___13P1Q"
};








var ModalDescription = cozy_ui_transpiled_react_Modal_ModalContent__WEBPACK_IMPORTED_MODULE_17__["default"];

var ModalTitle = function ModalTitle(props) {
  console.log('ModalTitle is a deprecated component, use ModalHeader instead');
  return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalHeader"], props);
}; // Present on the body when a Modal is shown, changes the
// z-index of alerts so they appear in front of the modal


var BODY_CLASS = 'has-modal';
/**
 * @deprecated Please use [CozyDialogs](#/CozyDialogs) or [Dialog](#/Dialog).
 */

var Modal = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(Modal, _Component);

  function Modal(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Modal);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Modal).call(this, props));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "handleOutsideClick", function (e) {
      if (e.target === e.currentTarget && _this.props.dismissAction) _this.props.dismissAction();
    });

    _this.titleID = lodash_uniqueId__WEBPACK_IMPORTED_MODULE_16___default()('modal_');
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.title && !this.props['aria-label']) {
        console.warn('If your modal does not provide a `title` prop, please provide the `aria-label` prop for a11y purposes.');
      }

      var hasBodyClass = document.body.classList.contains(BODY_CLASS);

      if (!hasBodyClass) {
        document.body.classList.add(BODY_CLASS);
        this.shouldRemoveBodyClass = true;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Do not remove the class if it was not added by us
      if (this.shouldRemoveBodyClass) {
        document.body.classList.remove(BODY_CLASS);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _cx2;

      var _this$props = this.props,
          children = _this$props.children,
          description = _this$props.description,
          title = _this$props.title,
          closable = _this$props.closable,
          dismissAction = _this$props.dismissAction,
          overflowHidden = _this$props.overflowHidden,
          className = _this$props.className,
          closeBtnClassName = _this$props.closeBtnClassName,
          closeBtnColor = _this$props.closeBtnColor,
          into = _this$props.into,
          size = _this$props.size,
          height = _this$props.height,
          width = _this$props.width,
          spacing = _this$props.spacing,
          mobileFullscreen = _this$props.mobileFullscreen,
          overlayClassName = _this$props.overlayClassName,
          wrapperClassName = _this$props.wrapperClassName,
          primaryText = _this$props.primaryText,
          primaryAction = _this$props.primaryAction,
          primaryType = _this$props.primaryType,
          secondaryText = _this$props.secondaryText,
          secondaryAction = _this$props.secondaryAction,
          secondaryType = _this$props.secondaryType,
          containerClassName = _this$props.containerClassName,
          restProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_this$props, ["children", "description", "title", "closable", "dismissAction", "overflowHidden", "className", "closeBtnClassName", "closeBtnColor", "into", "size", "height", "width", "spacing", "mobileFullscreen", "overlayClassName", "wrapperClassName", "primaryText", "primaryAction", "primaryType", "secondaryText", "secondaryAction", "secondaryType", "containerClassName"]);

      var titleID = this.titleID;
      var style = Object.assign({}, height && {
        height: height
      }, width && {
        width: width
      });
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Portal__WEBPACK_IMPORTED_MODULE_15__["default"], {
        into: into
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_12___default()(styles['c-modal-container'], containerClassName)
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Overlay__WEBPACK_IMPORTED_MODULE_13__["default"], {
        onEscape: closable ? dismissAction : undefined,
        className: overlayClassName
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_12___default()(styles['c-modal-wrapper'], _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()({}, styles['c-modal-wrapper--fullscreen'], mobileFullscreen), wrapperClassName),
        onClick: closable ? this.handleOutsideClick : undefined
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
        className: classnames__WEBPACK_IMPORTED_MODULE_12___default()(styles['c-modal'], styles["c-modal--".concat(size)], (_cx2 = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_cx2, styles['c-modal--overflowHidden'], overflowHidden), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_cx2, styles["c-modal--".concat(spacing, "-spacing")], spacing), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_cx2, styles['c-modal--fullscreen'], mobileFullscreen), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_cx2, styles['c-modal--closable'], closable), _cx2), className),
        style: style,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": title ? titleID : null
      }, restProps), closable && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Modal_ModalCross__WEBPACK_IMPORTED_MODULE_20__["default"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_12___default()(closeBtnClassName, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()({}, styles['c-modal-close--notitle'], !title)),
        onClick: dismissAction,
        color: closeBtnColor
      }), title && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalHeader"], {
        title: title,
        id: titleID
      }), description && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ModalDescription, null, description), children, primaryText && primaryAction || secondaryText && secondaryAction ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Modal_ModalFooter__WEBPACK_IMPORTED_MODULE_21__["default"], null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(cozy_ui_transpiled_react_Modal_ModalButtons__WEBPACK_IMPORTED_MODULE_22__["default"], {
        primaryText: primaryText,
        primaryAction: primaryAction,
        primaryType: primaryType,
        secondaryText: secondaryText,
        secondaryAction: secondaryAction,
        secondaryType: secondaryType
      })) : null)))));
    }
  }]);

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

Modal.propTypes = {
  /** Modal title */
  title: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.node,

  /** Content for simple modals */
  description: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.node,

  /** Secondary button type */
  secondaryType: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** Secondary button text */
  secondaryText: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** Secondary button callback */
  secondaryAction: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,

  /** Primary button type */
  primaryType: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** Primary button text */
  primaryText: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** Primary button callback */
  primaryAction: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func,

  /** Display the cross and enable click outside and escape key to close */
  closable: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,

  /** Use overflowHidden when your content may overflow of your modal */
  overflowHidden: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,

  /** `className` used on the modal, useful if you want to custom its CSS */
  className: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** `className` used on the cross, useful if you want to custom its CSS */
  closeBtnClassName: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** `closeBtnColor` to overwrite the default color of the cross button */
  closeBtnColor: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** If has a value, the modal will be rendered inside a portal and its value will be passed to Portal
   to control the rendering destination of the Modal */
  into: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  size: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  height: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  width: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  spacing: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.oneOf(['small', 'large']),

  /** If you want your modal taking all the screen on mobile */
  mobileFullscreen: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool,

  /** className to apply to Overlay component */
  overlayClassName: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** className to apply to wrapper element */
  wrapperClassName: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** className to apply to the container element */
  containerClassName: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,

  /** A function to be executed when the modal is dismissed */
  dismissAction: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.func
};
Modal.defaultProps = {
  primaryType: 'regular',
  secondaryType: 'secondary',
  closable: true,
  overflowHidden: false,
  size: 'small',
  into: 'body',
  mobileFullscreen: false
};
cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalBrandedHeader"].propTypes = {
  /** `bg` can be any type of color Hexa, RGB(A), HSL(A), gradient… anything that CSS allows for a color really */
  bg: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string.isRequired,

  /** `logo` should be a path to any type of image file supported by browsers */
  logo: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string.isRequired
};
cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalHeader"].propTypes = {
  appIcon: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  appEditor: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string,
  appName: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.string
};
cozy_ui_transpiled_react_Modal_ModalContent__WEBPACK_IMPORTED_MODULE_17__["default"].propTypes = {
  iconSrc: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.node,
  iconDest: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.node,
  fixed: prop_types__WEBPACK_IMPORTED_MODULE_11___default.a.bool
};
var EnhancedModal = Object(cozy_ui_transpiled_react_helpers_migrateProps__WEBPACK_IMPORTED_MODULE_14__["default"])([{
  src: 'withCross',
  dest: 'closable'
}, // withCross -> closable
{
  src: 'crossClassName',
  dest: 'closeBtnClassName'
}, // crossClassName -> closeBtnClassName
{
  src: 'crossColor',
  dest: 'closeBtnColor'
}, // crossColor -> closeBtnColor
{
  fn: function fn(props) {
    var newProps;

    if (props.secondaryAction && !props.dismissAction) {
      newProps = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, props);
      newProps.dismissAction = props.secondaryAction;
      var msg = 'In the future, `secondaryAction` will not be bound to closing actions (clicking on cross, clicking outside), please use `dismissAction` for that';
      return [newProps, msg];
    } else {
      return [props, null];
    }
  }
}])(Modal);
EnhancedModal.propTypes = Modal.propTypes;
EnhancedModal.defaultProps = Modal.defaultProps; // to be able to use them in Styleguidist

Object.assign(EnhancedModal, {
  ModalContent: cozy_ui_transpiled_react_Modal_ModalContent__WEBPACK_IMPORTED_MODULE_17__["default"],
  ModalSection: cozy_ui_transpiled_react_Modal_ModalSection__WEBPACK_IMPORTED_MODULE_18__["default"],
  ModalFooter: cozy_ui_transpiled_react_Modal_ModalFooter__WEBPACK_IMPORTED_MODULE_21__["default"],
  ModalHeader: cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalHeader"],
  AnimatedContentHeader: cozy_ui_transpiled_react_Modal_AnimatedContentHeader__WEBPACK_IMPORTED_MODULE_23__["default"],
  ModalBrandedHeader: cozy_ui_transpiled_react_Modal_ModalHeader__WEBPACK_IMPORTED_MODULE_19__["ModalBrandedHeader"],
  ModalDescription: ModalDescription,
  ModalBackButton: cozy_ui_transpiled_react_Modal_ModalBackButton__WEBPACK_IMPORTED_MODULE_24__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (EnhancedModal);


/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Spinner/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Spinner/index.js ***!
  \**************************************************************************************/
/*! exports provided: Spinner, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return Spinner; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cozy-ui/transpiled/react/Typography */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Typography/index.js");
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Spinner */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/Icons/Spinner.js");








var styles = {
  "CozyTheme--normal": "styles__CozyTheme--normal___3khZB",
  "c-spinner": "styles__c-spinner___1snK7",
  "c-spinner--middle": "styles__c-spinner--middle___RwyII",
  "c-spinner--nomargin": "styles__c-spinner--nomargin___13JyW",
  "spin": "styles__spin___3Lqkt",
  "shake": "styles__shake___6gnzB"
};
var Spinner = function Spinner(_ref) {
  var _cx;

  var t = _ref.t,
      loadingType = _ref.loadingType,
      middle = _ref.middle,
      noMargin = _ref.noMargin,
      color = _ref.color,
      size = _ref.size,
      className = _ref.className;
  var realsizeMapping = {
    tiny: 8,
    small: 12,
    medium: 16,
    large: 24,
    xlarge: 36,
    xxlarge: 80
  };
  var realsize = realsizeMapping[size];
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles['c-spinner'], (_cx = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_cx, styles['c-spinner--middle'], middle), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_cx, styles['c-spinner--nomargin'], noMargin), _cx), className)
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    icon: cozy_ui_transpiled_react_Icons_Spinner__WEBPACK_IMPORTED_MODULE_7__["default"],
    color: color,
    spin: true,
    size: realsize
  }), loadingType && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(cozy_ui_transpiled_react_Typography__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "body1",
    color: "textSecondary",
    component: "p"
  }, t("loading.".concat(loadingType))));
};
Spinner.propTypes = {
  loadingType: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  middle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  noMargin: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  size: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['tiny', 'small', 'medium', 'large', 'xlarge', 'xxlarge']),
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
Spinner.defaultProps = {
  loadingType: '',
  middle: false,
  noMargin: false,
  color: 'var(--spinnerColor)',
  size: 'medium',
  className: ''
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_6__["translate"])()(Spinner));

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/helpers/tracker.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/helpers/tracker.js ***!
  \****************************************************************************************/
/*! exports provided: shouldEnableTracking, getTracker, setTracker, configureTracker, createTrackerMiddleware, resetTracker, trackEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldEnableTracking", function() { return shouldEnableTracking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTracker", function() { return getTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTracker", function() { return setTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configureTracker", function() { return configureTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTrackerMiddleware", function() { return createTrackerMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetTracker", function() { return resetTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackEvent", function() { return trackEvent; });
/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/memoize */ "./node_modules/lodash/memoize.js");
/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_transpiled_react_helpers_appDataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cozy-ui/transpiled/react/helpers/appDataset */ "./node_modules/cozy-bar/node_modules/cozy-ui/node_modules/cozy-ui/transpiled/react/helpers/appDataset.js");
/* global __PIWIK_TRACKER_URL__ __PIWIK_SITEID__ __PIWIK_DIMENSION_ID_APP__ */

/* global Piwik */

 // Think of these functions as a singleton class with only static methods.

var trackerInstance = null;
/**
 * Returns whether tracking should be enabled
 *
 * @returns {boolean|unefined} True if tracking should be enabled
 */

var shouldEnableTracking = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  return Object(cozy_ui_transpiled_react_helpers_appDataset__WEBPACK_IMPORTED_MODULE_1__["readCozyDataFromDOM"])('tracking');
});
/**
 * @private
 *
 * Returns the instance of the piwik tracker, creating it on thee fly if required. All parameters are optionnal.
 * You should not use this method directly but rather `trackEvent`
 * @param   {string}  trackerUrl             The URL of the piwik instance, without the php file name
 * @param   {number}  siteId                 The siteId to use for piwik
 * @param   {boolean} automaticallyConfigure = true Pass false to skip the automatic configuration
 * @param   {boolean} injectScript = false Whether or not the Piwik tracking script should be injected
 * @returns {object | null }  An instance of `PiwikReactRouter` on success,
 *                            `null` if the creation fails (usually because of adblockers)
 *                            `null` if the user doesn't accept the tracking
 */

var getTracker = function getTracker(trackerUrl, siteId) {
  var automaticallyConfigure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var injectScript = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!shouldEnableTracking()) return null;
  if (trackerInstance !== null) return trackerInstance;

  try {
    // If `injectScript` is falsy, we rely on having the Piwik tracking script already on the page, otherwise the tracking will fail.
    // the next line is just there to throw in case the script is missing
    if (injectScript === false) Piwik.getTracker();

    var PiwikReactRouter = __webpack_require__(/*! piwik-react-router */ "./node_modules/piwik-react-router/index.js");

    trackerInstance = PiwikReactRouter({
      url: trackerUrl || "https://matomo.cozycloud.cc/piwik.php",
      siteId: siteId || 8,
      // site id is required here
      injectScript: injectScript
    }); // apply the default configuration

    if (automaticallyConfigure) configureTracker();
    return trackerInstance;
  } catch (err) {
    // this usually happens when there's an ad blocker
    console.warn(err);
    trackerInstance = null;
    return null;
  }
};
var setTracker = function setTracker(tracker) {
  return trackerInstance = tracker;
};
/**
 * Configures the base options for the tracker which will persist during the session.
 *
 * @param {object} options A map of options that can be configured.
 * @param {string} options.userId
 * @param {number} options.appDimensionId
 * @param {string} options.app
 * @param {number} options.heartbeat
 */

var configureTracker = function configureTracker() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // early out in case the tracker is not available
  if (trackerInstance === null) {
    // maybe we should throw an error here?
    return;
  }

  var appName;
  var cozyDomain;
  var userId;
  var root = document.querySelector('[role=application]');

  if (root && root.dataset) {
    appName = Object(cozy_ui_transpiled_react_helpers_appDataset__WEBPACK_IMPORTED_MODULE_1__["readCozyDataFromDOM"])('appName');
    cozyDomain = Object(cozy_ui_transpiled_react_helpers_appDataset__WEBPACK_IMPORTED_MODULE_1__["readCozyDataFromDOM"])('cozyDomain');
  }

  if (cozyDomain) {
    userId = cozyDomain;
    var indexOfPort = cozyDomain.indexOf(':');

    if (indexOfPort >= 0) {
      userId = userId.substring(0, indexOfPort);
    }
  } // merge default options with what has been provided


  options = Object.assign({
    userId: userId,
    appDimensionId: 1,
    app: appName,
    heartbeat: 15
  }, options); // apply them

  if (parseInt(options.heartbeat) > 0) trackerInstance.push(['enableHeartBeatTimer', parseInt(options.heartbeat, 10)]);
  trackerInstance.push(['setUserId', options.userId]);
  trackerInstance.push(['setCustomDimension', options.appDimensionId, options.app]);
};
/**
 * Returns a redux middleware which tracks events if the action
 * has a `trackEvent` field containing at least `category` and `action`
 * fields.
 *
 * @returns {function}
 */

var createTrackerMiddleware = function createTrackerMiddleware() {
  return function () {
    return function (next) {
      return function (action) {
        if (trackerInstance && action.trackEvent && action.trackEvent.category && action.trackEvent.action) {
          trackerInstance.push(['trackEvent', action.trackEvent.category, action.trackEvent.action, action.trackEvent.name, action.trackEvent.value]);
        }

        return next(action);
      };
    };
  };
};
/**
 * Resets the tracker; disconnecting it from history and the middleware, if
 * it was attached.
 *
 * *Please be aware*: if the tracker instance had been used outside of this
 * library (in another middleware for example), further calls to the tracking
 * server may still work.
 */

var resetTracker = function resetTracker() {
  if (trackerInstance) {
    // stop tracking the history, if we were doing that
    trackerInstance.disconnectFromHistory(); // we can't remove middlewares on the fly, but resetting the instance object will actually achieve that

    trackerInstance = null;
  }
};
/**
 * Sends an event to matomo
 *
 * @param {array} event Event to track ['Drive', 'action', 'label']
 * @param {object} trackerForTest Mocked Tracker for test purpose
 */

var trackEvent = function trackEvent(event, trackerForTest) {
  var tracker = trackerForTest || getTracker();

  if (tracker) {
    var trackEventArray = [];

    if (event && event[0]) {
      //Like that, we can do trackEvent(['Drive', 'option1']) without thinking of adding this `trackEvent` attr
      if (event[0] !== 'trackEvent') {
        trackEventArray = event.unshift('trackEvent');
      }

      trackEventArray = event;
    }

    tracker.push(trackEventArray);
  }
};

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/helpers/withBreakpoints.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/helpers/withBreakpoints.js ***!
  \************************************************************************************************/
/*! exports provided: breakpointsPropTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "breakpointsPropTypes", function() { return breakpointsPropTypes; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js");
/* harmony import */ var lodash_throttle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_throttle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cozy-ui/transpiled/react/helpers/breakpoints */ "../overrides/cozy-ui/transpiled/react/helpers/breakpoints.js");










/**
 * HOC providing the `breakpoints` property to its children to help
 * with responsive web design.
 *
 * `breakpoints` values will reflect if the window.innerWidth is under
 * those breakpoints.
 *
 * @Example
 * ````
 * // here we define `mobile` as a screen under 1000px
 * const B = withBreakpoints({ mobile: 1000 })(A)
 * ````
 *
 * `A` will receive `{ breakpoints: { mobile: true }}` if the screen
 * width is under 1000px.
 *
 * `A` will receive `{ breakpoints: { mobile: false }}` if the screen
 * width is over 1000px;
 *
 *
 */

var withBreakpoints = function withBreakpoints() {
  var bp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"];
  return function (Wrapped) {
    var Aware = /*#__PURE__*/function (_Component) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Aware, _Component);

      function Aware(props) {
        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Aware);

        _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Aware).call(this, props));
        _this.state = {
          breakpoints: Object(cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_9__["getBreakpointsStatus"])(bp)
        };
        _this.checkBreakpoints = lodash_throttle__WEBPACK_IMPORTED_MODULE_7___default()(function () {
          _this.setState({
            breakpoints: Object(cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_9__["getBreakpointsStatus"])(bp)
          });
        }, 100, {
          trailing: true
        });
        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Aware, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          window.addEventListener('resize', this.checkBreakpoints);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          window.removeEventListener('resize', this.checkBreakpoints);
        }
      }, {
        key: "render",
        value: function render() {
          var props = this.props;
          var breakpoints = this.state.breakpoints;
          return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Wrapped, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
            breakpoints: breakpoints
          }));
        }
      }]);

      return Aware;
    }(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

    Aware.displayName = "withBreakpoints(".concat(Wrapped.displayName || Wrapped.name, ")");
    return Aware;
  };
};
/**
 * PropTypes to use into the component Proptypes definition
 */


var breakpointsPropTypes = prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape(Object.keys(cozy_ui_transpiled_react_helpers_breakpoints__WEBPACK_IMPORTED_MODULE_9__["default"]).reduce(function (all, breakpoint) {
  all[breakpoint] = prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool.isRequired;
  return all;
}, {}));
/* harmony default export */ __webpack_exports__["default"] = (withBreakpoints);

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js":
/*!**************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js ***!
  \**************************************************************************/
/*! exports provided: KEY_PREFIX, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, DEFAULT_VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_PREFIX", function() { return KEY_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLUSH", function() { return FLUSH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REHYDRATE", function() { return REHYDRATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAUSE", function() { return PAUSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERSIST", function() { return PERSIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PURGE", function() { return PURGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGISTER", function() { return REGISTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_VERSION", function() { return DEFAULT_VERSION; });
var KEY_PREFIX = 'persist:';
var FLUSH = 'persist/FLUSH';
var REHYDRATE = 'persist/REHYDRATE';
var PAUSE = 'persist/PAUSE';
var PERSIST = 'persist/PERSIST';
var PURGE = 'persist/PURGE';
var REGISTER = 'persist/REGISTER';
var DEFAULT_VERSION = -1;

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/createMigrate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/createMigrate.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createMigrate; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");


function createMigrate(migrations, config) {
  var _ref = config || {},
      debug = _ref.debug;

  return function (state, currentVersion) {
    if (!state) {
      if ( true && debug) console.log('redux-persist: no inbound state, skipping migration');
      return Promise.resolve(undefined);
    }

    var inboundVersion = state._persist && state._persist.version !== undefined ? state._persist.version : _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_VERSION"];
    if (inboundVersion === currentVersion) {
      if ( true && debug) console.log('redux-persist: versions match, noop migration');
      return Promise.resolve(state);
    }
    if (inboundVersion > currentVersion) {
      if (true) console.error('redux-persist: downgrading version is not supported');
      return Promise.resolve(state);
    }

    var migrationKeys = Object.keys(migrations).map(function (ver) {
      return parseInt(ver);
    }).filter(function (key) {
      return currentVersion >= key && key > inboundVersion;
    }).sort(function (a, b) {
      return a - b;
    });

    if ( true && debug) console.log('redux-persist: migrationKeys', migrationKeys);
    try {
      var migratedState = migrationKeys.reduce(function (state, versionKey) {
        if ( true && debug) console.log('redux-persist: running migration for versionKey', versionKey);
        return migrations[versionKey](state);
      }, state);
      return Promise.resolve(migratedState);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/createPersistoid.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/createPersistoid.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createPersistoid; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");


// @TODO remove once flow < 0.63 support is no longer required.

function createPersistoid(config) {
  // defaults
  var blacklist = config.blacklist || null;
  var whitelist = config.whitelist || null;
  var transforms = config.transforms || [];
  var throttle = config.throttle || 0;
  var storageKey = '' + (config.keyPrefix !== undefined ? config.keyPrefix : _constants__WEBPACK_IMPORTED_MODULE_0__["KEY_PREFIX"]) + config.key;
  var storage = config.storage;
  var serialize = config.serialize === false ? function (x) {
    return x;
  } : defaultSerialize;

  // initialize stateful values
  var lastState = {};
  var stagedState = {};
  var keysToProcess = [];
  var timeIterator = null;
  var writePromise = null;

  var update = function update(state) {
    // add any changed keys to the queue
    Object.keys(state).forEach(function (key) {
      if (!passWhitelistBlacklist(key)) return; // is keyspace ignored? noop
      if (lastState[key] === state[key]) return; // value unchanged? noop
      if (keysToProcess.indexOf(key) !== -1) return; // is key already queued? noop
      keysToProcess.push(key); // add key to queue
    });

    //if any key is missing in the new state which was present in the lastState,
    //add it for processing too
    Object.keys(lastState).forEach(function (key) {
      if (state[key] === undefined) {
        keysToProcess.push(key);
      }
    });

    // start the time iterator if not running (read: throttle)
    if (timeIterator === null) {
      timeIterator = setInterval(processNextKey, throttle);
    }

    lastState = state;
  };

  function processNextKey() {
    if (keysToProcess.length === 0) {
      if (timeIterator) clearInterval(timeIterator);
      timeIterator = null;
      return;
    }

    var key = keysToProcess.shift();
    var endState = transforms.reduce(function (subState, transformer) {
      return transformer.in(subState, key, lastState);
    }, lastState[key]);

    if (endState !== undefined) {
      try {
        stagedState[key] = serialize(endState);
      } catch (err) {
        console.error('redux-persist/createPersistoid: error serializing state', err);
      }
    } else {
      //if the endState is undefined, no need to persist the existing serialized content
      delete stagedState[key];
    }

    if (keysToProcess.length === 0) {
      writeStagedState();
    }
  }

  function writeStagedState() {
    // cleanup any removed keys just before write.
    Object.keys(stagedState).forEach(function (key) {
      if (lastState[key] === undefined) {
        delete stagedState[key];
      }
    });

    writePromise = storage.setItem(storageKey, serialize(stagedState)).catch(onWriteFail);
  }

  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1 && key !== '_persist') return false;
    if (blacklist && blacklist.indexOf(key) !== -1) return false;
    return true;
  }

  function onWriteFail(err) {
    // @TODO add fail handlers (typically storage full)
    if (err && "development" !== 'production') {
      console.error('Error storing data', err);
    }
  }

  var flush = function flush() {
    while (keysToProcess.length !== 0) {
      processNextKey();
    }
    return writePromise || Promise.resolve();
  };

  // return `persistoid`
  return {
    update: update,
    flush: flush
  };
}

// @NOTE in the future this may be exposed via config
function defaultSerialize(data) {
  return JSON.stringify(data);
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/createTransform.js":
/*!********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/createTransform.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTransform; });


function createTransform(
// @NOTE inbound: transform state coming from redux on its way to being serialized and stored
inbound,
// @NOTE outbound: transform state coming from storage, on its way to be rehydrated into redux
outbound) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var whitelist = config.whitelist || null;
  var blacklist = config.blacklist || null;

  function whitelistBlacklistCheck(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true;
    if (blacklist && blacklist.indexOf(key) !== -1) return true;
    return false;
  }

  return {
    in: function _in(state, key, fullState) {
      return !whitelistBlacklistCheck(key) && inbound ? inbound(state, key, fullState) : state;
    },
    out: function out(state, key, fullState) {
      return !whitelistBlacklistCheck(key) && outbound ? outbound(state, key, fullState) : state;
    }
  };
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/getStoredState.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/getStoredState.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getStoredState; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");




function getStoredState(config) {
  var transforms = config.transforms || [];
  var storageKey = '' + (config.keyPrefix !== undefined ? config.keyPrefix : _constants__WEBPACK_IMPORTED_MODULE_0__["KEY_PREFIX"]) + config.key;
  var storage = config.storage;
  var debug = config.debug;
  var deserialize = config.serialize === false ? function (x) {
    return x;
  } : defaultDeserialize;
  return storage.getItem(storageKey).then(function (serialized) {
    if (!serialized) return undefined;else {
      try {
        var state = {};
        var rawState = deserialize(serialized);
        Object.keys(rawState).forEach(function (key) {
          state[key] = transforms.reduceRight(function (subState, transformer) {
            return transformer.out(subState, key, rawState);
          }, deserialize(rawState[key]));
        });
        return state;
      } catch (err) {
        if ( true && debug) console.log('redux-persist/getStoredState: Error restoring data ' + serialized, err);
        throw err;
      }
    }
  });
}

function defaultDeserialize(serial) {
  return JSON.parse(serial);
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/index.js ***!
  \**********************************************************************/
/*! exports provided: persistReducer, persistCombineReducers, persistStore, createMigrate, createTransform, getStoredState, createPersistoid, purgeStoredState, KEY_PREFIX, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, DEFAULT_VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _persistReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./persistReducer */ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistReducer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "persistReducer", function() { return _persistReducer__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _persistCombineReducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./persistCombineReducers */ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistCombineReducers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "persistCombineReducers", function() { return _persistCombineReducers__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _persistStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./persistStore */ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistStore.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "persistStore", function() { return _persistStore__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _createMigrate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createMigrate */ "./node_modules/cozy-bar/node_modules/redux-persist/es/createMigrate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMigrate", function() { return _createMigrate__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _createTransform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createTransform */ "./node_modules/cozy-bar/node_modules/redux-persist/es/createTransform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTransform", function() { return _createTransform__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _getStoredState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getStoredState */ "./node_modules/cozy-bar/node_modules/redux-persist/es/getStoredState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStoredState", function() { return _getStoredState__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _createPersistoid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createPersistoid */ "./node_modules/cozy-bar/node_modules/redux-persist/es/createPersistoid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPersistoid", function() { return _createPersistoid__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _purgeStoredState__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./purgeStoredState */ "./node_modules/cozy-bar/node_modules/redux-persist/es/purgeStoredState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "purgeStoredState", function() { return _purgeStoredState__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KEY_PREFIX", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["KEY_PREFIX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLUSH", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["FLUSH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REHYDRATE", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["REHYDRATE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PAUSE", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["PAUSE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PERSIST", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["PERSIST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PURGE", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["PURGE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REGISTER", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["REGISTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_VERSION", function() { return _constants__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_VERSION"]; });












/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistCombineReducers.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/persistCombineReducers.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return persistCombineReducers; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _persistReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./persistReducer */ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistReducer.js");
/* harmony import */ var _stateReconciler_autoMergeLevel2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stateReconciler/autoMergeLevel2 */ "./node_modules/cozy-bar/node_modules/redux-persist/es/stateReconciler/autoMergeLevel2.js");




// combineReducers + persistReducer with stateReconciler defaulted to autoMergeLevel2
function persistCombineReducers(config, reducers) {
  config.stateReconciler = config.stateReconciler === undefined ? _stateReconciler_autoMergeLevel2__WEBPACK_IMPORTED_MODULE_2__["default"] : config.stateReconciler;
  return Object(_persistReducer__WEBPACK_IMPORTED_MODULE_1__["default"])(config, Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(reducers));
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistReducer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/persistReducer.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return persistReducer; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");
/* harmony import */ var _stateReconciler_autoMergeLevel1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stateReconciler/autoMergeLevel1 */ "./node_modules/cozy-bar/node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js");
/* harmony import */ var _createPersistoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPersistoid */ "./node_modules/cozy-bar/node_modules/redux-persist/es/createPersistoid.js");
/* harmony import */ var _getStoredState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getStoredState */ "./node_modules/cozy-bar/node_modules/redux-persist/es/getStoredState.js");
/* harmony import */ var _purgeStoredState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./purgeStoredState */ "./node_modules/cozy-bar/node_modules/redux-persist/es/purgeStoredState.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








var DEFAULT_TIMEOUT = 5000;
/*
  @TODO add validation / handling for:
  - persisting a reducer which has nested _persist
  - handling actions that fire before reydrate is called
*/
function persistReducer(config, baseReducer) {
  if (true) {
    if (!config) throw new Error('config is required for persistReducer');
    if (!config.key) throw new Error('key is required in persistor config');
    if (!config.storage) throw new Error("redux-persist: config.storage is required. Try using one of the provided storage engines `import storage from 'redux-persist/lib/storage'`");
  }

  var version = config.version !== undefined ? config.version : _constants__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_VERSION"];
  var debug = config.debug || false;
  var stateReconciler = config.stateReconciler === undefined ? _stateReconciler_autoMergeLevel1__WEBPACK_IMPORTED_MODULE_1__["default"] : config.stateReconciler;
  var getStoredState = config.getStoredState || _getStoredState__WEBPACK_IMPORTED_MODULE_3__["default"];
  var timeout = config.timeout !== undefined ? config.timeout : DEFAULT_TIMEOUT;
  var _persistoid = null;
  var _purge = false;
  var _paused = true;
  var conditionalUpdate = function conditionalUpdate(state) {
    // update the persistoid only if we are rehydrated and not paused
    state._persist.rehydrated && _persistoid && !_paused && _persistoid.update(state);
    return state;
  };

  return function (state, action) {
    var _ref = state || {},
        _persist = _ref._persist,
        rest = _objectWithoutProperties(_ref, ['_persist']);

    var restState = rest;

    if (action.type === _constants__WEBPACK_IMPORTED_MODULE_0__["PERSIST"]) {
      var _sealed = false;
      var _rehydrate = function _rehydrate(payload, err) {
        // dev warning if we are already sealed
        if ( true && _sealed) console.error('redux-persist: rehydrate for "' + config.key + '" called after timeout.', payload, err);

        // only rehydrate if we are not already sealed
        if (!_sealed) {
          action.rehydrate(config.key, payload, err);
          _sealed = true;
        }
      };
      timeout && setTimeout(function () {
        !_sealed && _rehydrate(undefined, new Error('redux-persist: persist timed out for persist key "' + config.key + '"'));
      }, timeout);

      // @NOTE PERSIST resumes if paused.
      _paused = false;

      // @NOTE only ever create persistoid once, ensure we call it at least once, even if _persist has already been set
      if (!_persistoid) _persistoid = Object(_createPersistoid__WEBPACK_IMPORTED_MODULE_2__["default"])(config);

      // @NOTE PERSIST can be called multiple times, noop after the first
      if (_persist) return state;
      if (typeof action.rehydrate !== 'function' || typeof action.register !== 'function') throw new Error('redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.');

      action.register(config.key);

      getStoredState(config).then(function (restoredState) {
        var migrate = config.migrate || function (s, v) {
          return Promise.resolve(s);
        };
        migrate(restoredState, version).then(function (migratedState) {
          _rehydrate(migratedState);
        }, function (migrateErr) {
          if ( true && migrateErr) console.error('redux-persist: migration error', migrateErr);
          _rehydrate(undefined, migrateErr);
        });
      }, function (err) {
        _rehydrate(undefined, err);
      });

      return _extends({}, baseReducer(restState, action), {
        _persist: { version: version, rehydrated: false }
      });
    } else if (action.type === _constants__WEBPACK_IMPORTED_MODULE_0__["PURGE"]) {
      _purge = true;
      action.result(Object(_purgeStoredState__WEBPACK_IMPORTED_MODULE_4__["default"])(config));
      return _extends({}, baseReducer(restState, action), {
        _persist: _persist
      });
    } else if (action.type === _constants__WEBPACK_IMPORTED_MODULE_0__["FLUSH"]) {
      action.result(_persistoid && _persistoid.flush());
      return _extends({}, baseReducer(restState, action), {
        _persist: _persist
      });
    } else if (action.type === _constants__WEBPACK_IMPORTED_MODULE_0__["PAUSE"]) {
      _paused = true;
    } else if (action.type === _constants__WEBPACK_IMPORTED_MODULE_0__["REHYDRATE"]) {
      // noop on restState if purging
      if (_purge) return _extends({}, restState, {
        _persist: _extends({}, _persist, { rehydrated: true })

        // @NOTE if key does not match, will continue to default else below
      });if (action.key === config.key) {
        var reducedState = baseReducer(restState, action);
        var inboundState = action.payload;
        // only reconcile state if stateReconciler and inboundState are both defined
        var reconciledRest = stateReconciler !== false && inboundState !== undefined ? stateReconciler(inboundState, state, reducedState, config) : reducedState;

        var _newState = _extends({}, reconciledRest, {
          _persist: _extends({}, _persist, { rehydrated: true })
        });
        return conditionalUpdate(_newState);
      }
    }

    // if we have not already handled PERSIST, straight passthrough
    if (!_persist) return baseReducer(state, action);

    // run base reducer:
    // is state modified ? return original : return updated
    var newState = baseReducer(restState, action);
    if (newState === restState) return state;else {
      newState._persist = _persist;
      return conditionalUpdate(newState);
    }
  };
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistStore.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/persistStore.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return persistStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _persistReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./persistReducer */ "./node_modules/cozy-bar/node_modules/redux-persist/es/persistReducer.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }






var initialState = {
  registry: [],
  bootstrapped: false
};

var persistorReducer = function persistorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTER"]:
      return _extends({}, state, { registry: [].concat(_toConsumableArray(state.registry), [action.key]) });
    case _constants__WEBPACK_IMPORTED_MODULE_2__["REHYDRATE"]:
      var firstIndex = state.registry.indexOf(action.key);
      var registry = [].concat(_toConsumableArray(state.registry));
      registry.splice(firstIndex, 1);
      return _extends({}, state, { registry: registry, bootstrapped: registry.length === 0 });
    default:
      return state;
  }
};

function persistStore(store, options, cb) {
  // help catch incorrect usage of passing PersistConfig in as PersistorOptions
  if (true) {
    var optionsToTest = options || {};
    var bannedKeys = ['blacklist', 'whitelist', 'transforms', 'storage', 'keyPrefix', 'migrate'];
    bannedKeys.forEach(function (k) {
      if (!!optionsToTest[k]) console.error('redux-persist: invalid option passed to persistStore: "' + k + '". You may be incorrectly passing persistConfig into persistStore, whereas it should be passed into persistReducer.');
    });
  }
  var boostrappedCb = cb || false;

  var _pStore = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(persistorReducer, initialState, options ? options.enhancer : undefined);
  var register = function register(key) {
    _pStore.dispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_2__["REGISTER"],
      key: key
    });
  };

  var rehydrate = function rehydrate(key, payload, err) {
    var rehydrateAction = {
      type: _constants__WEBPACK_IMPORTED_MODULE_2__["REHYDRATE"],
      payload: payload,
      err: err,
      key: key
      // dispatch to `store` to rehydrate and `persistor` to track result
    };store.dispatch(rehydrateAction);
    _pStore.dispatch(rehydrateAction);
    if (boostrappedCb && persistor.getState().bootstrapped) {
      boostrappedCb();
      boostrappedCb = false;
    }
  };

  var persistor = _extends({}, _pStore, {
    purge: function purge() {
      var results = [];
      store.dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_2__["PURGE"],
        result: function result(purgeResult) {
          results.push(purgeResult);
        }
      });
      return Promise.all(results);
    },
    flush: function flush() {
      var results = [];
      store.dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_2__["FLUSH"],
        result: function result(flushResult) {
          results.push(flushResult);
        }
      });
      return Promise.all(results);
    },
    pause: function pause() {
      store.dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_2__["PAUSE"]
      });
    },
    persist: function persist() {
      store.dispatch({ type: _constants__WEBPACK_IMPORTED_MODULE_2__["PERSIST"], register: register, rehydrate: rehydrate });
    }
  });

  persistor.persist();

  return persistor;
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/purgeStoredState.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/purgeStoredState.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return purgeStoredState; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/cozy-bar/node_modules/redux-persist/es/constants.js");




function purgeStoredState(config) {
  var storage = config.storage;
  var storageKey = '' + (config.keyPrefix !== undefined ? config.keyPrefix : _constants__WEBPACK_IMPORTED_MODULE_0__["KEY_PREFIX"]) + config.key;
  return storage.removeItem(storageKey, warnIfRemoveError);
}

function warnIfRemoveError(err) {
  if (err && "development" !== 'production') {
    console.error('redux-persist/purgeStoredState: Error purging data stored state', err);
  }
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autoMergeLevel1; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function autoMergeLevel1(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;

  var newState = _extends({}, reducedState);
  // only rehydrate if inboundState exists and is an object
  if (inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') {
    Object.keys(inboundState).forEach(function (key) {
      // ignore _persist data
      if (key === '_persist') return;
      // if reducer modifies substate, skip auto rehydration
      if (originalState[key] !== reducedState[key]) {
        if ( true && debug) console.log('redux-persist/stateReconciler: sub state for key `%s` modified, skipping.', key);
        return;
      }
      // otherwise hard set the new value
      newState[key] = inboundState[key];
    });
  }

  if ( true && debug && inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') console.log('redux-persist/stateReconciler: rehydrated keys \'' + Object.keys(inboundState).join(', ') + '\'');

  return newState;
}

/*
  autoMergeLevel1: 
    - merges 1 level of substate
    - skips substate if already modified
*/

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/es/stateReconciler/autoMergeLevel2.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/es/stateReconciler/autoMergeLevel2.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autoMergeLevel2; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function autoMergeLevel2(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;

  var newState = _extends({}, reducedState);
  // only rehydrate if inboundState exists and is an object
  if (inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') {
    Object.keys(inboundState).forEach(function (key) {
      // ignore _persist data
      if (key === '_persist') return;
      // if reducer modifies substate, skip auto rehydration
      if (originalState[key] !== reducedState[key]) {
        if ( true && debug) console.log('redux-persist/stateReconciler: sub state for key `%s` modified, skipping.', key);
        return;
      }
      if (isPlainEnoughObject(reducedState[key])) {
        // if object is plain enough shallow merge the new values (hence "Level2")
        newState[key] = _extends({}, newState[key], inboundState[key]);
        return;
      }
      // otherwise hard set
      newState[key] = inboundState[key];
    });
  }

  if ( true && debug && inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') console.log('redux-persist/stateReconciler: rehydrated keys \'' + Object.keys(inboundState).join(', ') + '\'');

  return newState;
}

/*
  autoMergeLevel2: 
    - merges 2 level of substate
    - skips substate if already modified
    - this is essentially redux-perist v4 behavior
*/

function isPlainEnoughObject(o) {
  return o !== null && !Array.isArray(o) && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/createWebStorage.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/createWebStorage.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createWebStorage;

var _getStorage = __webpack_require__(/*! ./getStorage */ "./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/getStorage.js");

var _getStorage2 = _interopRequireDefault(_getStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createWebStorage(type) {
  var storage = (0, _getStorage2.default)(type);
  return {
    getItem: function getItem(key) {
      return new Promise(function (resolve, reject) {
        resolve(storage.getItem(key));
      });
    },
    setItem: function setItem(key, item) {
      return new Promise(function (resolve, reject) {
        resolve(storage.setItem(key, item));
      });
    },
    removeItem: function removeItem(key) {
      return new Promise(function (resolve, reject) {
        resolve(storage.removeItem(key));
      });
    }
  };
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/getStorage.js":
/*!************************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/getStorage.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getStorage;


function noop() {}

var noopStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop
};

function hasStorage(storageType) {
  if ((typeof self === 'undefined' ? 'undefined' : _typeof(self)) !== 'object' || !(storageType in self)) {
    return false;
  }

  try {
    var storage = self[storageType];
    var testKey = 'redux-persist ' + storageType + ' test';
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if (true) console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function getStorage(type) {
  var storageType = type + 'Storage';
  if (hasStorage(storageType)) return self[storageType];else {
    if (true) {
      console.error('redux-persist failed to create sync storage. falling back to memory storage.');
    }
    return noopStorage;
  }
}

/***/ }),

/***/ "./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _createWebStorage = __webpack_require__(/*! ./createWebStorage */ "./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/createWebStorage.js");

var _createWebStorage2 = _interopRequireDefault(_createWebStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createWebStorage2.default)('local');

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Apps/AppItem.js":
/*!*********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Apps/AppItem.js ***!
  \*********************************************************************/
/*! exports provided: AppItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppItem", function() { return AppItem; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _proptypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../proptypes */ "./node_modules/cozy-bar/transpiled/proptypes/index.js");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-client */ "./node_modules/cozy-client/dist/index.js");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var cozy_ui_transpiled_react_AppIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-ui/transpiled/react/AppIcon */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/AppIcon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! cozy-ui/transpiled/react/AppLinker */ "../overrides/cozy-ui/transpiled/react/AppLinker/index.jsx");
/* harmony import */ var _IconCozyHome__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./IconCozyHome */ "./node_modules/cozy-bar/transpiled/components/Apps/IconCozyHome.js");
/* harmony import */ var _lib_stack__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../lib/stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_16__);









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }










var getAppDisplayName = lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(cozy_client__WEBPACK_IMPORTED_MODULE_11__["models"], 'applications.getAppDisplayName', function (app) {
  return app.namePrefix && app.namePrefix.toLowerCase() !== 'cozy' ? "".concat(app.namePrefix, " ").concat(app.name) : app.name;
});
var AppItem = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(AppItem, _React$Component);

  var _super = _createSuper(AppItem);

  /**
   * Used to add query params to AppLinker links, useful in overrides
   * @param  {Object} props   AppItem props
   * @param  {Object} context AppItem context
   * @return {Object}         Query string parameters as object
   */
  function AppItem(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AppItem);

    _this = _super.call(this, props);
    _this.onAppSwitch = _this.onAppSwitch.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AppItem, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.switchTimeout) clearTimeout(this.switchTimeout);
    }
  }, {
    key: "buildAppUrl",
    value: function buildAppUrl(href) {
      var url;

      try {
        url = new URL(href);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message);
        return null;
      }

      var queryParams = AppItem.buildQueryParams(this.props, this.context);

      if (queryParams) {
        for (var name in queryParams) {
          url.searchParams.append(name, queryParams[name]);
        }
      }

      return url.toString();
    }
  }, {
    key: "onAppSwitch",
    value: function onAppSwitch() {
      var onAppSwitch = this.props.onAppSwitch;

      if (typeof onAppSwitch === 'function') {
        this.switchTimeout = setTimeout(function () {
          onAppSwitch();
        }, 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          useHomeIcon = _this$props.useHomeIcon,
          app = _this$props.app;
      var dataIcon = app.slug ? "icon-".concat(app.slug) : '';
      var appName = getAppDisplayName(app);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_transpiled_react_AppLinker__WEBPACK_IMPORTED_MODULE_13__["default"], {
        onAppSwitch: this.onAppSwitch,
        slug: app.slug,
        href: this.buildAppUrl(app.href) || ''
      }, function (_ref) {
        var onClick = _ref.onClick,
            href = _ref.href;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("li", {
          className: "coz-nav-apps-item".concat(app.isCurrentApp ? ' --current' : '')
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
          role: "menuitem",
          href: href,
          "data-icon": dataIcon,
          title: appName,
          onClick: onClick
        }, useHomeIcon ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_IconCozyHome__WEBPACK_IMPORTED_MODULE_14__["default"], {
          className: "coz-nav-apps-item-icon"
        }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(cozy_ui_transpiled_react_AppIcon__WEBPACK_IMPORTED_MODULE_12__["default"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
          app: app,
          className: "coz-nav-apps-item-icon",
          key: app.slug
        }, _lib_stack__WEBPACK_IMPORTED_MODULE_15__["default"].get.iconProps())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
          className: "coz-label"
        }, appName)));
      });
    }
  }]);

  return AppItem;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(AppItem, "buildQueryParams", function () {
  // default behaviour
  return null;
});

AppItem.propTypes = {
  app: _proptypes__WEBPACK_IMPORTED_MODULE_10__["appShape"].isRequired,
  useHomeIcon: prop_types__WEBPACK_IMPORTED_MODULE_16___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (AppItem);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Apps/AppItemPlaceholder.js":
/*!********************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Apps/AppItemPlaceholder.js ***!
  \********************************************************************************/
/*! exports provided: AppItemPlaceholder, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppItemPlaceholder", function() { return AppItemPlaceholder; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var AppItemPlaceholder = function AppItemPlaceholder() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "coz-nav-apps-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    role: "menuitem",
    disabled: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "coz-nav-apps-item-icon coz-loading-placeholder"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "coz-label coz-loading-placeholder"
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (AppItemPlaceholder);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Apps/AppNavButtons.js":
/*!***************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Apps/AppNavButtons.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Top__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Top */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Top.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Bottom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Bottom */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Bottom.js");
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var _IconCozyHome__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./IconCozyHome */ "./node_modules/cozy-bar/transpiled/components/Apps/IconCozyHome.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }











var AppNavButton = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(AppNavButton, _Component);

  var _super = _createSuper(AppNavButton);

  function AppNavButton() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AppNavButton);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AppNavButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          homeApp = _this$props.homeApp,
          handleClick = _this$props.handleClick,
          appName = _this$props.appName,
          appNamePrefix = _this$props.appNamePrefix,
          appSlug = _this$props.appSlug,
          iconPath = _this$props.iconPath,
          isFetchingApps = _this$props.isFetchingApps,
          isPublic = _this$props.isPublic,
          opened = _this$props.opened,
          t = _this$props.t;
      var isHomeApp = homeApp && homeApp.isCurrentApp;

      if (!isPublic && isFetchingApps) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "coz-nav-apps-btns --loading"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "coz-nav-apps-btns-home coz-loading-placeholder"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "coz-nav-apps-btns-main coz-loading-placeholder"
        }));
      }

      var displayName = !isHomeApp && appNamePrefix ? [t("".concat(appSlug, ".name_prefix"), {
        _: appNamePrefix
      }), t("".concat(appSlug, ".name"), {
        _: appName
      })].join(' ') : t("".concat(appSlug, ".name"), {
        _: appName
      });
      var homeHref = !isPublic && homeApp && homeApp.href;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-nav-apps-btns".concat(isHomeApp ? ' --currentHome' : '')
      }, homeHref ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: homeHref,
        className: "coz-nav-apps-btns-home"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_IconCozyHome__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "coz-nav-apps-btns-home-svg"
      })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "coz-nav-apps-btns-home"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_IconCozyHome__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "coz-nav-apps-btns-home-svg"
      })), !isHomeApp && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "coz-nav-apps-btns-sep"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("button", {
        type: "button",
        onClick: isPublic ? null : handleClick,
        className: "coz-nav-apps-btns-main",
        "aria-controls": "coz-nav-pop--apps",
        "data-tutorial": "apps",
        disabled: isPublic
      }, !isHomeApp && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("img", {
        className: "coz-bar-hide-sm",
        src: iconPath,
        width: "28",
        alt: ""
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "coz-nav-app-name"
      }, displayName), !isPublic && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_11__["default"], {
        icon: opened ? cozy_ui_transpiled_react_Icons_Top__WEBPACK_IMPORTED_MODULE_8__["default"] : cozy_ui_transpiled_react_Icons_Bottom__WEBPACK_IMPORTED_MODULE_9__["default"],
        color: "#95999d",
        size: "12"
      })));
    }
  }]);

  return AppNavButton;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    homeApp: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_7__["getHomeApp"])(state),
    isFetchingApps: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_7__["isFetchingApps"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps() {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, mapDispatchToProps)(Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_10__["translate"])()(AppNavButton)));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Apps/AppsContent.js":
/*!*************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Apps/AppsContent.js ***!
  \*************************************************************************/
/*! exports provided: AppsContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppsContent", function() { return AppsContent; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Cloud__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Cloud */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Cloud.js");
/* harmony import */ var cozy_ui_transpiled_react_helpers_withBreakpoints__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/helpers/withBreakpoints */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/helpers/withBreakpoints.js");
/* harmony import */ var _lib_reducers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib/reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");
/* harmony import */ var _AppItem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./AppItem */ "./node_modules/cozy-bar/transpiled/components/Apps/AppItem.js");
/* harmony import */ var _AppItemPlaceholder__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./AppItemPlaceholder */ "./node_modules/cozy-bar/transpiled/components/Apps/AppItemPlaceholder.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }












var sorter = function sorter(fn) {
  return function (itemA, itemB) {
    return fn(itemA) > fn(itemB);
  };
};

var AppsContent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(AppsContent, _Component);

  var _super = _createSuper(AppsContent);

  function AppsContent(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AppsContent);

    _this = _super.call(this, props, context);
    _this.translateApp = translateApp(_this.props.t);
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AppsContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          apps = _this$props.apps,
          breakpoints = _this$props.breakpoints,
          homeApp = _this$props.homeApp,
          isFetchingApps = _this$props.isFetchingApps,
          onAppSwitch = _this$props.onAppSwitch;
      var isMobile = breakpoints.isMobile;
      var isHomeApp = homeApp && homeApp.isCurrentApp;
      var homeSlug = homeApp && homeApp.slug;

      if (!isFetchingApps && (!apps || !apps.length)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", {
          className: "coz-nav--error coz-nav-group"
        }, t('no_apps'));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "coz-nav-pop-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", {
        className: "coz-nav-group"
      }, isMobile && homeApp && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_AppItem__WEBPACK_IMPORTED_MODULE_13__["default"], {
        app: homeApp,
        useHomeIcon: true,
        onAppSwitch: onAppSwitch
      }), isFetchingApps ? new Array(3).fill({}).map(function (nothing, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_AppItemPlaceholder__WEBPACK_IMPORTED_MODULE_14__["default"], {
          key: index
        });
      }) : apps.filter(function (app) {
        return app.slug !== homeSlug;
      }).sort(sorter(this.translateApp)).map(function (app, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_AppItem__WEBPACK_IMPORTED_MODULE_13__["default"], {
          app: app,
          key: index,
          onAppSwitch: onAppSwitch
        });
      })), homeApp && !isMobile && !isHomeApp && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        role: "menuitem",
        href: homeApp.href,
        className: "coz-apps-home-btn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_9__["default"], {
        icon: cozy_ui_transpiled_react_Icons_Cloud__WEBPACK_IMPORTED_MODULE_10__["default"]
      }), t('menu.home')));
    }
  }]);

  return AppsContent;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
AppsContent.propTypes = {
  homeApp: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.shape({
    isCurrentApp: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool,
    slug: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.string
  }),
  apps: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.array,
  isFetchingApps: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.bool.isRequired
};

var translateApp = function translateApp(t) {
  return function (app) {
    var namePrefix = app.namePrefix ? t("".concat(app.slug, ".namePrefix"), {
      _: app.namePrefix
    }) : null;
    var name = t("".concat(app.slug, ".name"), {
      _: app.name
    });
    return namePrefix ? "".concat(namePrefix, " ").concat(name) : "".concat(name);
  };
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    apps: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_12__["getApps"])(state),
    homeApp: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_12__["getHomeApp"])(state),
    isFetchingApps: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_12__["isFetchingApps"])(state)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps)(Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_8__["translate"])()(Object(cozy_ui_transpiled_react_helpers_withBreakpoints__WEBPACK_IMPORTED_MODULE_11__["default"])()(AppsContent))));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Apps/IconCozyHome.js":
/*!**************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Apps/IconCozyHome.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_ui_transpiled_react_AppIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cozy-ui/transpiled/react/AppIcon */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/AppIcon/index.js");
/* harmony import */ var _lib_stack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




/* Generated with node_modules/.bin/svgr src/assets/sprites/icon-cozy-home.svg  */

function SvgIconCozyHome(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_5___default()({
    width: 32,
    height: 32
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("circle", {
    fill: "#297EF2",
    fillRule: "nonzero",
    cx: 16,
    cy: 16,
    r: 16
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("path", {
    d: "M19.314 17.561a.555.555 0 01-.82.12 4.044 4.044 0 01-2.499.862 4.04 4.04 0 01-2.494-.86.557.557 0 01-.815-.12.547.547 0 01.156-.748c.214-.14.229-.421.229-.424a.555.555 0 01.176-.385.504.504 0 01.386-.145.544.544 0 01.528.553c0 .004 0 .153-.054.36a2.954 2.954 0 003.784-.008 1.765 1.765 0 01-.053-.344.546.546 0 01.536-.561h.01c.294 0 .538.237.545.532 0 0 .015.282.227.422a.544.544 0 01.158.746m2.322-6.369a5.94 5.94 0 00-1.69-3.506A5.651 5.651 0 0015.916 6a5.648 5.648 0 00-4.029 1.687 5.936 5.936 0 00-1.691 3.524 5.677 5.677 0 00-3.433 1.737 5.966 5.966 0 00-1.643 4.137C5.12 20.347 7.704 23 10.882 23h10.236c3.176 0 5.762-2.653 5.762-5.915 0-3.083-2.31-5.623-5.244-5.893",
    fill: "#FFF"
  })));
}

var IconCozyHome = /*#__PURE__*/function (_PureComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(IconCozyHome, _PureComponent);

  var _super = _createSuper(IconCozyHome);

  function IconCozyHome() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IconCozyHome);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(IconCozyHome, [{
    key: "render",
    value: function render() {
      var className = this.props.className;

      var fetchIcon = function fetchIcon() {
        return "".concat(_lib_stack__WEBPACK_IMPORTED_MODULE_8__["default"].get.cozyURL(), "/assets/images/icon-cozy-home.svg");
      };

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(cozy_ui_transpiled_react_AppIcon__WEBPACK_IMPORTED_MODULE_7__["default"], {
        fetchIcon: fetchIcon,
        fallbackIcon: SvgIconCozyHome,
        className: className
      });
    }
  }]);

  return IconCozyHome;
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (IconCozyHome);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Apps/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Apps/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _AppsContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AppsContent */ "./node_modules/cozy-bar/transpiled/components/Apps/AppsContent.js");
/* harmony import */ var _AppNavButtons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AppNavButtons */ "./node_modules/cozy-bar/transpiled/components/Apps/AppNavButtons.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var Apps = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Apps, _Component);

  var _super = _createSuper(Apps);

  function Apps(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Apps);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onClickOutside", function (event) {
      if (_this.state.opened) {
        // if it's not a cozy-bar nav popup, close the opened popup
        if (!_this.rootRef.contains(event.target) && !_this.modalContainer.contains(event.target)) {
          _this.setState({
            opened: false
          });

          event.stopPropagation();
        }
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "toggleMenu", function () {
      _this.setState({
        opened: !_this.state.opened
      });
    });

    _this.state = {
      opened: false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Apps, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('click', this.onClickOutside);
      this.modalContainer = document.getElementById('cozy-bar-modal-dom-place');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.onClickOutside);
    }
  }, {
    key: "render",
    // data-tutorial attribute allows to be targeted in an application tutorial
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          appName = _this$props.appName,
          appNamePrefix = _this$props.appNamePrefix,
          appSlug = _this$props.appSlug,
          iconPath = _this$props.iconPath,
          isPublic = _this$props.isPublic;
      var opened = this.state.opened;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("nav", {
        className: "coz-nav coz-nav-apps",
        ref: function ref(_ref) {
          _this2.rootRef = _ref;
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_AppNavButtons__WEBPACK_IMPORTED_MODULE_9__["default"], {
        appName: appName,
        appNamePrefix: appNamePrefix,
        appSlug: appSlug,
        iconPath: iconPath,
        handleClick: this.toggleMenu,
        opened: opened,
        isPublic: isPublic
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-nav-pop coz-nav-pop--apps",
        id: "coz-nav-pop--apps",
        "aria-hidden": !opened
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_AppsContent__WEBPACK_IMPORTED_MODULE_8__["default"], null)));
    }
  }]);

  return Apps;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Apps);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Banner.js":
/*!***************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Banner.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cozy-ui/transpiled/react/Button */ "../overrides/cozy-ui/transpiled/react/Button/index.jsx");
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var Banner = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Banner, _Component);

  var _super = _createSuper(Banner);

  function Banner(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Banner);

    _this = _super.call(this, props);
    _this.state = {
      unmounted: true
    };
    _this.animate = _this.animate.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Banner, [{
    key: "animate",
    value: function animate() {
      var _this2 = this;

      // To animate we have to use a setTimeout to
      // force a CSS class update and trigger CSS animation
      return setTimeout(function () {
        _this2.setState(function () {
          return {
            unmounted: false
          };
        });
      }, 100);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.animate();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          code = _this$props.code,
          links = _this$props.links;
      var unmounted = this.state.unmounted;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "coz-bar-banner".concat(unmounted ? ' unmounted' : '')
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("p", null, t("banner.".concat(code, ".description"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_7__["ButtonLink"], {
        className: "coz-bar-banner-button",
        size: "tiny",
        href: links,
        label: t("banner.".concat(code, ".CTA"))
      }));
    }
  }]);

  return Banner;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_8__["translate"])()(Banner));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Bar.js":
/*!************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Bar.js ***!
  \************************************************************/
/*! exports provided: Bar, mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bar", function() { return Bar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! cozy-ui/transpiled/react/helpers/tracker */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/helpers/tracker.js");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! cozy-device-helper */ "./node_modules/cozy-device-helper/dist/index.js");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(cozy_device_helper__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _Banner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Banner */ "./node_modules/cozy-bar/transpiled/components/Banner.js");
/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Drawer */ "./node_modules/cozy-bar/transpiled/components/Drawer.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Settings */ "./node_modules/cozy-bar/transpiled/components/Settings/index.js");
/* harmony import */ var _Apps__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Apps */ "./node_modules/cozy-bar/transpiled/components/Apps/index.js");
/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./SearchBar */ "./node_modules/cozy-bar/transpiled/components/SearchBar.js");
/* harmony import */ var _Claudy__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Claudy */ "./node_modules/cozy-bar/transpiled/components/Claudy.js");
/* harmony import */ var _SupportModal__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./SupportModal */ "./node_modules/cozy-bar/transpiled/components/SupportModal.js");
/* harmony import */ var _lib_reducers__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../lib/reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* global __PIWIK_TRACKER_URL__  __PIWIK_SITEID__ __PIWIK_DIMENSION_ID_APP__ */














/* Generated with node_modules/.bin/svgr src/assets/sprites/icon-apps.svg */

function SvgIconApps(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_8___default()({
    width: 16,
    height: 16
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("path", {
    d: "M0 0h4v4H0V0zm0 6h4v4H0V6zm0 6h4v4H0v-4zM6 0h4v4H6V0zm0 6h4v4H6V6zm0 6h4v4H6v-4zm6-12h4v4h-4V0zm0 6h4v4h-4V6zm0 6h4v4h-4v-4z",
    fillRule: "evenodd"
  }));
}

var Bar = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Bar, _Component);

  var _super = _createSuper(Bar);

  function Bar(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Bar);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "toggleDrawer", function () {
      // don't allow to toggle the drawer if claudy opened or is opening
      if (_this.state.claudyOpened || _this.state.claudyFired) return;
      var drawerVisible = !_this.state.drawerVisible; // don't wait for transitionend if displaying

      if (drawerVisible) _this.props.onDrawer(drawerVisible);

      _this.setState({
        drawerVisible: drawerVisible
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "toggleClaudy", function () {
      var isFromDrawer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!_this.props.claudyEnabled) return;
      var _this$state = _this.state,
          usageTracker = _this$state.usageTracker,
          claudyOpened = _this$state.claudyOpened;

      if (isFromDrawer && !claudyOpened) {
        // if opened from drawer
        // reset to toggle via the Claudy component
        return _this.setState({
          claudyFired: true
        });
      }

      if (_this.state.claudyFired) _this.setState({
        claudyFired: false
      });

      if (usageTracker) {
        usageTracker.push(['trackEvent', 'Claudy', claudyOpened ? 'close' : 'open', 'claudy']);
      }

      _this.setState({
        claudyOpened: !claudyOpened
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "toggleSupport", function () {
      var supportDisplayed = _this.state.supportDisplayed;

      _this.setState({
        supportDisplayed: !supportDisplayed
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "renderLeft", function () {
      var _this$props = _this.props,
          t = _this$props.t,
          isPublic = _this$props.isPublic; // data-tutorial attribute allows to be targeted in an application tutorial

      return !isPublic ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
        type: "button",
        className: "coz-bar-btn coz-bar-burger",
        onClick: _this.toggleDrawer,
        "data-tutorial": "apps-mobile"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_12__["default"], {
        icon: SvgIconApps,
        width: 16,
        height: 16,
        color: "currentColor"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: "coz-bar-hidden"
      }, t('drawer'))) : null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "renderRight", function () {
      var isPublic = _this.props.isPublic;
      return !isPublic ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Settings__WEBPACK_IMPORTED_MODULE_17__["default"], {
        toggleSupport: _this.toggleSupport,
        onLogOut: _this.props.onLogOut
      }) : null;
    });

    _this.state = {
      claudyFired: false,
      // true to fire claudy (used by the drawer)
      claudyOpened: false,
      drawerVisible: false,
      usageTracker: null,
      supportDisplayed: false,
      searchBarEnabled: props.isDrive && !props.isPublic && !Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_14__["isMobileApp"])()
    };
    _this.fetchApps = _this.fetchApps.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.fetchInitialData = _this.fetchInitialData.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    _this.handleTokenRefreshed = _this.handleTokenRefreshed.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Bar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (Object(cozy_ui_transpiled_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_13__["shouldEnableTracking"])()) {
        this.initPiwikTracker();
      }

      this.fetchInitialData();
      var cozyClient = this.props.cozyClient;
      cozyClient.on('tokenRefreshed', this.handleTokenRefreshed);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var cozyClient = this.props.cozyClient;
      cozyClient.removeListener('tokenRefreshed', this.handleTokenRefreshed);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!this.props.hasFetchedApps && this.state.drawerVisible && prevState.drawerVisible !== this.state.drawerVisible) {
        this.fetchApps();
      }
    }
  }, {
    key: "handleTokenRefreshed",
    value: function handleTokenRefreshed() {
      this.fetchInitialData();
    }
  }, {
    key: "initPiwikTracker",
    value: function initPiwikTracker() {
      var trackerInstance = Object(cozy_ui_transpiled_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_13__["getTracker"])("\"https://piwik.cozycloud.cc\"", 8, false, false);
      Object(cozy_ui_transpiled_react_helpers_tracker__WEBPACK_IMPORTED_MODULE_13__["configureTracker"])({
        appDimensionId: 1,
        app: 'Cozy Bar',
        heartbeat: 0
      });
      this.setState({
        usageTracker: trackerInstance
      });
    }
  }, {
    key: "fetchApps",
    value: function fetchApps() {
      this.props.fetchApps();
    }
  }, {
    key: "fetchInitialData",
    value: function fetchInitialData() {
      if (this.props.isPublic) {
        return;
      }

      this.props.fetchContext();
      this.props.fetchSettingsData(false);
      this.fetchApps();
    }
  }, {
    key: "renderCenter",
    value: function renderCenter() {
      var _this$props2 = this.props,
          appName = _this$props2.appName,
          appNamePrefix = _this$props2.appNamePrefix,
          appSlug = _this$props2.appSlug,
          iconPath = _this$props2.iconPath,
          isPublic = _this$props2.isPublic;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Apps__WEBPACK_IMPORTED_MODULE_18__["default"], {
        appName: appName,
        appNamePrefix: appNamePrefix,
        appSlug: appSlug,
        iconPath: iconPath,
        isPublic: isPublic
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          claudyFired = _this$state2.claudyFired,
          claudyOpened = _this$state2.claudyOpened,
          drawerVisible = _this$state2.drawerVisible,
          searchBarEnabled = _this$state2.searchBarEnabled,
          supportDisplayed = _this$state2.supportDisplayed,
          usageTracker = _this$state2.usageTracker;
      var _this$props3 = this.props,
          theme = _this$props3.theme,
          themeOverrides = _this$props3.themeOverrides,
          barLeft = _this$props3.barLeft,
          barRight = _this$props3.barRight,
          barCenter = _this$props3.barCenter,
          barSearch = _this$props3.barSearch,
          claudyEnabled = _this$props3.claudyEnabled,
          onDrawer = _this$props3.onDrawer,
          isPublic = _this$props3.isPublic,
          onLogOut = _this$props3.onLogOut,
          userActionRequired = _this$props3.userActionRequired;
      var pColor = themeOverrides.primaryColor,
          pctColor = themeOverrides.primaryContrastTextColor;
      var pStyle = pColor ? {
        '--cozBarThemePrimaryColor': pColor
      } : {};
      var pctStyle = pctColor ? {
        '--cozBarThemePrimaryContrastTextColor': pctColor
      } : {};

      var themeStyle = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, pStyle, pctStyle);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "coz-bar-wrapper coz-theme-".concat(theme),
        style: themeStyle
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        id: "cozy-bar-modal-dom-place"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "coz-bar-container"
      }, barLeft || this.renderLeft(), barCenter || this.renderCenter(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "u-flex-grow"
      }, barSearch || (searchBarEnabled ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_SearchBar__WEBPACK_IMPORTED_MODULE_19__["default"], null) : null)), barRight || this.renderRight(), !isPublic ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Drawer__WEBPACK_IMPORTED_MODULE_16__["default"], {
        visible: drawerVisible,
        onClose: this.toggleDrawer,
        onClaudy: claudyEnabled && function () {
          return _this2.toggleClaudy(true);
        } || false,
        isClaudyLoading: claudyFired,
        drawerListener: function drawerListener() {
          return onDrawer(drawerVisible);
        },
        toggleSupport: this.toggleSupport,
        onLogOut: onLogOut
      }) : null, claudyEnabled && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Claudy__WEBPACK_IMPORTED_MODULE_20__["default"], {
        usageTracker: usageTracker,
        claudyFired: claudyFired,
        onToggle: function onToggle() {
          return _this2.toggleClaudy(false);
        },
        opened: claudyOpened
      }), supportDisplayed && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_SupportModal__WEBPACK_IMPORTED_MODULE_21__["default"], {
        onClose: this.toggleSupport
      })), userActionRequired && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Banner__WEBPACK_IMPORTED_MODULE_15__["default"], userActionRequired));
    }
  }]);

  return Bar;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);
var mapStateToProps = function mapStateToProps(state) {
  return {
    theme: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["getTheme"])(state).name,
    themeOverrides: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["getTheme"])(state).overrides,
    barLeft: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["getContent"])(state, 'left'),
    barRight: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["getContent"])(state, 'right'),
    barCenter: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["getContent"])(state, 'center'),
    barSearch: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["getContent"])(state, 'search'),
    isDrive: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["isCurrentApp"])(state, {
      slug: 'drive'
    }),
    claudyEnabled: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["shouldEnableClaudy"])(state),
    hasFetchedApps: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["hasFetched"])(state)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchApps: function fetchApps() {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["fetchApps"])());
    },
    fetchContext: function fetchContext() {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["fetchContext"])());
    },
    fetchSettingsData: function fetchSettingsData(displayBusy) {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_22__["fetchSettingsData"])(displayBusy));
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])()(Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["connect"])(mapStateToProps, mapDispatchToProps)(Bar)));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Claudy.js":
/*!***************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Claudy.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_stack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var Claudy = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Claudy, _Component);

  var _super = _createSuper(Claudy);

  function Claudy(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Claudy);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "toggle", function () {
      if (!_this.props.opened && !_this.intentWrapperRef.childNodes.length) {
        _this.setState({
          isLoading: true
        }); // init Claudy intent


        _this.intents.create('CLAUDY', 'io.cozy.settings', {
          exposeIntentFrameRemoval: true
        }).start(_this.intentWrapperRef, function () {
          _this.setState({
            isLoading: false,
            isActive: true
          });

          _this.props.onToggle(); // toggle claudy when the intent is loaded

        }).then(function (_ref) {
          var removeIntentIframe = _ref.removeIntentIframe;

          // exposeFrameRemoval intent event
          // remove the intent frame at the end of the menu closing transition
          var closedListener = function closedListener(e) {
            if (e.propertyName === 'transform') {
              removeIntentIframe();

              _this.setState({
                isActive: false
              });

              e.target.removeEventListener('transitionend', closedListener);
            }
          };

          _this.intentWrapperRef.addEventListener('transitionend', closedListener, false);

          _this.props.onToggle();
        });
      } else {
        _this.setState({
          isActive: !_this.state.isActive
        });

        _this.props.onToggle();
      }
    });

    _this.store = context.barStore;
    _this.state = {
      isLoading: false,
      isActive: false
    };
    _this.intents = Object(_lib_stack__WEBPACK_IMPORTED_MODULE_8__["getIntents"])();
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Claudy, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.claudyFired) this.toggle();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      return this.UNSAFE_componentWillReceiveProps(nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var opened = this.props.opened;
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          isActive = _this$state.isActive;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-claudy ".concat(opened ? 'coz-claudy--opened' : '')
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("button", {
        type: "button",
        className: "coz-claudy-icon coz-bar-hide-sm",
        "data-claudy-opened": isActive,
        "data-claudy-loading": isLoading,
        onClick: this.toggle
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-claudy-intent-wrapper",
        ref: function ref(wrapper) {
          _this2.intentWrapperRef = wrapper;
        }
      }));
    }
  }]);

  return Claudy;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Claudy);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Drawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Drawer.js ***!
  \***************************************************************/
/*! exports provided: Drawer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drawer", function() { return Drawer; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _Apps_AppsContent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Apps/AppsContent */ "./node_modules/cozy-bar/transpiled/components/Apps/AppsContent.js");
/* harmony import */ var _Settings_SettingsContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Settings/SettingsContent */ "./node_modules/cozy-bar/transpiled/components/Settings/SettingsContent.js");
/* harmony import */ var _lib_reducers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var Drawer = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Drawer, _Component);

  var _super = _createSuper(Drawer);

  function Drawer(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Drawer);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onDrawerClick", function (event) {
      if (event.target === _this.wrapperRef) {
        _this.close();
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "onTransitionEnd", function () {
      if (_this.props.visible) {
        if (!_this.gesturesHandler) _this.attachGestures();

        _this.preventBackgroundScrolling();
      } else {
        _this.restoreBackgroundScrolling();

        _this.setState({
          isClosing: false
        });
      }

      _this.props.drawerListener();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "componentWillReceiveProps", /*#__PURE__*/function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(nextProps) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.UNSAFE_componentWillReceiveProps(nextProps);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "UNSAFE_componentWillReceiveProps", /*#__PURE__*/function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(nextProps) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!_this.props.visible && nextProps.visible)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return _this.props.fetchSettingsData();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "close", function () {
      if (_this.state.isClosing) return;

      _this.detachGestures();

      _this.setState(function () {
        return {
          isClosing: true
        };
      });

      _this.turnTransitionsOn();

      _this.props.onClose();

      _this.asideRef.style.transform = '';
    });

    _this.state = {
      isScrolling: false,
      isClosing: false
    };
    _this.handleLogout = _this.handleLogout.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Drawer, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.turnTransitionsOn();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "turnTransitionsOn",
    value: function turnTransitionsOn() {
      this.asideRef.classList.add('with-transition');
      this.asideRef.addEventListener('transitionend', this.onTransitionEnd);
    }
  }, {
    key: "turnTransitionsOff",
    value: function turnTransitionsOff() {
      this.asideRef.classList.remove('with-transition');
      this.asideRef.removeEventListener('transitionend', this.onTransitionEnd);
    }
  }, {
    key: "preventBackgroundScrolling",
    value: function preventBackgroundScrolling() {
      document.body.style.overflow = 'hidden';
    }
  }, {
    key: "restoreBackgroundScrolling",
    value: function restoreBackgroundScrolling() {
      document.body.style.overflow = 'auto';
    }
  }, {
    key: "detachGestures",
    value: function detachGestures() {
      this.gesturesHandler.destroy();
      this.gesturesHandler = null;
    }
  }, {
    key: "attachGestures",
    value: function attachGestures() {
      var _this2 = this;

      // IMPORTANT: on Chrome, the `overflow-y: scroll` property on .coz-drawer--apps prevented
      // swipe events to be dispatched correctly ; the `touch-action: pan-y` fixes the problem
      // see drawer.css
      this.gesturesHandler = new hammerjs__WEBPACK_IMPORTED_MODULE_11___default.a.Manager(document.documentElement, {
        // we listen in all directions so that we can catch panup/pandown events and let the user scroll
        recognizers: [[hammerjs__WEBPACK_IMPORTED_MODULE_11___default.a.Pan, {
          direction: hammerjs__WEBPACK_IMPORTED_MODULE_11___default.a.DIRECTION_ALL
        }]]
      }); // to be completely accurate, `maximumGestureDelta` should be the difference between the right of the aside and the
      // left of the page; but using the width is much easier to compute and accurate enough.

      var maximumGestureDistance = this.asideRef.getBoundingClientRect().width; // between 0 and 1, how far down the gesture must be to be considered complete upon release

      var minimumCloseDistance = 0.4; // a gesture faster than this will dismiss the menu, regardless of distance traveled

      var minimumCloseVelocity = 0.2;
      var currentGestureProgress = null;
      this.gesturesHandler.on('panstart', function (event) {
        if (_this2.state.isClosing) return;

        if (event.additionalEvent === 'panup' || event.additionalEvent === 'pandown') {
          _this2.setState({
            isScrolling: true
          });
        } else {
          _this2.turnTransitionsOff();

          currentGestureProgress = 0;
        }
      });
      this.gesturesHandler.on('pan', function (e) {
        if (_this2.state.isClosing || _this2.state.isScrolling) return;
        currentGestureProgress = -e.deltaX / maximumGestureDistance;

        _this2.applyTransformation(currentGestureProgress);
      });
      this.gesturesHandler.on('panend', function (e) {
        if (_this2.state.isClosing) return;

        if (_this2.state.isScrolling) {
          _this2.setState({
            isScrolling: false
          });

          return;
        } // Dismiss the menu if the swipe pan was bigger than the treshold,
        // or if it was a fast, leftward gesture


        var haveTravelledFarEnough = -e.deltaX / maximumGestureDistance >= minimumCloseDistance;
        var haveTravelledFastEnough = e.velocity < 0 && Math.abs(e.velocity) >= minimumCloseVelocity;
        var shouldDismiss = haveTravelledFarEnough || haveTravelledFastEnough;

        if (shouldDismiss) {
          _this2.close();
        } else {
          _this2.turnTransitionsOn();

          _this2.applyTransformation(0);
        }
      });
    }
  }, {
    key: "applyTransformation",
    value: function applyTransformation(progress) {
      // constrain between 0 and 1.1 (go a bit further than 1 to be hidden completely)
      progress = Math.min(1.1, Math.max(0, progress));
      this.asideRef.style.transform = 'translateX(-' + progress * 100 + '%)';
    }
  }, {
    key: "handleLogout",
    value: function () {
      var _handleLogout = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
        var _this$props, onLogOut, logOut, res;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props = this.props, onLogOut = _this$props.onLogOut, logOut = _this$props.logOut;

                if (!(onLogOut && typeof onLogOut === 'function')) {
                  _context4.next = 6;
                  break;
                }

                res = onLogOut();

                if (!(res instanceof Promise)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 6;
                return res;

              case 6:
                logOut();

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleLogout() {
        return _handleLogout.apply(this, arguments);
      }

      return handleLogout;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          onClaudy = _this$props2.onClaudy,
          visible = _this$props2.visible,
          isClaudyLoading = _this$props2.isClaudyLoading,
          toggleSupport = _this$props2.toggleSupport,
          settingsAppURL = _this$props2.settingsAppURL,
          storageData = _this$props2.storageData;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "coz-drawer-wrapper",
        onClick: this.onDrawerClick,
        "aria-hidden": visible ? 'false' : 'true',
        ref: function ref(node) {
          _this3.wrapperRef = node;
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("aside", {
        ref: function ref(node) {
          _this3.asideRef = node;
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("nav", {
        className: "coz-drawer--apps"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Apps_AppsContent__WEBPACK_IMPORTED_MODULE_12__["default"], {
        onAppSwitch: this.close
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("hr", {
        className: "coz-sep-flex"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("nav", {
        className: "coz-drawer--settings"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_Settings_SettingsContent__WEBPACK_IMPORTED_MODULE_13__["default"], {
        onLogOut: this.handleLogout,
        storageData: storageData,
        settingsAppURL: settingsAppURL,
        isClaudyLoading: isClaudyLoading,
        onClaudy: onClaudy,
        toggleSupport: toggleSupport,
        isDrawer: true
      }))));
    }
  }]);

  return Drawer;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);



var mapStateToProps = function mapStateToProps(state) {
  return {
    storageData: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_14__["getStorageData"])(state),
    settingsAppURL: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_14__["getSettingsAppURL"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchSettingsData: function fetchSettingsData() {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_14__["fetchSettingsData"])());
    },
    logOut: function logOut() {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_14__["logOut"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["connect"])(mapStateToProps, mapDispatchToProps)(Drawer));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/SearchBar.js":
/*!******************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/SearchBar.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var react_autosuggest__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-autosuggest */ "./node_modules/react-autosuggest/dist/index.js");
/* harmony import */ var react_autosuggest__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_autosuggest__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _lib_intents__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/intents */ "./node_modules/cozy-bar/transpiled/lib/intents.js");
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../lib/logger */ "./node_modules/cozy-bar/transpiled/lib/logger.js");












function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var INTENT_VERB = 'OPEN';
var INTENT_DOCTYPE = 'io.cozy.suggestions';
var SUGGESTIONS_PER_SOURCE = 10;

var normalizeString = function normalizeString(str) {
  return str.toString().toLowerCase().replace(/\//g, ' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ');
};

var highlightQueryTerms = function highlightQueryTerms(searchResult, query) {
  var normalizedQueryTerms = normalizeString(query);
  var normalizedResultTerms = normalizeString(searchResult);
  var matchedIntervals = [];
  var spacerLength = 1;
  var currentIndex = 0;
  normalizedResultTerms.forEach(function (resultTerm) {
    normalizedQueryTerms.forEach(function (queryTerm) {
      var index = resultTerm.indexOf(queryTerm);

      if (index >= 0) {
        matchedIntervals.push({
          from: currentIndex + index,
          to: currentIndex + index + queryTerm.length
        });
      }
    });
    currentIndex += resultTerm.length + spacerLength;
  }); // matchedIntervals can overlap, so we merge them.
  // - sort the intervals by starting index
  // - add the first interval to the stack
  // - for every interval,
  // - - add it to the stack if it doesn't overlap with the stack top
  // - - or extend the stack top if the start overlaps and the new interval's top is bigger

  var mergedIntervals = matchedIntervals.sort(function (intervalA, intervalB) {
    return intervalA.from > intervalB.from;
  }).reduce(function (computedIntervals, newInterval) {
    if (computedIntervals.length === 0 || computedIntervals[computedIntervals.length - 1].to < newInterval.from) {
      computedIntervals.push(newInterval);
    } else if (computedIntervals[computedIntervals.length - 1].to < newInterval.to) {
      computedIntervals[computedIntervals.length - 1].to = newInterval.to;
    }

    return computedIntervals;
  }, []); // create an array containing the entire search result, with special characters, and the intervals surrounded y `<b>` tags

  var slicedOriginalResult = mergedIntervals.length > 0 ? [searchResult.slice(0, mergedIntervals[0].from)] : searchResult;

  for (var i = 0, l = mergedIntervals.length; i < l; ++i) {
    slicedOriginalResult.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("b", null, searchResult.slice(mergedIntervals[i].from, mergedIntervals[i].to)));
    if (i + 1 < l) slicedOriginalResult.push(searchResult.slice(mergedIntervals[i].to, mergedIntervals[i + 1].from));
  }

  if (mergedIntervals.length > 0) slicedOriginalResult.push(searchResult.slice(mergedIntervals[mergedIntervals.length - 1].to, searchResult.length));
  return slicedOriginalResult;
};

var SearchBar = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(SearchBar, _Component);

  var _super = _createSuper(SearchBar);

  function SearchBar() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, SearchBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "state", {
      input: '',
      query: null,
      searching: false,
      focused: false,
      suggestionsBySource: [],
      sourceURLs: []
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "sources", []);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onMessageFromSource", function (sources) {
      return function (event) {
        // this re-implements a subset of injectService found in lib/intents, though only the part that are useful for suggestions
        var source = sources.find(function (source) {
          return source.origin === event.origin;
        });
        if (!source) return null;

        if (event.data.type === "intent-".concat(source.id, ":ready")) {
          source.ready = true;
          source.window = event.source;
          source.window.postMessage({}, event.origin);
        } else if (event.data.type === "intent-".concat(source.id, ":data") && source.resolvers[event.data.id]) {
          source.resolvers[event.data.id]({
            id: source.id,
            suggestions: event.data.suggestions
          });
          delete source.resolvers[event.data.id];
        } else {
          _lib_logger__WEBPACK_IMPORTED_MODULE_16__["default"].log('unhandled message:', event);
        }
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onChange", function (event, _ref) {
      var newValue = _ref.newValue;

      _this.setState({
        input: newValue
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "changeFocusState", function (focused) {
      _this.setState({
        focused: focused
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "clearSuggestions", function () {
      _this.setState({
        suggestionsBySource: []
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onSuggestionsFetchRequested", function (_ref2) {
      var value = _ref2.value;

      var availableSources = _this.sources.filter(function (source) {
        return source.ready;
      });

      if (availableSources.length > 0) {
        // We defer the emptying of `suggestionsBySource` so that we still display
        // the previous suggestion list
        _this.setState(function (state) {
          return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
            searching: true
          });
        });

        availableSources.forEach( /*#__PURE__*/function () {
          var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(source) {
            var _yield$Promise, id, suggestions, title;

            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return new Promise(function (resolve) {
                      var resolverId = new Date().getTime().toString();
                      source.resolvers[resolverId] = resolve;
                      source.window.postMessage({
                        query: value,
                        id: resolverId
                      }, source.origin);
                    });

                  case 2:
                    _yield$Promise = _context.sent;
                    id = _yield$Promise.id;
                    suggestions = _yield$Promise.suggestions;
                    title = _this.sources.find(function (source) {
                      return source.id === id;
                    }).slug; // This is the first result we get for this new search term,
                    // we can now update `query` and replace the previous `suggestionsBySource`

                    if (_this.state.query !== value) {
                      _this.setState(function (state) {
                        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
                          searching: false,
                          query: value,
                          suggestionsBySource: [{
                            title: title,
                            suggestions: suggestions
                          }]
                        });
                      });
                    } else {
                      _this.setState(function (state) {
                        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
                          suggestionsBySource: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(state.suggestionsBySource), [{
                            title: title,
                            suggestions: suggestions
                          }])
                        });
                      });
                    }

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref3.apply(this, arguments);
          };
        }());
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onSuggestionsClearRequested", function () {
      _this.clearSuggestions();

      _this.debouncedOnSuggestionsFetchRequested.cancel();

      _this.setState({
        query: null,
        searching: false
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "onSuggestionSelected", function (event, _ref4) {
      var suggestion = _ref4.suggestion;
      var onSelect = suggestion.onSelect; // `onSelect` is a string that describes what should happen when the suggestion is selected. Currently, the only format we're supporting is `open:http://example.com` to change the url of the current page.

      if (/^open:/.test(onSelect)) {
        var url = onSelect.substr(5);
        window.location.href = url;
      } else {
        // eslint-disable-next-line no-console
        console.log('suggestion onSelect (' + onSelect + ') could not be executed');
      }

      _this.setState({
        input: '',
        query: null
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "getSectionSuggestions", function (section) {
      return section.suggestions.slice(0, SUGGESTIONS_PER_SOURCE);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "getSuggestionValue", function (suggestion) {
      return suggestion.subtitle;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "renderSectionTitle", function () {
      return null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "renderSuggestion", function (suggestion) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "coz-searchbar-autosuggest-suggestion-item"
      }, suggestion.icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("img", {
        className: "coz-searchbar-autosuggest-suggestion-icon",
        src: suggestion.icon,
        alt: "icon"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "coz-searchbar-autosuggest-suggestion-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "coz-searchbar-autosuggest-suggestion-title"
      }, highlightQueryTerms(suggestion.title, _this.state.query)), suggestion.subtitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "coz-searchbar-autosuggest-suggestion-subtitle"
      }, highlightQueryTerms(suggestion.subtitle, _this.state.query))));
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(SearchBar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.debouncedOnSuggestionsFetchRequested = lodash_debounce__WEBPACK_IMPORTED_MODULE_14___default()(this.onSuggestionsFetchRequested, 250);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // The searchbar has one or more sources that provide suggestions. These sources are iframes into other apps, provied by thee intent system.
      // Since we need to call the sources whenever the query changes, we are taking manual control over the intent process.
      Object(_lib_intents__WEBPACK_IMPORTED_MODULE_15__["fetchRawIntent"])(INTENT_VERB, INTENT_DOCTYPE).then(function (intent) {
        var services = intent.attributes.services;
        if (!services) return null;
        _this2.sources = services.map(function (service) {
          var url = service.href;

          _this2.setState(function (state) {
            return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, state, {
              sourceURLs: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(state.sourceURLs), [url])
            });
          });

          var serviceOrigin = url.split('/', 3).join('/');
          return {
            slug: service.slug,
            // can be used to show where a suggestion comes from
            origin: serviceOrigin,
            id: intent._id,
            ready: false,
            window: null,
            // will hold a reference to the window we're sending messages to
            resolvers: {} // will hold references to a function to call when the source sends suggestions

          };
        });
        window.addEventListener('message', _this2.onMessageFromSource(_this2.sources));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          input = _this$state.input,
          query = _this$state.query,
          searching = _this$state.searching,
          focused = _this$state.focused,
          suggestionsBySource = _this$state.suggestionsBySource,
          sourceURLs = _this$state.sourceURLs;
      if (sourceURLs.length === 0) return null;
      var t = this.props.t;
      var isInitialSearch = input !== '' && query === null;
      var hasSuggestions = suggestionsBySource.reduce(function (totalSuggestions, suggestionSection) {
        return totalSuggestions + suggestionSection.suggestions.length;
      }, 0) > 0;
      var inputProps = {
        placeholder: t('searchbar.placeholder'),
        value: input,
        onChange: this.onChange,
        onFocus: function onFocus() {
          return _this3.changeFocusState(true);
        },
        onBlur: function onBlur() {
          return _this3.changeFocusState(false);
        }
      };
      var theme = {
        container: 'coz-searchbar-autosuggest-container' + (searching ? ' --searching' : '') + (focused ? ' --focused' : ''),
        input: 'coz-searchbar-autosuggest-input',
        inputFocused: 'coz-searchbar-autosuggest-input-focused',
        suggestionsContainer: 'coz-searchbar-autosuggest-suggestions-container',
        suggestionsContainerOpen: 'coz-searchbar-autosuggest-suggestions-container--open',
        suggestionsList: 'coz-searchbar-autosuggest-suggestions-list',
        suggestion: 'coz-searchbar-autosuggest-suggestion',
        suggestionHighlighted: 'coz-searchbar-autosuggest-suggestion-highlighted',
        sectionTitle: 'coz-searchbar-autosuggest-section-title'
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "coz-searchbar",
        role: "search"
      }, sourceURLs.map(function (url, i) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("iframe", {
          src: url,
          style: {
            visibility: 'hidden',
            height: '0px',
            width: '0px'
          },
          key: url + i
        });
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react_autosuggest__WEBPACK_IMPORTED_MODULE_13___default.a, {
        theme: theme,
        suggestions: suggestionsBySource,
        multiSection: true,
        onSuggestionsFetchRequested: this.debouncedOnSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        onSuggestionSelected: this.onSuggestionSelected,
        getSuggestionValue: this.getSuggestionValue,
        getSectionSuggestions: this.getSectionSuggestions,
        renderSectionTitle: this.renderSectionTitle,
        renderSuggestion: this.renderSuggestion,
        inputProps: inputProps,
        focusInputOnSuggestionClick: false
      }), input !== '' && !isInitialSearch && focused && !hasSuggestions && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: 'coz-searchbar-autosuggest-status-container'
      }, t('searchbar.empty', {
        query: input
      })));
    }
  }]);

  return SearchBar;
}(react__WEBPACK_IMPORTED_MODULE_11__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_12__["translate"])()(SearchBar));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Settings/SettingsContent.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Settings/SettingsContent.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cozy-device-helper */ "./node_modules/cozy-device-helper/dist/index.js");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cozy-ui/transpiled/react/Button */ "../overrides/cozy-ui/transpiled/react/Button/index.jsx");
/* harmony import */ var cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icon */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icon/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Phone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Phone */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Phone.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Cloud__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Cloud */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Cloud.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_People__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/People */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/People.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_CloudHappy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/CloudHappy */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/CloudHappy.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Logout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Logout */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Logout.js");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Help__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Help */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Help.js");
/* harmony import */ var _StorageData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./StorageData */ "./node_modules/cozy-bar/transpiled/components/Settings/StorageData.js");
/* harmony import */ var _StorageIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../StorageIcon */ "./node_modules/cozy-bar/transpiled/components/StorageIcon.js");















var MenuIcon = function MenuIcon(_ref) {
  var icon = _ref.icon;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "u-mr-half",
    color: "var(--slateGrey)",
    icon: icon
  });
};

var NavGroup = function NavGroup(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "coz-nav-group"
  }, children);
};

var NavItem = function NavItem(_ref3) {
  var children = _ref3.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "coz-nav-settings-item"
  }, children);
};

var SettingsContent = function SettingsContent(_ref4) {
  var t = _ref4.t,
      onLogOut = _ref4.onLogOut,
      settingsAppURL = _ref4.settingsAppURL,
      storageData = _ref4.storageData,
      onClaudy = _ref4.onClaudy,
      _ref4$isDrawer = _ref4.isDrawer,
      isDrawer = _ref4$isDrawer === void 0 ? false : _ref4$isDrawer,
      isClaudyLoading = _ref4.isClaudyLoading,
      toggleSupport = _ref4.toggleSupport,
      shoulDisplayViewOfferButton = _ref4.shoulDisplayViewOfferButton,
      managerUrlPremiumLink = _ref4.managerUrlPremiumLink,
      viewOfferButtonText = _ref4.viewOfferButtonText;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "coz-nav-pop-content"
  }, isDrawer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), settingsAppURL && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    role: "menuitem",
    href: "".concat(settingsAppURL, "#/profile"),
    target: "_self",
    title: t('profile')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
    className: "u-mr-half",
    icon: cozy_ui_transpiled_react_Icons_People__WEBPACK_IMPORTED_MODULE_8__["default"]
  }), t('profile'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    role: "menuitem",
    href: "".concat(settingsAppURL, "#/connectedDevices"),
    target: "_self",
    title: t('connectedDevices')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
    icon: cozy_ui_transpiled_react_Icons_Phone__WEBPACK_IMPORTED_MODULE_6__["default"]
  }), t('connectedDevices')))), isDrawer && onClaudy && !Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__["isMobileApp"])() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    role: "menuitem",
    className: "coz-nav-settings-item-btn",
    busy: isClaudyLoading,
    onClick: onClaudy
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
    icon: cozy_ui_transpiled_react_Icons_Cloud__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), " ", t('claudy.title')))), !isDrawer && storageData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    role: "menuitem",
    target: "_self",
    title: t('storage'),
    href: "".concat(settingsAppURL, "#/storage")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
    icon: _StorageIcon__WEBPACK_IMPORTED_MODULE_13__["default"]
  }), " ", t('storage'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StorageData__WEBPACK_IMPORTED_MODULE_12__["default"], {
    data: storageData
  })))), (!isDrawer || !Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__["isMobileApp"])()) && shoulDisplayViewOfferButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_4__["ButtonLink"], {
    subtle: true,
    role: "menuitem",
    className: "coz-nav-settings-item-btn",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
      icon: cozy_ui_transpiled_react_Icons_CloudHappy__WEBPACK_IMPORTED_MODULE_9__["default"]
    }),
    title: viewOfferButtonText,
    label: viewOfferButtonText,
    href: managerUrlPremiumLink
  }))), !Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__["isMobileApp"])() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    role: "menuitem",
    className: "coz-nav-settings-item-btn",
    onClick: toggleSupport
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
    icon: cozy_ui_transpiled_react_Icons_Help__WEBPACK_IMPORTED_MODULE_11__["default"]
  }), " ", t('help')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    role: "menuitem",
    onClick: onLogOut,
    title: t('logout')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuIcon, {
    icon: cozy_ui_transpiled_react_Icons_Logout__WEBPACK_IMPORTED_MODULE_10__["default"]
  }), " ", t('logout')))));
};

SettingsContent.defaultProps = {
  shoulDisplayViewOfferButton: false
};
SettingsContent.propTypes = {
  shoulDisplayViewOfferButton: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  t: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onLogOut: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  settingsAppURL: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  storageData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  onClaudy: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func]),
  isDrawer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isClaudyLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  toggleSupport: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  viewOfferButtonText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_3__["translate"])()(SettingsContent));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Settings/StorageData.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Settings/StorageData.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");



var StorageData = function StorageData(_ref) {
  var t = _ref.t,
      data = _ref.data;
  var diskQuota = Number.isInteger(data.quota) ? (data.quota / (1000 * 1000 * 1000)).toFixed(2) : data.quota;
  var diskUsage = Number.isInteger(data.usage) ? (data.usage / (1000 * 1000 * 1000)).toFixed(2) : data.usage;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "coz-nav-storage"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "coz-nav-storage-text"
  }, t('storage_phrase', {
    diskUsage: diskUsage,
    diskQuota: diskQuota
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("progress", {
    className: "cozy-nav-storage-bar",
    value: diskUsage,
    max: diskQuota,
    min: "0"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__["translate"])()(StorageData));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Settings/helper.js":
/*!************************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Settings/helper.js ***!
  \************************************************************************/
/*! exports provided: isFetchingQueries, cozyClientCanCheckPremium */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingQueries", function() { return isFetchingQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cozyClientCanCheckPremium", function() { return cozyClientCanCheckPremium; });
/* harmony import */ var _lib_stack_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/stack-client */ "./node_modules/cozy-bar/transpiled/lib/stack-client.js");

var isFetchingQueries = function isFetchingQueries(requests) {
  return requests.some(function (request) {
    return request.fetchStatus === 'loading';
  });
};
var cozyClientCanCheckPremium = function cozyClientCanCheckPremium() {
  return Object(_lib_stack_client__WEBPACK_IMPORTED_MODULE_0__["compareClientVersion"])('8.3.0');
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/Settings/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/Settings/index.js ***!
  \***********************************************************************/
/*! exports provided: Settings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return Settings; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cozy-ui/transpiled/react/Button */ "../overrides/cozy-ui/transpiled/react/Button/index.jsx");
/* harmony import */ var cozy_ui_transpiled_react_Icons_Gear__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! cozy-ui/transpiled/react/Icons/Gear */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Icons/Gear.js");
/* harmony import */ var cozy_client_dist__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! cozy-client/dist */ "./node_modules/cozy-client/dist/index.js");
/* harmony import */ var cozy_client_dist__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(cozy_client_dist__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _SettingsContent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SettingsContent */ "./node_modules/cozy-bar/transpiled/components/Settings/SettingsContent.js");
/* harmony import */ var _lib_reducers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../lib/reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../queries */ "./node_modules/cozy-bar/transpiled/queries/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./helper */ "./node_modules/cozy-bar/transpiled/components/Settings/helper.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }










var instanceModel = undefined;
var hasAnOffer = undefined;
var isFremiumFixed = undefined;

if (cozy_client_dist__WEBPACK_IMPORTED_MODULE_14__["models"]) {
  instanceModel = cozy_client_dist__WEBPACK_IMPORTED_MODULE_14__["models"].instance; // TODO fallback from cozy-client

  isFremiumFixed = function isFremiumFixed(data) {
    var GB = 1000 * 1000 * 1000;
    var PREMIUM_QUOTA = 50 * GB;
    var quota = lodash_get__WEBPACK_IMPORTED_MODULE_10___default()(data, 'diskUsage.data.attributes.quota', false);
    return parseInt(quota) < PREMIUM_QUOTA;
  };

  hasAnOffer = function hasAnOffer(data) {
    return !instanceModel.isSelfHosted(data) && instanceModel.arePremiumLinksEnabled(data) && instanceModel.getUuid(data) && !isFremiumFixed(data);
  };
}





var Settings = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(Settings, _Component);

  var _super = _createSuper(Settings);

  function Settings(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Settings);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "onClickOutside", function (event) {
      if (_this.props.isFetching || _this.state.opened) {
        // if it's not a cozy-bar nav popup, close the opened popup
        if (!_this.rootRef.contains(event.target)) {
          _this.setState({
            opened: false
          });

          event.stopPropagation();
        }
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "toggleMenu", function () {
      var stateUpdate = {
        opened: false
      }; // if popup already opened, stop here to close it

      if (_this.state.opened) return _this.setState(stateUpdate); // fetch data

      _this.props.fetchSettingsData();

      _this.setState({
        opened: true
      });
    });

    _this.state = {
      opened: false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Settings, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('click', this.onClickOutside);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.onClickOutside);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          isBusy = _this$props.isBusy,
          logOut = _this$props.logOut,
          _onLogOut = _this$props.onLogOut,
          t = _this$props.t,
          toggleSupport = _this$props.toggleSupport,
          diskUsageQuery = _this$props.diskUsageQuery,
          instanceQuery = _this$props.instanceQuery,
          contextQuery = _this$props.contextQuery,
          storageData = _this$props.storageData,
          settingsAppURL = _this$props.settingsAppURL,
          isFetching = _this$props.isFetching;
      var shouldDisplayViewOfferButton = false;
      var managerUrlPremiumLink;
      var isFetchingFromQueries;
      var viewOfferButtonText = '';
      var canCheckPremium = Object(_helper__WEBPACK_IMPORTED_MODULE_18__["cozyClientCanCheckPremium"])();

      if (canCheckPremium) {
        isFetchingFromQueries = Object(_helper__WEBPACK_IMPORTED_MODULE_18__["isFetchingQueries"])([diskUsageQuery, instanceQuery, contextQuery]);

        if (!isFetchingFromQueries) {
          var data = {
            context: contextQuery,
            diskUsage: diskUsageQuery,
            instance: instanceQuery
          };
          shouldDisplayViewOfferButton = instanceModel.shouldDisplayOffers(data) || hasAnOffer(data);

          if (shouldDisplayViewOfferButton && !hasAnOffer(data)) {
            viewOfferButtonText = t('view_offers');
          } else if (hasAnOffer(data)) {
            viewOfferButtonText = t('view_my_offer');
          }

          managerUrlPremiumLink = instanceModel.buildPremiumLink(data);
        }
      }

      var areAllFetchingDone = false;

      if (!canCheckPremium) {
        areAllFetchingDone = !isFetching;
      } else {
        areAllFetchingDone = !isFetchingFromQueries && !isFetching;
      }

      var opened = this.state.opened;
      var openMenu = opened && areAllFetchingDone;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-nav coz-nav-settings",
        ref: function ref(_ref) {
          _this2.rootRef = _ref;
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_transpiled_react_Button__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        type: "button",
        theme: "text",
        onClick: this.toggleMenu,
        className: "coz-nav-settings-btn",
        "aria-controls": "coz-nav-pop--settings",
        busy: isBusy,
        icon: cozy_ui_transpiled_react_Icons_Gear__WEBPACK_IMPORTED_MODULE_13__["default"],
        label: t('menu.settings')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-nav-pop coz-nav-pop--settings",
        id: "coz-nav-pop--settings",
        "aria-hidden": !openMenu
      }, areAllFetchingDone && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_SettingsContent__WEBPACK_IMPORTED_MODULE_15__["default"], {
        onLogOut: function onLogOut() {
          if (_onLogOut && typeof _onLogOut === 'function') {
            _onLogOut();
          } else {
            logOut();
          }
        },
        toggleSupport: toggleSupport,
        storageData: storageData,
        settingsAppURL: settingsAppURL,
        shoulDisplayViewOfferButton: shouldDisplayViewOfferButton,
        managerUrlPremiumLink: managerUrlPremiumLink,
        viewOfferButtonText: viewOfferButtonText
      }))));
    }
  }]);

  return Settings;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    storageData: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_16__["getStorageData"])(state),
    settingsAppURL: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_16__["getSettingsAppURL"])(state),
    isBusy: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_16__["isSettingsBusy"])(state),
    isFetching: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_16__["isFetchingSettings"])(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchSettingsData: function fetchSettingsData() {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_16__["fetchSettingsData"])());
    },
    logOut: function logOut() {
      return dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_16__["logOut"])());
    }
  };
};

var exported;

if (Object(_helper__WEBPACK_IMPORTED_MODULE_18__["cozyClientCanCheckPremium"])()) {
  exported = Object(redux__WEBPACK_IMPORTED_MODULE_9__["compose"])(Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])(), Object(cozy_client_dist__WEBPACK_IMPORTED_MODULE_14__["queryConnect"])({
    instanceQuery: _queries__WEBPACK_IMPORTED_MODULE_17__["instanceReq"],
    contextQuery: _queries__WEBPACK_IMPORTED_MODULE_17__["contextReq"],
    diskUsageQuery: _queries__WEBPACK_IMPORTED_MODULE_17__["diskUsageReq"]
  }), Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps))(Settings);
} else {
  exported = Object(redux__WEBPACK_IMPORTED_MODULE_9__["compose"])(Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_11__["translate"])(), Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps))(Settings);
}

/* harmony default export */ __webpack_exports__["default"] = (exported);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/StorageIcon.js":
/*!********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/StorageIcon.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


/* Automatically generated via svgr */


function SvgIconStorage16(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("svg", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    width: 16,
    height: 16
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("path", {
    fillRule: "evenodd",
    d: "M1 4h14v10.004a1 1 0 01-1.007.996H2.007A1 1 0 011 14.004V4zM0 2c0-.552.445-1 1-1h14c.552 0 1 .444 1 1v1H0V2zm5 4h6v2H5V6z"
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SvgIconStorage16);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/components/SupportModal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/components/SupportModal.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var cozy_ui_transpiled_react_Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cozy-ui/transpiled/react/Modal */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Modal/index.js");
/* harmony import */ var cozy_ui_transpiled_react_Spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! cozy-ui/transpiled/react/Spinner */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/Spinner/index.js");
/* harmony import */ var _lib_stack__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var SupportModal = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SupportModal, _Component);

  var _super = _createSuper(SupportModal);

  function SupportModal(props, context) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SupportModal);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "toggle", function () {
      _this.setState({
        isLoading: true
      }); // init support intent


      _this.intents.create('SUPPORT', 'io.cozy.settings').start(_this.intentWrapperRef, function () {
        _this.setState({
          isLoading: false
        });
      });
    });

    _this.store = context.barStore;
    _this.state = {
      isLoading: false
    };
    _this.intents = Object(_lib_stack__WEBPACK_IMPORTED_MODULE_10__["getIntents"])();
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SupportModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.toggle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isLoading = this.state.isLoading;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_transpiled_react_Modal__WEBPACK_IMPORTED_MODULE_8__["default"], {
        secondaryAction: this.props.onClose,
        className: "coz-support-modal",
        into: "#cozy-bar-modal-dom-place",
        closeBtnClassName: "coz-support-modal-close"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_transpiled_react_Modal__WEBPACK_IMPORTED_MODULE_8__["ModalContent"], {
        className: "coz-support-modal-wrapper u-mt-1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-support-modal-content"
      }, isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(cozy_ui_transpiled_react_Spinner__WEBPACK_IMPORTED_MODULE_9__["default"], {
        size: "xxlarge",
        middle: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "coz-support-intent-wrapper".concat(isLoading ? ' coz-hidden' : ''),
        ref: function ref(wrapper) {
          _this2.intentWrapperRef = wrapper;
        }
      })))));
    }
  }]);

  return SupportModal;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SupportModal);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/config/claudyActions.json":
/*!********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/config/claudyActions.json ***!
  \********************************************************************/
/*! exports provided: desktop, mobile, support, default */
/***/ (function(module) {

module.exports = {"desktop":{"icon":"icon-laptop.svg","link":{"type":"external"}},"mobile":{"icon":"icon-phone.svg","link":{"type":"external"}},"support":{"icon":"icon-question-mark.svg","link":{"type":"external"}}};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/config/persistWhitelist.json":
/*!***********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/config/persistWhitelist.json ***!
  \***********************************************************************/
/*! exports provided: 0, 1, default */
/***/ (function(module) {

module.exports = ["apps","context"];

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/dom.js":
/*!*************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/dom.js ***!
  \*************************************************/
/*! exports provided: getDefaultStackURL, getDefaultToken, getDefaultIcon, getAppNamePrefix, getAppSlug, getUserActionRequired, APP_SELECTOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultStackURL", function() { return getDefaultStackURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultToken", function() { return getDefaultToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultIcon", function() { return getDefaultIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppNamePrefix", function() { return getAppNamePrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppSlug", function() { return getAppSlug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserActionRequired", function() { return getUserActionRequired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_SELECTOR", function() { return APP_SELECTOR; });
var APP_SELECTOR = '[role=application]'; // return an empty object by default to avoid checking existance

var getAppNodeDataSet = function getAppNodeDataSet() {
  var appNode = document.querySelector(APP_SELECTOR);
  if (!appNode || !appNode.dataset) return {};
  return appNode.dataset;
};

var getDefaultStackURL = function getDefaultStackURL(isPublic) {
  var data = getAppNodeDataSet();

  if (!data.cozyDomain) {
    if (!isPublic) {
      // eslint-disable-next-line no-console
      console.warn("Cozy-bar can't discover the cozy's URL, and will probably fail to initialize the connection with the stack.");
    }

    return '';
  }

  var protocol = window.location.protocol;
  return "".concat(protocol, "//").concat(data.cozyDomain);
};

var getDefaultToken = function getDefaultToken(isPublic) {
  var data = getAppNodeDataSet();

  if (!data.cozyToken) {
    if (!isPublic) {
      // eslint-disable-next-line no-console
      console.warn("Cozy-bar can't discover the app's token, and will probably fail to initialize the connection with the stack.");
    }

    return '';
  }

  return data.cozyToken;
};

var getDefaultIcon = function getDefaultIcon() {
  var linkNode = document.querySelector('link[rel="icon"][sizes^="32"]');

  if (linkNode !== null) {
    return linkNode.getAttribute('href');
  } else {
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
};

var getAppNamePrefix = function getAppNamePrefix() {
  var data = getAppNodeDataSet();
  return data.cozyAppNamePrefix || null;
};

var getAppSlug = function getAppSlug() {
  var data = getAppNodeDataSet();
  return data.cozyAppSlug || null;
};

var getUserActionRequired = function getUserActionRequired() {
  var meta = document.querySelector('meta[name=user-action-required]');
  var data = meta && meta.dataset;

  if (data) {
    var title = data.title,
        code = data.code,
        detail = data.detail,
        links = data.links;

    if (code) {
      // we suppose that at least code will always exist
      return {
        title: title,
        code: code,
        detail: detail,
        links: links
      };
    }
  }

  return undefined;
};



/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/index.js":
/*!***************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/index.js ***!
  \***************************************************/
/*! exports provided: init, version, setBarCenter, setBarLeft, setBarRight, setBarSearch, BarLeft, BarRight, BarCenter, BarSearch, setTheme, setLocale, updateAccessToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBarCenter", function() { return setBarCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBarLeft", function() { return setBarLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBarRight", function() { return setBarRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBarSearch", function() { return setBarSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarLeft", function() { return BarLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarRight", function() { return BarRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarCenter", function() { return BarCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarSearch", function() { return BarSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTheme", function() { return setTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAccessToken", function() { return updateAccessToken; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cozy-device-helper */ "./node_modules/cozy-device-helper/dist/index.js");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");
/* harmony import */ var _lib_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocale", function() { return _lib_reducers__WEBPACK_IMPORTED_MODULE_4__["setLocale"]; });

/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/api */ "./node_modules/cozy-bar/transpiled/lib/api/index.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom */ "./node_modules/cozy-bar/transpiled/dom.js");
/* harmony import */ var _locales_en_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./locales/en.json */ "./node_modules/cozy-bar/transpiled/locales/en.json");
var _locales_en_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/en.json */ "./node_modules/cozy-bar/transpiled/locales/en.json", 1);
/* harmony import */ var _locales_fr_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./locales/fr.json */ "./node_modules/cozy-bar/transpiled/locales/fr.json");
var _locales_fr_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/fr.json */ "./node_modules/cozy-bar/transpiled/locales/fr.json", 1);
/* harmony import */ var _locales_es_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./locales/es.json */ "./node_modules/cozy-bar/transpiled/locales/es.json");
var _locales_es_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./locales/es.json */ "./node_modules/cozy-bar/transpiled/locales/es.json", 1);



/* global __VERSION__ */








var locales = {
  en: _locales_en_json__WEBPACK_IMPORTED_MODULE_7__,
  fr: _locales_fr_json__WEBPACK_IMPORTED_MODULE_8__,
  es: _locales_es_json__WEBPACK_IMPORTED_MODULE_9__
};

var createBarElement = function createBarElement() {
  var targetName = Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_2__["isMobileApp"])() ? 'mobile' : 'browser';
  var barNode = document.createElement('div');
  barNode.setAttribute('id', 'coz-bar');
  barNode.setAttribute('role', 'banner');
  barNode.classList.add("coz-target--".concat(targetName));
  return barNode;
};

var injectBarInDOM = function injectBarInDOM(data) {
  if (document.getElementById('coz-bar') !== null) {
    return;
  }

  var barNode = createBarElement();
  var appNode = document.querySelector(_dom__WEBPACK_IMPORTED_MODULE_6__["APP_SELECTOR"]);

  if (!appNode) {
    // eslint-disable-next-line no-console
    console.warn("Cozy-bar is looking for a \"".concat(_dom__WEBPACK_IMPORTED_MODULE_6__["APP_SELECTOR"], "\" tag that contains your application and can't find it :'(\u2026 The BAR is now disabled"));
    return null;
  }

  document.body.insertBefore(barNode, appNode); // method to put cozy-bar z-index on the top when Drawer visible and vice versa

  data.onDrawer = function (visible) {
    barNode.dataset.drawerVisible = visible;
  }; // specific layout behaviour if banner displayed


  if (data.userActionRequired) {
    document.body.classList.add('has-banner');
  }

  return barNode;
};

var renderBar = function renderBar(barNode, options) {
  // import React related modules on init only
  var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");

  var _require = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"),
      render = _require.render;

  var _require2 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js"),
      connect = _require2.connect,
      Provider = _require2.Provider;

  var I18n = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js").default;

  var Bar = __webpack_require__(/*! ./components/Bar */ "./node_modules/cozy-bar/transpiled/components/Bar.js").default;

  var CozyProvider = __webpack_require__(/*! cozy-client */ "./node_modules/cozy-client/dist/index.js").CozyProvider;

  var cozyClient = options.cozyClient; // we connect the I18n component to the store to listen
  // locale change from the api setLocale()

  var EnhancedI18n = connect(function (state) {
    return {
      lang: Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_4__["getLocale"])(state)
    };
  })(I18n);
  var barComponent = /*#__PURE__*/React.createElement(Provider, {
    store: options.reduxStore
  }, /*#__PURE__*/React.createElement(EnhancedI18n, {
    dictRequire: function dictRequire(lang) {
      return locales[lang];
    }
  }, cozyClient ? /*#__PURE__*/React.createElement(CozyProvider, {
    client: cozyClient
  }, /*#__PURE__*/React.createElement(Bar, options)) : /*#__PURE__*/React.createElement(Bar, options)));
  render(barComponent, barNode); // for testing only

  return barComponent;
};

var makeCozyClientAutomatically = function makeCozyClientAutomatically(_ref) {
  var cozyURL = _ref.cozyURL,
      token = _ref.token,
      isPublic = _ref.isPublic;
  var ccURI = cozyURL || Object(_dom__WEBPACK_IMPORTED_MODULE_6__["getDefaultStackURL"])(isPublic);
  var ccToken = token || Object(_dom__WEBPACK_IMPORTED_MODULE_6__["getDefaultToken"])(isPublic);
  var ccOptions = {
    uri: ccURI,
    token: ccToken
  };

  var CozyClient = __webpack_require__(/*! cozy-client */ "./node_modules/cozy-client/dist/index.js").default; // eslint-disable-next-line no-console


  console.warn('Automatically made cozyClient. Options: ', ccOptions);
  return new CozyClient(ccOptions);
};

var exposedAPI = {};
/**
 * Initializes the cozy bar
 *
 * It can be initialized either with a cozyClient instance
 * or a { cozyURL, ssl, token } tupple.
 *
 * @function
 * @param {Object}  options
 * @param {string}  options.appName    - App name to be displayed in the bar
 * @param {string}  options.appNamePrefix
 * @param {string}  options.lang       - Language for the bar
 * @param {string}  options.iconPath   -
 * @param {Object}  options.cozyClient - a cozy client instance
 * @param {string}  options.cozyURL    - URL or domain of the stack
 * @param {boolean} options.ssl        - Tells if we should use a secure
 *                                   protocol required if cozyURL does
 *                                   not have a protocol
 * @param {string}  arg.token      - Access token for the stack
 * @param {boolean} arg.isPublic
 * @param {Function} arg.onLogout
 */

var init = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var _ref3,
        appName,
        _ref3$appNamePrefix,
        appNamePrefix,
        _ref3$appSlug,
        appSlug,
        lang,
        _ref3$iconPath,
        iconPath,
        cozyClient,
        cozyURL,
        token,
        _ref3$replaceTitleOnM,
        replaceTitleOnMobile,
        _ref3$isPublic,
        isPublic,
        onLogOut,
        getOrCreateStore,
        reduxStore,
        apiMethods,
        options,
        barNode,
        _args = arguments;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref3 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, appName = _ref3.appName, _ref3$appNamePrefix = _ref3.appNamePrefix, appNamePrefix = _ref3$appNamePrefix === void 0 ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__["getAppNamePrefix"])() : _ref3$appNamePrefix, _ref3$appSlug = _ref3.appSlug, appSlug = _ref3$appSlug === void 0 ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__["getAppSlug"])() : _ref3$appSlug, lang = _ref3.lang, _ref3$iconPath = _ref3.iconPath, iconPath = _ref3$iconPath === void 0 ? Object(_dom__WEBPACK_IMPORTED_MODULE_6__["getDefaultIcon"])() : _ref3$iconPath, cozyClient = _ref3.cozyClient, cozyURL = _ref3.cozyURL, token = _ref3.token, _ref3$replaceTitleOnM = _ref3.replaceTitleOnMobile, replaceTitleOnMobile = _ref3$replaceTitleOnM === void 0 ? false : _ref3$replaceTitleOnM, _ref3$isPublic = _ref3.isPublic, isPublic = _ref3$isPublic === void 0 ? false : _ref3$isPublic, onLogOut = _ref3.onLogOut;

            // Force public mode in `/public` URLs
            if (!isPublic && /^\/public/.test(window.location.pathname)) {
              isPublic = true;
            }

            if (!cozyClient) {
              cozyClient = makeCozyClientAutomatically({
                cozyURL: cozyURL,
                token: token,
                isPublic: isPublic
              });
            } // store


            getOrCreateStore = __webpack_require__(/*! ./lib/store */ "./node_modules/cozy-bar/transpiled/lib/store/index.js").default;
            reduxStore = getOrCreateStore();
            reduxStore.dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_4__["setInfos"])(appName, appNamePrefix, appSlug));
            _lib_stack__WEBPACK_IMPORTED_MODULE_3__["default"].init({
              cozyClient: cozyClient,
              onCreate: function onCreate(data) {
                return reduxStore.dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_4__["onRealtimeCreate"])(data));
              },
              onDelete: function onDelete(data) {
                return reduxStore.dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_4__["onRealtimeDelete"])(data));
              }
            });

            if (lang) {
              reduxStore.dispatch(Object(_lib_reducers__WEBPACK_IMPORTED_MODULE_4__["setLocale"])(lang));
            } // Assign all api methods to the bar object


            apiMethods = Object(_lib_api__WEBPACK_IMPORTED_MODULE_5__["createBarAPI"])(reduxStore);
            Object.assign(exposedAPI, apiMethods);
            options = {
              appName: appName,
              appNamePrefix: appNamePrefix,
              appSlug: appSlug,
              cozyClient: cozyClient,
              iconPath: iconPath,
              replaceTitleOnMobile: replaceTitleOnMobile,
              isPublic: isPublic,
              onLogOut: onLogOut,
              userActionRequired: Object(_dom__WEBPACK_IMPORTED_MODULE_6__["getUserActionRequired"])(),
              reduxStore: reduxStore
            };
            barNode = injectBarInDOM(options);
            renderBar(barNode, options);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref2.apply(this, arguments);
  };
}();

var updateAccessToken = function updateAccessToken(accessToken) {
  _lib_stack__WEBPACK_IMPORTED_MODULE_3__["default"].updateAccessToken(accessToken);
};

var proxiedAPI = Object(_lib_api__WEBPACK_IMPORTED_MODULE_5__["createBarProxiedAPI"])(exposedAPI);
var setBarCenter = proxiedAPI.setBarCenter,
    setBarLeft = proxiedAPI.setBarLeft,
    setBarRight = proxiedAPI.setBarRight,
    setBarSearch = proxiedAPI.setBarSearch,
    BarCenter = proxiedAPI.BarCenter,
    BarRight = proxiedAPI.BarRight,
    BarLeft = proxiedAPI.BarLeft,
    BarSearch = proxiedAPI.BarSearch,
    setTheme = proxiedAPI.setTheme;
var version = "\"0.0.0-development\"";


/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/api/helpers.js":
/*!*************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/api/helpers.js ***!
  \*************************************************************/
/*! exports provided: locations, getJsApiName, getReactApiName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locations", function() { return locations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJsApiName", function() { return getJsApiName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReactApiName", function() { return getReactApiName; });
var locations = ['left', 'center', 'right', 'search'];

var upperFirstLetter = function upperFirstLetter(val) {
  return val[0].toUpperCase() + val.slice(1);
};

var getJsApiName = function getJsApiName(location) {
  return "setBar".concat(upperFirstLetter(location));
};
var getReactApiName = function getReactApiName(location) {
  return "Bar".concat(upperFirstLetter(location));
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/api/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/api/index.js ***!
  \***********************************************************/
/*! exports provided: createBarAPI, createBarProxiedAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBarAPI", function() { return createBarAPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBarProxiedAPI", function() { return createBarProxiedAPI; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers */ "./node_modules/cozy-bar/transpiled/lib/api/helpers.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



 // The React API need unique IDs, so we will increment this variable

var idToIncrement = 0;
/**
 * Wraps argument into a React element if it is a string. Is used
 * for setBar{Left,Right,Center} to be able to pass HTML
 *
 * @param  {ReactElement|string} v
 * @return {ReactElement}
 */

var wrapInElement = function wrapInElement(v) {
  if (typeof v === 'string') {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: v
      }
    });
  } else {
    return v;
  }
};
/**
 * Creates a React component that enables to access store
 * properties in a declarative way.
 *
 * @param  {BarStore} store
 */


var barContentComponent = function barContentComponent(store, location) {
  return /*#__PURE__*/function (_Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(BarContent, _Component);

    var _super = _createSuper(BarContent);

    function BarContent() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BarContent);

      return _super.apply(this, arguments);
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BarContent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.componentId = idToIncrement++;
        this.setContent(this.props.children);
      }
    }, {
      key: "setContent",
      value: function setContent(content) {
        try {
          content = react__WEBPACK_IMPORTED_MODULE_5___default.a.Children.only(content); // eslint-disable-next-line no-empty
        } catch (e) {}

        store.dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["setContent"])(location, content, this.componentId));
      }
    }, {
      key: "unsetContent",
      value: function unsetContent() {
        store.dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["unsetContent"])(location, this.componentId));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unsetContent();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.children !== prevProps.children) {
          this.setContent(this.props.children);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return BarContent;
  }(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);
};
/**
 * Creates a public API
 *
 * - getters/setters for public attributes
 * - React components that act as getters/setters
 *
 * @param  {ReduxStore} store - Store on which the API will act
 * @return {object} - Methods of the public API
 */


var createBarAPI = function createBarAPI(store) {
  // setBar{Left,Right,Center} and <Bar{Left,Right,Center} />
  var methods = {};
  _helpers__WEBPACK_IMPORTED_MODULE_7__["locations"].forEach(function (location) {
    // expose JS API
    methods[Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getJsApiName"])(location)] = function (value) {
      return store.dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["setContent"])(location, wrapInElement(value), 'js'));
    }; // expose React API


    methods[Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getReactApiName"])(location)] = barContentComponent(store, location);
  });

  methods.setLocale = function () {
    store.dispatch(_reducers__WEBPACK_IMPORTED_MODULE_6__["setLocale"].apply(void 0, arguments));
  };

  methods.setTheme = function () {
    store.dispatch(_reducers__WEBPACK_IMPORTED_MODULE_6__["setTheme"].apply(void 0, arguments));
  };

  return methods;
}; // Handle exceptions for API before init

var showAPIError = function showAPIError(name) {
  // eslint-disable-next-line no-console
  console.error("You tried to use the CozyBar API (".concat(name, ") but the CozyBar is not initialised yet via cozy.bar.init(...)."));
};

var makeProxyMethodToAPI = function makeProxyMethodToAPI(exposedAPI, fnName) {
  return function () {
    if (exposedAPI[fnName]) {
      return exposedAPI[fnName].apply(exposedAPI, arguments);
    } else {
      showAPIError(fnName);
    }
  };
};
/** Creates an API that swallows error until bar is correctly initialized */


var createBarProxiedAPI = function createBarProxiedAPI(exposedAPI) {
  var apiReferences = {};
  _helpers__WEBPACK_IMPORTED_MODULE_7__["locations"].forEach(function (location) {
    var jsAPIName = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getJsApiName"])(location);
    var reactAPIName = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getReactApiName"])(location);
    apiReferences[jsAPIName] = makeProxyMethodToAPI(exposedAPI, jsAPIName);

    apiReferences[reactAPIName] = function (props) {
      if (exposedAPI[reactAPIName]) {
        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(exposedAPI[reactAPIName], props);
      } else {
        showAPIError(reactAPIName);
      }
    };
  });

  for (var _i = 0, _arr = ['setLocale', 'setTheme']; _i < _arr.length; _i++) {
    var fnName = _arr[_i];
    apiReferences[fnName] = makeProxyMethodToAPI(exposedAPI, fnName);
  }

  return apiReferences;
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/exceptions.js":
/*!************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/exceptions.js ***!
  \************************************************************/
/*! exports provided: ForbiddenException, ServerErrorException, NotFoundException, MethodNotAllowedException, UnavailableStackException, UnavailableSettingsException, UnauthorizedStackException */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForbiddenException", function() { return ForbiddenException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerErrorException", function() { return ServerErrorException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundException", function() { return NotFoundException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MethodNotAllowedException", function() { return MethodNotAllowedException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnavailableStackException", function() { return UnavailableStackException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnavailableSettingsException", function() { return UnavailableSettingsException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnauthorizedStackException", function() { return UnauthorizedStackException; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ForbiddenException = /*#__PURE__*/function (_Error) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(ForbiddenException, _Error);

  var _super = _createSuper(ForbiddenException);

  function ForbiddenException(message) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ForbiddenException);

    _this = _super.call(this);
    _this.name = 'Forbidden';
    _this.status = 403;
    _this.message = message || 'The application does not have permission to access this resource.';
    _this.stack = new Error().stack;
    return _this;
  }

  return ForbiddenException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

var ServerErrorException = /*#__PURE__*/function (_Error2) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(ServerErrorException, _Error2);

  var _super2 = _createSuper(ServerErrorException);

  function ServerErrorException(message) {
    var _this2;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ServerErrorException);

    _this2 = _super2.call(this);
    _this2.name = 'ServerError';
    _this2.status = 500;
    _this2.message = message || 'A server error occurred';
    _this2.stack = new Error().stack;
    return _this2;
  }

  return ServerErrorException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

var NotFoundException = /*#__PURE__*/function (_Error3) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(NotFoundException, _Error3);

  var _super3 = _createSuper(NotFoundException);

  function NotFoundException(message) {
    var _this3;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NotFoundException);

    _this3 = _super3.call(this);
    _this3.name = 'NotFound';
    _this3.status = 404;
    _this3.message = message || 'The ressource was not found';
    _this3.stack = new Error().stack;
    return _this3;
  }

  return NotFoundException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

var MethodNotAllowedException = /*#__PURE__*/function (_Error4) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(MethodNotAllowedException, _Error4);

  var _super4 = _createSuper(MethodNotAllowedException);

  function MethodNotAllowedException(message) {
    var _this4;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, MethodNotAllowedException);

    _this4 = _super4.call(this);
    _this4.name = 'MethodNotAllowed';
    _this4.status = 405;
    _this4.message = message || 'Method not allowed';
    _this4.stack = new Error().stack;
    return _this4;
  }

  return MethodNotAllowedException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

var UnavailableStackException = /*#__PURE__*/function (_Error5) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(UnavailableStackException, _Error5);

  var _super5 = _createSuper(UnavailableStackException);

  function UnavailableStackException(message) {
    var _this5;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, UnavailableStackException);

    _this5 = _super5.call(this);
    _this5.name = 'UnavailableStack';
    _this5.message = message || 'The stack is temporarily unavailable';
    _this5.stack = new Error().stack;
    return _this5;
  }

  return UnavailableStackException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

var UnauthorizedStackException = /*#__PURE__*/function (_Error6) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(UnauthorizedStackException, _Error6);

  var _super6 = _createSuper(UnauthorizedStackException);

  function UnauthorizedStackException(message) {
    var _this6;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, UnauthorizedStackException);

    _this6 = _super6.call(this);
    _this6.name = 'UnauthorizedStack';
    _this6.status = 401;
    _this6.message = message || 'The app is not allowed to access to the requested resource';
    _this6.stack = new Error().stack;
    return _this6;
  }

  return UnauthorizedStackException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));

var UnavailableSettingsException = /*#__PURE__*/function (_Error7) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(UnavailableSettingsException, _Error7);

  var _super7 = _createSuper(UnavailableSettingsException);

  function UnavailableSettingsException(message) {
    var _this7;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, UnavailableSettingsException);

    _this7 = _super7.call(this);
    _this7.name = 'UnavailableSettings';
    _this7.message = message || "The 'Settings' application isn't available or installed in the stack";
    _this7.stack = new Error().stack;
    return _this7;
  }

  return UnavailableSettingsException;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));



/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/icon.js":
/*!******************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/icon.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getIcon; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


var cache = {};
var mimeTypes = {
  gif: 'image/gif',
  ico: 'image/vnd.microsoft.icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml'
};
/**
 * Get an icon URL usable in the HTML page from it's stack path
 *
 * @function
 * @private
 * @param {function} iconFetcher - takes an icon path on the stack
 *                                 and returns a fetch response with the icon
 * @param {object} app - app object with a `links.icon` attribute
 * @param {boolean} useCache
 * @returns {Promise} url string of an icon usable in the HTML page
 *                   may be empty if the `app` object didn't have an icon path
 */

function getIcon(_x) {
  return _getIcon.apply(this, arguments);
}

function _getIcon() {
  _getIcon = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(iconFetcher) {
    var app,
        useCache,
        url,
        icon,
        resp,
        extension,
        iconURL,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            useCache = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;

            if (!(useCache && cache.icons && cache.icons[url])) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", cache.icons[url]);

          case 4:
            url = app.links && app.links.icon;

            if (url) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", '');

          case 7:
            _context.prev = 7;
            _context.next = 10;
            return iconFetcher(url);

          case 10:
            resp = _context.sent;

            if (resp.ok) {
              _context.next = 13;
              break;
            }

            throw new Error("Error while fetching icon ".concat(resp.statusText, ": ").concat(url));

          case 13:
            _context.next = 15;
            return resp.blob();

          case 15:
            icon = _context.sent;
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](7);
            throw _context.t0;

          case 21:
            if (icon.type) {
              _context.next = 30;
              break;
            }

            if (app.icon) {
              _context.next = 24;
              break;
            }

            throw new Error("".concat(app.name, ": Cannot detect mime type for icon ").concat(url));

          case 24:
            extension = app.icon.split('.').pop();

            if (extension) {
              _context.next = 27;
              break;
            }

            throw new Error("".concat(app.name, ": Unable to detect icon mime type from extension (").concat(app.icon, ")"));

          case 27:
            if (mimeTypes[extension]) {
              _context.next = 29;
              break;
            }

            throw new Error("".concat(app.name, ": 'Unexpected icon extension (").concat(app.icon, ")"));

          case 29:
            icon = new Blob([icon], {
              type: mimeTypes[extension]
            });

          case 30:
            if (!icon.type.match(/^image\/.*$/)) {
              _context.next = 34;
              break;
            }

            iconURL = URL.createObjectURL(icon);

            if (useCache) {
              cache.icons = cache.icons || {};
              cache.icons[url] = iconURL;
            }

            return _context.abrupt("return", iconURL);

          case 34:
            throw new Error("".concat(app.name, ": icon ").concat(url, " is not an image."));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 18]]);
  }));
  return _getIcon.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/intents.js":
/*!*********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/intents.js ***!
  \*********************************************************/
/*! exports provided: fetchRawIntent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRawIntent", function() { return fetchRawIntent; });
/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");
 // This is a function that does the bare minimum in order to bypass the normal intent flow. To be replaced in th next version of intents.

function fetchRawIntent(action, type) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var permissions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return Object(_stack__WEBPACK_IMPORTED_MODULE_0__["cozyFetchJSON"])(null, 'POST', '/intents', {
    data: {
      type: 'io.cozy.intents',
      attributes: {
        action: action,
        type: type,
        data: data,
        permissions: permissions
      }
    }
  });
}

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/logger.js":
/*!********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/logger.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cozy-flags */ "./node_modules/cozy-flags/dist/index.js");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cozy_minilog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cozy/minilog */ "./node_modules/@cozy/minilog/lib/web/index.js");
/* harmony import */ var _cozy_minilog__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cozy_minilog__WEBPACK_IMPORTED_MODULE_1__);


var minilog = window.minilog || _cozy_minilog__WEBPACK_IMPORTED_MODULE_1___default.a;
var logger = minilog('cozy-bar');

if (!cozy_flags__WEBPACK_IMPORTED_MODULE_0___default()('bar.debug')) {
  minilog.suggest.deny('cozy-bar', 'info');
}

/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/middlewares/appsI18n.js":
/*!**********************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/middlewares/appsI18n.js ***!
  \**********************************************************************/
/*! exports provided: appsI18nMiddleware, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appsI18nMiddleware", function() { return appsI18nMiddleware; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cozy-ui/transpiled/react/I18n */ "./node_modules/cozy-bar/node_modules/cozy-ui/transpiled/react/I18n/index.js");
/* harmony import */ var _reducers_locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/locale */ "./node_modules/cozy-bar/transpiled/lib/reducers/locale.js");




var extendI18nWithApp = function extendI18nWithApp(lang) {
  return function (app) {
    var langs = app.langs,
        locales = app.locales;
    var hasLangs = langs && langs.length;

    if (!hasLangs) {
      // TODO The app does not provide langs, we should probably warn the developer
      // when the app is published on the registry.
      return app;
    }

    var providesLang = hasLangs && langs.includes(lang);
    var currentLang = providesLang ? lang : langs[0];
    var localeKeys = locales && Object.keys(locales);
    var providesLocales = localeKeys && localeKeys.length && localeKeys.includes(currentLang);

    if (!providesLocales) {
      // TODO The app does not provide locales, we should probably warn the developer
      // when the app is published on the regisry.
      return app;
    }

    Object(cozy_ui_transpiled_react_I18n__WEBPACK_IMPORTED_MODULE_1__["extend"])(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, app.slug, locales[currentLang]));
    return app;
  };
};

var useLang = function useLang(apps, lang) {
  apps && apps.forEach(extendI18nWithApp(lang));
};

var appsI18nMiddleware = function appsI18nMiddleware(_ref) {
  var getState = _ref.getState;
  return function (next) {
    return function (action) {
      var state = getState();

      switch (action.type) {
        case _reducers_locale__WEBPACK_IMPORTED_MODULE_2__["SET_LOCALE"]:
          {
            var apps = state.apps && state.apps.apps;
            useLang(apps, action.lang);
            break;
          }

        case 'RECEIVE_APP_LIST':
          action.apps && action.apps.length && action.apps.forEach(extendI18nWithApp(state.locale));
          break;

        case 'RECEIVE_APP':
          action.app && extendI18nWithApp(state.locale && state.locale.lang)(action.app);
          break;
      }

      return next(action);
    };
  };
};
/* harmony default export */ __webpack_exports__["default"] = (appsI18nMiddleware);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/realtime.js":
/*!**********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/realtime.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cozy-realtime */ "./node_modules/cozy-realtime/dist/index.js");
/* harmony import */ var cozy_realtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cozy_realtime__WEBPACK_IMPORTED_MODULE_2__);



var APPS_DOCTYPE = 'io.cozy.apps';
/**
 * Initialize realtime sockets
 *
 * @private
 * @param {object}
 * @returns {Promise}
 */

function initializeRealtime(_ref) {
  var getApp = _ref.getApp,
      onCreate = _ref.onCreate,
      onDelete = _ref.onDelete,
      cozyClient = _ref.cozyClient;

  var handleAppCreation = /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(app) {
      var fullApp;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return getApp(app.slug);

            case 3:
              fullApp = _context.sent;
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              throw new Error("Cannot fetch app ".concat(app.slug, ": ").concat(_context.t0.message));

            case 9:
              if (typeof onCreate === 'function') {
                onCreate(fullApp);
              }

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));

    return function handleAppCreation(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleAppRemoval = function handleAppRemoval(app) {
    if (typeof onDelete === 'function') {
      onDelete(app);
    }
  };

  try {
    var realtime = new cozy_realtime__WEBPACK_IMPORTED_MODULE_2___default.a({
      client: cozyClient
    });
    realtime.subscribe('created', APPS_DOCTYPE, handleAppCreation);
    realtime.subscribe('deleted', APPS_DOCTYPE, handleAppRemoval);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Cannot initialize realtime in Cozy-bar: ".concat(error.message));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (initializeRealtime);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/apps.js":
/*!***************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/apps.js ***!
  \***************************************************************/
/*! exports provided: isCurrentApp, getApps, getHomeApp, isFetchingApps, hasFetched, deleteApp, receiveApp, setInfos, fetchApps, setDefaultApp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCurrentApp", function() { return isCurrentApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApps", function() { return getApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHomeApp", function() { return getHomeApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingApps", function() { return isFetchingApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasFetched", function() { return hasFetched; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteApp", function() { return deleteApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "receiveApp", function() { return receiveApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInfos", function() { return setInfos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchApps", function() { return fetchApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultApp", function() { return setDefaultApp; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");
/* harmony import */ var lodash_unionwith__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash.unionwith */ "./node_modules/lodash.unionwith/index.js");
/* harmony import */ var lodash_unionwith__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_unionwith__WEBPACK_IMPORTED_MODULE_4__);




 // constants

var DELETE_APP = 'DELETE_APP';
var RECEIVE_APP = 'RECEIVE_APP';
var RECEIVE_APP_LIST = 'RECEIVE_APP_LIST';
var RECEIVE_HOME_APP = 'RECEIVE_HOME_APP';
var FETCH_APPS = 'FETCH_APPS';
var FETCH_APPS_FAILURE = 'FETCH_APPS_FAILURE';
var SET_INFOS = 'SET_INFOS';
var isCurrentApp = function isCurrentApp(state, app) {
  return app.slug === state.appSlug;
}; // selectors

var getApps = function getApps(state) {
  if (!state.apps) return [];
  return state.apps;
};
var getHomeApp = function getHomeApp(state) {
  return state.homeApp;
};
var isFetchingApps = function isFetchingApps(state) {
  return state ? state.isFetching : false;
};
var hasFetched = function hasFetched(state) {
  return state.hasFetched;
}; // actions

var deleteApp = function deleteApp(app) {
  return {
    type: DELETE_APP,
    app: app
  };
};
var receiveApp = function receiveApp(app) {
  return {
    type: RECEIVE_APP,
    app: app
  };
};

var receiveAppList = function receiveAppList(apps) {
  return {
    type: RECEIVE_APP_LIST,
    apps: apps
  };
};

var receiveHomeApp = function receiveHomeApp(homeApp) {
  return {
    type: RECEIVE_HOME_APP,
    homeApp: homeApp
  };
};

var setInfos = function setInfos(appName, appNamePrefix, appSlug) {
  return {
    type: SET_INFOS,
    appName: appName,
    appNamePrefix: appNamePrefix,
    appSlug: appSlug
  };
}; // actions async

var fetchApps = function fetchApps() {
  return /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(dispatch) {
      var rawAppList, apps;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              dispatch({
                type: FETCH_APPS
              });
              _context.next = 4;
              return _stack__WEBPACK_IMPORTED_MODULE_3__["default"].get.apps();

            case 4:
              rawAppList = _context.sent;
              apps = rawAppList.map(mapApp);

              if (rawAppList.length) {
                _context.next = 8;
                break;
              }

              throw new Error('No installed apps found by the bar');

            case 8:
              _context.next = 10;
              return dispatch(setDefaultApp(apps));

            case 10:
              _context.next = 12;
              return dispatch(receiveAppList(apps));

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              dispatch({
                type: FETCH_APPS_FAILURE
              }); // eslint-disable-next-line no-console

              console.warn(_context.t0.message ? _context.t0.message : _context.t0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};
/**
 *
 * @param {Array} appsList
 */

var setDefaultApp = function setDefaultApp(appsList) {
  return /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(dispatch) {
      var context, defaultRedirection, homeApp, HOME_APP_SLUG, slugRegexp, matches, defaultAppSlug;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _stack__WEBPACK_IMPORTED_MODULE_3__["default"].get.context();

            case 3:
              context = _context2.sent;
              defaultRedirection = context.data && context.data.attributes && context.data.attributes.default_redirection;
              homeApp = null; // self hosted cozy has no context by default
              // so let's use hardcoded home slug if needed

              if (!defaultRedirection) {
                HOME_APP_SLUG = 'home';
                homeApp = findAppInArray(HOME_APP_SLUG, appsList);
              } else {
                slugRegexp = /^([^/]+)\/.*/;
                matches = defaultRedirection.match(slugRegexp);
                defaultAppSlug = matches && matches[1];
                homeApp = findAppInArray(defaultAppSlug, appsList);
              }

              if (!homeApp) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", dispatch(receiveHomeApp(homeApp)));

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              // eslint-disable-next-line no-console
              console.warn("Cozy-bar cannot fetch home app data: ".concat(_context2.t0.message));

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 11]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
}; // reducers

var defaultState = {
  apps: [],
  homeApp: null,
  isFetching: true,
  appName: null,
  appNamePrefix: null,
  appSlug: null,
  hasFetched: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_APPS:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        isFetching: true
      });

    case FETCH_APPS_FAILURE:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        isFetching: false
      });

    case RECEIVE_APP:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        apps: lodash_unionwith__WEBPACK_IMPORTED_MODULE_4___default()(state.apps, [mapApp(action.app)], function (appA, appB) {
          return appA.slug === appB.slug;
        })
      });

    case RECEIVE_APP_LIST:
      {
        var appsList = action.apps.map(function (app) {
          return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, app, {
            isCurrentApp: isCurrentApp(state, app)
          });
        });
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
          isFetching: false,
          hasFetched: true,
          apps: appsList
        });
      }

    case RECEIVE_HOME_APP:
      {
        var homeApp = action.homeApp;
        return isCurrentApp(state, homeApp) ? _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
          homeApp: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, homeApp, {
            isCurrentApp: true
          })
        }) : _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
          homeApp: homeApp
        });
      }

    case DELETE_APP:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        apps: state.apps.filter(function (app) {
          return app.slug !== action.app.slug;
        })
      });

    case SET_INFOS:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        appName: action.appName,
        appNamePrefix: action.appNamePrefix,
        appSlug: action.appSlug
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer); // helpers

var camelCasify = function camelCasify(object) {
  return !!object && Object.keys(object).reduce(function (acc, key) {
    var camelCaseKey = key.split('_').map(function (segment, index) {
      return index ? segment.charAt(0).toUpperCase() + segment.slice(1) : segment;
    }).join('');
    acc[camelCaseKey] = object[key];
    return acc;
  }, {});
};

var mapApp = function mapApp(app) {
  return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, app, camelCasify(app.attributes), {
    href: app.links && app.links.related
  });
};

var findAppInArray = function findAppInArray(appSlug, apps) {
  return apps.find(function (app) {
    return app.slug === appSlug;
  });
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/content.js":
/*!******************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/content.js ***!
  \******************************************************************/
/*! exports provided: setContent, unsetContent, getDefaultState, reducer, getContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContent", function() { return setContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsetContent", function() { return unsetContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultState", function() { return getDefaultState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContent", function() { return getContent; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);


var SET_CONTENT = 'SET_CONTENT';
var UNSET_CONTENT = 'UNSET_CONTENT';

var getLastItemInMap = function getLastItemInMap(map) {
  return Array.from(map)[map.size - 1];
}; // action creator


var setContent = function setContent(location, content, id) {
  return {
    type: SET_CONTENT,
    location: location,
    content: content,
    id: id
  };
};
var unsetContent = function unsetContent(location, id) {
  return {
    type: UNSET_CONTENT,
    location: location,
    id: id
  };
}; // reducer

var getDefaultState = function getDefaultState() {
  return {
    left: new Map(),
    center: new Map(),
    right: new Map(),
    search: new Map()
  };
};
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultState();
  var action = arguments.length > 1 ? arguments[1] : undefined;
  if (!action.location || typeof action.id === undefined) return state;

  switch (action.type) {
    case SET_CONTENT:
      {
        var currentState = state[action.location];
        currentState.set(action.id, action.content);
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.location, currentState));
      }

    case UNSET_CONTENT:
      {
        var _currentState = state[action.location];

        if (!_currentState.get(action.id)) {
          return state;
        }

        _currentState.delete(action.id);

        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, state, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, action.location, _currentState));
      }

    default:
      return state;
  }
}; // selectors

var getContent = function getContent(state, location) {
  return getLastItemInMap(state[location]) && getLastItemInMap(state[location])[1];
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/context.js":
/*!******************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/context.js ***!
  \******************************************************************/
/*! exports provided: getHelpLink, getClaudyActions, shouldEnableClaudy, fetchContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHelpLink", function() { return getHelpLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClaudyActions", function() { return getClaudyActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldEnableClaudy", function() { return shouldEnableClaudy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchContext", function() { return fetchContext; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");
/* harmony import */ var _config_claudyActions_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config/claudyActions.json */ "./node_modules/cozy-bar/transpiled/config/claudyActions.json");
var _config_claudyActions_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../config/claudyActions.json */ "./node_modules/cozy-bar/transpiled/config/claudyActions.json", 1);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings */ "./node_modules/cozy-bar/transpiled/lib/reducers/settings.js");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cozy-flags */ "./node_modules/cozy-flags/dist/index.js");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_6__);







var FETCH_CONTEXT = 'FETCH_CONTEXT';
var FETCH_CONTEXT_SUCCESS = 'FETCH_CONTEXT_SUCCESS';
var RECEIVE_NO_CONTEXT = 'RECEIVE_NO_CONTEXT'; // selectors

var getHelpLink = function getHelpLink(state) {
  return state.helpLink;
};
var getClaudyActions = function getClaudyActions(state) {
  return state.claudyActions;
};
var shouldEnableClaudy = function shouldEnableClaudy(state) {
  var claudyActions = getClaudyActions(state);
  return !!claudyActions && !!claudyActions.length;
}; // actions

var fetchContext = function fetchContext() {
  return /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(dispatch, getState) {
      var context;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch({
                type: FETCH_CONTEXT
              });

              if (!getState().context.contextNotExist) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", dispatch({
                type: FETCH_CONTEXT_SUCCESS,
                context: null
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _stack__WEBPACK_IMPORTED_MODULE_3__["default"].get.context();

            case 6:
              context = _context.sent;
              return _context.abrupt("return", dispatch({
                type: FETCH_CONTEXT_SUCCESS,
                context: context
              }));

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);

              if (_context.t0.status && _context.t0.status === 404) {
                dispatch({
                  type: RECEIVE_NO_CONTEXT
                });
              } // eslint-disable-next-line no-console


              console.warn('Cannot get Cozy context');
              return _context.abrupt("return", null);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}; // reducers

var defaultState = {
  claudyActions: [],
  contextNotExist: false,
  helpLink: null,
  isFetching: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_CONTEXT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        isFetching: true
      });

    case FETCH_CONTEXT_SUCCESS:
      {
        var attr = action.context && action.context.data && action.context.data.attributes;
        var contextActions = cozy_flags__WEBPACK_IMPORTED_MODULE_6___default()('bar.claudy.force-all-actions') ? Object.keys(_config_claudyActions_json__WEBPACK_IMPORTED_MODULE_4__) : attr && attr['claudy_actions']; // get an arrays of action

        var claudyActions = contextActions.map(function (slug) {
          if (_config_claudyActions_json__WEBPACK_IMPORTED_MODULE_4__.hasOwnProperty(slug)) {
            // adding also the action slug
            return Object.assign({}, _config_claudyActions_json__WEBPACK_IMPORTED_MODULE_4__[slug], {
              slug: slug
            });
          }
        }).filter(function (action) {
          return action;
        });
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
          helpLink: attr && attr['help_link'] || null,
          claudyActions: claudyActions,
          isFetching: false,
          contextNotExist: false
        });
      }

    case RECEIVE_NO_CONTEXT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        contextNotExist: true
      });

    case _settings__WEBPACK_IMPORTED_MODULE_5__["LOG_OUT"]:
      return defaultState;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/index.js ***!
  \****************************************************************/
/*! exports provided: setContent, unsetContent, setLocale, setTheme, fetchApps, setInfos, fetchSettingsData, logOut, fetchContext, getContent, getLocale, getTheme, getApps, getHomeApp, isFetchingApps, isCurrentApp, hasFetched, getStorageData, getSettingsAppURL, isSettingsBusy, isFetchingSettings, getHelpLink, getClaudyActions, shouldEnableClaudy, onRealtimeCreate, onRealtimeDelete, reducers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContent", function() { return setContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsetContent", function() { return unsetContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocale", function() { return setLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTheme", function() { return setTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchApps", function() { return fetchApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInfos", function() { return setInfos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSettingsData", function() { return fetchSettingsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOut", function() { return logOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchContext", function() { return fetchContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContent", function() { return getContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocale", function() { return getLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return getTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApps", function() { return getApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHomeApp", function() { return getHomeApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingApps", function() { return isFetchingApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCurrentApp", function() { return isCurrentApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasFetched", function() { return hasFetched; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorageData", function() { return getStorageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettingsAppURL", function() { return getSettingsAppURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSettingsBusy", function() { return isSettingsBusy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingSettings", function() { return isFetchingSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHelpLink", function() { return getHelpLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClaudyActions", function() { return getClaudyActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldEnableClaudy", function() { return shouldEnableClaudy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onRealtimeCreate", function() { return onRealtimeCreate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onRealtimeDelete", function() { return onRealtimeDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content */ "./node_modules/cozy-bar/transpiled/lib/reducers/content.js");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./locale */ "./node_modules/cozy-bar/transpiled/lib/reducers/locale.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./theme */ "./node_modules/cozy-bar/transpiled/lib/reducers/theme.js");
/* harmony import */ var _apps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./apps */ "./node_modules/cozy-bar/transpiled/lib/reducers/apps.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings */ "./node_modules/cozy-bar/transpiled/lib/reducers/settings.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./context */ "./node_modules/cozy-bar/transpiled/lib/reducers/context.js");








var proxy = function proxy(attr, method) {
  return function (state) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return method.apply(void 0, [state[attr]].concat(args));
  };
};

var setContent = _content__WEBPACK_IMPORTED_MODULE_1__["setContent"];
var unsetContent = _content__WEBPACK_IMPORTED_MODULE_1__["unsetContent"];
var setLocale = _locale__WEBPACK_IMPORTED_MODULE_2__["setLocale"];
var setTheme = _theme__WEBPACK_IMPORTED_MODULE_3__["setTheme"];
var fetchApps = _apps__WEBPACK_IMPORTED_MODULE_4__["fetchApps"];
var setInfos = _apps__WEBPACK_IMPORTED_MODULE_4__["setInfos"];
var fetchSettingsData = _settings__WEBPACK_IMPORTED_MODULE_5__["fetchSettingsData"];
var logOut = _settings__WEBPACK_IMPORTED_MODULE_5__["logOut"];
var fetchContext = _context__WEBPACK_IMPORTED_MODULE_6__["fetchContext"];

var getContent = proxy('content', _content__WEBPACK_IMPORTED_MODULE_1__["getContent"]);
var getLocale = proxy('locale', _locale__WEBPACK_IMPORTED_MODULE_2__["getLocale"]);
var getTheme = proxy('theme', _theme__WEBPACK_IMPORTED_MODULE_3__["getTheme"]);
var getApps = proxy('apps', _apps__WEBPACK_IMPORTED_MODULE_4__["getApps"]);
var getHomeApp = proxy('apps', _apps__WEBPACK_IMPORTED_MODULE_4__["getHomeApp"]);
var isFetchingApps = proxy('apps', _apps__WEBPACK_IMPORTED_MODULE_4__["isFetchingApps"]);
var isCurrentApp = proxy('apps', _apps__WEBPACK_IMPORTED_MODULE_4__["isCurrentApp"]);
var hasFetched = proxy('apps', _apps__WEBPACK_IMPORTED_MODULE_4__["hasFetched"]);
var getStorageData = proxy('settings', _settings__WEBPACK_IMPORTED_MODULE_5__["getStorageData"]);
var getSettingsAppURL = proxy('settings', _settings__WEBPACK_IMPORTED_MODULE_5__["getSettingsAppURL"]);
var isSettingsBusy = proxy('settings', _settings__WEBPACK_IMPORTED_MODULE_5__["isSettingsBusy"]);
var isFetchingSettings = proxy('settings', _settings__WEBPACK_IMPORTED_MODULE_5__["isFetchingSettings"]);
var getHelpLink = proxy('context', _context__WEBPACK_IMPORTED_MODULE_6__["getHelpLink"]);
var getClaudyActions = proxy('context', _context__WEBPACK_IMPORTED_MODULE_6__["getClaudyActions"]);
var shouldEnableClaudy = proxy('context', _context__WEBPACK_IMPORTED_MODULE_6__["shouldEnableClaudy"]); // realtime handlers

var onRealtimeCreate = _apps__WEBPACK_IMPORTED_MODULE_4__["receiveApp"];
var onRealtimeDelete = _apps__WEBPACK_IMPORTED_MODULE_4__["deleteApp"];
var reducers = {
  content: _content__WEBPACK_IMPORTED_MODULE_1__["reducer"],
  locale: _locale__WEBPACK_IMPORTED_MODULE_2__["reducer"],
  theme: _theme__WEBPACK_IMPORTED_MODULE_3__["reducer"],
  apps: _apps__WEBPACK_IMPORTED_MODULE_4__["default"],
  settings: _settings__WEBPACK_IMPORTED_MODULE_5__["default"],
  context: _context__WEBPACK_IMPORTED_MODULE_6__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(reducers));

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/locale.js":
/*!*****************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/locale.js ***!
  \*****************************************************************/
/*! exports provided: SET_LOCALE, setLocale, reducer, getLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOCALE", function() { return SET_LOCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocale", function() { return setLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocale", function() { return getLocale; });
var SET_LOCALE = 'SET_LOCALE'; // action creator

var setLocale = function setLocale(lang) {
  return {
    type: SET_LOCALE,
    lang: lang
  };
};

var getDefaultLang = function getDefaultLang() {
  return document.documentElement.getAttribute('lang') || 'en';
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultLang();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === SET_LOCALE) {
    return action.lang;
  } else {
    return state;
  }
}; // selector

var getLocale = function getLocale(state) {
  return state;
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/settings.js":
/*!*******************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/settings.js ***!
  \*******************************************************************/
/*! exports provided: LOG_OUT, getStorageData, getSettingsAppURL, isSettingsBusy, isFetchingSettings, fetchSettingsData, logOut, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOG_OUT", function() { return LOG_OUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorageData", function() { return getStorageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettingsAppURL", function() { return getSettingsAppURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSettingsBusy", function() { return isSettingsBusy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFetchingSettings", function() { return isFetchingSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSettingsData", function() { return fetchSettingsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logOut", function() { return logOut; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stack */ "./node_modules/cozy-bar/transpiled/lib/stack.js");




var FETCH_SETTINGS = 'FETCH_SETTINGS';
var FETCH_SETTINGS_BUSY = 'FETCH_SETTINGS_BUSY';
var FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
var RECEIVE_NO_CONTEXT = 'RECEIVE_NO_CONTEXT';
var RECEIVE_STORAGE = 'RECEIVE_STORAGE';
var RECEIVE_SETTINGS_URL = 'RECEIVE_SETTINGS_URL';
var LOG_OUT = 'LOG_OUT';
var BUSY_DELAY = 450; // selectors

var getStorageData = function getStorageData(state) {
  return state.storageData;
};
var getSettingsAppURL = function getSettingsAppURL(state) {
  return state.settingsAppURL;
};
var isSettingsBusy = function isSettingsBusy(state) {
  return state.isBusy;
};
var isFetchingSettings = function isFetchingSettings(state) {
  return state.isFetching;
}; // actions

var fetchStorageData = function fetchStorageData() {
  return /*#__PURE__*/function () {
    var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(dispatch) {
      var storageData;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _stack__WEBPACK_IMPORTED_MODULE_3__["default"].get.storageData();

            case 3:
              storageData = _context.sent;
              return _context.abrupt("return", dispatch({
                type: RECEIVE_STORAGE,
                storageData: storageData
              }));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              // eslint-disable-next-line no-console
              console.warn && console.warn('Cannot get Cozy storage informations');
              return _context.abrupt("return", null);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var fetchSettingsAppURL = function fetchSettingsAppURL() {
  return /*#__PURE__*/function () {
    var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(dispatch, getState) {
      var settingsAppURL;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!getState().settings.settingsAppURL) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", dispatch({
                type: RECEIVE_SETTINGS_URL,
                settingsAppURL: getState().settings.settingsAppURL
              }));

            case 2:
              _context2.prev = 2;
              _context2.next = 5;
              return _stack__WEBPACK_IMPORTED_MODULE_3__["default"].get.settingsAppURL();

            case 5:
              settingsAppURL = _context2.sent;
              return _context2.abrupt("return", dispatch({
                type: RECEIVE_SETTINGS_URL,
                settingsAppURL: settingsAppURL
              }));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              // eslint-disable-next-line no-console
              console.warn('Settings app is unavailable, settings links are disabled');
              return _context2.abrupt("return", null);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 9]]);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var fetchSettingsData = function fetchSettingsData() {
  var displayBusy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return /*#__PURE__*/function () {
    var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(dispatch) {
      var busySpinner;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch({
                type: FETCH_SETTINGS
              }); // put the busy status after BUSY_DELAY secs

              busySpinner = setTimeout(function () {
                // we do not display the busy status in the drawer
                if (displayBusy) dispatch({
                  type: FETCH_SETTINGS_BUSY
                });
              }, BUSY_DELAY);
              _context3.next = 4;
              return dispatch(fetchStorageData());

            case 4:
              _context3.next = 6;
              return dispatch(fetchSettingsAppURL());

            case 6:
              clearTimeout(busySpinner);
              dispatch({
                type: FETCH_SETTINGS_SUCCESS
              });

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }();
};
var logOut = function logOut() {
  return /*#__PURE__*/function () {
    var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(dispatch) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch({
                type: LOG_OUT
              });
              _context4.prev = 1;
              _context4.next = 4;
              return _stack__WEBPACK_IMPORTED_MODULE_3__["default"].logout();

            case 4:
              _context4.next = 9;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](1);
              // eslint-disable-next-line no-console
              console.warn('Error while logging out in the cozy-bar', _context4.t0);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 6]]);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
}; // reducers

var defaultState = {
  contextNotExist: false,
  isFetching: false,
  isBusy: false,
  settingsAppURL: null,
  storageData: null
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_SETTINGS:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        isFetching: true
      });

    case FETCH_SETTINGS_BUSY:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        isBusy: true
      });

    case FETCH_SETTINGS_SUCCESS:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        isFetching: false,
        isBusy: false
      });

    case RECEIVE_NO_CONTEXT:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        contextNotExist: true
      });

    case RECEIVE_STORAGE:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        storageData: action.storageData
      });

    case RECEIVE_SETTINGS_URL:
      return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, state, {
        settingsAppURL: action.settingsAppURL
      });

    case LOG_OUT:
      return defaultState;

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/reducers/theme.js":
/*!****************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/reducers/theme.js ***!
  \****************************************************************/
/*! exports provided: setTheme, getDefaultTheme, reducer, getTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTheme", function() { return setTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultTheme", function() { return getDefaultTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return getTheme; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);

var SET_THEME = 'SET_THEME';
var DEFAULT_THEME = 'default';
var PRIMARY_THEME = 'primary';
var THEMES = [DEFAULT_THEME, PRIMARY_THEME];
var EMPTY_OVERRIDES = {}; // Theme state is { name, overrides }
// where both have the form described in `setTheme`

var DEFAULT_STATE = {
  name: DEFAULT_THEME,
  overrides: EMPTY_OVERRIDES
};
/**
 * Change the cozy-bar theme
 *
 * Today, the value 'primary' will change the background color
 * of the bar in the mobile view. It will then use the
 * `--primaryColor` CSS variable and the `--primaryContrastTextColor`
 * for the text.
 *
 * @function
 * @param {String} name - either 'default' or 'primary'
 * @param {Object} overrides - overrides of default values for the theme
 *                             default to an empty object (no overrides)
 *                             It will only overrides the values for the
 *                             'primary' specific theme/view
 * @param {Object} overrides.primaryColor - the background color
 * @param {Object} overrides.primaryContrastTextColor - the text color
 * @returns {Object} action `{ type: SET_THEME, theme: {name, overrides} }
 */

var setTheme = function setTheme(name) {
  var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EMPTY_OVERRIDES;
  return {
    type: SET_THEME,
    theme: {
      name: name,
      overrides: overrides
    }
  };
};
var getDefaultTheme = function getDefaultTheme() {
  return DEFAULT_STATE;
};
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultTheme();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === SET_THEME) {
    if (THEMES.includes(action.theme.name)) {
      return action.theme;
    }

    return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, action.theme, {
      name: DEFAULT_THEME
    });
  } else {
    return state;
  }
}; // selector

var getTheme = function getTheme(state) {
  return state;
};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/stack-client.js":
/*!**************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/stack-client.js ***!
  \**************************************************************/
/*! exports provided: compareClientVersion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareClientVersion", function() { return compareClientVersion; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var semver_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semver-compare */ "./node_modules/semver-compare/index.js");
/* harmony import */ var semver_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semver_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cozy_interapp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cozy-interapp */ "./node_modules/cozy-interapp/dist/index.js");
/* harmony import */ var cozy_interapp__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cozy_interapp__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon */ "./node_modules/cozy-bar/transpiled/lib/icon.js");
/* harmony import */ var _realtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./realtime */ "./node_modules/cozy-bar/transpiled/lib/realtime.js");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./exceptions */ "./node_modules/cozy-bar/transpiled/lib/exceptions.js");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cozy-device-helper */ "./node_modules/cozy-device-helper/dist/index.js");
/* harmony import */ var cozy_device_helper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cozy_device_helper__WEBPACK_IMPORTED_MODULE_7__);



/* eslint-env browser */






var errorStatuses = {
  '401': _exceptions__WEBPACK_IMPORTED_MODULE_6__["UnauthorizedStackException"],
  '403': _exceptions__WEBPACK_IMPORTED_MODULE_6__["ForbiddenException"],
  '404': _exceptions__WEBPACK_IMPORTED_MODULE_6__["NotFoundException"],
  '405': _exceptions__WEBPACK_IMPORTED_MODULE_6__["MethodNotAllowedException"],
  '500': _exceptions__WEBPACK_IMPORTED_MODULE_6__["ServerErrorException"]
};
/**
 * Cozy client instance
 * @private
 */

var cozyClient;
/**
 * Get the client instance
 *
 * @private
 * @function
 * @returns {Object} cozy-client instance
 */

var getIntents = function getIntents() {
  return new cozy_interapp__WEBPACK_IMPORTED_MODULE_3__["Intents"]({
    client: cozyClient
  });
};
/**
 * Get the stackClient from the cozy-client instance
 *
 * @private
 * @function
 * @returns {Object} cozy-stack-client instance
 */


var getStackClient = function getStackClient() {
  return cozyClient.getStackClient();
};
/**
 * Logout and disconnect the user
 * @function
 * @TODO move this to cozy-stack-client
 * @returns {Promise}
 */


var logout = function logout() {
  return getStackClient().fetch('DELETE', '/auth/login').then(function (resp) {
    if (resp.status === 401) {
      throw new _exceptions__WEBPACK_IMPORTED_MODULE_6__["UnauthorizedStackException"]();
    } else if (resp.status === 204) {
      window.location.reload();
    }

    return true;
  }).catch(function () {
    throw new _exceptions__WEBPACK_IMPORTED_MODULE_6__["UnavailableStackException"]();
  });
};
/**
 * Get a cozy URL object
 *
 * @function
 * @returns {URL}
 */


var getCozyURL = function getCozyURL() {
  return new URL(getStackClient().uri);
};
/**
 * Get a the cozy origin as an URL string
 *
 * @function
 * @returns {string}
 */


var getCozyURLOrigin = function getCozyURLOrigin() {
  return getCozyURL().origin;
};
/**
 * @deprecated
 * @private
 */


var updateAccessToken = function updateAccessToken() {
  throw new Error('updateAccessToken should not be used with a cozy-client instance initialization');
};
/**
 * Fetch a resource with cozy-client
 *
 * Utility to maintain the compatibility with the legacy
 * standalone cozy-bar client
 *
 * @function
 * @private
 * @returns {Promise} the full raw JSON payload
 */


var fetchJSON = function fetchJSON(method, path, body) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // We mirror here a few lines from cozy-stack-client
  // because we want a customized fetchJSON
  var headers = options.headers = options.headers || {};
  headers['Accept'] = 'application/json';

  if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }
  }

  return getStackClient().fetch(method, path, body, options).then(function (resp) {
    if (typeof errorStatuses[resp.status] === 'function') {
      throw new errorStatuses[resp.status]();
    }

    var contentType = resp.headers.get('content-type');
    var isJson = contentType.includes('json');

    if (!isJson) {
      throw new Error('Server response not in JSON');
    }

    return resp.json();
  });
};
/**
 * Test if an error is from an HTTP 404
 *
 * @function
 * @private
 * @param {Function} error - received from a fetch
 * @returns {boolean}
 */


var is404 = function is404(error) {
  return ['NotFoundException', 'NotFound', 'FetchError'].includes(error.name) && error.status && error.status === 404;
};
/**
 * Memoize the result of a function which does an HTTP fetch
 *
 * If a call throws an error because the
 * underlying HTTP request returned a 404
 * then this function returns a default value
 *
 * In the absence of any other error, the result is
 * cached and reused in the next call to the function.
 *
 *
 * @function
 * @param {Function} fn - the function to memoize. It will be
 *                        called without any parameter
 * @param {Object} defaultValue - returned in case of 404
 * @returns {Function} async function
 */


var withCache = function withCache(fn, defaultValue) {
  var cache = undefined;
  return /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(cache === undefined)) {
              _context.next = 10;
              break;
            }

            _context.prev = 1;
            _context.next = 4;
            return fn();

          case 4:
            cache = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            cache = is404(_context.t0) ? defaultValue : undefined;

          case 10:
            return _context.abrupt("return", cache);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));
};
/**
 * List all installed applications
 *
 * Returns only the `data` key of the
 * whole JSON payload from the server
 *
 * @function
 * @returns {Promise}
 */


var getApps = function getApps() {
  return fetchJSON('GET', '/apps/').then(function (json) {
    if (json.error) {
      throw new Error(json.error);
    }

    return json.data;
  });
};
/**
 * Detail of an installed application by its slug
 *
 * Returns only the `data` key of the
 * whole JSON payload from the server
 *
 * @function
 * @param {string} slug
 * @returns {Promise}
 */


var getApp = function getApp(slug) {
  if (!slug) {
    throw new Error('Missing slug');
  }

  return fetchJSON('GET', "/apps/".concat(slug)).then(function (json) {
    if (json.error) {
      throw new Error(json.error);
    }

    return json.data;
  });
};
/**
 * default value when no quota is provided
 * @private
 */


var defaultQuota = Math.pow(10, 12); // 1 Tera

/**
 * Get storage and quota usage
 *
 * When no quota is returned by the server
 * the quota used is the larger between
 * `defaultQuota` and 10 * usage
 *
 * @function
 * @returns {Object} {usage, quota, isLimited}
 */

var getStorageData = function getStorageData() {
  return fetchJSON('GET', '/settings/disk-usage').then(function (json) {
    // parseInt because responses from the server are in text
    var usage = parseInt(json.data.attributes.used, 10);
    var realQuota = parseInt(json.data.attributes.quota, 10); // @TODO this is a workaround, we should certainly do smarter
    // and either not requiring this attribute
    // or set it to something more real

    var quota = realQuota || Math.max(defaultQuota, 10 * usage);
    var isLimited = json.data.attributes.is_limited;
    return {
      usage: usage,
      quota: quota,
      isLimited: isLimited
    };
  }).catch(function () {
    throw new _exceptions__WEBPACK_IMPORTED_MODULE_6__["UnavailableStackException"]();
  });
};
/**
 * Fetch an icon data from its path
 *
 * The purpose of this function is to be sent
 * to AppIcon components for mobile devices.
 *
 * @private
 * @function
 * @param {string} iconPath - path of the icon in the stack
 * @returns {Blob}
 */


var iconFetcher = function iconFetcher(iconPath) {
  return getStackClient().fetch('GET', iconPath);
};
/**
 * Get a props object that can be sent to an AppIcon component
 *
 * Mobile devices and web browsers need different props
 *
 * @function
 * @returns {Object}
 */


var getAppIconProps = function getAppIconProps() {
  var mobileAppIconProps = {
    fetchIcon: function fetchIcon(app) {
      return Object(_icon__WEBPACK_IMPORTED_MODULE_4__["default"])(iconFetcher, app, true);
    }
  };
  var browserAppIconProps = {
    // we mustn't give the protocol here
    domain: getCozyURL().host,
    secure: getCozyURL().protocol === 'https:'
  };
  return Object(cozy_device_helper__WEBPACK_IMPORTED_MODULE_7__["isMobileApp"])() ? mobileAppIconProps : browserAppIconProps;
};
/**
 * Get settings context
 *
 * @function
 * @return {Promise}
 * @see https://docs.cozy.io/en/cozy-stack/settings/#get-settingscontext
 */


var getContext = function getContext() {
  return fetchJSON('GET', '/settings/context');
};
/**
 * Fetch a resource on the cozy stack
 * with a prototype compatible with the legacy cozy-client-js
 *
 * @function
 * @param {object} cozy - cozy-client-js
 * @param {string} method - HTTP method
 * @param {string} path
 * @param {object} body
 * @returns {Promise}
 */


var cozyFetchJSON = function cozyFetchJSON(cozy, method, path, body) {
  return fetchJSON(method, path, body).then(function (json) {
    var responseData = Object.assign({}, json.data);

    if (responseData.id) {
      responseData._id = responseData.id;
    }

    return responseData;
  });
};

var getSettingsAppURL = function getSettingsAppURL() {
  return getApp('settings').then(function (settings) {
    if (!settings) {
      throw new _exceptions__WEBPACK_IMPORTED_MODULE_6__["UnavailableSettingsException"]();
    }

    return settings.links.related;
  });
};
/**
 *
 * @param {cozyClient} forcedCozyClient only used to test purpose
 *
 * We can not read `version` from `import CozyClient from cozy-client`
 * since in that case, we'll read version from the cozy-bar node modules
 * and not from the app one.
 *
 * In order to avoid this issue, we get the instance passed by the app to the bar),
 * then read the constructor and then read the version from it
 */


var compareClientVersion = function compareClientVersion(targetVersion) {
  var forcedCozyClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var usedClient = cozyClient ? cozyClient.constructor : {};
  var cozyClientToUse = forcedCozyClient !== null ? forcedCozyClient : usedClient;
  if (!cozyClientToUse.version) return false;
  var result = semver_compare__WEBPACK_IMPORTED_MODULE_2___default()(cozyClientToUse.version, targetVersion);
  return result >= 0;
};
/**
 * Initializes the functions to call the cozy stack
 *
 * @function
 * @param {Object}  arg
 * @param {Object}  arg.cozyClient - a cozy client instance
 * @param {Function} arg.onCreate
 * @param {Function} arg.onDelete
 * @returns {Promise}
 */


var init = function init(_ref2) {
  var client = _ref2.cozyClient,
      onCreate = _ref2.onCreate,
      onDelete = _ref2.onDelete;
  cozyClient = client;
  if (!cozyClient.isLogged) return;
  Object(_realtime__WEBPACK_IMPORTED_MODULE_5__["default"])({
    getApp: getApp,
    onCreate: onCreate,
    onDelete: onDelete,
    cozyClient: cozyClient
  });
};


/* harmony default export */ __webpack_exports__["default"] = ({
  get: {
    app: getApp,
    apps: getApps,
    context: withCache(getContext, {}),
    storageData: getStorageData,
    iconProps: getAppIconProps,
    cozyURL: getCozyURLOrigin,
    intents: getIntents,
    settingsAppURL: getSettingsAppURL
  },
  updateAccessToken: updateAccessToken,
  cozyFetchJSON: cozyFetchJSON,
  logout: logout,
  init: init
});

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/stack.js":
/*!*******************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/stack.js ***!
  \*******************************************************/
/*! exports provided: default, cozyFetchJSON, getIntents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cozyFetchJSON", function() { return cozyFetchJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIntents", function() { return getIntents; });
/* harmony import */ var _stack_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stack-client */ "./node_modules/cozy-bar/transpiled/lib/stack-client.js");
/**
 * This file served as a proxy between the old internal stack client from the
 * bar and the new stack-client included in cozy-client. It is no longer
 * necessary as there is no more internal-client. It is there only temporarily
 * and should be removed as soon as possible.
 *
 * @TODO remove this and update the tests.
 */

/**
 * Reference to the current client depending
 * on which one has been initialized
 *
 * @private
 */

var stack;
/**
 * Get the current stack client (legacy or cozy-client based)
 * based on which one has been initialized
 *
 * @returns {Object} functions to call the stack
 */

var current = function current() {
  if (!stack) {
    throw new Error('client not initialized in cozy-bar');
  }

  return stack;
};
/**
 * Initializes the functions to call the cozy stack
 *
 * It can be initialized either with a cozy-client instance
 * or a { cozyURL, ssl, token } tupple.
 *
 * @function
 * @param {Object}  arg
 * @param {Object}  arg.cozyClient - a cozy client instance
 * @param {string}  arg.cozyURL - URL or domain of the stack
 * @param {boolean} arg.ssl     - Tells if we should use a secure protocol
 *                            required if cozyURL does not have a protocol
 * @param {string}  arg.token   - Access token for the stack
 * @param {Function} arg.onCreateApp
 * @param {Function} arg.onDeleteApp
 * @param {Boolean} arg.isPublic
 * @returns {Promise}
 */


var init = function init(options) {
  stack = _stack_client__WEBPACK_IMPORTED_MODULE_0__["default"];
  return stack.init(options);
};

var get = {
  app: function app() {
    var _current$get;

    return (_current$get = current().get).app.apply(_current$get, arguments);
  },
  apps: function apps() {
    var _current$get2;

    return (_current$get2 = current().get).apps.apply(_current$get2, arguments);
  },
  context: function context() {
    var _current$get3;

    return (_current$get3 = current().get).context.apply(_current$get3, arguments);
  },
  storageData: function storageData() {
    var _current$get4;

    return (_current$get4 = current().get).storageData.apply(_current$get4, arguments);
  },
  iconProps: function iconProps() {
    var _current$get5;

    return (_current$get5 = current().get).iconProps.apply(_current$get5, arguments);
  },
  cozyURL: function cozyURL() {
    var _current$get6;

    return (_current$get6 = current().get).cozyURL.apply(_current$get6, arguments);
  },
  settingsAppURL: function settingsAppURL() {
    var _current$get7;

    return (_current$get7 = current().get).settingsAppURL.apply(_current$get7, arguments);
  }
};
var stackProxy = {
  init: init,
  get: get,
  updateAccessToken: function updateAccessToken() {
    var _current;

    return (_current = current()).updateAccessToken.apply(_current, arguments);
  },
  logout: function logout() {
    var _current2;

    return (_current2 = current()).logout.apply(_current2, arguments);
  },
  cozyFetchJSON: function cozyFetchJSON() {
    var _current3;

    return (_current3 = current()).cozyFetchJSON.apply(_current3, arguments);
  },
  // useful to connect some getters outside of this file without exposing
  // directly the private stack variable
  getStack: current,
  getIntents: function getIntents() {
    return current().get.intents();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (stackProxy);
var cozyFetchJSON = stackProxy.cozyFetchJSON,
    getIntents = stackProxy.getIntents;


/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/lib/store/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/lib/store/index.js ***!
  \*************************************************************/
/*! exports provided: createStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _middlewares_appsI18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middlewares/appsI18n */ "./node_modules/cozy-bar/transpiled/lib/middlewares/appsI18n.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-persist */ "./node_modules/cozy-bar/node_modules/redux-persist/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers */ "./node_modules/cozy-bar/transpiled/lib/reducers/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux-persist/lib/storage */ "./node_modules/cozy-bar/node_modules/redux-persist/lib/storage/index.js");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config_persistWhitelist_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../config/persistWhitelist.json */ "./node_modules/cozy-bar/transpiled/config/persistWhitelist.json");
var _config_persistWhitelist_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../config/persistWhitelist.json */ "./node_modules/cozy-bar/transpiled/config/persistWhitelist.json", 1);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../logger */ "./node_modules/cozy-bar/transpiled/lib/logger.js");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cozy-flags */ "./node_modules/cozy-flags/dist/index.js");
/* harmony import */ var cozy_flags__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(cozy_flags__WEBPACK_IMPORTED_MODULE_10__);











var config = {
  storage: redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7___default.a,
  key: 'cozy-bar',
  whitelist: _config_persistWhitelist_json__WEBPACK_IMPORTED_MODULE_8__
};
var loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_6__["createLogger"])({
  logger: _logger__WEBPACK_IMPORTED_MODULE_9__["default"]
});
var reducer = Object(redux_persist__WEBPACK_IMPORTED_MODULE_4__["persistCombineReducers"])(config, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, _reducers__WEBPACK_IMPORTED_MODULE_5__["reducers"]));
var middlewares = [_middlewares_appsI18n__WEBPACK_IMPORTED_MODULE_2__["default"], redux_thunk__WEBPACK_IMPORTED_MODULE_3__["default"]];

if (cozy_flags__WEBPACK_IMPORTED_MODULE_10___default()('bar.debug')) {
  middlewares.push(loggerMiddleware);
}

var createStore = function createStore() {
  store = Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(reducer, redux__WEBPACK_IMPORTED_MODULE_1__["applyMiddleware"].apply(null, middlewares));
  Object(redux_persist__WEBPACK_IMPORTED_MODULE_4__["persistStore"])(store);
  return store;
};
var store;

var getOrCreateStore = function getOrCreateStore() {
  if (!store) {
    store = createStore();
  }

  return store;
};

/* harmony default export */ __webpack_exports__["default"] = (getOrCreateStore);

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/locales/en.json":
/*!**********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/locales/en.json ***!
  \**********************************************************/
/*! exports provided: drawer, profile, connectedDevices, storage, storage_phrase, view_offers, view_my_offer, help, logout, soon, error_UnavailableStack, error_UnauthorizedStack, no_apps, menu, Categories, claudy, searchbar, permsModal, comingSoon, banner, default */
/***/ (function(module) {

module.exports = {"drawer":"Show menu drawer","profile":"Profile","connectedDevices":"Connected devices","storage":"Storage","storage_phrase":"%{diskUsage} GB of %{diskQuota} GB used","view_offers":"View offers","view_my_offer":"My offer","help":"Help","logout":"Sign out","soon":"soon","error_UnavailableStack":"The stack is unreachable (connection timed-out).","error_UnauthorizedStack":"Some permissions are missing, the application can't access the requested resource on the stack.","no_apps":"No applications found on the Cozy.","menu":{"apps":"Apps","settings":"Settings","home_mobile":"Back to home...","home":"Back to home","home_title":"Home"},"Categories":{"cozy":"Cozy apps","partners":"Partners apps","ptnb":"expPTNB","others":"Other apps"},"claudy":{"title":"How to drive your Cozy?"},"searchbar":{"placeholder":"Search anything","empty":"No result has been found for the query “%{query}”"},"permsModal":{"title":"Access your whole Cozy from your application","description":"Authorize %{app} to display your Cozy applications on this device","button":"Authorize access"},"comingSoon":{"store":{"title":"The Store application will be available soon in your Cozy.","description":"Thanks to Cozy Store you will be able to install the applications that you want in your Cozy."}},"banner":{"tos-updated":{"description":"To comply with the GDPR, Cozy Cloud has updated its Terms of Services that have taken effect on May 25, 2018","CTA":"Read now"}}};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/locales/es.json":
/*!**********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/locales/es.json ***!
  \**********************************************************/
/*! exports provided: drawer, profile, connectedDevices, storage, storage_phrase, view_offers, view_my_offer, help, logout, soon, error_UnavailableStack, error_UnauthorizedStack, no_apps, menu, Categories, claudy, searchbar, permsModal, comingSoon, banner, default */
/***/ (function(module) {

module.exports = {"drawer":"Mostrar el menu lateral","profile":"Perfil","connectedDevices":"Aparatos conectados","storage":"Espacio en el disco","storage_phrase":"%{diskUsage} Go de %{diskQuota} Go","view_offers":"Ver ofertas","view_my_offer":"Mi oferta","help":"Ayuda","logout":"Desconectar","soon":"pronto","error_UnavailableStack":"Conexión a la stack imposible ( se agotó el tiempo para la conexión ).","error_UnauthorizedStack":"Faltan algunos permisos, la aplicación no puede acceder a los recursos solicitados.","no_apps":"No se han encontrado aplicaciones en su Cozy.","menu":{"apps":"Aplicaciones","settings":"Parámetros","home_mobile":"Regresar a Inicio...","home":"Regresar a Inicio","home_title":"Inicio"},"Categories":{"cozy":"Aplicaciones Cozy","partners":"Aplicaciones de asociados","ptnb":"expPTNB","others":"Otras aplicaciones"},"claudy":{"title":"¿Cómo utilizar su Cozy?"},"searchbar":{"placeholder":"Buscar","empty":"No se ha encontrado ningún resultado para su consulta “%{query}”"},"permsModal":{"title":"Acceder a su Cozy desde su aplicación","description":"Autorizar a %{app} para mostrar sus aplicaciones Cozy en este aparato","button":"Autorizar el acceso"},"comingSoon":{"store":{"title":"En breve, la aplicación Store estará disponible en su Cozy","description":"Gracias a Cozy Store usted podrá instalar en su Cozy las aplicaciones que desee."}},"banner":{"tos-updated":{"description":"Para cumplir con el RGPD, Cozy Cloud ha actualizado sus Condiciones de utilización que entraron en vigor desde el 25 de mayo de 2018.","CTA":"Leerlo ahora"}}};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/locales/fr.json":
/*!**********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/locales/fr.json ***!
  \**********************************************************/
/*! exports provided: drawer, profile, connectedDevices, storage, storage_phrase, view_offers, view_my_offer, help, logout, soon, error_UnavailableStack, error_UnauthorizedStack, no_apps, menu, Categories, claudy, searchbar, permsModal, comingSoon, banner, default */
/***/ (function(module) {

module.exports = {"drawer":"Afficher le menu latéral","profile":"Profil","connectedDevices":"Appareils connectés","storage":"Espace disque","storage_phrase":"%{diskUsage} Go sur %{diskQuota} Go","view_offers":"Voir les offres","view_my_offer":"Mon offre","help":"Aide","logout":"Déconnexion","soon":"à venir","error_UnavailableStack":"Connexion à la stack impossible (connection timed-out)","error_UnauthorizedStack":"Des permissions sont manquante, l'application ne peut accéder aux ressources demandées.","no_apps":"Pas d'applications Cozy trouvées.","menu":{"apps":"Applications","settings":"Paramètres","home_mobile":"Retour à l'accueil...","home":"Retour à l'accueil","home_title":"Accueil "},"Categories":{"cozy":"Apps Cozy","partners":"Expérimentation MesInfos","ptnb":"Expérimentation Carnet du logement","others":"Autres apps"},"claudy":{"title":"Comment utiliser votre Cozy ?"},"searchbar":{"placeholder":"Rechercher","empty":"Aucun résultat trouvé pour la requête \"%{query}\""},"permsModal":{"title":"Accéder à ton Cozy à partir de ton application","description":"Autoriser %{app} à afficher les applications de ton Cozy sur cet appareil","button":"Autoriser l'accès"},"comingSoon":{"store":{"title":"L'application Store sera bientôt disponible dans votre Cozy","description":"Grâce à cozy Store vous pourrez installer les applications que vous souhaitez sur votre Cozy."}},"banner":{"tos-updated":{"description":"Dans le cadre du RGPD, Cozy Cloud met à jour ses Conditions Générales d'Utilisation qui ont pris effet le 25 Mai 2018","CTA":"Lire maintenant"}}};

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/proptypes/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/proptypes/index.js ***!
  \*************************************************************/
/*! exports provided: appShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appShape", function() { return appShape; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var appShape = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  slug: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  namePrefix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  comingSoon: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  href: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  links: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    icon: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
  })
});

/***/ }),

/***/ "./node_modules/cozy-bar/transpiled/queries/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/cozy-bar/transpiled/queries/index.js ***!
  \***********************************************************/
/*! exports provided: instanceReq, contextReq, diskUsageReq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instanceReq", function() { return instanceReq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextReq", function() { return contextReq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diskUsageReq", function() { return diskUsageReq; });
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cozy-client */ "./node_modules/cozy-client/dist/index.js");
/* harmony import */ var cozy_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_0__);

var instanceReq = {
  query: function query() {
    return Object(cozy_client__WEBPACK_IMPORTED_MODULE_0__["Q"])('io.cozy.settings').getById('instance');
  },
  as: 'instanceQuery'
};
var contextReq = {
  query: function query() {
    return Object(cozy_client__WEBPACK_IMPORTED_MODULE_0__["Q"])('io.cozy.settings').getById('context');
  },
  as: 'contextQuery'
};
var diskUsageReq = {
  query: function query() {
    return Object(cozy_client__WEBPACK_IMPORTED_MODULE_0__["Q"])('io.cozy.settings').getById('disk-usage');
  },
  as: 'diskUsageQuery'
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/cozy-bar/transpiled/cozy-bar.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/cozy-bar/transpiled/cozy-bar.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "[role=banner] .coz-sep-flex {\n  margin: 0;\n  border: none;\n  flex: 1 0;\n}\n\n[role=banner] .blurry {\n  opacity: .5;\n  filter: blur(5px);\n}\n\n[role=banner] [data-icon] {\n  background-repeat: no-repeat;\n  background-position: 0 50%;\n  padding-left: calc(16px + .5em);\n}\n\n[role=banner] .u-flex-grow {\n  display: flex;\n  flex-grow: 1;\n}\n\n/* Spinner */\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n\n/* Progress bar */\n[role=banner] progress[value] {\n  /* Reset the default appearance */\n  appearance: none;\n  background-color: var(--paleGrey);\n  border: solid 1px var(--silver);\n  border-radius: 2px;\n  color: var(--dodgerBlue);\n}\n\n[role=banner] progress[value]::-webkit-progress-bar {\n  background: var(--paleGrey);\n  border-radius: 2px;\n}\n\n[role=banner] progress[value]::-webkit-progress-value {\n  background: var(--dodgerBlue);\n  border-radius: 1px;\n}\n\n[role=banner] progress[value]::-moz-progress-bar {\n  background: var(--dodgerBlue);\n  border-radius: 1px;\n}\n\n/* Errors */\n[role=banner] .coz-nav--error {\n  margin: 0 0 .1em 0;\n  font-weight: normal;\n  font-size: .875em;\n  color: var(--pomegranate);\n}\n\n/* Claudy loading */\n[role=banner] .coz-claudy [data-claudy-loading=true]::before {\n  position: absolute;\n  content: '';\n  width: 100%;\n  height: 100%;\n  bottom: 0;\n  right: 0;\n  background: none;\n  border-radius: 100%;\n  border: .2em solid var(--scienceBlue);\n  border-right: .2em solid white;\n  box-sizing: border-box;\n  animation: 1s linear infinite spin;\n}\n\n[role=banner] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: var(--z-index-bar);\n  display: flex;\n  align-items: stretch;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 3em;\n  font-family: Lato, sans-serif;\n  font-size: 1rem;\n}\n\n@media (min-width: 64rem) {\n  [role=banner] {\n    position: relative;\n  }\n}\n\n[role=banner] .coz-bar-wrapper {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n[role=banner] .coz-bar-container {\n  display: flex;\n  height: 3rem;\n  width: 100%;\n  padding: 0 1.25em 0 1em;\n  box-sizing: border-box;\n}\n\n@media (max-width: 48em) {\n  [role=banner] .coz-bar-container {\n    padding: 0 1em 0 0;\n  }\n}\n\n[role=banner] .coz-bar-title {\n  display: flex;\n  margin: 0;\n  align-items: center;\n  min-width: 8em;\n  font-size: 1.5em;\n  font-weight: normal;\n  color: var(--charcoalGrey);\n}\n\n@media (max-width: 48em) {\n  [role=banner] .coz-bar-title {\n    font-size: 1.25em\n  }\n}\n\n[role=banner] .coz-bar-title img {\n  margin-right: .45em;\n}\n\n[role=banner] .coz-bar-title span {\n  margin-right: .25em;\n}\n\n[role=banner] .coz-bar-title strong {\n  font-weight: bold;\n}\n\n@media (max-width: 30em) {\n  [role=banner] .coz-bar-hide-sm {\n    display: none;\n  }\n\n  [role=banner] .coz-bar-title strong {\n    padding: 0;\n    text-transform: capitalize;\n  }\n}\n\n[role=banner] .coz-bar-btn {\n  padding: 0;\n  border: none;\n  background-color: transparent;\n  background-position: center;\n  flex: 0 0 2.5rem;\n  cursor: pointer;\n}\n\n[role=banner] .coz-bar-burger {\n  margin-right: 0.25em;\n}\n\n@media (min-width: 48.0625em) {\n  [role=banner] .coz-bar-burger,\n  [role=banner] .coz-drawer-wrapper {\n    display: none;\n  }\n}\n\n\n@media (max-width: 48em) {\n  [role=banner] .coz-bar-hide-sm {\n    display: none;\n  }\n}\n\n@media (max-width: 63.9375rem) {\n  .has-banner [role=application] .o-layout-2panes:before {\n    height: 6rem;\n  }\n\n  [role=banner] .coz-bar-banner {\n    font-size: 14px;\n    transition: none;\n    transition-delay: none;\n  }\n\n  [role=banner] .coz-bar-banner-button {\n    max-width: 7rem;\n  }\n}\n\n@media (max-width: 30rem) {\n  .has-banner [role=application] .o-layout-2panes:before {\n    height: 7rem;\n  }\n\n  [role=banner] .coz-bar-banner {\n    height: auto;\n    font-size: 13px;\n  }\n}\n\n@media (max-width: 18rem) {\n  .has-banner [role=application] .o-layout-2panes:before {\n    height: 8rem;\n  }\n}\n\n[role=banner] .coz-bar-banner.unmounted {\n  height: 0;\n}\n\n[role=banner] .coz-bar-banner {\n  display: flex;\n  background: var(--dodgerBlue);\n  box-sizing: border-box;\n  width: 100%;\n  height: 3rem;\n  padding: 0 1rem 0 1rem;\n  justify-content: space-between;\n  align-items: center;\n  color: white;\n  overflow: hidden;\n  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12), 0 0 4px 0 rgba(0, 0, 0, 0.06);\n  transition: height 1s;\n  transition-delay: 1s;\n}\n\n[role=banner] .coz-bar-banner-button,\n[role=banner] .coz-bar-banner-button:hover,\n[role=banner] .coz-bar-banner-button:visited\n[role=banner] .coz-bar-banner-button:active\n[role=banner] .coz-bar-banner-button:focus {\n  border-color: white!important;\n  min-height: 2rem;\n  height: 2rem;\n  flex-shrink: 0;\n  max-width: 10rem;\n}\n\n[role=banner] .coz-nav {\n  display: flex;\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n  position: relative;\n}\n\n@media (max-width: 48em) {\n  [role=banner] .coz-nav {\n    display: none;\n  }\n}\n\n[role=banner] [aria-controls][aria-busy]::after {\n  position: relative;\n  top: .12em;\n  margin: 0 .355em;\n  font-size: .875em;\n}\n\n[role=banner] [aria-controls][aria-busy=true] {\n  padding-right: 0;\n}\n\n[role=banner] .coz-nav [aria-controls][data-icon] {\n  padding-left: calc(1.25em + 16px + .5em);\n  background-position: 1em calc(50% - 1px);\n}\n\n/* POP */\n[role=banner] .coz-nav-pop[aria-hidden=true] {\n  display: flex;\n  transform: scale(0);\n  opacity: 0;\n  transition: .2s transform ease-in, .1s opacity ease-in;\n}\n\n[role=banner] .coz-nav-pop {\n  position: absolute;\n  top: calc(100% - .25em);\n  box-sizing: border-box;\n  min-width: 100%;\n  max-height: calc(100vh - 4rem);\n  overflow-y: auto;\n  background-color: #fff;\n  border-radius: 8px;\n  border: solid 1px rgba(50, 54, 63, 0.12);\n  box-shadow: 0 1px 3px 0 rgba(50, 54, 63, 0.19), 0 6px 18px 0 rgba(50, 54, 63, 0.19);\n  opacity: 1;\n  transform: scale(1);\n  transform-origin: 80% 0%;\n  transition: .2s transform cubic-bezier(0.2, 0.75, 0.3, 1.15);\n  /* hide scrollbars */\n  -ms-overflow-style: none;  /* IE 10+ */\n}\n\n[role=banner] .coz-nav-pop::-webkit-scrollbar {\n  display: none; /* Safari and Chrome */\n}\n\n[role=banner] .coz-nav-pop-content .coz-nav-group {\n  padding: 0;\n  margin: 0;\n}\n\n[role=banner] .coz-nav-pop-content .coz-nav-group:last-of-type {\n  border-radius: 0 0 8px 8px;\n}\n\n[role=banner] .coz-nav-pop-content .coz-nav-group:first-of-type {\n  border-radius: 8px 8px 0 0;\n}\n\n[role=banner] .coz-nav-pop .coz-nav-group {\n  border-bottom: solid 1px var(--silver);\n}\n\n[role=banner] .coz-nav-pop .coz-nav-group:last-child {\n  border: 0;\n}\n\n/* Force pointer on clickable elements*/\n[role=banner] a[role=menuitem],\n[role=banner] button[role=menuitem] {\n  cursor: pointer;\n  border-left: 4px solid transparent;\n}\n\n[role=banner] a[role=menuitem]:hover,\n[role=banner] a[role=menuitem]:focus,\n[role=banner] button[role=menuitem]:hover,\n[role=banner] button[role=menuitem]:focus {\n  background-color: var(--paleGrey);\n}\n\n[role=banner] [role=menuitem][aria-busy=true]::after {\n  right: 1.5em;\n  top: .5em;\n}\n\n[role=banner] .coz-drawer-wrapper [role=menuitem][aria-busy=true]::after {\n  top: .8em;\n}\n\n/* nav group */\n\n[role=banner] .coz-nav-group.coz-nav--error {\n  padding: 0.75em;\n  min-width: 20em;\n}\n\n[role=banner] div[role=menuitem]:not([data-icon]) {\n  margin: 0;\n  padding-left: 1.5em;\n}\n\n[role=banner] .coz-nav-apps-btns {\n  display: flex;\n  align-items: center;\n  font-size: 1rem;\n  text-decoration: none;\n  border: none;\n  background-color: transparent;\n  line-height: 1rem;\n}\n\n[role=banner] .coz-nav-apps-btns-main {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 3rem;\n  margin: 0 .75rem;\n  padding: 0;\n  background-color: transparent;\n  border: none;\n  color: black;\n  font-size: 1rem;\n}\n\n[role=banner] .coz-nav-apps-btns-main:hover,\n[role=banner] .coz-nav-apps-btns-main:focus,\n[role=banner] .coz-nav-apps-btns-main:active {\n  cursor: pointer;\n  color: black;\n}\n\n[role=banner] .coz-nav-apps-btns-main[disabled]:hover,\n[role=banner] .coz-nav-apps-btns-main[disabled]:focus,\n[role=banner] .coz-nav-apps-btns-main[disabled]:active {\n  cursor: default;\n}\n\n[role=banner] .coz-nav-app-name {\n  margin: 0 .4rem;\n  font-weight: bold;\n}\n\n[role=banner] .coz-nav-apps-btns-sep {\n  height: 1.75rem;\n  background-color: #d8d8d8;\n  width: 1px;\n}\n\n[role=banner] .coz-nav-apps-btns-home {\n  width: 2rem;\n  height: 2rem;\n  margin-right: .75rem;\n}\n\n[role=banner] .coz-nav-apps-btns-home-svg {\n  max-width: 2rem;\n  max-height: 2rem;\n}\n\n[role=banner] .coz-nav-apps-btns-home,\n[role=banner] .coz-nav-apps-btns-home[href]:visited {\n  color: var(--dodgerBlue);\n}\n\n[role=banner] .coz-nav-apps-btns-home[href]:hover,\n[role=banner] .coz-nav-apps-btns-home[href]:active,\n[role=banner] .coz-nav-apps-btns-home[href]:focus {\n  color: var(--scienceBlue);\n}\n\n[role=banner] .coz-nav-apps-btns.--currentHome .coz-nav-apps-btns-main {\n  margin-left: 0;\n}\n\n[role=banner] .coz-nav-apps-btns.--currentHome .coz-nav-apps-btns-home {\n  margin-right: 0;\n}\n\n/* POP */\n[role=banner] .coz-nav-pop--apps {\n  width: 20rem;\n  max-height: 20rem;\n  left: 3.5rem;\n  transform-origin: 10% 0%;\n}\n\n[role=banner] .coz-nav .--currentHome + .coz-nav-pop--apps {\n  left: 0;\n}\n\n/* POP CONTENT */\n\n[role=banner] .coz-nav-pop--apps .coz-nav-pop-content {\n  display: flex;\n  flex-direction: column;\n  /* pop size less pop border size*/\n  max-height: calc(20rem - 2px);\n  width: 100%;\n}\n\n@media (max-height: 21rem) {\n  [role=banner] .coz-nav-pop--apps {\n    max-height: calc(100vh - 4rem)\n  }\n\n  [role=banner] .coz-nav-pop--apps .coz-nav-pop-content {\n    max-height: calc(100vh - 4rem - 2px);\n  }\n}\n\n\n[role=banner] .coz-nav-pop--apps .coz-nav-pop-content .coz-nav-group {\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow-y: auto;\n}\n\n[role=banner] .coz-nav-apps-item {\n  display: flex;\n}\n\n/* current app item */\n[role=banner] .coz-nav-apps-item.--current a[role=menuitem] {\n  font-weight: bold;\n  background-color: var(--paleGrey);\n  border-left: 4px solid var(--dodgerBlue)\n}\n\n[role=banner] .coz-nav-apps-item [role=menuitem],\n[role=banner] [role=menuitem].coz-apps-home-btn {\n  display: flex;\n  box-sizing: border-box;\n  justify-content: flex-start;\n  flex-shrink: 0;\n  align-items: center;\n  width: 100%;\n  height: 3rem;\n  /* we remove the left border from the padding */\n  padding: .5rem 1rem .5rem calc(1rem - 4px);\n  color: var(--charcoalGrey);\n  text-decoration: none;\n  outline: none;\n}\n\n[role=banner] .coz-nav-apps-item:first-of-type [role=menuitem] {\n  margin-top: .5rem;\n}\n\n[role=banner] .coz-nav-apps-item:last-of-type [role=menuitem] {\n  margin-bottom: .5rem;\n}\n\n[role=banner] .coz-nav-apps-item-icon {\n  margin-right: .5rem;\n  height: 2rem;\n  width: 2rem;\n  /* force svg inline to be 2rem */\n  min-width: 2rem;\n}\n\n[role=banner] .coz-nav-apps-item [role=menuitem] .coz-label {\n  padding-right: .5rem;\n  width: 100%;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n[role=banner] [role=menuitem].coz-apps-home-btn {\n  display: flex;\n  margin-top: 0;\n  color: #5d6165;\n  font-weight: bold;\n  font-size: 14px;\n  justify-content: center;\n  align-items: center;\n}\n\n[role=banner] [role=menuitem].coz-apps-home-btn.--mobile > span {\n  display: flex;\n  justify-content: flex-start;\n}\n[role=banner] [role=menuitem].coz-apps-home-btn img, .coz-apps-home-btn svg {\n  width: 1rem;\n  height: 1rem;\n  margin-right: .5rem;\n}\n\n@keyframes barPlaceHolderShimmer {\n    0% { background-position: -20rem 0; }\n    80% { background-position: 20rem 0; }\n    80.1% { background-position: -20rem 0; }\n    100% { background-position: -20rem 0; }\n}\n\n[role=banner] .coz-loading-placeholder {\n    display: inline-block;\n    width: 100%;\n    height: 100%;\n    min-height: 1em;\n    animation: barPlaceHolderShimmer 1s linear infinite;\n    animation-delay: .1s;\n    animation-duration: 2s;\n    animation-iteration-count: infinite;\n    animation-timing-function: linear;\n    background-position: -20rem 0;\n    background-image: linear-gradient(to right, var(--silver) 0, var(--paleGrey) 50%, var(--silver) 100%);\n    background-size: 20rem 10rem;\n    background-repeat: no-repeat;\n    background-color: var(--silver);\n    border-radius: .15rem;\n    margin: .1rem 0;\n}\n\n\n[role=banner] .coz-nav-apps-item-icon.coz-loading-placeholder {\n  width: 2rem;\n  height: 2rem;\n  margin: 0 1rem;\n  display: block;\n}\n\n[role=banner] .coz-nav-apps-item [role=menuitem] .coz-label.coz-loading-placeholder {\n  height: 1em;\n  width: 7rem;\n}\n\n[role=banner] .coz-nav-apps-btns.--loading {\n  width: 12rem;\n}\n\n[role=banner] .coz-nav-apps-btns-home.coz-loading-placeholder {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 2rem;\n  background-color: var(--silver);\n  flex-shrink: 0;\n}\n\n[role=banner] .coz-nav-apps-btns-main.coz-loading-placeholder {\n  height: 1.5rem;\n  margin: 0;\n  background-color: var(--silver);\n}\n\n[role=banner] .coz-nav-settings-btn {\n  color: var(--slateGrey);\n}\n[role=banner] .coz-nav-settings-btn:hover,\n[role=banner] .coz-nav-settings-btn:focus {\n  background-color: var(--paleGrey);\n  box-shadow: inset 0 -1px 0 0 var(--silver);\n  color: var(--charcoalGrey);\n}\n\n[role=banner] .coz-nav-pop--settings {\n  right: 0;\n}\n\n[role=banner] .coz-nav-settings-item [role=menuitem] {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: none;\n  background-color: transparent;\n  text-align: left;\n  font-size: 1rem;\n  white-space: nowrap;\n  color: var(--charcoalGrey);\n  text-decoration: none;\n  outline: none;\n}\n\n[role=banner] .coz-nav-settings-item .coz-nav-settings-item-btn[role=menuitem] > span > span {\n  margin-right: auto;\n}\n\n\n[role=banner] [role=menuitem][data-icon=icon-storage] {\n  background-position: 1.5em calc(.8em + 1px);\n}\n\n[role=banner] .coz-nav-storage {\n  display: flex;\n  flex-direction: column;\n  align-items: left;\n  padding-top: .5em;\n  color: var(--coolGrey);\n}\n\n[role=banner] .coz-nav-storage-text {\n  margin: 0 0 .1em 0;\n  font-weight: normal;\n  font-size: .875em;\n}\n\n[role=banner] .cozy-nav-storage-bar {\n    height: .5em;\n    margin: .2em 0 .1em 0;\n}\n\n[role=banner] .coz-drawer-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100%;\n  display: flex;\n}\n\n[role=banner] .coz-drawer-wrapper[aria-hidden=true] {\n  pointer-events: none;\n}\n\n[role=banner] .coz-drawer-wrapper[aria-hidden=false] {\n  pointer-events: auto;\n}\n\n[role=banner] .coz-drawer-wrapper::before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--charcoalGrey);\n  opacity: 0;\n  transition: opacity .2s ease-out .1s;\n}\n\n[role=banner] .coz-drawer-wrapper[aria-hidden=false]::before {\n  opacity: .5;\n  transition: opacity .2s ease-out;\n}\n\n[role=banner] .coz-drawer-wrapper aside {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 90%;\n  max-width: 30em;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  transform: translateX(-100%);\n  transform-origin: 0% 0%;\n}\n\n[role=banner] .coz-drawer-wrapper aside.with-transition {\n  transition: transform .2s ease-out;\n}\n\n[role=banner] .coz-drawer-wrapper[aria-hidden=false] aside {\n  transform: translateX(0%);\n}\n\n[role=banner] .coz-drawer-wrapper[aria-hidden=false] aside.with-transition {\n  transition: transform .3s cubic-bezier(0.2, 0.75, 0.3, 1.0);\n}\n\n[role=banner] .coz-drawer-wrapper ul {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n\n[role=banner] .coz-drawer-wrapper nav hr {\n  margin: 0;\n  border: none;\n  border-bottom: solid 1px var(--silver);\n}\n\n[role=banner] .coz-drawer-wrapper .coz-nav-icon {\n  margin-right: .5em;\n}\n\n[role=banner] .coz-drawer--apps {\n  flex: 0 1 100%;\n  /* IMPORTANT: on Chrome, the `overflow-y: scroll` property on .coz-drawer--apps prevented\n  swipe events to be dispatched correctly ; the `touch-action: pan-y` fixes the problem\n  see https://greensock.com/forums/topic/17546-draggable-text-elements-with-overflow/ */\n  overflow-y: scroll;\n  touch-action: pan-y;\n  position: relative;\n  overflow-x: hidden;\n}\n\n[role=banner] .coz-drawer--apps ul li {\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n\n[role=banner] .coz-drawer--apps ul:last-of-type + hr {\n  display: none;\n}\n\n[role=banner] .coz-drawer--apps [role=menuitem] {\n  display: flex;\n  flex-direction: row;\n  padding: .3em .3em .3em 1.3em;\n  height: 3rem;\n}\n\n[role=banner] .coz-drawer--apps .coz-nav-item img {\n  width: 2rem;\n  margin-right: .5rem;\n  max-height: 2rem;\n}\n\n\n[role=banner] .coz-drawer--apps .coz-nav-category {\n  font-size: 1em;\n  padding: 2em 2em .5em;\n  margin: 0;\n}\n\n[role=banner] .coz-drawer--settings {\n  padding-bottom: env(safe-area-inset-bottom);\n}\n\n/* /!\\ Trick to prevent application from scrolling in the background when the drawer is opened */\n[role=banner][data-drawer-visible=true] + [role=application] {\n  position: fixed;\n  width: 100%;\n}\n\n[role=banner] .coz-claudy {\n  position: fixed;\n  bottom: 5em;\n  right: 2em;\n}\n\n@media (min-width: 64em) {\n  [role=banner] .coz-claudy {\n    bottom: 2em;\n  }\n}\n\n[role=banner] .coz-claudy-icon {\n  width: 3.5em;\n  height: 3.5em;\n  border-radius: 100%;\n  border: none;\n  background-color: var(--dodgerBlue);\n  background-repeat: no-repeat;\n  background-size: 2em;\n  background-position: .75em;\n  box-shadow: 0 1px 3px 0 rgba(50, 54, 63, 0.19), 0 6px 18px 0 rgba(50, 54, 63, 0.39);\n  animation: none;\n  cursor: pointer;\n  opacity: .5;\n  transition: all .2s ease-out;\n  outline: 0;\n}\n\n[role=banner] .coz-claudy-icon:hover,\n[role=banner] .coz-claudy-icon:focus,\n[role=banner] .coz-claudy-icon:active,\n[role=banner] .coz-claudy [data-claudy-opened=true] {\n  animation: none;\n  transform: scale(1.1);\n  opacity: 1;\n  transition: all .2s ease-out;\n}\n\n[role=banner] .coz-claudy .coz-claudy-intent-wrapper {\n  position: fixed;\n  bottom: 9.5em;\n  right: 2em;\n  width: 25em;\n  border-radius: .3em;\n  background: white;\n  transform-origin: 100% 100% 0;\n  transform: scale(0) translateY(6em);\n  filter: drop-shadow(0 4px 6px rgba(50, 54, 63, 0.5));\n  opacity: 0;\n  transition: .2s transform ease-in, .1s opacity ease-in;\n}\n\n[role=banner] .coz-claudy--opened .coz-claudy-intent-wrapper {\n  transform: scale(1) translateY(0);\n  opacity: 1;\n  transition: .2s transform cubic-bezier(0.2, 0.75, 0.3, 1.15), .1s opacity ease-in;\n}\n\n[role=banner] .coz-claudy-intent-wrapper::after {\n  position: fixed;\n  content: '';\n  right: 3em;\n  width: 0;\n  height: 0;\n  /* Make it a bit taller to avoid browser spacing issue\n  between it and the tooltip */\n  border-bottom: .8em solid transparent;\n  border-right: 1.5em solid white;\n  bottom: -.6em;\n}\n\n[role=banner] .coz-claudy .coz-claudy-intent-wrapper .coz-intent{\n  width: 100%;\n  height: 100%;\n  border: none;\n  border-radius: .3em;\n}\n\n@media (min-width: 64em) {\n  [role=banner] .coz-claudy .coz-claudy-intent-wrapper {\n    bottom: 6.5em;\n  }\n}\n\n@media (max-width: 48em) {\n  [role=banner] .coz-claudy .coz-claudy-intent-wrapper {\n    width: calc(100% - 2em);\n    height: calc(100% - 2em)!important; /* overwritte intent setSize here */\n    right: 1em;\n    top: 1em;\n    transform-origin: 50% 50% 0;\n  }\n\n  [role=banner] .coz-claudy-intent-wrapper::after {\n    display: none;\n  }\n}\n\n[role=banner] .coz-searchbar{\n  height: 100%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-grow: 1;\n  padding: .3em .8em .3em .7em;\n  box-sizing: border-box;\n  position: relative;\n}\n\n[role=banner] .coz-searchbar-autosuggest-container{\n  position: relative;\n  width: 100%;\n  opacity: .4;\n  transition: all .2s ease-out;\n}\n[role=banner] .coz-searchbar-autosuggest-container.--focused{\n  opacity: 1;\n}\n[role=banner] .coz-searchbar-autosuggest-container:before{\n  content: '';\n  display: inline-block;\n  width: 1.6em;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n[role=banner] .coz-searchbar-autosuggest-container.--searching:before{\n  padding-left: .5em;\n  background-size: 1em;\n  animation: spin 1s linear infinite;\n}\n\n[role=banner] .coz-searchbar-autosuggest-input{\n  box-sizing: border-box;\n  width: 100%;\n  padding: .5em;\n  padding-left: 2em;\n  border-width: 1px;\n  border-style: solid;\n  border-color: transparent;\n  border-radius: 4px;\n  transition: all .2s ease-out;\n}\n[role=banner] .coz-searchbar-autosuggest-input:hover{\n  border-color: var(--silver);\n}\n[role=banner] .coz-searchbar-autosuggest-input:focus,\n[role=banner] .coz-searchbar-autosuggest-input-focused{\n  outline: none;\n  border-color: var(--dodgerBlue);\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestions-container {\n  position: absolute;\n  top: 100%;\n  margin-top: 3px;\n  width: 100%;\n  max-height: em(170px);\n  overflow: auto;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--silver);\n  border-radius: 4px;\n  background: white;\n  box-shadow: 0 1px 3px 0 rgba(50, 54, 63, 0.19), 0 6px 18px 0 rgba(50, 54, 63, 0.19);\n  display: none;\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestions-container--open {\n\tdisplay: block;\n}\n\n[role=banner] .coz-searchbar-autosuggest-status-container {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  margin: -0.3em .8em .3em;\n  padding: .8em .5em;\n  max-height: em(170px);\n  overflow: auto;\n  border-width: 1px;\n  border-style: solid;\n  border-color: var(--silver);\n  border-radius: 4px;\n  background: white;\n  box-shadow: 0 1px 3px 0 rgba(50, 54, 63, 0.19), 0 6px 18px 0 rgba(50, 54, 63, 0.19);\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestions-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestions-list b {\n  font-weight: bolder;\n  color: var(--scienceBlue)\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestion {\n\tpadding: .8em .5em;\n  border-width: 0;\n  border-bottom-width: 1px;\n  border-style:  solid;\n  border-color: var(--silver);\n  cursor: pointer;\n}\n[role=banner] .coz-searchbar-autosuggest-suggestion:last-child {\n  border-bottom-width: 0;\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestion-item {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: center;\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestion-icon {\n  max-height: 2rem;\n  min-height: 2rem;\n  margin-right: 1rem;\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestion-content {\n  flex-grow: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: flex;\n  flex-direction: column;\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestion-subtitle {\n  color: var(--coolGrey);\n}\n\n[role=banner] .coz-searchbar-autosuggest-suggestion-highlighted {\n  background: var(--paleGrey);\n  box-shadow: inset 4px 0 0 0 var(--dodgerBlue);\n}\n\n[role=banner] .coz-searchbar-autosuggest-section-title {\n  padding: .5em;\n  font-size: .8em;\n}\n\n@media (max-width: 48em) {\n  [role=banner] .coz-searchbar{\n    display: none;\n  }\n}\n\n[role=banner] .coz-support-modal .coz-support-modal-content {\n  min-height: 8em;\n}\n\n[role=banner] .coz-support-modal .coz-support-intent-wrapper .coz-intent {\n  width: 100%;\n  height: 24em;\n  border: none;\n}\n\n[role=banner] .coz-support-modal .coz-support-modal-close {\n  margin-top: .7rem;\n  margin-right: 1rem;\n}\n\n@media (max-width: 48em) {\n  [role=banner] .coz-support-modal .coz-support-intent-wrapper .coz-intent {\n    height: 27em;\n  }\n}\n\n[role=banner] .coz-bar-wrapper {\n  box-shadow: inset 0 -1px 0 0 var(--silver);\n  --cozBarThemePrimaryColor: var(--primaryColor);\n  --cozBarThemePrimaryContrastTextColor: var(--primaryContrastTextColor);\n}\n[role=banner] .coz-bar-wrapper .coz-nav-apps-btns {\n  color: var(--slateGrey);\n}\n[role=banner] .coz-bar-wrapper .coz-bar-burger {\n  color: var(--coolGrey);\n}\n@media (max-width: 64em) {\n  [role=banner] .coz-bar-wrapper {\n    background-color: var(--white);\n  }\n}\n@media (max-width: 48em) {\n  [role=banner] .coz-bar-wrapper.coz-theme-primary {\n    box-shadow: inherit;\n    background-color: var(--cozBarThemePrimaryColor);\n  }\n  [role=banner] .coz-bar-wrapper.coz-theme-primary .coz-nav-apps-btns,\n  [role=banner] .coz-bar-wrapper.coz-theme-primary .coz-bar-burger {\n    color: var(--cozBarThemePrimaryContrastTextColor);\n  }\n}\nhtml {\n/*\n    Grey\n\n    Stylus: white        -  #FFFFFF, CSS: var(--white)\n    Stylus: paleGrey     -  #F5F6F7, CSS: var(--paleGrey)\n    Stylus: silver       -  #D6D8Da, CSS: var(--silver)\n    Stylus: coolGrey     -  #95999D, CSS: var(--coolGrey)\n    Stylus: slateGrey    -  #5D6165, CSS: var(--slateGrey)\n    Stylus: charcoalGrey -  #32363F, CSS: var(--charcoalGrey)\n    Stylus: black        -  #000000, CSS: var(--black)\n\n\n    Styleguide Settings.colors.grey\n    */\n  --white: #fff;\n  --paleGrey: #f5f6f7;\n  --silver: #d6d8da;\n  --coolGrey: #95999d;\n  --slateGrey: #5d6165;\n  --charcoalGrey: #32363f;\n  --black: #000;\n  --overlay: rgba(50,54,63,0.5);\n/*\n    Blue\n\n    Stylus: zircon       -  #F5FAFF, CSS: var(--zircon)\n    Stylus: dodgerBlue   -  #297EF2, CSS: var(--dodgerBlue)\n    Stylus: scienceBlue  -  #0B61D6, CSS: var(--scienceBlue)\n\n    Styleguide Settings.colors.blue\n    */\n  --zircon: #f5faff;\n  --dodgerBlue: #297ef2;\n  --scienceBlue: #0b61d6;\n/*\n    Green\n\n    Stylus: weirdGreen   - #40DE8E, CSS: var(--weirdGreen)\n    Stylus: emerald      - #35CE68, CSS: var(--emerald)\n    Stylus: malachite    - #08b442, CSS: var(--malachite)\n\n    Styleguide Settings.colors.green\n    */\n  --weirdGreen: #40de8e;\n  --emerald: #35ce68;\n  --malachite: #08b442;\n/*\n    Orange\n\n    Stylus: mango         - #FF962F, CSS: var(--mango)\n\n    Styleguide Settings.colors.orange\n    */\n  --mango: #ff962f;\n/*\n    Red\n\n    Stylus: chablis      - #FFF2F2, CSS: var(--chablis)\n    Stylus: yourPink     - #FDCBCB, CSS: var(--yourPink)\n    Stylus: fuchsia      - #FC4C83, CSS: var(--fuchsia)\n    Stylus: pomegranate  - #F52D2D, CSS: var(--pomegranate)\n    Stylus: monza        - #DD0505, CSS: var(--monza)\n\n    Styleguide Settings.colors.red\n    */\n  --chablis: #fff2f2;\n  --yourPink: #fdcbcb;\n  --fuchsia: #fc4c83;\n  --pomegranate: #f52d2d;\n  --monza: #dd0505;\n}\nhtml,\n.CozyTheme--normal {\n/*\n    Primary\n\n    Stylus: primaryColor             - #297EF2, CSS: var(--primaryColor)\n    Stylus: primaryColorDark         - #0B61D6, CSS: var(--primaryColorDark)\n    Stylus: primaryColorLight        - #5C9DF5, CSS: var(--primaryColorLight)\n    Stylus: primaryColorLightest     - #9FC4FB, CSS: var(--primaryColorLightest)\n    Stylus: primaryContrastTextColor - #FFFFFF, CSS: var(--primaryContrastTextColor)\n\n    Styleguide Settings.theme.primary\n    */\n  --primaryColor: #297ef2;\n  --primaryColorDark: #0b61d6;\n  --primaryColorLight: #5c9df5;\n  --primaryColorLightest: #9fc4fb;\n/*\n    Secondary\n\n    Stylus: secondaryColor   - #fd7461, CSS: var(--secondaryColor)\n    Stylus: secondaryColorDark   - #E3503B, CSS: var(--secondaryColorDark)\n    Stylus: secondaryColorLight   - #ffdeda, CSS: var(--secondaryColorLight)\n    Stylus: secondaryColorLightest   - #FECDC6, CSS: var(--secondaryColorLightest)\n\n    Styleguide Settings.theme.secondary\n    */\n  --secondaryColor: #fd7461;\n  --secondaryColorDark: #e3503b;\n  --secondaryColorLight: #ffdeda;\n  --secondaryColorLightest: #fecdc6;\n/*\n    Background colors\n\n    Stylus: primaryBackgroundLight -  #F5FAFF, CSS: var(--primaryBackgroundLight)\n    Stylus: paperBackgroundColor -  #FFF, CSS: var(--paperBackgroundColor)\n    Stylus: defaultBackgroundColor -  #F5F6F7, CSS: var(--defaultBackgroundColor)\n\n    Styleguide Settings.theme.background\n    */\n  --primaryBackgroundLight: #f5faff;\n  --paperBackgroundColor: #fff;\n  --defaultBackgroundColor: #f5f6f7;\n/*\n    Text colors\n\n    Stylus: primaryTextColor -  #32363F, CSS: var(--primaryTextColor)\n    Stylus: secondaryTextColor - #95999D, CSS: var(--secondaryTextColor)\n    Stylus: primaryContrastTextColor -  #FFF, CSS: var(--primaryContrastTextColor)\n    Stylus: secondaryContrastTextColor -  #FFF, CSS: var(--secondaryContrastTextColor)\n\n    Styleguide Settings.theme.text\n    */\n  --primaryTextColor: #32363f;\n  --secondaryTextColor: #95999d;\n  --primaryContrastTextColor: #fff;\n  --secondaryContrastTextColor: #fff;\n/*\n    Components colors\n\n    Be careful to use the semantic variable, not the hexa color.\n    In this case the real color is `#1D212A1F`, and becomes `#E3E4E5` on a white background.\n\n    Stylus: dividerColor - #E3E4E5, CSS: var(--dividerColor)\n\n    Styleguide Settings.theme.components\n    */\n  --dividerColor: rgba(29,33,42,0.122);\n/*\n    Intention colors\n\n    Stylus: successColor -  #35CE68, CSS: var(--successColor)\n    Stylus: warningColor -  #FF962F, CSS: var(--warningColor)\n    Stylus: errorColor -  #F52D2D, CSS: var(--errorColor)\n    Stylus: infoColor -  #34373F, CSS: var(--infoColor)\n\n    Styleguide Settings.theme.intention\n    */\n  --successColor: #35ce68;\n  --warningColor: #ff962f;\n  --errorColor: #f52d2d;\n  --errorColorDark: #a00808;\n  --errorColorLight: #fcbfbf;\n  --errorColorLightest: #fee6e6;\n  --errorBackground: #fff2f2;\n/*\n    The CSS variables below are historic and we should strive not to\n    use them. Prefer to use directly semantic colors above.\n    */\n  --spinnerColor: var(--primaryColor);\n  --linkColor: var(--primaryColor);\n  --linkTextDecoration: none;\n  --linkColorActive: var(--primaryColorDark);\n  --invertedTabsActiveTextColor: var(--primaryContrastTextColor);\n  --invertedTabsInactiveTextColor: var(--primaryContrastTextColor);\n  --invertedTabsIndicatorColor: var(--primaryContrastTextColor);\n  --invertedTabsBackgroundColor: var(--primaryColor);\n  --regularButtonPrimaryColor: var(--primaryColor);\n  --regularButtonSecondaryColor: var(--primaryColor);\n  --regularButtonActiveColor: var(--primaryColorDark);\n  --regularButtonConstrastColor: var(--primaryContrastTextColor);\n  --secondaryButtonPrimaryColor: #fff;\n  --secondaryButtonSecondaryColor: var(--silver);\n  --secondaryButtonActiveColor: var(--silver);\n  --secondaryButtonContrastColor: var(--black);\n  --dividerColor2: var(--coolGrey);\n  --iconColor: currentColor;\n  --textIconColor: var(--charcoalGrey);\n  --actionMenuIconColor: var(--slateGrey);\n  --neutralBackground: var(--paleGrey);\n  --buttonTextTransform: uppercase;\n  --buttonBorderRadius: 0.125rem;\n  --navTextColor: var(--slateGrey);\n  --navTextActiveColor: var(--slateGrey);\n  --navTextHoverColor: var(--charcoalGrey);\n  --alertErrorColor: #fff;\n  --alertErrorBackgroundColor: var(--errorColor);\n  --alertSuccessColor: #fff;\n  --alertSuccessBackgroundColor: var(--successColor);\n  --alertInfoColor: #fff;\n  --alertInfoBackgroundColor: var(--slateGrey);\n}\nhtml {\n  --zIndex-below: -1;\n  --zIndex-app: 0;\n  --zIndex-low: 1;\n  --zIndex-alertMobile: 10;\n  --zIndex-nav: 20;\n  --zIndex-bar: 21;\n  --zIndex-selection: 30;\n  --zIndex-popover: 40;\n  --zIndex-overlay: 50;\n  --zIndex-fileActionMenu: 60;\n  --zIndex-drawer: 60;\n  --zIndex-modal: 70;\n  --zindex-alert: 80;\n}\n.u-visuallyhidden,\n.coz-bar-hidden {\n  position: absolute !important;\n  border: 0 !important;\n  width: 0.063rem !important;\n  height: 0.063rem !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  white-space: nowrap !important;\n  clip: rect(0.063rem, 0.063rem, 0.063rem, 0.063rem) !important;\n  clip-path: inset(50%) !important;\n}\n.u-hide {\n  display: none !important;\n  visibility: hidden !important;\n}\n@media (max-width: 63.938rem) {\n  .u-hide--mob {\n    display: none !important;\n  }\n}\n@media (min-width: 64rem) {\n  .u-hide--tablet {\n    display: none !important;\n  }\n}\n@media (min-width: 48.063rem) {\n  .u-hide--desk {\n    display: none !important;\n  }\n}\n.u-dn {\n  display: none;\n}\n.u-di {\n  display: inline;\n}\n.u-db {\n  display: block;\n}\n.u-dib {\n  display: inline-block;\n}\n.u-dit {\n  display: inline-table;\n}\n.u-dt {\n  display: table;\n}\n.u-dtc {\n  display: table-cell;\n}\n.u-dt-row {\n  display: table-row;\n}\n.u-dt-row-group {\n  display: table-row-group;\n}\n.u-dt-column {\n  display: table-column;\n}\n.u-dt-column-group {\n  display: table-column-group;\n}\n@media (max-width: 30rem) {\n  .u-dn-t {\n    display: none;\n  }\n  .u-di-t {\n    display: inline;\n  }\n  .u-db-t {\n    display: block;\n  }\n  .u-dib-t {\n    display: inline-block;\n  }\n  .u-dit-t {\n    display: inline-table;\n  }\n  .u-dt-t {\n    display: table;\n  }\n  .u-dtc-t {\n    display: table-cell;\n  }\n  .u-dt-row-t {\n    display: table-row;\n  }\n  .u-dt-row-group-t {\n    display: table-row-group;\n  }\n  .u-dt-column-t {\n    display: table-column;\n  }\n  .u-dt-column-group-t {\n    display: table-column-group;\n  }\n}\n@media (max-width: 48rem) {\n  .u-dn-s {\n    display: none;\n  }\n  .u-di-s {\n    display: inline;\n  }\n  .u-db-s {\n    display: block;\n  }\n  .u-dib-s {\n    display: inline-block;\n  }\n  .u-dit-s {\n    display: inline-table;\n  }\n  .u-dt-s {\n    display: table;\n  }\n  .u-dtc-s {\n    display: table-cell;\n  }\n  .u-dt-row-s {\n    display: table-row;\n  }\n  .u-dt-row-group-s {\n    display: table-row-group;\n  }\n  .u-dt-column-s {\n    display: table-column;\n  }\n  .u-dt-column-group-s {\n    display: table-column-group;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-dn-m {\n    display: none;\n  }\n  .u-di-m {\n    display: inline;\n  }\n  .u-db-m {\n    display: block;\n  }\n  .u-dib-m {\n    display: inline-block;\n  }\n  .u-dit-m {\n    display: inline-table;\n  }\n  .u-dt-m {\n    display: table;\n  }\n  .u-dtc-m {\n    display: table-cell;\n  }\n  .u-dt-row-m {\n    display: table-row;\n  }\n  .u-dt-row-group-m {\n    display: table-row-group;\n  }\n  .u-dt-column-m {\n    display: table-column;\n  }\n  .u-dt-column-group-m {\n    display: table-column-group;\n  }\n}\n.u-p-0 {\n  padding: 0 !important;\n}\n.u-pt-0 {\n  padding-top: 0 !important;\n}\n.u-pb-0 {\n  padding-bottom: 0 !important;\n}\n.u-pl-0 {\n  padding-left: 0 !important;\n}\n.u-pr-0 {\n  padding-right: 0 !important;\n}\n.u-pv-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n}\n.u-ph-0 {\n  padding-left: 0 !important;\n  padding-right: 0 !important;\n}\n.u-p-1 {\n  padding: 1rem !important;\n}\n.u-pt-1 {\n  padding-top: 1rem !important;\n}\n.u-pb-1 {\n  padding-bottom: 1rem !important;\n}\n.u-pl-1 {\n  padding-left: 1rem !important;\n}\n.u-pr-1 {\n  padding-right: 1rem !important;\n}\n.u-pv-1 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important;\n}\n.u-ph-1 {\n  padding-left: 1rem !important;\n  padding-right: 1rem !important;\n}\n.u-p-2 {\n  padding: 2rem !important;\n}\n.u-pt-2 {\n  padding-top: 2rem !important;\n}\n.u-pb-2 {\n  padding-bottom: 2rem !important;\n}\n.u-pl-2 {\n  padding-left: 2rem !important;\n}\n.u-pr-2 {\n  padding-right: 2rem !important;\n}\n.u-pv-2 {\n  padding-top: 2rem !important;\n  padding-bottom: 2rem !important;\n}\n.u-ph-2 {\n  padding-left: 2rem !important;\n  padding-right: 2rem !important;\n}\n.u-p-3 {\n  padding: 3rem !important;\n}\n.u-pt-3 {\n  padding-top: 3rem !important;\n}\n.u-pb-3 {\n  padding-bottom: 3rem !important;\n}\n.u-pl-3 {\n  padding-left: 3rem !important;\n}\n.u-pr-3 {\n  padding-right: 3rem !important;\n}\n.u-pv-3 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important;\n}\n.u-ph-3 {\n  padding-left: 3rem !important;\n  padding-right: 3rem !important;\n}\n.u-p-auto {\n  padding: auto !important;\n}\n.u-pt-auto {\n  padding-top: auto !important;\n}\n.u-pb-auto {\n  padding-bottom: auto !important;\n}\n.u-pl-auto {\n  padding-left: auto !important;\n}\n.u-pr-auto {\n  padding-right: auto !important;\n}\n.u-pv-auto {\n  padding-top: auto !important;\n  padding-bottom: auto !important;\n}\n.u-ph-auto {\n  padding-left: auto !important;\n  padding-right: auto !important;\n}\n.u-p-half {\n  padding: 0.5rem !important;\n}\n.u-pt-half {\n  padding-top: 0.5rem !important;\n}\n.u-pb-half {\n  padding-bottom: 0.5rem !important;\n}\n.u-pl-half {\n  padding-left: 0.5rem !important;\n}\n.u-pr-half {\n  padding-right: 0.5rem !important;\n}\n.u-pv-half {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important;\n}\n.u-ph-half {\n  padding-left: 0.5rem !important;\n  padding-right: 0.5rem !important;\n}\n.u-p-1-half {\n  padding: 1.5rem !important;\n}\n.u-pt-1-half {\n  padding-top: 1.5rem !important;\n}\n.u-pb-1-half {\n  padding-bottom: 1.5rem !important;\n}\n.u-pl-1-half {\n  padding-left: 1.5rem !important;\n}\n.u-pr-1-half {\n  padding-right: 1.5rem !important;\n}\n.u-pv-1-half {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important;\n}\n.u-ph-1-half {\n  padding-left: 1.5rem !important;\n  padding-right: 1.5rem !important;\n}\n.u-p-2-half {\n  padding: 2.5rem !important;\n}\n.u-pt-2-half {\n  padding-top: 2.5rem !important;\n}\n.u-pb-2-half {\n  padding-bottom: 2.5rem !important;\n}\n.u-pl-2-half {\n  padding-left: 2.5rem !important;\n}\n.u-pr-2-half {\n  padding-right: 2.5rem !important;\n}\n.u-pv-2-half {\n  padding-top: 2.5rem !important;\n  padding-bottom: 2.5rem !important;\n}\n.u-ph-2-half {\n  padding-left: 2.5rem !important;\n  padding-right: 2.5rem !important;\n}\n.u-m-0 {\n  margin: 0 !important;\n}\n.u-mt-0 {\n  margin-top: 0 !important;\n}\n.u-mb-0 {\n  margin-bottom: 0 !important;\n}\n.u-ml-0 {\n  margin-left: 0 !important;\n}\n.u-mr-0 {\n  margin-right: 0 !important;\n}\n.u-mv-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n}\n.u-mh-0 {\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n.u-m-1 {\n  margin: 1rem !important;\n}\n.u-mt-1 {\n  margin-top: 1rem !important;\n}\n.u-mb-1 {\n  margin-bottom: 1rem !important;\n}\n.u-ml-1 {\n  margin-left: 1rem !important;\n}\n.u-mr-1 {\n  margin-right: 1rem !important;\n}\n.u-mv-1 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important;\n}\n.u-mh-1 {\n  margin-left: 1rem !important;\n  margin-right: 1rem !important;\n}\n.u-m-2 {\n  margin: 2rem !important;\n}\n.u-mt-2 {\n  margin-top: 2rem !important;\n}\n.u-mb-2 {\n  margin-bottom: 2rem !important;\n}\n.u-ml-2 {\n  margin-left: 2rem !important;\n}\n.u-mr-2 {\n  margin-right: 2rem !important;\n}\n.u-mv-2 {\n  margin-top: 2rem !important;\n  margin-bottom: 2rem !important;\n}\n.u-mh-2 {\n  margin-left: 2rem !important;\n  margin-right: 2rem !important;\n}\n.u-m-3 {\n  margin: 3rem !important;\n}\n.u-mt-3 {\n  margin-top: 3rem !important;\n}\n.u-mb-3 {\n  margin-bottom: 3rem !important;\n}\n.u-ml-3 {\n  margin-left: 3rem !important;\n}\n.u-mr-3 {\n  margin-right: 3rem !important;\n}\n.u-mv-3 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important;\n}\n.u-mh-3 {\n  margin-left: 3rem !important;\n  margin-right: 3rem !important;\n}\n.u-m-auto {\n  margin: auto !important;\n}\n.u-mt-auto {\n  margin-top: auto !important;\n}\n.u-mb-auto {\n  margin-bottom: auto !important;\n}\n.u-ml-auto {\n  margin-left: auto !important;\n}\n.u-mr-auto {\n  margin-right: auto !important;\n}\n.u-mv-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important;\n}\n.u-mh-auto {\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n.u-m-half {\n  margin: 0.5rem !important;\n}\n.u-mt-half {\n  margin-top: 0.5rem !important;\n}\n.u-mb-half {\n  margin-bottom: 0.5rem !important;\n}\n.u-ml-half {\n  margin-left: 0.5rem !important;\n}\n.u-mr-half {\n  margin-right: 0.5rem !important;\n}\n.u-mv-half {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important;\n}\n.u-mh-half {\n  margin-left: 0.5rem !important;\n  margin-right: 0.5rem !important;\n}\n.u-m-1-half {\n  margin: 1.5rem !important;\n}\n.u-mt-1-half {\n  margin-top: 1.5rem !important;\n}\n.u-mb-1-half {\n  margin-bottom: 1.5rem !important;\n}\n.u-ml-1-half {\n  margin-left: 1.5rem !important;\n}\n.u-mr-1-half {\n  margin-right: 1.5rem !important;\n}\n.u-mv-1-half {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important;\n}\n.u-mh-1-half {\n  margin-left: 1.5rem !important;\n  margin-right: 1.5rem !important;\n}\n.u-m-2-half {\n  margin: 2.5rem !important;\n}\n.u-mt-2-half {\n  margin-top: 2.5rem !important;\n}\n.u-mb-2-half {\n  margin-bottom: 2.5rem !important;\n}\n.u-ml-2-half {\n  margin-left: 2.5rem !important;\n}\n.u-mr-2-half {\n  margin-right: 2.5rem !important;\n}\n.u-mv-2-half {\n  margin-top: 2.5rem !important;\n  margin-bottom: 2.5rem !important;\n}\n.u-mh-2-half {\n  margin-left: 2.5rem !important;\n  margin-right: 2.5rem !important;\n}\n@media (max-width: 30rem) {\n  .u-p-0-t {\n    padding: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-0-t {\n    padding-top: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-0-t {\n    padding-bottom: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-0-t {\n    padding-left: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-0-t {\n    padding-right: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-0-t {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-0-t {\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-1-t {\n    padding: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-1-t {\n    padding-top: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-1-t {\n    padding-bottom: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-1-t {\n    padding-left: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-1-t {\n    padding-right: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-1-t {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-1-t {\n    padding-left: 1rem !important;\n    padding-right: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-2-t {\n    padding: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-2-t {\n    padding-top: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-2-t {\n    padding-bottom: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-2-t {\n    padding-left: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-2-t {\n    padding-right: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-2-t {\n    padding-top: 2rem !important;\n    padding-bottom: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-2-t {\n    padding-left: 2rem !important;\n    padding-right: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-3-t {\n    padding: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-3-t {\n    padding-top: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-3-t {\n    padding-bottom: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-3-t {\n    padding-left: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-3-t {\n    padding-right: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-3-t {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-3-t {\n    padding-left: 3rem !important;\n    padding-right: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-auto-t {\n    padding: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-auto-t {\n    padding-top: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-auto-t {\n    padding-bottom: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-auto-t {\n    padding-left: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-auto-t {\n    padding-right: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-auto-t {\n    padding-top: auto !important;\n    padding-bottom: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-auto-t {\n    padding-left: auto !important;\n    padding-right: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-half-t {\n    padding: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-half-t {\n    padding-top: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-half-t {\n    padding-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-half-t {\n    padding-left: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-half-t {\n    padding-right: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-half-t {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-half-t {\n    padding-left: 0.5rem !important;\n    padding-right: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-1-half-t {\n    padding: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-1-half-t {\n    padding-top: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-1-half-t {\n    padding-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-1-half-t {\n    padding-left: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-1-half-t {\n    padding-right: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-1-half-t {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-1-half-t {\n    padding-left: 1.5rem !important;\n    padding-right: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-p-2-half-t {\n    padding: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pt-2-half-t {\n    padding-top: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pb-2-half-t {\n    padding-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pl-2-half-t {\n    padding-left: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pr-2-half-t {\n    padding-right: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-pv-2-half-t {\n    padding-top: 2.5rem !important;\n    padding-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ph-2-half-t {\n    padding-left: 2.5rem !important;\n    padding-right: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-0-t {\n    margin: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-0-t {\n    margin-top: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-0-t {\n    margin-bottom: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-0-t {\n    margin-left: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-0-t {\n    margin-right: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-0-t {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-0-t {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-1-t {\n    margin: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-1-t {\n    margin-top: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-1-t {\n    margin-bottom: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-1-t {\n    margin-left: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-1-t {\n    margin-right: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-1-t {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-1-t {\n    margin-left: 1rem !important;\n    margin-right: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-2-t {\n    margin: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-2-t {\n    margin-top: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-2-t {\n    margin-bottom: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-2-t {\n    margin-left: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-2-t {\n    margin-right: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-2-t {\n    margin-top: 2rem !important;\n    margin-bottom: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-2-t {\n    margin-left: 2rem !important;\n    margin-right: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-3-t {\n    margin: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-3-t {\n    margin-top: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-3-t {\n    margin-bottom: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-3-t {\n    margin-left: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-3-t {\n    margin-right: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-3-t {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-3-t {\n    margin-left: 3rem !important;\n    margin-right: 3rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-auto-t {\n    margin: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-auto-t {\n    margin-top: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-auto-t {\n    margin-bottom: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-auto-t {\n    margin-left: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-auto-t {\n    margin-right: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-auto-t {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-auto-t {\n    margin-left: auto !important;\n    margin-right: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-half-t {\n    margin: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-half-t {\n    margin-top: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-half-t {\n    margin-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-half-t {\n    margin-left: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-half-t {\n    margin-right: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-half-t {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-half-t {\n    margin-left: 0.5rem !important;\n    margin-right: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-1-half-t {\n    margin: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-1-half-t {\n    margin-top: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-1-half-t {\n    margin-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-1-half-t {\n    margin-left: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-1-half-t {\n    margin-right: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-1-half-t {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-1-half-t {\n    margin-left: 1.5rem !important;\n    margin-right: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-m-2-half-t {\n    margin: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mt-2-half-t {\n    margin-top: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mb-2-half-t {\n    margin-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-ml-2-half-t {\n    margin-left: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mr-2-half-t {\n    margin-right: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mv-2-half-t {\n    margin-top: 2.5rem !important;\n    margin-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mh-2-half-t {\n    margin-left: 2.5rem !important;\n    margin-right: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-0-s {\n    padding: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-0-s {\n    padding-top: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-0-s {\n    padding-bottom: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-0-s {\n    padding-left: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-0-s {\n    padding-right: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-0-s {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-0-s {\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-1-s {\n    padding: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-1-s {\n    padding-top: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-1-s {\n    padding-bottom: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-1-s {\n    padding-left: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-1-s {\n    padding-right: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-1-s {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-1-s {\n    padding-left: 1rem !important;\n    padding-right: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-2-s {\n    padding: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-2-s {\n    padding-top: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-2-s {\n    padding-bottom: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-2-s {\n    padding-left: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-2-s {\n    padding-right: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-2-s {\n    padding-top: 2rem !important;\n    padding-bottom: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-2-s {\n    padding-left: 2rem !important;\n    padding-right: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-3-s {\n    padding: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-3-s {\n    padding-top: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-3-s {\n    padding-bottom: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-3-s {\n    padding-left: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-3-s {\n    padding-right: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-3-s {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-3-s {\n    padding-left: 3rem !important;\n    padding-right: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-auto-s {\n    padding: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-auto-s {\n    padding-top: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-auto-s {\n    padding-bottom: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-auto-s {\n    padding-left: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-auto-s {\n    padding-right: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-auto-s {\n    padding-top: auto !important;\n    padding-bottom: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-auto-s {\n    padding-left: auto !important;\n    padding-right: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-half-s {\n    padding: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-half-s {\n    padding-top: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-half-s {\n    padding-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-half-s {\n    padding-left: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-half-s {\n    padding-right: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-half-s {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-half-s {\n    padding-left: 0.5rem !important;\n    padding-right: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-1-half-s {\n    padding: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-1-half-s {\n    padding-top: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-1-half-s {\n    padding-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-1-half-s {\n    padding-left: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-1-half-s {\n    padding-right: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-1-half-s {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-1-half-s {\n    padding-left: 1.5rem !important;\n    padding-right: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-p-2-half-s {\n    padding: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pt-2-half-s {\n    padding-top: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pb-2-half-s {\n    padding-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pl-2-half-s {\n    padding-left: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pr-2-half-s {\n    padding-right: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pv-2-half-s {\n    padding-top: 2.5rem !important;\n    padding-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ph-2-half-s {\n    padding-left: 2.5rem !important;\n    padding-right: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-0-s {\n    margin: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-0-s {\n    margin-top: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-0-s {\n    margin-bottom: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-0-s {\n    margin-left: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-0-s {\n    margin-right: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-0-s {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-0-s {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-1-s {\n    margin: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-1-s {\n    margin-top: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-1-s {\n    margin-bottom: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-1-s {\n    margin-left: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-1-s {\n    margin-right: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-1-s {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-1-s {\n    margin-left: 1rem !important;\n    margin-right: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-2-s {\n    margin: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-2-s {\n    margin-top: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-2-s {\n    margin-bottom: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-2-s {\n    margin-left: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-2-s {\n    margin-right: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-2-s {\n    margin-top: 2rem !important;\n    margin-bottom: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-2-s {\n    margin-left: 2rem !important;\n    margin-right: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-3-s {\n    margin: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-3-s {\n    margin-top: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-3-s {\n    margin-bottom: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-3-s {\n    margin-left: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-3-s {\n    margin-right: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-3-s {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-3-s {\n    margin-left: 3rem !important;\n    margin-right: 3rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-auto-s {\n    margin: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-auto-s {\n    margin-top: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-auto-s {\n    margin-bottom: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-auto-s {\n    margin-left: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-auto-s {\n    margin-right: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-auto-s {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-auto-s {\n    margin-left: auto !important;\n    margin-right: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-half-s {\n    margin: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-half-s {\n    margin-top: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-half-s {\n    margin-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-half-s {\n    margin-left: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-half-s {\n    margin-right: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-half-s {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-half-s {\n    margin-left: 0.5rem !important;\n    margin-right: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-1-half-s {\n    margin: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-1-half-s {\n    margin-top: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-1-half-s {\n    margin-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-1-half-s {\n    margin-left: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-1-half-s {\n    margin-right: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-1-half-s {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-1-half-s {\n    margin-left: 1.5rem !important;\n    margin-right: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-m-2-half-s {\n    margin: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mt-2-half-s {\n    margin-top: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mb-2-half-s {\n    margin-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ml-2-half-s {\n    margin-left: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mr-2-half-s {\n    margin-right: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mv-2-half-s {\n    margin-top: 2.5rem !important;\n    margin-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mh-2-half-s {\n    margin-left: 2.5rem !important;\n    margin-right: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-0-m {\n    padding: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-0-m {\n    padding-top: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-0-m {\n    padding-bottom: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-0-m {\n    padding-left: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-0-m {\n    padding-right: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-0-m {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-0-m {\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-1-m {\n    padding: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-1-m {\n    padding-top: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-1-m {\n    padding-bottom: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-1-m {\n    padding-left: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-1-m {\n    padding-right: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-1-m {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-1-m {\n    padding-left: 1rem !important;\n    padding-right: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-2-m {\n    padding: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-2-m {\n    padding-top: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-2-m {\n    padding-bottom: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-2-m {\n    padding-left: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-2-m {\n    padding-right: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-2-m {\n    padding-top: 2rem !important;\n    padding-bottom: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-2-m {\n    padding-left: 2rem !important;\n    padding-right: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-3-m {\n    padding: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-3-m {\n    padding-top: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-3-m {\n    padding-bottom: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-3-m {\n    padding-left: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-3-m {\n    padding-right: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-3-m {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-3-m {\n    padding-left: 3rem !important;\n    padding-right: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-auto-m {\n    padding: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-auto-m {\n    padding-top: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-auto-m {\n    padding-bottom: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-auto-m {\n    padding-left: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-auto-m {\n    padding-right: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-auto-m {\n    padding-top: auto !important;\n    padding-bottom: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-auto-m {\n    padding-left: auto !important;\n    padding-right: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-half-m {\n    padding: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-half-m {\n    padding-top: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-half-m {\n    padding-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-half-m {\n    padding-left: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-half-m {\n    padding-right: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-half-m {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-half-m {\n    padding-left: 0.5rem !important;\n    padding-right: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-1-half-m {\n    padding: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-1-half-m {\n    padding-top: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-1-half-m {\n    padding-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-1-half-m {\n    padding-left: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-1-half-m {\n    padding-right: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-1-half-m {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-1-half-m {\n    padding-left: 1.5rem !important;\n    padding-right: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-p-2-half-m {\n    padding: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pt-2-half-m {\n    padding-top: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pb-2-half-m {\n    padding-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pl-2-half-m {\n    padding-left: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pr-2-half-m {\n    padding-right: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pv-2-half-m {\n    padding-top: 2.5rem !important;\n    padding-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ph-2-half-m {\n    padding-left: 2.5rem !important;\n    padding-right: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-0-m {\n    margin: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-0-m {\n    margin-top: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-0-m {\n    margin-bottom: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-0-m {\n    margin-left: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-0-m {\n    margin-right: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-0-m {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-0-m {\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-1-m {\n    margin: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-1-m {\n    margin-top: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-1-m {\n    margin-bottom: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-1-m {\n    margin-left: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-1-m {\n    margin-right: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-1-m {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-1-m {\n    margin-left: 1rem !important;\n    margin-right: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-2-m {\n    margin: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-2-m {\n    margin-top: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-2-m {\n    margin-bottom: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-2-m {\n    margin-left: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-2-m {\n    margin-right: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-2-m {\n    margin-top: 2rem !important;\n    margin-bottom: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-2-m {\n    margin-left: 2rem !important;\n    margin-right: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-3-m {\n    margin: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-3-m {\n    margin-top: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-3-m {\n    margin-bottom: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-3-m {\n    margin-left: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-3-m {\n    margin-right: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-3-m {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-3-m {\n    margin-left: 3rem !important;\n    margin-right: 3rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-auto-m {\n    margin: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-auto-m {\n    margin-top: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-auto-m {\n    margin-bottom: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-auto-m {\n    margin-left: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-auto-m {\n    margin-right: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-auto-m {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-auto-m {\n    margin-left: auto !important;\n    margin-right: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-half-m {\n    margin: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-half-m {\n    margin-top: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-half-m {\n    margin-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-half-m {\n    margin-left: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-half-m {\n    margin-right: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-half-m {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-half-m {\n    margin-left: 0.5rem !important;\n    margin-right: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-1-half-m {\n    margin: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-1-half-m {\n    margin-top: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-1-half-m {\n    margin-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-1-half-m {\n    margin-left: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-1-half-m {\n    margin-right: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-1-half-m {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-1-half-m {\n    margin-left: 1.5rem !important;\n    margin-right: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-m-2-half-m {\n    margin: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mt-2-half-m {\n    margin-top: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mb-2-half-m {\n    margin-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ml-2-half-m {\n    margin-left: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mr-2-half-m {\n    margin-right: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mv-2-half-m {\n    margin-top: 2.5rem !important;\n    margin-bottom: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mh-2-half-m {\n    margin-left: 2.5rem !important;\n    margin-right: 2.5rem !important;\n  }\n}\n.u-pos-absolute {\n  position: absolute;\n}\n.u-pos-relative {\n  position: relative;\n}\n.u-pos-fixed {\n  position: fixed;\n}\n.u-pos-sticky {\n  position: sticky;\n}\n.u-pos-static {\n  position: static;\n}\n@media (max-width: 30rem) {\n  .u-pos-absolute-t {\n    position: absolute;\n  }\n  .u-pos-relative-t {\n    position: relative;\n  }\n  .u-pos-fixed-t {\n    position: fixed;\n  }\n  .u-pos-sticky-t {\n    position: sticky;\n  }\n  .u-pos-static-t {\n    position: static;\n  }\n}\n@media (max-width: 48rem) {\n  .u-pos-absolute-s {\n    position: absolute;\n  }\n  .u-pos-relative-s {\n    position: relative;\n  }\n  .u-pos-fixed-s {\n    position: fixed;\n  }\n  .u-pos-sticky-s {\n    position: sticky;\n  }\n  .u-pos-static-s {\n    position: static;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-pos-absolute-m {\n    position: absolute;\n  }\n  .u-pos-relative-m {\n    position: relative;\n  }\n  .u-pos-fixed-m {\n    position: fixed;\n  }\n  .u-pos-sticky-m {\n    position: sticky;\n  }\n  .u-pos-static-m {\n    position: static;\n  }\n}\n.u-top-m {\n  top: 1rem;\n}\n.u-top-xs {\n  top: 0.5rem;\n}\n.u-top-s {\n  top: 0.75rem;\n}\n.u-top-l {\n  top: 1.5rem;\n}\n.u-top-xl {\n  top: 2rem;\n}\n.u-top-xxl {\n  top: 3rem;\n}\n.u-top-0 {\n  top: 0;\n}\n.u-bottom-m {\n  bottom: 1rem;\n}\n.u-bottom-xs {\n  bottom: 0.5rem;\n}\n.u-bottom-s {\n  bottom: 0.75rem;\n}\n.u-bottom-l {\n  bottom: 1.5rem;\n}\n.u-bottom-xl {\n  bottom: 2rem;\n}\n.u-bottom-xxl {\n  bottom: 3rem;\n}\n.u-bottom-0 {\n  bottom: 0;\n}\n.u-left-m {\n  left: 1rem;\n}\n.u-left-xs {\n  left: 0.5rem;\n}\n.u-left-s {\n  left: 0.75rem;\n}\n.u-left-l {\n  left: 1.5rem;\n}\n.u-left-xl {\n  left: 2rem;\n}\n.u-left-xxl {\n  left: 3rem;\n}\n.u-left-0 {\n  left: 0;\n}\n.u-right-m {\n  right: 1rem;\n}\n.u-right-xs {\n  right: 0.5rem;\n}\n.u-right-s {\n  right: 0.75rem;\n}\n.u-right-l {\n  right: 1.5rem;\n}\n.u-right-xl {\n  right: 2rem;\n}\n.u-right-xxl {\n  right: 3rem;\n}\n.u-right-0 {\n  right: 0;\n}\n.u-miw-1 {\n  min-width: 1rem !important;\n}\n.u-maw-1 {\n  max-width: 1rem !important;\n}\n.u-mih-1 {\n  min-height: 1rem !important;\n}\n.u-mah-1 {\n  max-height: 1rem !important;\n}\n.u-miw-2 {\n  min-width: 2rem !important;\n}\n.u-maw-2 {\n  max-width: 2rem !important;\n}\n.u-mih-2 {\n  min-height: 2rem !important;\n}\n.u-mah-2 {\n  max-height: 2rem !important;\n}\n.u-miw-3 {\n  min-width: 4rem !important;\n}\n.u-maw-3 {\n  max-width: 4rem !important;\n}\n.u-mih-3 {\n  min-height: 4rem !important;\n}\n.u-mah-3 {\n  max-height: 4rem !important;\n}\n.u-miw-4 {\n  min-width: 8rem !important;\n}\n.u-maw-4 {\n  max-width: 8rem !important;\n}\n.u-mih-4 {\n  min-height: 8rem !important;\n}\n.u-mah-4 {\n  max-height: 8rem !important;\n}\n.u-miw-5 {\n  min-width: 16rem !important;\n}\n.u-maw-5 {\n  max-width: 16rem !important;\n}\n.u-mih-5 {\n  min-height: 16rem !important;\n}\n.u-mah-5 {\n  max-height: 16rem !important;\n}\n.u-miw-6 {\n  min-width: 32rem !important;\n}\n.u-maw-6 {\n  max-width: 32rem !important;\n}\n.u-mih-6 {\n  min-height: 32rem !important;\n}\n.u-mah-6 {\n  max-height: 32rem !important;\n}\n.u-miw-7 {\n  min-width: 48rem !important;\n}\n.u-maw-7 {\n  max-width: 48rem !important;\n}\n.u-mih-7 {\n  min-height: 48rem !important;\n}\n.u-mah-7 {\n  max-height: 48rem !important;\n}\n.u-miw-8 {\n  min-width: 64rem !important;\n}\n.u-maw-8 {\n  max-width: 64rem !important;\n}\n.u-mih-8 {\n  min-height: 64rem !important;\n}\n.u-mah-8 {\n  max-height: 64rem !important;\n}\n.u-miw-9 {\n  min-width: 96rem !important;\n}\n.u-maw-9 {\n  max-width: 96rem !important;\n}\n.u-mih-9 {\n  min-height: 96rem !important;\n}\n.u-mah-9 {\n  max-height: 96rem !important;\n}\n.u-miw-100 {\n  min-width: 100% !important;\n}\n.u-maw-100 {\n  max-width: 100% !important;\n}\n.u-mih-100 {\n  min-height: 100% !important;\n}\n.u-mah-100 {\n  max-height: 100% !important;\n}\n.u-maw-none {\n  max-width: none !important;\n}\n.u-mah-none {\n  max-height: none !important;\n}\n.u-miw-auto {\n  min-width: auto !important;\n}\n.u-mih-auto {\n  min-height: auto !important;\n}\n.u-miw-half {\n  min-width: 0.5rem !important;\n}\n.u-maw-half {\n  max-width: 0.5rem !important;\n}\n.u-mih-half {\n  min-height: 0.5rem !important;\n}\n.u-mah-half {\n  max-height: 0.5rem !important;\n}\n.u-miw-1-half {\n  min-width: 1.5rem !important;\n}\n.u-maw-1-half {\n  max-width: 1.5rem !important;\n}\n.u-mih-1-half {\n  min-height: 1.5rem !important;\n}\n.u-mah-1-half {\n  max-height: 1.5rem !important;\n}\n.u-miw-2-half {\n  min-width: 2.5rem !important;\n}\n.u-maw-2-half {\n  max-width: 2.5rem !important;\n}\n.u-mih-2-half {\n  min-height: 2.5rem !important;\n}\n.u-mah-2-half {\n  max-height: 2.5rem !important;\n}\n@media (max-width: 30rem) {\n  .u-miw-1-t {\n    min-width: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-1-t {\n    max-width: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-1-t {\n    min-height: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-1-t {\n    max-height: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-2-t {\n    min-width: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-2-t {\n    max-width: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-2-t {\n    min-height: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-2-t {\n    max-height: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-3-t {\n    min-width: 4rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-3-t {\n    max-width: 4rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-3-t {\n    min-height: 4rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-3-t {\n    max-height: 4rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-4-t {\n    min-width: 8rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-4-t {\n    max-width: 8rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-4-t {\n    min-height: 8rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-4-t {\n    max-height: 8rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-5-t {\n    min-width: 16rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-5-t {\n    max-width: 16rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-5-t {\n    min-height: 16rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-5-t {\n    max-height: 16rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-6-t {\n    min-width: 32rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-6-t {\n    max-width: 32rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-6-t {\n    min-height: 32rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-6-t {\n    max-height: 32rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-7-t {\n    min-width: 48rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-7-t {\n    max-width: 48rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-7-t {\n    min-height: 48rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-7-t {\n    max-height: 48rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-8-t {\n    min-width: 64rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-8-t {\n    max-width: 64rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-8-t {\n    min-height: 64rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-8-t {\n    max-height: 64rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-9-t {\n    min-width: 96rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-9-t {\n    max-width: 96rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-9-t {\n    min-height: 96rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-9-t {\n    max-height: 96rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-100-t {\n    min-width: 100% !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-100-t {\n    max-width: 100% !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-100-t {\n    min-height: 100% !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-100-t {\n    max-height: 100% !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-none-t {\n    max-width: none !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-none-t {\n    max-height: none !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-auto-t {\n    min-width: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-auto-t {\n    min-height: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-half-t {\n    min-width: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-half-t {\n    max-width: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-half-t {\n    min-height: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-half-t {\n    max-height: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-1-half-t {\n    min-width: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-1-half-t {\n    max-width: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-1-half-t {\n    min-height: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-1-half-t {\n    max-height: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-miw-2-half-t {\n    min-width: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-maw-2-half-t {\n    max-width: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mih-2-half-t {\n    min-height: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-mah-2-half-t {\n    max-height: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-1-s {\n    min-width: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-1-s {\n    max-width: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-1-s {\n    min-height: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-1-s {\n    max-height: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-2-s {\n    min-width: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-2-s {\n    max-width: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-2-s {\n    min-height: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-2-s {\n    max-height: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-3-s {\n    min-width: 4rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-3-s {\n    max-width: 4rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-3-s {\n    min-height: 4rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-3-s {\n    max-height: 4rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-4-s {\n    min-width: 8rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-4-s {\n    max-width: 8rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-4-s {\n    min-height: 8rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-4-s {\n    max-height: 8rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-5-s {\n    min-width: 16rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-5-s {\n    max-width: 16rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-5-s {\n    min-height: 16rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-5-s {\n    max-height: 16rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-6-s {\n    min-width: 32rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-6-s {\n    max-width: 32rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-6-s {\n    min-height: 32rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-6-s {\n    max-height: 32rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-7-s {\n    min-width: 48rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-7-s {\n    max-width: 48rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-7-s {\n    min-height: 48rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-7-s {\n    max-height: 48rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-8-s {\n    min-width: 64rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-8-s {\n    max-width: 64rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-8-s {\n    min-height: 64rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-8-s {\n    max-height: 64rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-9-s {\n    min-width: 96rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-9-s {\n    max-width: 96rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-9-s {\n    min-height: 96rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-9-s {\n    max-height: 96rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-100-s {\n    min-width: 100% !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-100-s {\n    max-width: 100% !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-100-s {\n    min-height: 100% !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-100-s {\n    max-height: 100% !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-none-s {\n    max-width: none !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-none-s {\n    max-height: none !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-auto-s {\n    min-width: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-auto-s {\n    min-height: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-half-s {\n    min-width: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-half-s {\n    max-width: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-half-s {\n    min-height: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-half-s {\n    max-height: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-1-half-s {\n    min-width: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-1-half-s {\n    max-width: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-1-half-s {\n    min-height: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-1-half-s {\n    max-height: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-miw-2-half-s {\n    min-width: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-maw-2-half-s {\n    max-width: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mih-2-half-s {\n    min-height: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-mah-2-half-s {\n    max-height: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-1-m {\n    min-width: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-1-m {\n    max-width: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-1-m {\n    min-height: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-1-m {\n    max-height: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-2-m {\n    min-width: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-2-m {\n    max-width: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-2-m {\n    min-height: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-2-m {\n    max-height: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-3-m {\n    min-width: 4rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-3-m {\n    max-width: 4rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-3-m {\n    min-height: 4rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-3-m {\n    max-height: 4rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-4-m {\n    min-width: 8rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-4-m {\n    max-width: 8rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-4-m {\n    min-height: 8rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-4-m {\n    max-height: 8rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-5-m {\n    min-width: 16rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-5-m {\n    max-width: 16rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-5-m {\n    min-height: 16rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-5-m {\n    max-height: 16rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-6-m {\n    min-width: 32rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-6-m {\n    max-width: 32rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-6-m {\n    min-height: 32rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-6-m {\n    max-height: 32rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-7-m {\n    min-width: 48rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-7-m {\n    max-width: 48rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-7-m {\n    min-height: 48rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-7-m {\n    max-height: 48rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-8-m {\n    min-width: 64rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-8-m {\n    max-width: 64rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-8-m {\n    min-height: 64rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-8-m {\n    max-height: 64rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-9-m {\n    min-width: 96rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-9-m {\n    max-width: 96rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-9-m {\n    min-height: 96rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-9-m {\n    max-height: 96rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-100-m {\n    min-width: 100% !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-100-m {\n    max-width: 100% !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-100-m {\n    min-height: 100% !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-100-m {\n    max-height: 100% !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-none-m {\n    max-width: none !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-none-m {\n    max-height: none !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-auto-m {\n    min-width: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-auto-m {\n    min-height: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-half-m {\n    min-width: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-half-m {\n    max-width: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-half-m {\n    min-height: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-half-m {\n    max-height: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-1-half-m {\n    min-width: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-1-half-m {\n    max-width: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-1-half-m {\n    min-height: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-1-half-m {\n    max-height: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-miw-2-half-m {\n    min-width: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-maw-2-half-m {\n    max-width: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mih-2-half-m {\n    min-height: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-mah-2-half-m {\n    max-height: 2.5rem !important;\n  }\n}\n.u-w-1 {\n  width: 1rem !important;\n}\n.u-h-1 {\n  height: 1rem !important;\n}\n.u-w-2 {\n  width: 2rem !important;\n}\n.u-h-2 {\n  height: 2rem !important;\n}\n.u-w-3 {\n  width: 4rem !important;\n}\n.u-h-3 {\n  height: 4rem !important;\n}\n.u-w-4 {\n  width: 8rem !important;\n}\n.u-h-4 {\n  height: 8rem !important;\n}\n.u-w-5 {\n  width: 16rem !important;\n}\n.u-h-5 {\n  height: 16rem !important;\n}\n.u-w-6 {\n  width: 32rem !important;\n}\n.u-h-6 {\n  height: 32rem !important;\n}\n.u-w-7 {\n  width: 48rem !important;\n}\n.u-h-7 {\n  height: 48rem !important;\n}\n.u-w-8 {\n  width: 64rem !important;\n}\n.u-h-8 {\n  height: 64rem !important;\n}\n.u-w-9 {\n  width: 96rem !important;\n}\n.u-h-9 {\n  height: 96rem !important;\n}\n.u-w-100 {\n  width: 100% !important;\n}\n.u-h-100 {\n  height: 100% !important;\n}\n.u-w-auto {\n  width: auto !important;\n}\n.u-h-auto {\n  height: auto !important;\n}\n.u-w-half {\n  width: 0.5rem !important;\n}\n.u-h-half {\n  height: 0.5rem !important;\n}\n.u-w-1-half {\n  width: 1.5rem !important;\n}\n.u-h-1-half {\n  height: 1.5rem !important;\n}\n.u-w-2-half {\n  width: 2.5rem !important;\n}\n.u-h-2-half {\n  height: 2.5rem !important;\n}\n@media (max-width: 30rem) {\n  .u-w-1-t {\n    width: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-1-t {\n    height: 1rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-2-t {\n    width: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-2-t {\n    height: 2rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-3-t {\n    width: 4rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-3-t {\n    height: 4rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-4-t {\n    width: 8rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-4-t {\n    height: 8rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-5-t {\n    width: 16rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-5-t {\n    height: 16rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-6-t {\n    width: 32rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-6-t {\n    height: 32rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-7-t {\n    width: 48rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-7-t {\n    height: 48rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-8-t {\n    width: 64rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-8-t {\n    height: 64rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-9-t {\n    width: 96rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-9-t {\n    height: 96rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-100-t {\n    width: 100% !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-100-t {\n    height: 100% !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-auto-t {\n    width: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-auto-t {\n    height: auto !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-half-t {\n    width: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-half-t {\n    height: 0.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-1-half-t {\n    width: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-1-half-t {\n    height: 1.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-w-2-half-t {\n    width: 2.5rem !important;\n  }\n}\n@media (max-width: 30rem) {\n  .u-h-2-half-t {\n    height: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-1-s {\n    width: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-1-s {\n    height: 1rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-2-s {\n    width: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-2-s {\n    height: 2rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-3-s {\n    width: 4rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-3-s {\n    height: 4rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-4-s {\n    width: 8rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-4-s {\n    height: 8rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-5-s {\n    width: 16rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-5-s {\n    height: 16rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-6-s {\n    width: 32rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-6-s {\n    height: 32rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-7-s {\n    width: 48rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-7-s {\n    height: 48rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-8-s {\n    width: 64rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-8-s {\n    height: 64rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-9-s {\n    width: 96rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-9-s {\n    height: 96rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-100-s {\n    width: 100% !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-100-s {\n    height: 100% !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-auto-s {\n    width: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-auto-s {\n    height: auto !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-half-s {\n    width: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-half-s {\n    height: 0.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-1-half-s {\n    width: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-1-half-s {\n    height: 1.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-w-2-half-s {\n    width: 2.5rem !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-h-2-half-s {\n    height: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-1-m {\n    width: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-1-m {\n    height: 1rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-2-m {\n    width: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-2-m {\n    height: 2rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-3-m {\n    width: 4rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-3-m {\n    height: 4rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-4-m {\n    width: 8rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-4-m {\n    height: 8rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-5-m {\n    width: 16rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-5-m {\n    height: 16rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-6-m {\n    width: 32rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-6-m {\n    height: 32rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-7-m {\n    width: 48rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-7-m {\n    height: 48rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-8-m {\n    width: 64rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-8-m {\n    height: 64rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-9-m {\n    width: 96rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-9-m {\n    height: 96rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-100-m {\n    width: 100% !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-100-m {\n    height: 100% !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-auto-m {\n    width: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-auto-m {\n    height: auto !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-half-m {\n    width: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-half-m {\n    height: 0.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-1-half-m {\n    width: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-1-half-m {\n    height: 1.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-w-2-half-m {\n    width: 2.5rem !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-h-2-half-m {\n    height: 2.5rem !important;\n  }\n}\n@-moz-keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@-webkit-keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@-o-keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n@-moz-keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n@-webkit-keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n@-o-keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n@keyframes shake {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n.u-visuallyhidden,\n.coz-bar-hidden {\n  position: absolute !important;\n  border: 0 !important;\n  width: 0.063rem !important;\n  height: 0.063rem !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n  white-space: nowrap !important;\n  clip: rect(0.063rem, 0.063rem, 0.063rem, 0.063rem) !important;\n  clip-path: inset(50%) !important;\n}\n.u-hide {\n  display: none !important;\n  visibility: hidden !important;\n}\n@media (max-width: 63.938rem) {\n  .u-hide--mob {\n    display: none !important;\n  }\n}\n@media (min-width: 64rem) {\n  .u-hide--tablet {\n    display: none !important;\n  }\n}\n@media (min-width: 48.063rem) {\n  .u-hide--desk {\n    display: none !important;\n  }\n}\n.u-dn {\n  display: none;\n}\n.u-di {\n  display: inline;\n}\n.u-db {\n  display: block;\n}\n.u-dib {\n  display: inline-block;\n}\n.u-dit {\n  display: inline-table;\n}\n.u-dt {\n  display: table;\n}\n.u-dtc {\n  display: table-cell;\n}\n.u-dt-row {\n  display: table-row;\n}\n.u-dt-row-group {\n  display: table-row-group;\n}\n.u-dt-column {\n  display: table-column;\n}\n.u-dt-column-group {\n  display: table-column-group;\n}\n@media (max-width: 30rem) {\n  .u-dn-t {\n    display: none;\n  }\n  .u-di-t {\n    display: inline;\n  }\n  .u-db-t {\n    display: block;\n  }\n  .u-dib-t {\n    display: inline-block;\n  }\n  .u-dit-t {\n    display: inline-table;\n  }\n  .u-dt-t {\n    display: table;\n  }\n  .u-dtc-t {\n    display: table-cell;\n  }\n  .u-dt-row-t {\n    display: table-row;\n  }\n  .u-dt-row-group-t {\n    display: table-row-group;\n  }\n  .u-dt-column-t {\n    display: table-column;\n  }\n  .u-dt-column-group-t {\n    display: table-column-group;\n  }\n}\n@media (max-width: 48rem) {\n  .u-dn-s {\n    display: none;\n  }\n  .u-di-s {\n    display: inline;\n  }\n  .u-db-s {\n    display: block;\n  }\n  .u-dib-s {\n    display: inline-block;\n  }\n  .u-dit-s {\n    display: inline-table;\n  }\n  .u-dt-s {\n    display: table;\n  }\n  .u-dtc-s {\n    display: table-cell;\n  }\n  .u-dt-row-s {\n    display: table-row;\n  }\n  .u-dt-row-group-s {\n    display: table-row-group;\n  }\n  .u-dt-column-s {\n    display: table-column;\n  }\n  .u-dt-column-group-s {\n    display: table-column-group;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-dn-m {\n    display: none;\n  }\n  .u-di-m {\n    display: inline;\n  }\n  .u-db-m {\n    display: block;\n  }\n  .u-dib-m {\n    display: inline-block;\n  }\n  .u-dit-m {\n    display: inline-table;\n  }\n  .u-dt-m {\n    display: table;\n  }\n  .u-dtc-m {\n    display: table-cell;\n  }\n  .u-dt-row-m {\n    display: table-row;\n  }\n  .u-dt-row-group-m {\n    display: table-row-group;\n  }\n  .u-dt-column-m {\n    display: table-column;\n  }\n  .u-dt-column-group-m {\n    display: table-column-group;\n  }\n}\n.u-black {\n  color: var(--black) !important;\n}\n.u-charcoalGrey {\n  color: var(--charcoalGrey) !important;\n}\n.u-coolGrey {\n  color: var(--coolGrey) !important;\n}\n.u-silver {\n  color: var(--silver) !important;\n}\n.u-slateGrey {\n  color: var(--slateGrey) !important;\n}\n.u-lightishPurple {\n  color: #b449e7 !important;\n}\n.u-dodgerBlue {\n  color: #297ef2 !important;\n}\n.u-overlay {\n  color: var(--overlay) !important;\n}\n.u-paleGrey {\n  color: var(--paleGrey) !important;\n}\n.u-monza {\n  color: #dd0505 !important;\n}\n.u-pomegranate {\n  color: #f52d2d !important;\n}\n.u-primaryBackgroundLight {\n  color: var(--primaryBackgroundLight) !important;\n}\n.u-primaryColor {\n  color: var(--primaryColor) !important;\n}\n.u-primaryColorLight {\n  color: var(--primaryColorLight) !important;\n}\n.u-primaryContrastTextColor {\n  color: var(--primaryContrastTextColor) !important;\n}\n.u-error {\n  color: var(--errorColor) !important;\n}\n.u-errorBackground {\n  color: var(--errorBackground) !important;\n}\n.u-success {\n  color: var(--successColor) !important;\n}\n.u-warning {\n  color: var(--warningColor) !important;\n}\n.u-info {\n  color: var(--infoColor) !important;\n}\n.u-weirdGreen {\n  color: #40de8e !important;\n}\n.u-white {\n  color: var(--white) !important;\n}\n.u-breakword {\n  word-break: break-word;\n}\n.u-ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.u-spacellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: break-spaces;\n}\n@media (max-width: 30rem) {\n  .u-spacellipsis-t {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: break-spaces;\n  }\n}\n@media (max-width: 48rem) {\n  .u-spacellipsis-s {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: break-spaces;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-spacellipsis-m {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: break-spaces;\n  }\n}\n.u-midellipsis {\n  display: flex;\n  flex-wrap: nowrap;\n}\n.u-midellipsis > * {\n  display: inline-block;\n  max-width: 50%;\n  overflow: hidden;\n  white-space: pre;\n}\n.u-midellipsis > :first-child {\n  text-overflow: ellipsis;\n}\n.u-midellipsis > :last-child {\n  text-overflow: clip;\n  direction: rtl;\n}\n@supports (text-overflow: '[...]') {\n  .u-midellipsis > :first-child {\n    text-overflow: '[...]';\n  }\n}\n.u-link:link {\n  color: var(--linkColor) !important;\n  text-decoration: var(--linkTextDecoration) !important;\n}\n.u-link:visited,\n.u-link:active,\n.u-link:hover,\n.u-link:focus {\n  color: var(--linkColorActive) !important;\n}\n.u-lh-tiny {\n  line-height: 1 !important;\n}\n.u-lh-xsmall {\n  line-height: 1.1 !important;\n}\n.u-lh-small {\n  line-height: 1.2 !important;\n}\n.u-lh-medium {\n  line-height: 1.3 !important;\n}\n.u-lh-large {\n  line-height: 1.4 !important;\n}\n.u-lh-xlarge {\n  line-height: 1.5 !important;\n}\n.u-fz-tiny {\n  font-size: 0.75rem !important;\n  line-height: 1.3 !important;\n}\n.u-fz-xsmall {\n  font-size: 0.813rem !important;\n  line-height: 1.4 !important;\n}\n.u-fz-small {\n  font-size: 0.875rem !important;\n  line-height: 1.4 !important;\n}\n.u-fz-medium {\n  font-size: 1rem !important;\n  line-height: 1.5 !important;\n}\n.u-fz-large {\n  font-size: 1.125rem !important;\n  line-height: 1.5 !important;\n}\n@media (max-width: 30rem) {\n  .u-fz-tiny-t {\n    font-size: 0.75rem !important;\n    line-height: 1.3 !important;\n  }\n  .u-fz-xsmall-t {\n    font-size: 0.813rem !important;\n    line-height: 1.4 !important;\n  }\n  .u-fz-small-t {\n    font-size: 0.875rem !important;\n    line-height: 1.4 !important;\n  }\n  .u-fz-medium-t {\n    font-size: 1rem !important;\n    line-height: 1.5 !important;\n  }\n  .u-fz-large-t {\n    font-size: 1.125rem !important;\n    line-height: 1.5 !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-fz-tiny-s {\n    font-size: 0.75rem !important;\n    line-height: 1.3 !important;\n  }\n  .u-fz-xsmall-s {\n    font-size: 0.813rem !important;\n    line-height: 1.4 !important;\n  }\n  .u-fz-small-s {\n    font-size: 0.875rem !important;\n    line-height: 1.4 !important;\n  }\n  .u-fz-medium-s {\n    font-size: 1rem !important;\n    line-height: 1.5 !important;\n  }\n  .u-fz-large-s {\n    font-size: 1.125rem !important;\n    line-height: 1.5 !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-fz-tiny-m {\n    font-size: 0.75rem !important;\n    line-height: 1.3 !important;\n  }\n  .u-fz-xsmall-m {\n    font-size: 0.813rem !important;\n    line-height: 1.4 !important;\n  }\n  .u-fz-small-m {\n    font-size: 0.875rem !important;\n    line-height: 1.4 !important;\n  }\n  .u-fz-medium-m {\n    font-size: 1rem !important;\n    line-height: 1.5 !important;\n  }\n  .u-fz-large-m {\n    font-size: 1.125rem !important;\n    line-height: 1.5 !important;\n  }\n}\n.u-ta-left {\n  text-align: left !important;\n}\n.u-ta-right {\n  text-align: right !important;\n}\n.u-ta-center {\n  text-align: center !important;\n}\n.u-ta-justify {\n  text-align: justify !important;\n}\n@media (max-width: 30rem) {\n  .u-ta-left-t {\n    text-align: left !important;\n  }\n  .u-ta-right-t {\n    text-align: right !important;\n  }\n  .u-ta-center-t {\n    text-align: center !important;\n  }\n  .u-ta-justify-t {\n    text-align: justify !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-ta-left-s {\n    text-align: left !important;\n  }\n  .u-ta-right-s {\n    text-align: right !important;\n  }\n  .u-ta-center-s {\n    text-align: center !important;\n  }\n  .u-ta-justify-s {\n    text-align: justify !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-ta-left-m {\n    text-align: left !important;\n  }\n  .u-ta-right-m {\n    text-align: right !important;\n  }\n  .u-ta-center-m {\n    text-align: center !important;\n  }\n  .u-ta-justify-m {\n    text-align: justify !important;\n  }\n}\n.u-fs-normal {\n  font-style: normal !important;\n}\n.u-fs-italic {\n  font-style: italic !important;\n}\n@media (max-width: 30rem) {\n  .u-fs-normal-t {\n    font-style: normal !important;\n  }\n  .u-fs-italic-t {\n    font-style: italic !important;\n  }\n}\n@media (max-width: 48rem) {\n  .u-fs-normal-s {\n    font-style: normal !important;\n  }\n  .u-fs-italic-s {\n    font-style: italic !important;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-fs-normal-m {\n    font-style: normal !important;\n  }\n  .u-fs-italic-m {\n    font-style: italic !important;\n  }\n}\n.u-fw-normal {\n  font-weight: normal;\n}\n.u-fw-bold {\n  font-weight: bold;\n}\n@media (max-width: 30rem) {\n  .u-fw-normal-t {\n    font-weight: normal;\n  }\n  .u-fw-bold-t {\n    font-weight: bold;\n  }\n}\n@media (max-width: 48rem) {\n  .u-fw-normal-s {\n    font-weight: normal;\n  }\n  .u-fw-bold-s {\n    font-weight: bold;\n  }\n}\n@media (max-width: 63.938rem) {\n  .u-fw-normal-m {\n    font-weight: normal;\n  }\n  .u-fw-bold-m {\n    font-weight: bold;\n  }\n}\n@media (pointer: coarse) {\n}\n:root {\n  --z-index-bar: 21;\n  --z-index-selection: 30;\n  --z-index-over-selection: 31;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/cozy-bar/transpiled/cozy-bar.css":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/cozy-bar/transpiled/cozy-bar.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader/dist/cjs.js!./cozy-bar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/cozy-bar/transpiled/cozy-bar.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);