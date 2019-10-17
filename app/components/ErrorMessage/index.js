/**
*
* ErrorMessage
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

// const ErrorContainer = styled.section`
//     &:hover {
//         cursor: pointer;
//         opacity: 0.8;
//     }
// `;

function ErrorMessage({ component: Component, error, ...props }) {
    return (
        <span className="error-messages">
            {error && error.messages && error.messages.map((msg, index) => (
                <section key={index} className={`alert alert-${props.type || msg.type || 'warning'}`}>
                    <div>{ msg.text }</div>
                </section>
            ))}
        </span>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    type: PropTypes.string,
    component: PropTypes.object,
};

export default ErrorMessage;
