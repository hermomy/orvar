/**
*
* Input
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function Input(props) {
    const className = (props.type !== 'submit') ? `form-control ${props.className || ''}` : props.className;
    return (
        <fieldset className="form-group">
            {(props.label) ? <label className="text-capitalize small text-muted mb-0" htmlFor={props.label}>{props.label}</label> : ''}
            <input
                className={className}
                name={props.name}
                type={props.type}
                onChange={props.onChange}
                value={props.loading ? 'Loading...' : props.value}
                disabled={props.loading}
                placeholder={props.placeholder &&
                    props.placeholder.charAt(0).toUpperCase() + props.placeholder.slice(1)
                }
            />
        </fieldset>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    className: PropTypes.string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string,
    name: PropTypes.string,
};

export default Input;
