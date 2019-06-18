/**
 *
 * LogoutForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { removeCookie } from 'globalUtils';
import globalScope from 'globalScope';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogoutForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './style.scss';

export class LogoutForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div id="LogoutForm-container" className="LogoutForm-page">
                <Helmet>
                    <title>Logout Hermo</title>
                    <meta name="description" content="Form to facilitate logoin" />
                </Helmet>
                <section className="container">
                    <div className="logoutForm-wrapper">
                        <div className="logoutForm-div">
                            <div>
                                <h4><span><FormattedMessage {...messages.formTitle} /></span></h4>
                            </div>
                            <div className="actions">
                                <span
                                    onClick={() => {
                                        removeCookie(process.env.TOKEN_KEY);
                                        removeCookie(process.env.ADMIN_KEY);
                                        window.location.href = globalScope.previousPage || '/';
                                    }}
                                    className="confirm hershop-button"
                                >
                                    <FormattedMessage {...messages.confirm} />
                                </span>
                                <span
                                    onClick={() => {
                                        if (globalScope.previousPage) {
                                            this.props.history.push(globalScope.previousPage);
                                        } else {
                                            this.props.history.goBack();
                                        }
                                    }}
                                    className="cancel invert hershop-button"
                                >
                                    <FormattedMessage {...messages.cancel} />
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

LogoutForm.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    logoutform: makeSelectLogoutForm(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'logoutForm', reducer });
const withSaga = injectSaga({ key: 'logoutForm', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(LogoutForm);
