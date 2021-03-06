'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _global = require('global');

var _global2 = _interopRequireDefault(_global);

var _components = require('@storybook/components');

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

var _marksy = require('../marksy');

var _marksy2 = _interopRequireDefault(_marksy);

var _PropTable = require('./PropTable');

var _PropTable2 = _interopRequireDefault(_PropTable);

var _reactElementToJsxString = require('react-element-to-jsx-string');

var _reactElementToJsxString2 = _interopRequireDefault(_reactElementToJsxString);

var _server = require('react-dom/server');

var ReactDOMServer = _interopRequireWildcard(_server);

var _markdown = require('./markdown');

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.STORYBOOK_REACT_CLASSES = _global2.default.STORYBOOK_REACT_CLASSES || [];
var STORYBOOK_REACT_CLASSES = _global2.default.STORYBOOK_REACT_CLASSES;

var overlay = false;

var stylesheet = {
  link: {
    base: {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      display: 'block',
      position: 'fixed',
      textDecoration: 'none',
      background: '#28c',
      color: '#fff',
      padding: '5px 15px',
      cursor: 'pointer'
    },
    topRight: {
      top: 0,
      right: 0,
      borderRadius: '0 0 0 5px'
    }
  },
  info: {
    position: 'fixed',
    background: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0 40px',
    overflow: 'auto',
    zIndex: 99999
  },
  children: {
    position: 'relative',
    zIndex: 0
  },
  infoBody: (0, _extends3.default)({}, _components.baseFonts, {
    fontWeight: 300,
    lineHeight: 1.45,
    fontSize: '15px',
    border: '1px solid #eee',
    padding: '20px 40px 40px',
    borderRadius: '2px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#fff',
    marginTop: '50px'
  }),
  infoContent: {
    marginBottom: 0
  },
  infoStory: {},
  jsxInfoContent: {
    borderTop: '1px solid #eee',
    margin: '20px 0 0 0'
  },
  header: {
    h1: {
      margin: 0,
      padding: 0,
      fontSize: '35px'
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: '22px'
    },
    body: {
      borderBottom: '1px solid #eee',
      paddingTop: 10,
      marginBottom: 10
    }
  },
  source: {
    h1: {
      margin: '20px 0 0 0',
      padding: '0 0 5px 0',
      fontSize: '25px',
      borderBottom: '1px solid #EEE'
    }
  },
  propTableHead: {
    margin: '20px 0 0 0'
  }
};

var Story = function (_React$Component) {
  (0, _inherits3.default)(Story, _React$Component);

  function Story() {
    var _ref;

    (0, _classCallCheck3.default)(this, Story);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Story.__proto__ || (0, _getPrototypeOf2.default)(Story)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      open: false,
      stylesheet: _this.props.styles(JSON.parse((0, _stringify2.default)(stylesheet)))
    };
    _this.marksy = _marksy2.default;
    return _this;
  }

  (0, _createClass3.default)(Story, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        stylesheet: nextProps.styles(JSON.parse((0, _stringify2.default)(stylesheet)))
      });
    }
  }, {
    key: '_renderStory',
    value: function _renderStory() {
      return _react2.default.createElement(
        'div',
        { style: this.state.stylesheet.infoStory },
        this.props.children
      );
    }
  }, {
    key: '_renderInline',
    value: function _renderInline() {
      return _react2.default.createElement(
        'div',
        null,
        this._renderInlineHeader(),
        this._renderStory(),
        _react2.default.createElement(
          'div',
          { style: this.state.stylesheet.infoPage },
          _react2.default.createElement(
            'div',
            { style: this.state.stylesheet.infoBody },
            this._getInfoContent(),
            this._getComponentDescription(),
            this._getSourceCode(),
            this._getPropTables()
          )
        )
      );
    }
  }, {
    key: '_renderInlineHeader',
    value: function _renderInlineHeader() {
      var infoHeader = this._getInfoHeader();

      return infoHeader && _react2.default.createElement(
        'div',
        { style: this.state.stylesheet.infoPage },
        _react2.default.createElement(
          'div',
          { style: this.state.stylesheet.infoBody },
          infoHeader
        )
      );
    }
  }, {
    key: '_renderOverlay',
    value: function _renderOverlay() {
      var _this2 = this;

      var linkStyle = (0, _extends3.default)({}, stylesheet.link.base, stylesheet.link.topRight);

      var infoStyle = (0, _assign2.default)({}, stylesheet.info);
      if (!this.state.open) {
        infoStyle.display = 'none';
      }

      var openOverlay = function openOverlay() {
        _this2.setState({ open: true });
        return false;
      };

      var closeOverlay = function closeOverlay() {
        _this2.setState({ open: false });
        return false;
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: this.state.stylesheet.children },
          this.props.children
        ),
        overlay && _react2.default.createElement(
          'a',
          { style: linkStyle, onClick: openOverlay, role: 'button', tabIndex: '0' },
          'Show Info'
        ),
        _react2.default.createElement(
          'div',
          { style: infoStyle },
          _react2.default.createElement(
            'a',
            { style: linkStyle, onClick: closeOverlay, role: 'button', tabIndex: '0' },
            '\xD7'
          ),
          _react2.default.createElement(
            'div',
            { style: this.state.stylesheet.infoPage },
            _react2.default.createElement(
              'div',
              { style: this.state.stylesheet.infoBody },
              this._getInfoHeader(),
              this._getInfoContent(),
              this._getComponentDescription(),
              this._getSourceCode(),
              this._getPropTables()
            )
          )
        )
      );
    }
  }, {
    key: '_getInfoHeader',
    value: function _getInfoHeader() {
      if (!this.props.context || !this.props.showHeader) {
        return null;
      }

      if (!overlay) return null;

      return _react2.default.createElement(
        'div',
        { style: this.state.stylesheet.header.body },
        _react2.default.createElement(
          'h1',
          { style: this.state.stylesheet.header.h1 },
          this.props.context.kind
        ),
        _react2.default.createElement(
          'h2',
          { style: this.state.stylesheet.header.h2 },
          this.props.context.story
        )
      );
    }
  }, {
    key: '_getInfoContent',
    value: function _getInfoContent() {
      var channel = _addons2.default.getChannel();
      if (!this.props.info) {
        channel.emit('storybooks/meta/description', { empty: true });
        return '';
      }

      if (_react2.default.isValidElement(this.props.info)) {
        return _react2.default.createElement(
          'div',
          { style: this.props.showInline ? stylesheet.jsxInfoContent : stylesheet.infoContent },
          this.props.info
        );
      }

      var lines = this.props.info.split('\n');
      while (lines[0].trim() === '') {
        lines.shift();
      }
      var padding = 0;
      var matches = lines[0].match(/^ */);
      if (matches) {
        padding = matches[0].length;
      }
      var source = lines.map(function (s) {
        return s.slice(padding);
      }).join('\n');

      var returnVal = _react2.default.createElement(
        'div',
        { style: this.state.stylesheet.infoContent },
        this.marksy(source).tree
      );

      channel.emit('storybooks/meta/description', {
        htmlToDisplay: ReactDOMServer.renderToString(returnVal),
        empty: !returnVal
      });

      if (!overlay) return null;
      return returnVal;
    }
  }, {
    key: '_getComponentDescription',
    value: function _getComponentDescription() {
      var _this3 = this;

      var retDiv = null;

      if ((0, _keys2.default)(STORYBOOK_REACT_CLASSES).length) {
        (0, _keys2.default)(STORYBOOK_REACT_CLASSES).forEach(function (key) {
          if (STORYBOOK_REACT_CLASSES[key].name === _this3.props.context.kind) {
            retDiv = _react2.default.createElement(
              'div',
              null,
              STORYBOOK_REACT_CLASSES[key].docgenInfo.description
            );
          }
        });
      }

      if (!overlay) return null;

      return retDiv;
    }
  }, {
    key: '_getSourceCode',
    value: function _getSourceCode() {
      var stringifiedJSX = (0, _reactElementToJsxString2.default)(this.props.children, {
        showDefaultProps: false,
        showFunctions: false,
        tabStop: 4,
        maxInlineAttributesLineLength: 120
      });

      var SourceCode = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'pre',
          { className: 'language-jsx' },
          _react2.default.createElement('code', {
            className: 'language-jsx',
            dangerouslySetInnerHTML: {
              __html: _prismjs2.default.highlight(stringifiedJSX, _prismjs2.default.languages.jsx)
            }
          })
        )
      );

      var channel = _addons2.default.getChannel();
      channel.emit('storybooks/meta/sourceCode', { htmlToDisplay: ReactDOMServer.renderToString(SourceCode) });

      if (!overlay) return null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _markdown.H2,
          null,
          'Story Source'
        ),
        SourceCode
      );
    }
  }, {
    key: '_getPropTables',
    value: function _getPropTables() {
      var _this4 = this;

      var types = [];

      if (this.props.propTables === null) {
        return null;
      }

      if (!this.props.children) {
        return null;
      }

      if (this.props.propTables) {
        this.props.propTables.forEach(function (type) {
          types.push(type);
        });
      }

      // depth-first traverse and collect types
      var extract = function extract(children) {
        if (!children) {
          return;
        }
        if (Array.isArray(children)) {
          children.forEach(extract);
          return;
        }
        if (children.props && children.props.children) {
          extract(children.props.children);
        }
        if (typeof children === 'string' || typeof children.type === 'string' || Array.isArray(_this4.props.propTablesExclude) && // also ignore excluded types
        ~_this4.props.propTablesExclude.indexOf(children.type) // eslint-disable-line no-bitwise
        ) {
            return;
          }
        if (children.type && !types.includes(children.type)) {
          types.push(children.type);
        }
      };

      // extract components from children
      extract(this.props.children);

      var _props = this.props,
          maxPropObjectKeys = _props.maxPropObjectKeys,
          maxPropArrayLength = _props.maxPropArrayLength,
          maxPropStringLength = _props.maxPropStringLength;

      var propTables = types.map(function (type, key) {
        return _react2.default.createElement(
          'div',
          { key: key },
          _react2.default.createElement(
            _markdown.H3,
            null,
            type.displayName || type.name
          ),
          _react2.default.createElement(_PropTable2.default, {
            type: type,
            maxPropObjectKeys: maxPropObjectKeys,
            maxPropArrayLength: maxPropArrayLength,
            maxPropStringLength: maxPropStringLength
          })
        );
      });

      if (!propTables || propTables.length === 0) {
        return null;
      }

      var channel = _addons2.default.getChannel();
      channel.emit('storybooks/meta/propTypes', {
        htmlToDisplay: ReactDOMServer.renderToString(_react2.default.createElement(
          'div',
          null,
          propTables
        ))
      });

      if (!overlay) return null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _markdown.H2,
          null,
          'Prop Types'
        ),
        propTables
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.showInline) {
        return this._renderInline();
      }

      return this._renderOverlay();
    }
  }]);
  return Story;
}(_react2.default.Component);

exports.default = Story;


Story.displayName = 'Story';

Story.propTypes = {
  context: _propTypes2.default.shape({
    kind: _propTypes2.default.string,
    story: _propTypes2.default.string
  }),
  info: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  propTables: _propTypes2.default.arrayOf(_propTypes2.default.func),
  propTablesExclude: _propTypes2.default.arrayOf(_propTypes2.default.func),
  showInline: _propTypes2.default.bool,
  showHeader: _propTypes2.default.bool,
  showSource: _propTypes2.default.bool,
  styles: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  marksyConf: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  maxPropsIntoLine: _propTypes2.default.number.isRequired,
  maxPropObjectKeys: _propTypes2.default.number.isRequired,
  maxPropArrayLength: _propTypes2.default.number.isRequired,
  maxPropStringLength: _propTypes2.default.number.isRequired
};
Story.defaultProps = {
  context: null,
  info: '',
  children: null,
  propTables: null,
  propTablesExclude: [],
  showInline: false,
  showHeader: true,
  showSource: true,
  marksyConf: {}
};