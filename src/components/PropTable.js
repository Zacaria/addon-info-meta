import PropTypes from 'prop-types';
import React from 'react';
import PropVal from './PropVal';
import _ from 'lodash';
import JSONTree from 'react-json-tree';
import solarized from "./markdown/solarized";
import { H1, H2, H3, H4, H5, H6, Code, P, UL, A, LI, Pre } from '../components/markdown';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import marksyConstructor from 'marksy';

const defaultMarksyConf = {
    createElement: React.createElement,
    highlight(lang, code) {
        return Prism.highlight(code, Prism.languages[lang]);
    },
    elements: {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: P,
        a: A,
        li: LI,
        ul: UL,
    }
};

const marksy = marksyConstructor(defaultMarksyConf);

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
    borderCollapse: 'collapse',
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
        description: _.get(metaProps, [propName, 'description'], ''),
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
          <th style={{ paddingRight: 10 }}>name</th>
          <th style={{ paddingRight: 10 }}>type</th>
          <th style={{ paddingRight: 10 }}>required</th>
          <th style={{ paddingRight: 10 }}>default</th>
          <th>description</th>
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
