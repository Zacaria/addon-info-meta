'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.H1 = H1;
exports.H2 = H2;
exports.H3 = H3;
exports.H4 = H4;
exports.H5 = H5;
exports.H6 = H6;
exports.HR = HR;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('@storybook/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
    children: null,
    id: null
};
var propTypes = {
    children: _propTypes2.default.node,
    id: _propTypes2.default.string
};

function H1(props) {
    var styles = {
        margin: "25px 0 0 0",
        padding: 0,
        fontSize: '40px',
        fontWeight: 500
    };

    return _react2.default.createElement(
        'h1',
        { id: props.id, style: styles },
        props.children,
        _react2.default.createElement(HR, null)
    );
}

H1.defaultProps = defaultProps;
H1.propTypes = propTypes;

function H2(props) {
    var styles = (0, _extends3.default)({
        margin: "25px 0 0 0",
        padding: 0,
        fontSize: '30px',
        fontWeight: 500
    }, props.style);
    return _react2.default.createElement(
        'h2',
        { id: props.id, style: styles },
        props.children,
        _react2.default.createElement(HR, { style: props.hrStyle })
    );
}

H2.defaultProps = defaultProps;
H2.propTypes = propTypes;

function H3(props) {
    var styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '22px',
        fontWeight: 500
    };
    return _react2.default.createElement(
        'h3',
        { id: props.id, style: styles },
        props.children
    );
}

H3.defaultProps = defaultProps;
H3.propTypes = propTypes;

function H4(props) {
    var styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '20px',
        fontWeight: 500
    };
    return _react2.default.createElement(
        'h4',
        { id: props.id, style: styles },
        props.children
    );
}

H4.defaultProps = defaultProps;
H4.propTypes = propTypes;

function H5(props) {
    var styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '18px',
        fontWeight: 500
    };
    return _react2.default.createElement(
        'h5',
        { id: props.id, style: styles },
        props.children
    );
}

H5.defaultProps = defaultProps;
H5.propTypes = propTypes;

function H6(props) {
    var styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '18px',
        fontWeight: 500
    };
    return _react2.default.createElement(
        'h6',
        { id: props.id, style: styles },
        props.children
    );
}

H6.defaultProps = defaultProps;
H6.propTypes = propTypes;

function HR(props) {
    var styles = (0, _extends3.default)({
        margin: '15px 0px',
        padding: 0,
        border: 0,
        borderTop: '1px solid #f0f4f8'
    }, props.style);
    return _react2.default.createElement('hr', { style: styles });
}

HR.defaultProps = defaultProps;
HR.propTypes = propTypes;