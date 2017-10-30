import PropTypes from 'prop-types';
import React from 'react';
import PropVal from './PropVal';
import _ from 'lodash';
import JSONTree from 'react-json-tree';
import solarized from "./markdown/solarized";
import marksy from '../marksy';

const PropTypesMap = new Map();

Object.keys(PropTypes).forEach(typeName => {
    const type = PropTypes[typeName];

    PropTypesMap.set(type, typeName);
    PropTypesMap.set(type.isRequired, typeName);
});

const stylesheet = {
  propTable: {
    borderSpacing: '10px 5px',
    borderCollapse: 'collapse',
  },
};

const propsFromPropTypes = component => {
  const props = [];

  const componentName = component.displayName;
  const propTypes = component.propTypes || {};
  const defaultProps = component.defaultProps || {};
  const metaProps = component.metaProps || {};
  const propNames = Object.keys(propTypes);

  propNames.forEach(propName => {
    let propType = propTypes[propName];
    if (propType.name === 'validate') propType = propType.propType;
    if (propName === 'componentClass') propType.__type = 'node';
    const typeName = propType.__type;
    const required = propType.__required ? 'yes' : null;
    const propInfo = {
        name: propName,
        type: typeName || 'other',
        required,
        defaultValue: defaultProps[propName],
        description: _.get(metaProps, [propName, 'description'], ''),
        jsonDoc: propType.__jsonDoc,
        componentName,
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
        showMore: true
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
      case 'ptExtra-all': {
          const validators = {};
          Object.keys(propInfo.jsonDoc).forEach(validatorType => {
             const validatorItems = propInfo.jsonDoc[validatorType];
             validators[validatorType] = validatorItems.map(role => {
                 return `${propInfo.componentName}.${role}`;
             })
          });
          return (
              <ShowMore
                  label="node"
                  showByDefault
              >
                  <JSONTree
                      hideRoot
                      data={validators}
                      theme={solarized}
                      shouldExpandNode={() => true}
                  />
              </ShowMore>
          )
      }
      default: return type;
  }
};

const Td = ({ children, style, ...props }) => {
    const mergeStyle = { ...{
        verticalAlign: 'baseline',
        paddingTop: 5,
        paddingRight: 10
    }, ...style, };
    return (
        <td
            style={mergeStyle}
            {...props}
        >
            {children}
            </td>
    );
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
          <th style={{ paddingRight: 10, textAlign: 'left' }}>name</th>
          <th style={{ paddingRight: 10, textAlign: 'left' }}>type</th>
          <th style={{ paddingRight: 10, textAlign: 'left' }}>required</th>
          <th style={{ paddingRight: 10, textAlign: 'left' }}>default</th>
          <th style={{ textAlign: 'left' }}>description</th>
        </tr>
      </thead>
      <tbody>
        {propsList.map(prop => (
          <tr key={prop.name} style={{ borderBottom: '1px solid #eee' }}>
            <Td>{prop.name}</Td>
            <Td style={{ whiteSpace: 'nowrap'}}>{getTypeNode(prop)}</Td>
            <Td>{prop.required}</Td>
            <Td>
              {prop.defaultValue === undefined ? (
                '-'
              ) : (
                <PropVal val={prop.defaultValue} {...propValProps} />
              )}
            </Td>
            <Td style={{ paddingRight: 0 }}>{marksy(prop.description).tree}</Td>
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
