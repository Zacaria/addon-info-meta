'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _markdown = require('./components/markdown');

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

require('prismjs/components/prism-jsx.min');

require('prismjs/components/prism-markdown.min');

var _marksy = require('marksy');

var _marksy2 = _interopRequireDefault(_marksy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    createElement: _react2.default.createElement,
    highlight: function highlight() {
        var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'markdown';
        var code = arguments[1];

        return _prismjs2.default.highlight(code, _prismjs2.default.languages[lang]);
    },

    elements: {
        h1: _markdown.H1,
        h2: _markdown.H2,
        h3: _markdown.H3,
        h4: _markdown.H4,
        h5: _markdown.H5,
        h6: _markdown.H6,
        p: _markdown.P,
        a: _markdown.A,
        li: _markdown.LI,
        ul: _markdown.UL
    }
};

exports.default = (0, _marksy2.default)(config);