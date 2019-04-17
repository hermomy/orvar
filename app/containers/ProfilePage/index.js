/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';

import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { getProfile } from './actions';
import './style.scss';

const buttonSection = [
    {
        section: 1,
        child: [
            {
                name: 'My Wallet',
                key: '/wallet',
            },
            {
                name: 'My Review',
                key: '/review',
            },
            {
                name: 'My Orders',
                key: '/order',
            },
            {
                // name: 'My Rewards',
            },
            {
                name: 'My WishList',
                key: '/wishlist',
            },
        ],
    },
    {
        section: 2,
        child: [
            {
                // name: 'Contact Us',
            },
            {
                // name: 'FAQ',
            },
        ],
    },
    {
        section: 3,
        child: [
            {
                name: 'About',
            },
            {
                name: 'Privacy Policy',
            },
        ],
    },
    {
        section: 4,
        child: [
            {
                name: 'Give Us Feedback',
            },
            {
                name: 'Join Us',
            },
            {
                name: 'Language',
            },
        ],
    },
    {
        section: 5,
        child: [
            {
                name: 'Log Out',
            },
        ],
    },
];

export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    routeTo = (page) => {
        switch (page) {
            case 'My Wallet':
                break;
            default:
                break;
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Helmet>
                    <title>ProfilePage</title>
                    <meta name="description" content="Description of ProfilePage" />
                </Helmet>
                <div className="profile-page-container">
                    <div className="profile-page-top-section">
                        <img className="profile-page-top-banner" src={require('images/profile-top-banner-bg.png')} alt="" />
                        <div className="profile-page-top-content">
                            <div className="profile-page-information">
                                <div className="profile-page-information-data">
                                    <img className="profile-page-avatar" src={dataChecking(this.props.profilePage, 'data', 'avatar')} alt="" />
                                    <div className="profile-page-user-content">
                                        <span className="profile-page-username">{dataChecking(this.props.profilePage, 'data', 'name')}</span>
                                        <span className="profile-page-edit">View and edit profile &#62; </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-page-floating-section">
                        <div className="profile-page-floating-content">
                            <div className="profile-page-member-level">
                                <span>{dataChecking(this.props.profilePage, 'data', 'membership', 'name')}</span>
                                <div className="profile-page-member-point">
                                    <span className="profile-page-point-value">{dataChecking(this.props.profilePage, 'data', 'credit', 'usable')}</span>
                                    <span className="profile-page-point-symbol">H-Points</span>
                                </div>
                            </div>
                            <div className="profile-page-member-card">
                                <img src={require('images/profile-top-banner-bg.png')} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-page-middle-section">
                        <div className="profile-page-order-container">
                            <div className="profile-page-order-header">
                                <span>My Orders</span>
                                <span>View order history</span>
                            </div>
                            <div className="profile-page-order-content">
                                <div className="profile-page-order-icon-container">
                                    <div className="profile-page-order-icon">
                                        <img src={require('images/toPay-icon.png')} alt="" />
                                        <span>To Pay</span>
                                    </div>
                                    <div className="profile-page-order-icon">
                                        <img src={require('images/toShip-icon.png')} alt="" />
                                        <span>To Ship</span>
                                    </div>
                                    <div className="profile-page-order-icon">
                                        <img src={require('images/toReview-icon.png')} alt="" />
                                        <span>To Review</span>
                                    </div>
                                    <div className="profile-page-order-icon">
                                        <img src={require('images/cancelled-icon.png')} alt="" />
                                        <span>Cancelled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-page-button-container">
                            {
                                buttonSection.map((section) => (
                                    <div className="profile-page-button">
                                        {
                                            section.child.map((c) => (
                                                <NavLink
                                                    to={`${c.key}`}
                                                    style={{ marginTop: '5rem' }}
                                                >
                                                    <span onClick={() => this.routeTo(c.name)} className="profile-page-button-text">{c.name}</span>
                                                </NavLink>
                                            ))
                                        }
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfilePage);
