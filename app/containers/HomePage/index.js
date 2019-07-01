/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import SignUpPage from '../SignUpPage';
// import { dataChecking } from 'globalUtils';
// import Fancy from '@tienping/my-react-dom';

import messages from './messages';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        SignUpPage: false,
    }

    render() {
        return (
            <div className="container">
                <h1 style={{ textAlign: 'center' }}>
                    <FormattedMessage {...messages.header} />
                </h1>
                {/* <div><Fancy /></div> */}
                <section style={{ textAlign: 'center', padding: '5vw 1vw' }}>
                    <div key="sadfsdf">
                        <NavLink to={'/mall'} className="page-select-button hershop-button" title="title">
                            Mall
                        </NavLink>
                        <NavLink to={'/profile'} className="page-select-button hershop-button" title="title">
                            Profile
                        </NavLink>
                        <NavLink to={'/profile/order'} className="page-select-button hershop-button" title="title">
                            Profile order
                        </NavLink>
                        <NavLink to={'/profile/detail'} className="page-select-button hershop-button" title="title">
                            Profile edit info
                        </NavLink>
                        <NavLink to={'/onboarding'} className="page-select-button hershop-button" title="title">
                            OnboardingPage
                        </NavLink>
                        {
                            this.state.SignUpPage ? <SignUpPage /> : null
                        }
                    </div>
                </section>
            </div>
        );
    }
}
