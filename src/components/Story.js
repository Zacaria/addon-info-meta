import React from 'react';
import PropTypes from 'prop-types';
import global from 'global';
import { baseFonts } from '@storybook/components';
import Prism from 'prismjs';
import marksy from '../marksy';
import PropTable from './PropTable';
import reactElementToJSXString from 'react-element-to-jsx-string';
import * as ReactDOMServer from "react-dom/server";
import { H2, H3 } from './markdown';

import addons from '@storybook/addons';

global.STORYBOOK_REACT_CLASSES = global.STORYBOOK_REACT_CLASSES || [];
const STORYBOOK_REACT_CLASSES = global.STORYBOOK_REACT_CLASSES;

const overlay = false;

const stylesheet = {
  link: {
    base: {
      fontFamily: 'sans-serif',
      fontSize: '12px',
      display: 'block',
      position: 'fixed',
      textDecoration: 'none',
      background: '#28c',
      color: '#fff',
      padding: '5px 15px',
      cursor: 'pointer',
    },
    topRight: {
      top: 0,
      right: 0,
      borderRadius: '0 0 0 5px',
    },
  },
  info: {
    position: 'fixed',
    background: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0 40px',
    overflow: 'auto',
    zIndex: 99999,
  },
  children: {
    position: 'relative',
    zIndex: 0,
  },
  infoBody: {
    ...baseFonts,
    fontWeight: 300,
    lineHeight: 1.45,
    fontSize: '15px',
    border: '1px solid #eee',
    padding: '20px 40px 40px',
    borderRadius: '2px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#fff',
    marginTop: '50px',
  },
  infoContent: {
    marginBottom: 0,
  },
  infoStory: {},
  jsxInfoContent: {
    borderTop: '1px solid #eee',
    margin: '20px 0 0 0',
  },
  header: {
    h1: {
      margin: 0,
      padding: 0,
      fontSize: '35px',
    },
    h2: {
      margin: '0 0 10px 0',
      padding: 0,
      fontWeight: 400,
      fontSize: '22px',
    },
    body: {
      borderBottom: '1px solid #eee',
      paddingTop: 10,
      marginBottom: 10,
    },
  },
  source: {
    h1: {
      margin: '20px 0 0 0',
      padding: '0 0 5px 0',
      fontSize: '25px',
      borderBottom: '1px solid #EEE',
    },
  },
  propTableHead: {
    margin: '20px 0 0 0',
  },
};

export default class Story extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: false,
      stylesheet: this.props.styles(JSON.parse(JSON.stringify(stylesheet))),
    };
    this.marksy = marksy;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stylesheet: nextProps.styles(JSON.parse(JSON.stringify(stylesheet))),
    });
  }

  _renderStory() {
    return <div style={this.state.stylesheet.infoStory}>{this.props.children}</div>;
  }

  _renderInline() {
    return (
      <div>
        {this._renderInlineHeader()}
        {this._renderStory()}
        <div style={this.state.stylesheet.infoPage}>
          <div style={this.state.stylesheet.infoBody}>
            {this._getInfoContent()}
            {this._getComponentDescription()}
            {this._getSourceCode()}
            {this._getPropTables()}
          </div>
        </div>
      </div>
    );
  }

  _renderInlineHeader() {
    const infoHeader = this._getInfoHeader();

    return (
      infoHeader && (
        <div style={this.state.stylesheet.infoPage}>
          <div style={this.state.stylesheet.infoBody}>{infoHeader}</div>
        </div>
      )
    );
  }

  _renderOverlay() {
    const linkStyle = {
      ...stylesheet.link.base,
      ...stylesheet.link.topRight,
    };

    const infoStyle = Object.assign({}, stylesheet.info);
    if (!this.state.open) {
      infoStyle.display = 'none';
    }

    const openOverlay = () => {
      this.setState({ open: true });
      return false;
    };

    const closeOverlay = () => {
      this.setState({ open: false });
      return false;
    };

    return (
      <div>
        <div style={this.state.stylesheet.children}>{this.props.children}</div>
        {overlay && <a style={linkStyle} onClick={openOverlay} role="button" tabIndex="0">
          Show Info
        </a>}
        <div style={infoStyle}>
          <a style={linkStyle} onClick={closeOverlay} role="button" tabIndex="0">
            ×
          </a>
          <div style={this.state.stylesheet.infoPage}>
            <div style={this.state.stylesheet.infoBody}>
              {this._getInfoHeader()}
              {this._getInfoContent()}
              {this._getComponentDescription()}
              {this._getSourceCode()}
              {this._getPropTables()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getInfoHeader() {
    if (!this.props.context || !this.props.showHeader) {
      return null;
    }

    if (!overlay) return null;

    return (
      <div style={this.state.stylesheet.header.body}>
        <h1 style={this.state.stylesheet.header.h1}>{this.props.context.kind}</h1>
        <h2 style={this.state.stylesheet.header.h2}>{this.props.context.story}</h2>
      </div>
    );
  }

  _getInfoContent() {
    if (!this.props.info) {
      return '';
    }

    if (React.isValidElement(this.props.info)) {
      return (
        <div style={this.props.showInline ? stylesheet.jsxInfoContent : stylesheet.infoContent}>
          {this.props.info}
        </div>
      );
    }

    const lines = this.props.info.split('\n');
    while (lines[0].trim() === '') {
      lines.shift();
    }
    let padding = 0;
    const matches = lines[0].match(/^ */);
    if (matches) {
      padding = matches[0].length;
    }
    const source = lines.map(s => s.slice(padding)).join('\n');

    const returnVal = <div style={this.state.stylesheet.infoContent}>{this.marksy(source).tree}</div>;

    const channel = addons.getChannel();
    channel.emit('storybooks/meta/description', { htmlToDisplay: ReactDOMServer.renderToString(returnVal) });

    if (!overlay) return null;

    return returnVal;
  }

  _getComponentDescription() {
    let retDiv = null;

    if (Object.keys(STORYBOOK_REACT_CLASSES).length) {
      Object.keys(STORYBOOK_REACT_CLASSES).forEach(key => {
        if (STORYBOOK_REACT_CLASSES[key].name === this.props.context.kind) {
          retDiv = <div>{STORYBOOK_REACT_CLASSES[key].docgenInfo.description}</div>;
        }
      });
    }

    if (!overlay) return null;

    return retDiv;
  }

  _getSourceCode() {
    const stringifiedJSX = reactElementToJSXString(this.props.children, {
        showDefaultProps: false,
        showFunctions: false,
        tabStop: 4,
        maxInlineAttributesLineLength: 120
    });

    const SourceCode = (
        <div>
          <pre className="language-jsx">
            <code
                className="language-jsx"
                dangerouslySetInnerHTML={{
                    __html: Prism.highlight(stringifiedJSX, Prism.languages.jsx)
                }}
            />
          </pre>
        </div>
    );

    const channel = addons.getChannel();
    channel.emit('storybooks/meta/sourceCode', { htmlToDisplay: ReactDOMServer.renderToString(SourceCode) });

    if (!overlay) return null;

    return (
      <div>
        <H2>Story Source</H2>
        {SourceCode}
      </div>
    );
  }

  _getPropTables() {
    const types = new Map();

    if (this.props.propTables === null) {
      return null;
    }

    if (!this.props.children) {
      return null;
    }

    if (this.props.propTables) {
      this.props.propTables.forEach(type => {
        types.set(type, true);
      });
    }

    // depth-first traverse and collect types
    const extract = children => {
      if (!children) {
        return;
      }
      if (Array.isArray(children)) {
        children.forEach(extract);
        return;
      }
      if (children.props && children.props.children) {
        extract(children.props.children);
      }
      if (
        typeof children === 'string' ||
        typeof children.type === 'string' ||
        (Array.isArray(this.props.propTablesExclude) && // also ignore excluded types
          ~this.props.propTablesExclude.indexOf(children.type)) // eslint-disable-line no-bitwise
      ) {
        return;
      }
      if (children.type && !types.has(children.type)) {
        types.set(children.type, true);
      }
    };

    // extract components from children
    extract(this.props.children);

    const array = Array.from(types.keys());
    array.sort((a, b) => (a.displayName || a.name) > (b.displayName || b.name));

    const { maxPropObjectKeys, maxPropArrayLength, maxPropStringLength } = this.props;
    const propTables = array.map(type => (
      <div key={type.displayName || type.name}>
        <H3>
          {type.displayName || type.name} Component
        </H3>
        <PropTable
          type={type}
          maxPropObjectKeys={maxPropObjectKeys}
          maxPropArrayLength={maxPropArrayLength}
          maxPropStringLength={maxPropStringLength}
        />
      </div>
    ));

    if (!propTables || propTables.length === 0) {
      return null;
    }

    const channel = addons.getChannel();
    channel.emit('storybooks/meta/propTypes', { htmlToDisplay: ReactDOMServer.renderToString(propTables) });

    if (!overlay) return null;

    return (
        <div>
          <H2>Prop Types</H2>
            {propTables}
        </div>
    );
  }

  render() {
    if (this.props.showInline) {
      return this._renderInline();
    }

    return this._renderOverlay();
  }
}

Story.displayName = 'Story';

Story.propTypes = {
  context: PropTypes.shape({
    kind: PropTypes.string,
    story: PropTypes.string,
  }),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  propTables: PropTypes.arrayOf(PropTypes.func),
  propTablesExclude: PropTypes.arrayOf(PropTypes.func),
  showInline: PropTypes.bool,
  showHeader: PropTypes.bool,
  showSource: PropTypes.bool,
  styles: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  marksyConf: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  maxPropsIntoLine: PropTypes.number.isRequired,
  maxPropObjectKeys: PropTypes.number.isRequired,
  maxPropArrayLength: PropTypes.number.isRequired,
  maxPropStringLength: PropTypes.number.isRequired,
};
Story.defaultProps = {
  context: null,
  info: '',
  children: null,
  propTables: null,
  propTablesExclude: [],
  showInline: false,
  showHeader: true,
  showSource: true,
  marksyConf: {},
};
