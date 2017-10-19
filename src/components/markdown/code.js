import React from 'react';
import PropTypes from 'prop-types';

export class Code extends React.Component {
  render() {
    const codeStyle = {
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      backgroundColor: '#fafafa',
      marginBottom: 15
    };

    const preStyle = {
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      backgroundColor: '#fafafa',
      padding: '.5rem',
      lineHeight: 1.5,
      overflowX: 'scroll',
      display: 'inline'
    };

    const className = this.props.language ? `language-${this.props.language}` : '';

    return (
      <pre style={preStyle} className={className}>
        <code style={codeStyle} className={className}>
          {this.props.children}
        </code>
      </pre>
    );
  }
}

Code.propTypes = {
  language: PropTypes.string,
  code: PropTypes.node,
};
Code.defaultProps = {
  language: null,
  code: null,
};

export function Pre(props) {
  const style = {
    fontSize: '.88em',
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    backgroundColor: '#fafafa',
    padding: '.5rem',
    lineHeight: 1.5,
    overflowX: 'scroll',
  };

  return <pre style={style}>{props.children}</pre>;
}

Pre.propTypes = { children: PropTypes.node };
Pre.defaultProps = { children: null };

export function Blockquote(props) {
  const style = {
    fontSize: '1.88em',
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    borderLeft: '8px solid #fafafa',
    padding: '1rem',
  };
  return <blockquote style={style}>{props.children}</blockquote>;
}

Blockquote.propTypes = { children: PropTypes.node };
Blockquote.defaultProps = { children: null };
