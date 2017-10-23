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
        description: _.get(metaProps, [propName, 'description'], undefined),
        jsonDoc: propTypes[propName].__jsonDoc
    };

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
        showMore: this.props.showByDefault
    };

    handleClick() {
        this.setState({ showMore: !this.state.showMore });
    }

    render() {
        const { label, children } = this.props;
        return (
            <div key={this.props.id}>
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
  if (type.match(/^arrayOf/)) {
      return (
          <ShowMore label={type}>
              <JSONTree
                  hideRoot
                  data={propInfo.jsonDoc}
                  theme={solarized}
                  shouldExpandNode={() => true}
              />
          </ShowMore>
      )
  }

  switch (type) {
      case 'oneOf': {
        return (
            <ShowMore label={type}>
                <ul>
                    {propInfo.jsonDoc.map((value, key) => <li key={key}>{value}</li>)}
                </ul>
            </ShowMore>
        )
      }
      case 'shape': {
          return (
              <ShowMore label={type}>
                  <JSONTree
                      hideRoot
                      data={propInfo.jsonDoc}
                      theme={solarized}
                      shouldExpandNode={() => true}
                  />
              </ShowMore>
          )
      }
      case 'instanceOf': {
          return (
              <div>
                  <span
                    style={{
                        fontWeight: 500,
                        color: 'rgb(91, 142, 211)'
                    }}
                  >
                      {type}
                  </span>
                  <span>({propInfo.jsonDoc})</span>
              </div>
          )
      }
      case 'objectOf': {
          const [uselessVar, propertiesType] = propInfo.jsonDoc.match(/^objectOf\((\w+)/);
          return (
              <div>
                  <span
                    style={{
                        fontWeight: 500,
                        color: 'rgb(91, 142, 211)'
                    }}
                  >
                      {type}
                  </span>
                  <span>({propertiesType})</span>
              </div>
          )
      }
      case 'oneOfType': {
          const types = propInfo.jsonDoc;
          return (
              <ShowMore label={type}>
                  <ul>
                      {types.map((t, key) => {
                          if (typeof t === 'string') {
                              return <div key={key}>{t}</div>
                          } else {
                              if (typeof t.__jsonDoc !== 'object') {
                                  return (
                                      <div key={key}>
                                          <span
                                              style={{
                                                  fontWeight: 500,
                                                  color: 'rgb(91, 142, 211)'
                                              }}
                                          >
                                              {t.__type}
                                          </span>
                                          <span>({t.__jsonDoc})</span>
                                      </div>
                                  )
                              }
                              return (
                                  <ShowMore
                                      key={key}
                                      id={key}
                                      label={t.__type}
                                      showByDefault
                                  >
                                      <JSONTree
                                          hideRoot
                                          data={t.__jsonDoc}
                                          theme={solarized}
                                          shouldExpandNode={() => true}
                                      />
                                  </ShowMore>
                              )
                          }
                      })}
                  </ul>
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
            <td style={{ verticalAlign: 'baseline' }}>{prop.name}</td>
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
