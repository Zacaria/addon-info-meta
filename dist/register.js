'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _markdown = require('./components/markdown');

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelWrapper = function (_React$Component) {
    (0, _inherits3.default)(ChannelWrapper, _React$Component);

    function ChannelWrapper(props) {
        (0, _classCallCheck3.default)(this, ChannelWrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ChannelWrapper.__proto__ || (0, _getPrototypeOf2.default)(ChannelWrapper)).call(this, props));

        _this.unmount = false;
        _this.defaultStyle = {
            fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif',
            color: 'rgb(68, 68, 68)',
            fontWeight: 300,
            lineHeight: 1.45,
            fontSize: 15,
            padding: '0 25px 25px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
            width: '100%',
            height: 0 // storybook bugfix - activates panel scroll on firefox
        };
        _this.fullScreenStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
            overflow: 'scroll'
        };
        _this.Pane2FullscreenStyle = '\n      .Pane2 {\n        position: fixed !important;\n        width: 100% !important;\n        height: 100% !important;\n        top: 0 !important;\n        left: 0 !important;\n        background-color: white !important;\n        z-index: 9999 !important;\n      }\n    ';


        _this.state = {
            htmlToDisplay: null,
            fullscreen: false,
            loading: true,
            empty: false
        };
        return _this;
    }

    (0, _createClass3.default)(ChannelWrapper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.handleStoryChange();
            this.listenChannel();

            setTimeout(function () {
                if (!_this2.state.htmlToDisplay) {
                    _this2.setState({ loading: false });
                }
            }, 1200);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeChannelListener();
            this.stopListeningStory();
        }
    }, {
        key: 'listenChannel',
        value: function listenChannel() {
            var _this3 = this;

            var channel = _addons2.default.getChannel();
            channel.on(this.props.channel, function (e) {
                return _this3.handleChannel(e);
            });
        }
    }, {
        key: 'handleChannel',
        value: function handleChannel(_ref) {
            var htmlToDisplay = _ref.htmlToDisplay,
                empty = _ref.empty;

            if (!this.unmount) {
                this.setState({ htmlToDisplay: htmlToDisplay, loading: false, empty: empty });
            }
        }
    }, {
        key: 'removeChannelListener',
        value: function removeChannelListener() {
            var channel = _addons2.default.getChannel();
            this.unmount = true;
            channel.removeListener(this.props.channel);
        }
    }, {
        key: 'handleStoryChange',
        value: function handleStoryChange() {
            var _this4 = this;

            this.stopListeningStory = this.props.api.onStory(function () {
                return _this4.setState({ htmlToDisplay: '' });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var style = this.state.fullscreen ? (0, _extends3.default)({}, this.defaultStyle, this.fullScreenStyle) : this.defaultStyle;
            return _react2.default.createElement(
                'div',
                { style: style },
                !this.state.htmlToDisplay && this.state.loading && _react2.default.createElement(
                    _markdown.H4,
                    null,
                    'Loading...'
                ),
                this.state.htmlToDisplay && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactFontawesome2.default, {
                        name: 'arrows-alt',
                        style: {
                            position: 'absolute',
                            right: this.state.fullscreen ? '4px' : '29px',
                            top: this.state.fullscreen ? '2px' : '40px',
                            fontSize: this.state.fullscreen ? '21px' : '20px',
                            cursor: 'pointer'
                        },
                        onClick: function onClick() {
                            return _this5.setState({ fullscreen: !_this5.state.fullscreen });
                        }
                    }),
                    this.props.children,
                    _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.htmlToDisplay } })
                ),
                !this.state.htmlToDisplay && !this.state.loading && !this.state.empty && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _markdown.H4,
                        null,
                        'Nothing to display'
                    ),
                    'Two possibilities:',
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'Story doesn\'t use withMetaInfo addon'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'Panel crashed'
                        )
                    )
                ),
                this.state.empty && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _markdown.H4,
                        null,
                        'Empty'
                    ),
                    'This section is empty.'
                )
            );
        }
    }]);
    return ChannelWrapper;
}(_react2.default.Component);

_addons2.default.register('storybooks/meta/propTypes', function (api) {
    _addons2.default.addPanel('storybooks/meta/propTypes', {
        title: 'PropTypes',
        render: function render() {
            return _react2.default.createElement(ChannelWrapper, { channel: 'storybooks/meta/propTypes', api: api });
        }
    });
});

_addons2.default.register('storybooks/meta/description', function (api) {
    _addons2.default.addPanel('storybooks/meta/description', {
        title: 'Description',
        render: function render() {
            return _react2.default.createElement(ChannelWrapper, { channel: 'storybooks/meta/description', api: api });
        }
    });
});

_addons2.default.register('storybooks/meta/sourceCode', function (api) {
    _addons2.default.addPanel('storybooks/meta/sourceCode', {
        title: 'Source Code',
        render: function render() {
            return _react2.default.createElement(
                ChannelWrapper,
                { channel: 'storybooks/meta/sourceCode', api: api },
                _react2.default.createElement(
                    'div',
                    { style: { marginTop: 10 } },
                    'Note: This code is automatically generated and might be not very accurate.'
                )
            );
        }
    });
});

_addons2.default.register('storybooks/meta/related', function (api) {
    _addons2.default.addPanel('storybooks/meta/related', {
        title: 'Related',
        render: function render() {
            return _react2.default.createElement(ChannelWrapper, { channel: 'storybooks/meta/related', api: api });
        }
    });
});

_addons2.default.register('storybooks/meta/ux', function (api) {
    _addons2.default.addPanel('storybooks/meta/ux', {
        title: 'UI / UX',
        render: function render() {
            return _react2.default.createElement(ChannelWrapper, { channel: 'storybooks/meta/ux', api: api });
        }
    });
});