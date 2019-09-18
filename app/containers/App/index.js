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
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Switch, Route } from 'react-router-dom';

import { Events } from 'globalUtils';

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

import GamesPage from 'containers/GamesPage';

import Header from 'containers/Header';
import TabBar from 'components/TabBar';
import { ProfileWallet } from '../ProfileWallet';

// import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            hideHeader: false,
        };
        Events.listen('hideHeader', 123456, () => {
            this.setState({ hideHeader: true });
        });
    }


    render() {
        return (
            <section>
                <Notify></Notify>
                {
                    this.state.hideHeader ?
                        null
                        :
                        <Header />
                }
                <div
                    id="hershop-content-container"
                    style={this.state.hideHeader ? {} : { paddingTop: '9rem' }}
                >
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

                        <PrivateRoute exact={true} path="/games/:id" component={GamesPage} />

                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
                {
                    this.state.hideHeader ?
                        null
                        :
                        <TabBar />
                }
            </section>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    // app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(App);
