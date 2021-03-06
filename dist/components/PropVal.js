'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = PropVal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valueStyles = {
  func: {
    color: '#170'
  },

  attr: {
    color: '#666'
  },

  object: {
    color: '#666'
  },

  array: {
    color: '#666'
  },

  number: {
    color: '#a11'
  },

  string: {
    color: '#22a',
    wordBreak: 'break-word'
  },

  bool: {
    color: '#a11'
  },

  empty: {
    color: '#777'
  }
};

function previewArray(val, maxPropArrayLength) {
  var items = {};
  val.slice(0, maxPropArrayLength).forEach(function (item, i) {
    items['n' + i] = _react2.default.createElement(PropVal, { val: item });
    items['c' + i] = ', ';
  });
  if (val.length > maxPropArrayLength) {
    items.last = '…';
  } else {
    delete items['c' + (val.length - 1)];
  }
  return _react2.default.createElement(
    'span',
    { style: valueStyles.array },
    '[',
    (0, _reactAddonsCreateFragment2.default)(items),
    ']'
  );
}

function previewObject(val, maxPropObjectKeys) {
  var names = (0, _keys2.default)(val);
  var items = {};
  names.slice(0, maxPropObjectKeys).forEach(function (name, i) {
    items['k' + i] = _react2.default.createElement(
      'span',
      { style: valueStyles.attr },
      name
    );
    items['c' + i] = ': ';
    items['v' + i] = _react2.default.createElement(PropVal, { val: val[name] });
    items['m' + i] = ', ';
  });
  if (names.length > maxPropObjectKeys) {
    items.rest = '…';
  } else {
    delete items['m' + (names.length - 1)];
  }
  return _react2.default.createElement(
    'span',
    { style: valueStyles.object },
    '{',
    (0, _reactAddonsCreateFragment2.default)(items),
    '}'
  );
}

function PropVal(props) {
  var maxPropObjectKeys = props.maxPropObjectKeys,
      maxPropArrayLength = props.maxPropArrayLength,
      maxPropStringLength = props.maxPropStringLength;

  var val = props.val;
  var braceWrap = true;
  var content = null;

  if (typeof val === 'number') {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.number },
      val
    );
  } else if (typeof val === 'string') {
    if (val.length > maxPropStringLength) {
      val = val.slice(0, maxPropStringLength) + '\u2026';
    }
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.string },
      '"',
      val,
      '"'
    );
    braceWrap = false;
  } else if (typeof val === 'boolean') {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.bool },
      '' + val
    );
  } else if (Array.isArray(val)) {
    content = previewArray(val, maxPropArrayLength);
  } else if (typeof val === 'function') {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.func },
      val.name ? val.name + '()' : 'anonymous()'
    );
  } else if (!val) {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.empty },
      '' + val
    );
  } else if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) !== 'object') {
    content = _react2.default.createElement(
      'span',
      null,
      '\u2026'
    );
  } else if (_react2.default.isValidElement(val)) {
    content = _react2.default.createElement(
      'span',
      { style: valueStyles.object },
      '<' + (val.type.displayName || val.type.name || val.type) + ' />'
    );
  } else {
    content = previewObject(val, maxPropObjectKeys);
  }

  if (!braceWrap) return content;

  return _react2.default.createElement(
    'span',
    null,
    '{',
    content,
    '}'
  );
}

PropVal.defaultProps = {
  val: null,
  maxPropObjectKeys: 3,
  maxPropArrayLength: 3,
  maxPropStringLength: 50
};

PropVal.propTypes = {
  val: _propTypes2.default.any, // eslint-disable-line
  maxPropObjectKeys: _propTypes2.default.number,
  maxPropArrayLength: _propTypes2.default.number,
  maxPropStringLength: _propTypes2.default.number
};