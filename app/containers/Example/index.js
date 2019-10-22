/**
 *
 * Example
 *
 */
/* global FB */
import React from 'react';
import PropTypes from 'prop-types';
import globalScope from 'globalScope';
import { connect } from 'react-redux';
// import { FacebookProvider, LoginButton } from 'react-facebook';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectExample from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';


export class Example extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.init({
                appId: globalScope.fb_id,
                cookie: true,
                xgbml: true,
                version: 'v4.0',
            });
        };

        // eslint-disable-next-line func-names
        (function (d, s, id) {
            let js = d.getElementsByTagName(s)[0];
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response) => {
            console.log(`Successful login for: ${response.name}`);
            document.getElementById('status').innerHTML =
        `Thanks for logging in, ${response.name}!`;
        });
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            console.log('Please log into this app.');
        } else {
            console.log('Please log into this facebook.');
        }
    }

    checkLoginState() {
        FB.getLoginStatus((response) => {
            console.log('response', response);
            this.statusChangeCallback(response);
        });
    }

    handleFBLogin() {
        FB.login(this.checkLoginState());
    }

    render() {
        return (
            <div>
                <button
                    className="btn-facebook"
                    id="btn-social-login"
                    onClick={() => this.handleFBLogin()}
                >
                    <span className="fa fa-facebook"></span> Sign in with Facebook
                </button>
            </div>
        );
    }
}

Example.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    example: makeSelectExample(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'example', reducer });
const withSaga = injectSaga({ key: 'example', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Example);
