import PropTypes from 'prop-types';
import React from 'react';
import PropVal from './PropVal';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import JSONTree from 'react-json-tree';
import solarized from "./markdown/solarized";

const PropTypesMap = new Map();

Object.keys(PropTypes).forEach(typeName => {
    const type = PropTypes[typeName];

    PropTypesMap.set(type, typeName);
    PropTypesMap.set(type.isRequired, typeName);
});

const stylesheet = {
  propTable: {
    marginLeft: -10,
    borderSpacing: '10px 5px',
    borderCollapse: 'separate',
  },
};

const propsFromPropTypes = component => {
  const props = [];

  const propTypes = component.propTypes || {};
  const defaultProps = component.defaultProps || {};
  const metaProps = component.metaProps || {};
  const propNames = Object.keys(propTypes)
    .filter(name => name !== 'componentClass');

  propNames.forEach(propName => {
    const typeName = propTypes[propName].__type;
    const required = propTypes[propName].__required ? 'yes' : null;
    const propInfo = {
        name: propName,
        type: typeName || 'other',
        required,
        defaultValue: defaultProps[propName],
        description: _.get(metaProps, [propName, 'description'], undefined)
    };

    switch (typeName) {
        case 'oneOf': propInfo.values = propTypes[propName].__values;
        break;
        case 'shape': propInfo.shape = propTypes[propName].__shape;
        break;
    }

    props.push(propInfo);
  });

  return props;
};

class ShowMore extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        showMore: false
    };

    handleClick() {
        this.setState({ showMore: !this.state.showMore });
    }

    render() {
        const { label, children } = this.props;
        return (
            <div>
                <div
                    onClick={this.handleClick}
                    style={{
                        cursor: 'pointer',
                        color: '#5b8ed3',
                        fontWeight: 500
                    }}
                >
                    {this.state.showMore ?
                        <div
                            style={{
                                fontSize: '0.75em',
                                marginRight: 4,
                                transform: 'rotateZ(90deg)',
                                transformOrigin: '45% 50% 0px',
                                display: 'inline-block'
                            }}
                        >
                            ▶
                        </div>
                        :
                        <div
                            style={{
                                fontSize: '0.75em',
                                marginRight: 4,
                                display: 'inline-block'
                            }}
                        >
                            ▶
                        </div>
                    }
                    {label}
                </div>
                {this.state.showMore &&
                <div className="json-tree-container">
                    <style>{`.json-tree-container > ul { margin: 0 !important; }`}</style>
                    {children}
                </div>
                }
            </div>
        )
    }
}

const getTypeNode = ({ type, ...propInfo }) => {
  switch (type) {
      case 'oneOf': {
        return (
            <ShowMore label={type}>
                <ul>
                    {propInfo.values.map(value => <li>{value}</li>)}
                </ul>
            </ShowMore>
        )
      }
      case 'shape': {
          // console.log(propInfo);
          return (
              <ShowMore label={type}>
                  <JSONTree
                      hideRoot
                      data={propInfo.shape}
                      theme={solarized}
                      shouldExpandNode={() => true}
                  />
              </ShowMore>
          )
      }
      default: return type;
  }
};

export default function PropTable(props) {
  const { type, maxPropObjectKeys, maxPropArrayLength, maxPropStringLength } = props;

  if (!type) {
    return null;
  }

  const propsList = propsFromPropTypes(type);

  if (!propsList.length) {
    return <small>No propTypes defined!</small>;
  }

  const propValProps = {
    maxPropObjectKeys,
    maxPropArrayLength,
    maxPropStringLength,
  };

  return (
    <table style={stylesheet.propTable}>
      <thead>
        <tr>
          <th>name</th>
          <th>type</th>
          <th>required</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
        {propsList.map(prop => (
          <tr key={prop.name}>
            <td>{prop.name}</td>
            <td>{getTypeNode(prop)}</td>
            <td>{prop.required}</td>
            <td>
              {prop.defaultValue === undefined ? (
                '-'
              ) : (
                <PropVal val={prop.defaultValue} {...propValProps} />
              )}
            </td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

PropTable.displayName = 'PropTable';
PropTable.defaultProps = {
  type: null,
};
PropTable.propTypes = {
  type: PropTypes.func,
  maxPropObjectKeys: PropTypes.number.isRequired,
  maxPropArrayLength: PropTypes.number.isRequired,
  maxPropStringLength: PropTypes.number.isRequired,
};
