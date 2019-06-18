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
                        <Route exact={true} path="/" component={HomePage} />
                        <PrivateRoute exact={true} path="/login" component={LogoutForm} />
                        <PrivateRoute exact={true} path="/logout" component={LogoutForm} />
                        <PrivateRoute exact={true} path="/onboarding" component={OnboardingPage} />

                        <Route exact={true} path="/mall" component={MallPage} />
                        <Route exact={true} path="/mall/page-:pageNum?" component={MallPage} />
                        {/* group or category without pagenum */}
                        <Route
                            exact={true}
                            path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?"
                            component={MallPage}
                        />
                        {/* group or category with pagenum */}
                        <Route
                            exact={true}
                            path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/page-:pageNum(\d+)"
                            component={MallPage}
                        />
                        {/* subcategory without pagenum */}
                        <Route
                            exact={true}
                            path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/:subCategoryQueries?"
                            component={MallPage}
                        />
                        {/* subcategory with pagenum */}
                        <Route
                            exact={true}
                            path="/:groupName(skin-care|make-up|fragrance|bath-and-body|set-item|hair|beauty-and-wellness)/:categoryQueries?/:subCategoryQueries?/page-:pageNum(\d+)"
                            component={MallPage}
                        />
                        <Route exact={true} path="/mall/:productId" component={ProductView} />
                        <Route
                            exact={true}
                            path="/about/:abouthermo(joinus|contactus|shippinginfo|returnpolicy|membership|privacypolicy|termandcondition|faq|userterm|hermobankaccount)?"
                            component={AboutUs}
                        />
                        <PrivateRoute exact={true} path="/feedback" component={FeedbackPage} />
                        <PrivateRoute exact={true} path="/checkout" component={CheckoutPage} />
                        <PrivateRoute exact={true} path="/profile" component={ProfilePage} />
                        <PrivateRoute exact={true} path="/profile/wallet" component={ProfileWallet} />
                        <PrivateRoute exact={true} path="/profile/detail" component={ProfileEditInform} />
                        <PrivateRoute exact={true} path="/profile/review" component={ProfileReview} />
                        <PrivateRoute exact={true} path="/profile/wishlist" component={ProfileWishlist} />
                        <PrivateRoute exact={true} path="/profile/order" component={ProfileOrder} />
                        <PrivateRoute exact={true} path="/profile/order:ordercatergory(/to-paid|/to-ship|/to-receive|/reviewable)" component={ProfileOrder} />

                        <Route component={NotFoundPage} />
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
)(App);
