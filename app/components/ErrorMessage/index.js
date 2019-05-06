/**
*
* ErrorMessage
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// const ErrorContainer = styled.section`
//     &:hover {
//         cursor: pointer;
//         opacity: 0.8;
//     }
// `;

function ErrorMessage({ component: Component, error, ...props }) {
    return (
        <span>
            {error && error.messages && error.messages.map((msg) => (
                <section key={msg} className={`alert alert-${props.type || 'warning'}`}>
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
