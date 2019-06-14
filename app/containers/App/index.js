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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import withWidth from '@material-ui/core/withWidth';

import Notify from 'containers/Notify';
import ProductView from 'containers/ProductView';
import HomePage from 'containers/HomePage';
import LogoutForm from 'containers/LogoutForm';
import MallPage from 'containers/MallPage';
import NotFoundPage from 'containers/NotFoundPage';
import OnboardingPage from 'containers/OnboardingPage';
import ProfilePage from 'components/ProfilePage';
// import Cart from 'containers/CartPage';
import PrivateRoute from 'containers/App/PrivateRoute';
import CheckoutPage from 'containers/CheckoutPage';
import ProfileOrder from 'containers/ProfileOrder';
import ProfileEditInform from 'containers/ProfileEditInform';
import ProfileReview from 'containers/ProfileReview';
import ProfileWishlist from 'containers/ProfileWishlist';
// import ProfileSetting from 'containers/ProfileSetting';
import AboutUs from 'containers/AboutUs';
import FeedbackPage from 'containers/FeedbackPage';

import Header from 'containers/Header';
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
import { ProfileWallet } from '../ProfileWallet';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(fetchConfig());
    }

    render() {
        return (
            <section>
                <Notify></Notify>
                <div id="hershop-content-container">
                    <Header />
                    <Switch>
                        <Route exact={true} path="/login" component={globalScope.token ? LogoutForm : LoginForm} />
                        <Route exact={true} path="/onboarding" component={globalScope.token ? OnboardingPage : LoginForm} />
                        <Route exact={true} path="/logout" component={LogoutForm} />
                        <Route exact={true} path="/mall" render={() => <MallPage />} />
                        <Route exact={true} path="/mall/page-:pageNum?" render={() => <MallPage />} />
                        <Route
                            exact={true}
                            path="/mall/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/:subCategoryQueries?/page-:pageNum(\d+)"
                            render={() => (
                                <MallPage />
                            )}
                        />
                        <Route
                            exact={true}
                            path="/mall/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries/:subCategoryQueries"
                            render={() => (
                                <MallPage />
                            )}
                        />

                        <Route
                            exact={true}
                            path="/mall/groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/page-:pageNum(\d+)"
                            render={() => (
                                <MallPage />
                            )}
                        />
                        <Route
                            exact={true}
                            path="/mall/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?"
                            render={() => (
                                <MallPage />
                            )}
                        />
                        <Route exact={true} path="/mall/:productId" component={ProductView} />
                        <Route exact={true} path="/about" component={AboutUs} />
                        <Route
                            exact={true}
                            path="/about/:abouthermo(joinus|contactus|shippinginfo|returnpolicy|membership|privacypolicy|termandcondition|faq|userterm|hermobankaccount)?"
                            component={AboutUs}
                        />
                        <Route exact={true} path="/feedback" component={FeedbackPage} />
                        <Route exact={true} path="/" component={HomePage} />

                        <Route exact={true} path="/profile/me" render={() => <ProfilePage />} />


                        <Route exact={true} path="/profile/wallet" component={ProfileWallet} />
                        <Route exact={true} path="/profile/order" component={ProfileOrder} />
                        <Route exact={true} path="/profile/order:ordercatergory(/to-paid|/to-ship|/to-receive|/reviewable)" component={ProfileOrder} />
                        <Route exact={true} path="/profile/detail" component={ProfileEditInform} />
                        <Route exact={true} path="/profile/review" component={ProfileReview} />
                        <Route exact={true} path="/profile/wishlist" component={ProfileWishlist} />
                        <PrivateRoute
                            exact={true}
                            path="/checkout"
                            token={globalScope.token || ''}
                            render={() => <CheckoutPage />}
                        />
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                    <TabBar />
                </div>
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
    withWidth(),
)(App);
