'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons2.default.register('storybooks/meta', function (api) {
    _addons2.default.addPanel('storybooks/meta', {
        title: 'PropTypes',
        render: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'Hello world !'
            );
        }
    });
});