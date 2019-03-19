/**
 *
 * Notify
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

// import messages from './messages';

export class Notify extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <NotificationContainer />
        );
    }
}

export const notifyInfo = (message, title, timeOut = 3000, callback, priority) => {
    NotificationManager.info(message, title, timeOut, callback, priority);
};

export const notifySuccess = (message, title, timeOut = 3000, callback, priority) => {
    NotificationManager.success(message, title, timeOut, callback, priority);
};

export const notifyWarning = (message, title, timeOut = 3000, callback, priority) => {
    NotificationManager.warning(message, title, timeOut, callback, priority);
};

export const notifyError = (message, title, timeOut = 3000, callback, priority) => {
    NotificationManager.error(message, title, timeOut, callback, priority);
};

Notify.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
    withConnect,
)(Notify);
