'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Story = exports.withMetaInfo = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.setDefaults = setDefaults;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Story = require('./components/Story');

var _Story2 = _interopRequireDefault(_Story);

var _markdown = require('./components/markdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  inline: false,
  header: true,
  source: true,
  propTables: [],
  maxPropsIntoLine: 3,
  maxPropObjectKeys: 3,
  maxPropArrayLength: 3,
  maxPropStringLength: 50
};

var defaultMarksyConf = {
  h1: _markdown.H1,
  h2: _markdown.H2,
  h3: _markdown.H3,
  h4: _markdown.H4,
  h5: _markdown.H5,
  h6: _markdown.H6,
  code: _markdown.Code,
  p: _markdown.P,
  a: _markdown.A,
  li: _markdown.LI,
  ul: _markdown.UL
};

function addInfo(storyFn, context, infoOptions) {
  var options = (0, _extends3.default)({}, defaultOptions, infoOptions);

  // props.propTables can only be either an array of components or null
  // propTables option is allowed to be set to 'false' (a boolean)
  // if the option is false, replace it with null to avoid react warnings
  if (!options.propTables) {
    options.propTables = null;
  }

  var marksyConf = (0, _extends3.default)({}, defaultMarksyConf);
  if (options && options.marksyConf) {
    (0, _assign2.default)(marksyConf, options.marksyConf);
  }
  var props = {
    info: options.text,
    context: context,
    showInline: Boolean(options.inline),
    showHeader: Boolean(options.header),
    showSource: Boolean(options.source),
    propTables: options.propTables,
    propTablesExclude: options.propTablesExclude,
    styles: typeof options.styles === 'function' ? options.styles : function (s) {
      return s;
    },
    marksyConf: marksyConf,
    maxPropObjectKeys: options.maxPropObjectKeys,
    maxPropArrayLength: options.maxPropArrayLength,
    maxPropsIntoLine: options.maxPropsIntoLine,
    maxPropStringLength: options.maxPropStringLength
  };
  return _react2.default.createElement(
    _Story2.default,
    props,
    storyFn(context)
  );
}

var withMetaInfo = exports.withMetaInfo = function withMetaInfo(textOrOptions) {
  var options = typeof textOrOptions === 'string' ? { text: textOrOptions } : textOrOptions;
  return function (storyFn) {
    return function (context) {
      return addInfo(storyFn, context, options);
    };
  };
};

exports.Story = _Story2.default;
function setDefaults(newDefaults) {
  return (0, _assign2.default)(defaultOptions, newDefaults);
}