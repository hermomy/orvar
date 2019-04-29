/**
 *
 * ProfileWholePage
 *
 */
// import ProfilePage from 'containers/ProfilePage';
import ProfileOrder from 'containers/ProfileOrder';
import ProfileWishlist from 'containers/ProfileWishlist';
import ProfileWallet from 'containers/ProfileWallet';
import ProfileReview from 'containers/ProfileReview';
import LogoutForm from 'containers/LogoutForm';
import ProfileEditInform from 'containers/ProfileEditInform';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import makeSelectProfileWholePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    mainGetProfile,
} from './actions';

export class ProfileWholePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        subpage: null,
    }

    componentWillMount() {
        this.props.dispatch(mainGetProfile());
        if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
            this.setState({ subpage: this.props.match.params.profilePart });
        }
    }

    clickSidebarButtonAction = (tempsubpage) => {
        this.setState({ subpage: tempsubpage });
        this.props.history.push(`/profile/${tempsubpage}`);
    }

    renderSideBar = () => {
        if (!dataChecking(this.props, 'profileWholePage', 'data', 'mainProfileData')) {
            return null;
        }
        const user = this.props.profileWholePage.data.mainProfileData;
        return (
            <div className="ProfileWholePage-container">
                <div className="ProfileWholePage-sidebar">
                    {/* <img src={user.avatar} alt="" /> */}
                    <span>{user.name}</span><br />
                    <span>{user.membership.name}</span><br />
                    <span>Usable Credits {user.credit.usable}</span><br />
                    <span>Usable Balance {user.balance.usable}</span><br />

                    <span onClick={() => this.clickSidebarButtonAction('me')}><FormattedMessage {...messages.Profile} /></span><br />
                    <span onClick={() => this.clickSidebarButtonAction('order')}><FormattedMessage {...messages.Order} /></span><br />
                    <span onClick={() => this.clickSidebarButtonAction('wallet')}><FormattedMessage {...messages.Wallet} /></span><br />
                    <span onClick={() => this.clickSidebarButtonAction('review')}><FormattedMessage {...messages.Review} /></span><br />
                    <span onClick={() => this.clickSidebarButtonAction('wishlist')}><FormattedMessage {...messages.Wishlist} /> ({user.wishlist.total} )</span><br />
                    <span onClick={() => this.clickSidebarButtonAction('setting')}><FormattedMessage {...messages.Setting} /></span><br />
                    <span onClick={() => this.clickSidebarButtonAction('logout')}><FormattedMessage {...messages.Logout} /></span><br />
                </div>
                <div className="ProfileWholePage-content">
                    {this.state.subpage === 'me' ? <div><ProfileEditInform /></div> : null}
                    {
                        this.state.subpage === 'order' ||
                        this.state.subpage === 'canceled' ||
                        this.state.subpage === 'to-paid' ||
                        this.state.subpage === 'to-ship'
                            ?
                                <div>
                                    <ProfileOrder />
                                </div>
                            :
                            null
                    }
                    {this.state.subpage === 'wallet' ? <div><ProfileWallet /></div> : null}
                    {this.state.subpage === 'review' ? <div><ProfileReview /></div> : null}
                    {this.state.subpage === 'wishlist' ? <div><ProfileWishlist /></div> : null}
                    {/* {this.state.subpage === 'ProfileSetting' ? <ProfileSetting /> : null} */}
                    {this.state.subpage === 'logout' ? <div><LogoutForm /></div> : null}
                </div>
            </div>
        );
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderSideBar()}
            </div>
        );
    }
}

ProfileWholePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileWholePage: makeSelectProfileWholePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWholePage', reducer });
const withSaga = injectSaga({ key: 'profileWholePage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileWholePage);
