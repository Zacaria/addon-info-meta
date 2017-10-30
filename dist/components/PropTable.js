'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.default = PropTable;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _solarized = require('./markdown/solarized');

var _solarized2 = _interopRequireDefault(_solarized);

var _marksy = require('../marksy');

var _marksy2 = _interopRequireDefault(_marksy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypesMap = new _map2.default();

(0, _keys2.default)(_propTypes2.default).forEach(function (typeName) {
    var type = _propTypes2.default[typeName];

    PropTypesMap.set(type, typeName);
    PropTypesMap.set(type.isRequired, typeName);
});

var stylesheet = {
    propTable: {
        borderSpacing: '10px 5px',
        borderCollapse: 'collapse'
    }
};

var propsFromPropTypes = function propsFromPropTypes(component) {
    var props = [];

    var componentName = component.displayName;
    var propTypes = component.propTypes || {};
    var defaultProps = component.defaultProps || {};
    var metaProps = component.metaProps || {};
    var propNames = (0, _keys2.default)(propTypes);

    propNames.forEach(function (propName) {
        var propType = propTypes[propName];
        if (propType.name === 'validate') propType = propType.propType;
        if (propName === 'componentClass') propType.__type = 'node';
        var typeName = propType.__type;
        var required = propType.__required ? 'yes' : null;
        var propInfo = {
            name: propName,
            type: typeName || 'other',
            required: required,
            defaultValue: defaultProps[propName],
            description: _lodash2.default.get(metaProps, [propName, 'description'], ''),
            jsonDoc: propType.__jsonDoc,
            componentName: componentName
        };

        props.push(propInfo);
    });

    return props;
};

var ShowMore = function (_React$Component) {
    (0, _inherits3.default)(ShowMore, _React$Component);

    function ShowMore(props) {
        (0, _classCallCheck3.default)(this, ShowMore);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShowMore.__proto__ || (0, _getPrototypeOf2.default)(ShowMore)).call(this, props));

        _this.state = {
            showMore: true
        };

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ShowMore, [{
        key: 'handleClick',
        value: function handleClick() {
            this.setState({ showMore: !this.state.showMore });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                children = _props.children;

            return _react2.default.createElement(
                'div',
                { key: this.props.id },
                _react2.default.createElement(
                    'div',
                    {
                        onClick: this.handleClick,
                        style: {
                            cursor: 'pointer',
                            color: '#5b8ed3',
                            fontWeight: 500
                        }
                    },
                    this.state.showMore ? _react2.default.createElement(
                        'div',
                        {
                            style: {
                                fontSize: '0.75em',
                                marginRight: 4,
                                transform: 'rotateZ(90deg)',
                                transformOrigin: '45% 50% 0px',
                                display: 'inline-block'
                            }
                        },
                        '\u25B6'
                    ) : _react2.default.createElement(
                        'div',
                        {
                            style: {
                                fontSize: '0.75em',
                                marginRight: 4,
                                display: 'inline-block'
                            }
                        },
                        '\u25B6'
                    ),
                    label
                ),
                this.state.showMore && _react2.default.createElement(
                    'div',
                    { className: 'json-tree-container' },
                    _react2.default.createElement(
                        'style',
                        null,
                        '.json-tree-container > ul { margin: 0 !important; }'
                    ),
                    children
                )
            );
        }
    }]);
    return ShowMore;
}(_react2.default.Component);

var getTypeNode = function getTypeNode(_ref) {
    var type = _ref.type,
        propInfo = (0, _objectWithoutProperties3.default)(_ref, ['type']);

    if (type.match(/^arrayOf/)) {
        return _react2.default.createElement(
            ShowMore,
            { label: type },
            _react2.default.createElement(_reactJsonTree2.default, {
                hideRoot: true,
                data: propInfo.jsonDoc,
                theme: _solarized2.default,
                shouldExpandNode: function shouldExpandNode() {
                    return true;
                }
            })
        );
    }

    switch (type) {
        case 'oneOf':
            {
                return _react2.default.createElement(
                    ShowMore,
                    { label: type },
                    _react2.default.createElement(
                        'ul',
                        null,
                        propInfo.jsonDoc.map(function (value, key) {
                            return _react2.default.createElement(
                                'li',
                                { key: key },
                                value
                            );
                        })
                    )
                );
            }
        case 'shape':
            {
                return _react2.default.createElement(
                    ShowMore,
                    { label: type },
                    _react2.default.createElement(_reactJsonTree2.default, {
                        hideRoot: true,
                        data: propInfo.jsonDoc,
                        theme: _solarized2.default,
                        shouldExpandNode: function shouldExpandNode() {
                            return true;
                        }
                    })
                );
            }
        case 'instanceOf':
            {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        {
                            style: {
                                fontWeight: 500,
                                color: 'rgb(91, 142, 211)'
                            }
                        },
                        type
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '(',
                        propInfo.jsonDoc,
                        ')'
                    )
                );
            }
        case 'objectOf':
            {
                var _propInfo$jsonDoc$mat = propInfo.jsonDoc.match(/^objectOf\((\w+)/),
                    _propInfo$jsonDoc$mat2 = (0, _slicedToArray3.default)(_propInfo$jsonDoc$mat, 2),
                    uselessVar = _propInfo$jsonDoc$mat2[0],
                    propertiesType = _propInfo$jsonDoc$mat2[1];

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        {
                            style: {
                                fontWeight: 500,
                                color: 'rgb(91, 142, 211)'
                            }
                        },
                        type
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '(',
                        propertiesType,
                        ')'
                    )
                );
            }
        case 'oneOfType':
            {
                var types = propInfo.jsonDoc;
                return _react2.default.createElement(
                    ShowMore,
                    { label: type },
                    _react2.default.createElement(
                        'ul',
                        null,
                        types.map(function (t, key) {
                            if (typeof t === 'string') {
                                return _react2.default.createElement(
                                    'div',
                                    { key: key },
                                    t
                                );
                            } else {
                                if ((0, _typeof3.default)(t.__jsonDoc) !== 'object') {
                                    return _react2.default.createElement(
                                        'div',
                                        { key: key },
                                        _react2.default.createElement(
                                            'span',
                                            {
                                                style: {
                                                    fontWeight: 500,
                                                    color: 'rgb(91, 142, 211)'
                                                }
                                            },
                                            t.__type
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '(',
                                            t.__jsonDoc,
                                            ')'
                                        )
                                    );
                                }
                                return _react2.default.createElement(
                                    ShowMore,
                                    {
                                        key: key,
                                        id: key,
                                        label: t.__type,
                                        showByDefault: true
                                    },
                                    _react2.default.createElement(_reactJsonTree2.default, {
                                        hideRoot: true,
                                        data: t.__jsonDoc,
                                        theme: _solarized2.default,
                                        shouldExpandNode: function shouldExpandNode() {
                                            return true;
                                        }
                                    })
                                );
                            }
                        })
                    )
                );
            }
        case 'ptExtra-all':
            {
                var validators = {};
                (0, _keys2.default)(propInfo.jsonDoc).forEach(function (validatorType) {
                    var validatorItems = _lodash2.default.get(propInfo, ['jsonDoc', validatorType], []);
                    validators[validatorType] = validatorItems.map(function (role) {
                        return propInfo.componentName + '.' + role;
                    });
                });
                return _react2.default.createElement(
                    ShowMore,
                    {
                        label: 'node',
                        showByDefault: true
                    },
                    _react2.default.createElement(_reactJsonTree2.default, {
                        hideRoot: true,
                        data: validators,
                        theme: _solarized2.default,
                        shouldExpandNode: function shouldExpandNode() {
                            return true;
                        }
                    })
                );
            }
        default:
            return type;
    }
};

var Td = function Td(_ref2) {
    var children = _ref2.children,
        style = _ref2.style,
        props = (0, _objectWithoutProperties3.default)(_ref2, ['children', 'style']);

    var mergeStyle = (0, _extends3.default)({
        verticalAlign: 'baseline',
        paddingTop: 5,
        paddingRight: 10
    }, style);
    return _react2.default.createElement(
        'td',
        (0, _extends3.default)({
            style: mergeStyle
        }, props),
        children
    );
};

function PropTable(props) {
    var type = props.type,
        maxPropObjectKeys = props.maxPropObjectKeys,
        maxPropArrayLength = props.maxPropArrayLength,
        maxPropStringLength = props.maxPropStringLength;


    if (!type) {
        return null;
    }

    var propsList = propsFromPropTypes(type);

    if (!propsList.length) {
        return _react2.default.createElement(
            'small',
            null,
            'No propTypes defined!'
        );
    }

    var propValProps = {
        maxPropObjectKeys: maxPropObjectKeys,
        maxPropArrayLength: maxPropArrayLength,
        maxPropStringLength: maxPropStringLength
    };

    return _react2.default.createElement(
        'table',
        { style: stylesheet.propTable },
        _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'th',
                    { style: { paddingRight: 10, textAlign: 'left' } },
                    'name'
                ),
                _react2.default.createElement(
                    'th',
                    { style: { paddingRight: 10, textAlign: 'left' } },
                    'type'
                ),
                _react2.default.createElement(
                    'th',
                    { style: { paddingRight: 10, textAlign: 'left' } },
                    'required'
                ),
                _react2.default.createElement(
                    'th',
                    { style: { paddingRight: 10, textAlign: 'left' } },
                    'default'
                ),
                _react2.default.createElement(
                    'th',
                    { style: { textAlign: 'left' } },
                    'description'
                )
            )
        ),
        _react2.default.createElement(
            'tbody',
            null,
            propsList.map(function (prop) {
                return _react2.default.createElement(
                    'tr',
                    { key: prop.name, style: { borderBottom: '1px solid #eee' } },
                    _react2.default.createElement(
                        Td,
                        null,
                        prop.name
                    ),
                    _react2.default.createElement(
                        Td,
                        { style: { whiteSpace: 'nowrap' } },
                        getTypeNode(prop)
                    ),
                    _react2.default.createElement(
                        Td,
                        null,
                        prop.required
                    ),
                    _react2.default.createElement(
                        Td,
                        null,
                        prop.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, (0, _extends3.default)({ val: prop.defaultValue }, propValProps))
                    ),
                    _react2.default.createElement(
                        Td,
                        { style: { paddingRight: 0 } },
                        (0, _marksy2.default)(prop.description).tree
                    )
                );
            })
        )
    );
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
    type: null
};
PropTable.propTypes = {
    type: _propTypes2.default.func,
    maxPropObjectKeys: _propTypes2.default.number.isRequired,
    maxPropArrayLength: _propTypes2.default.number.isRequired,
    maxPropStringLength: _propTypes2.default.number.isRequired
};