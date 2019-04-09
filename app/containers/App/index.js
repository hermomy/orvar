/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and Expect only
 * contain code that Expect be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component Expect technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Notify from 'containers/Notify';
import ProductView from 'containers/ProductView';
import HomePage from 'containers/HomePage';
import LogoutForm from 'containers/LogoutForm';
import HerListing from 'containers/HerListing';
import NotFoundPage from 'containers/NotFoundPage';
// import Cart from 'containers/CartPage';
import PrivateRoute from 'containers/App/PrivateRoute';
import CheckoutPage from 'containers/CheckoutPage';

import Header from 'components/Header';
import TabBar from 'components/TabBar';
import globalScope from 'globalScope';
import LoginForm from '../LoginForm/index';

import {
    makeSelectLocation,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
    fetchConfig,
} from './actions';

const topbarHeight = '40px';

const HershopContent = styled.div`
    // margin-top: ${topbarHeight};
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(fetchConfig());
    }

    render() {
        return (
            <section>
                <Notify></Notify>
                <HershopContent id="hershop-content-container">
                    <Header />
                    <Switch>
                        <Route exact={true} path="/login" component={globalScope.token ? LogoutForm : LoginForm} />
                        <Route exact={true} path="/logout" component={LogoutForm} />
                        <Route
                            exact={true}
                            path="/mall/:pageNum?"
                            render={() => (
                                <HerListing
                                    dataType="mall"
                                />
                            )}
                        />
                        <Route exact={true} path="/mall/:productId" component={ProductView} />
                        <Route exact={true} path="/" component={HomePage} />
                        <PrivateRoute
                            exact={true}
                            path="/checkout"
                            token={globalScope.token || ''}
                            render={() => <CheckoutPage />}
                        />
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                    <TabBar />
                </HershopContent>
            </section>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'config', reducer });
const withSaga = injectSaga({ key: 'config', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(App);
