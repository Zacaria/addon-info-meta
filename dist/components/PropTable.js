'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _solarized = require('./markdown/solarized');

var _solarized2 = _interopRequireDefault(_solarized);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypesMap = new _map2.default();

(0, _keys2.default)(_propTypes2.default).forEach(function (typeName) {
    var type = _propTypes2.default[typeName];

    PropTypesMap.set(type, typeName);
    PropTypesMap.set(type.isRequired, typeName);
});

var stylesheet = {
    propTable: {
        marginLeft: -10,
        borderSpacing: '10px 5px',
        borderCollapse: 'separate'
    }
};

var propsFromPropTypes = function propsFromPropTypes(component) {
    var props = [];

    var propTypes = component.propTypes || {};
    var defaultProps = component.defaultProps || {};
    var metaProps = component.metaProps || {};
    var propNames = (0, _keys2.default)(propTypes).filter(function (name) {
        return name !== 'componentClass';
    });

    propNames.forEach(function (propName) {
        var typeName = propTypes[propName].__type;
        var required = propTypes[propName].__required ? 'yes' : null;
        var propInfo = {
            name: propName,
            type: typeName || 'other',
            required: required,
            defaultValue: defaultProps[propName],
            description: _lodash2.default.get(metaProps, [propName, 'description'], undefined)
        };

        switch (typeName) {
            case 'oneOf':
                propInfo.values = propTypes[propName].__values;
                break;
            case 'shape':
                propInfo.shape = propTypes[propName].__shape;
                break;
        }

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
            showMore: false
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
                null,
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

    switch (type) {
        case 'oneOf':
            {
                return _react2.default.createElement(
                    ShowMore,
                    { label: type },
                    _react2.default.createElement(
                        'ul',
                        null,
                        propInfo.values.map(function (value) {
                            return _react2.default.createElement(
                                'li',
                                null,
                                value
                            );
                        })
                    )
                );
            }
        case 'shape':
            {
                // console.log(propInfo);
                return _react2.default.createElement(
                    ShowMore,
                    { label: type },
                    _react2.default.createElement(_reactJsonTree2.default, {
                        hideRoot: true,
                        data: propInfo.shape,
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
                    null,
                    'name'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'type'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'required'
                ),
                _react2.default.createElement(
                    'th',
                    null,
                    'default'
                ),
                _react2.default.createElement(
                    'th',
                    null,
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
                    { key: prop.name },
                    _react2.default.createElement(
                        'td',
                        null,
                        prop.name
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        getTypeNode(prop)
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        prop.required
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        prop.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, (0, _extends3.default)({ val: prop.defaultValue }, propValProps))
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        prop.description
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