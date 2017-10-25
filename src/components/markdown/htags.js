import React from 'react';
import PropTypes from 'prop-types';
import { baseFonts } from '@storybook/components';

const defaultProps = {
  children: null,
  id: null,
};
const propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
};

export function H1(props) {
    const styles = {
        margin: "25px 0 0 0",
        padding: 0,
        fontSize: '40px',
        fontWeight: 500,
    };

    return (
        <h1 id={props.id} style={styles}>
            {props.children}
            <HR />
        </h1>
    );
}

H1.defaultProps = defaultProps;
H1.propTypes = propTypes;

export function H2(props) {
    const styles = {
        margin: "25px 0 0 0",
        padding: 0,
        fontSize: '30px',
        fontWeight: 500,
        ...props.style,
    };
    return (
        <h2 id={props.id} style={styles}>
            {props.children}
            <HR style={props.hrStyle} />
        </h2>
    );
}

H2.defaultProps = defaultProps;
H2.propTypes = propTypes;

export function H3(props) {
    const styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '22px',
        fontWeight: 500
    };
    return (
        <h3 id={props.id} style={styles}>
            {props.children}
        </h3>
    );
}

H3.defaultProps = defaultProps;
H3.propTypes = propTypes;

export function H4(props) {
    const styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '20px',
        fontWeight: 500
    };
    return (
        <h4 id={props.id} style={styles}>
            {props.children}
        </h4>
    );
}

H4.defaultProps = defaultProps;
H4.propTypes = propTypes;

export function H5(props) {
    const styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '18px',
        fontWeight: 500,
    };
    return (
        <h5 id={props.id} style={styles}>
            {props.children}
        </h5>
    );
}

H5.defaultProps = defaultProps;
H5.propTypes = propTypes;

export function H6(props) {
    const styles = {
        margin: "15px 0 15px 0",
        padding: 0,
        fontSize: '18px',
        fontWeight: 500
    };
    return (
        <h6 id={props.id} style={styles}>
            {props.children}
        </h6>
    );
}

H6.defaultProps = defaultProps;
H6.propTypes = propTypes;

export function HR(props) {
    const styles = {
        margin: '15px 0px',
        padding: 0,
        border: 0,
        borderTop: '1px solid #f0f4f8',
        ...props.style
    };
    return (
        <hr style={styles}/>
    );
}

HR.defaultProps = defaultProps;
HR.propTypes = propTypes;
