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
// import { NavLink } from 'react-router-dom';

import makeSelectProfileWholePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    mainGetProfile,
} from './actions';

export class ProfileWholePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        subpage: 'ProfilePage',
    }

    componentWillMount() {
        this.props.dispatch(mainGetProfile());
    }

    renderSideBar = () => {
        if (!dataChecking(this.props, 'profileWholePage', 'data', 'mainProfileData')) {
            return null;
        }
        const user = this.props.profileWholePage.data.mainProfileData;
        return (
            <div>
                {/* <img src={user.avatar} alt="" /> */}
                <span>{user.name}</span><br />
                <span>{user.membership.name}</span><br />
                <span>Usable Credits {user.credit.usable}</span><br />
                <span>Usable Balance {user.balance.usable}</span><br />

                <div style={{ float: 'left' }}>
                    <span onClick={() => this.setState({ subpage: 'ProfileEditInform' })}>Profile</span><br />
                    <span onClick={() => this.setState({ subpage: 'ProfileOrder' })}>Order</span><br />
                    <span onClick={() => this.setState({ subpage: 'ProfileWallet' })}>Wallet</span><br />
                    <span onClick={() => this.setState({ subpage: 'ProfileReview' })}>Review</span><br />
                    <span onClick={() => this.setState({ subpage: 'ProfileWishlist' })}>Wishlist ({user.wishlist.total} )</span><br />
                    <span onClick={() => this.setState({ subpage: 'ProfileSetting' })}>Setting</span><br />
                    <span onClick={() => this.setState({ subpage: 'LogoutForm' })}>Logout</span><br />
                </div>
                {this.state.subpage === 'ProfileEditInform' ? <div style={{ float: 'right' }}><ProfileEditInform /></div> : null}
                {this.state.subpage === 'ProfileOrder' ? <div style={{ float: 'right' }}><ProfileOrder /></div> : null}
                {this.state.subpage === 'ProfileWallet' ? <div style={{ float: 'right' }}><ProfileWallet /></div> : null}
                {this.state.subpage === 'ProfileReview' ? <div style={{ float: 'right' }}><ProfileReview /></div> : null}
                {this.state.subpage === 'ProfileWishlist' ? <div style={{ float: 'right' }}><ProfileWishlist /></div> : null}
                {/* {this.state.subpage === 'ProfileSetting' ? <ProfileSetting /> : null} */}
                {this.state.subpage === 'LogoutForm' ? <div style={{ float: 'right' }}><LogoutForm /></div> : null}

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
