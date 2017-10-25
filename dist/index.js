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

var _marksy = require('./marksy');

var _marksy2 = _interopRequireDefault(_marksy);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

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

function addInfo(storyFn, context, infoOptions) {
  var options = (0, _extends3.default)({}, defaultOptions, infoOptions);

  var channel = _addons2.default.getChannel();
  var related = options.related || '';
  var ux = options.ux || '';
  channel.emit('storybooks/meta/related', {
    htmlToDisplay: _server2.default.renderToString((0, _marksy2.default)(related).tree),
    empty: !related
  });
  channel.emit('storybooks/meta/ux', {
    htmlToDisplay: _server2.default.renderToString((0, _marksy2.default)(ux).tree),
    empty: !ux
  });

  // props.propTables can only be either an array of components or null
  // propTables option is allowed to be set to 'false' (a boolean)
  // if the option is false, replace it with null to avoid react warnings
  if (!options.propTables) {
    options.propTables = null;
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