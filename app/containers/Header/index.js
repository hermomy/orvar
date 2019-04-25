/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { NavLink } from 'react-router-dom';
import CartPage from 'containers/CartPage';
import { dataChecking } from 'globalUtils';
import { layoutTopNav, searchResult } from './actions';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import globalScope from '../../globalScope';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showCartPopout: false,
            hideSearchBar: true,
        };
    }

    componentDidMount() {
        this.props.dispatch(layoutTopNav());
    }

    getSearchResult = (e) => {
        if (e.target.value.length > 2) {
            this.props.dispatch(searchResult(e.target.value));
        }
    }

    searchSection = () => (
        <div className={`search ml-3 ${!this.state.hideSearchBar ? 'show' : ''}`}>
            {
                !this.state.hideSearchBar ?
                    <input type="text" onChange={(e) => this.getSearchResult(e)}></input>
                :
                    null
            }
            <i
                className={`fas icon ${!this.state.hideSearchBar ? 'fa-times' : 'fa-search'}`}
                onClick={() => this.setState({
                    hideSearchBar: !this.state.hideSearchBar,
                })}
                style={{
                    color: 'grey',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                }}
            ></i>
        </div>
    )

    quicklinks = () => (
        <div className="quicklink">
            {this.searchSection()}
            <div className="ml-3">
                <i
                    className="fas fa-user"
                    style={{
                        color: 'grey',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                ></i>
            </div>
            <div className="cart-in-header ml-3">
                {
                    globalScope.token ?
                        <i
                            className="fas fa-shopping-cart"
                            onClick={() => this.setState({
                                showCartPopout: !this.state.showCartPopout,
                            })}
                            style={{
                                color: 'grey',
                                fontSize: '1.5rem',
                            }}
                        ></i>
                    :
                        <NavLink to="/login">
                            <i
                                className="fas fa-shopping-cart"
                                style={{
                                    color: 'grey',
                                    fontSize: '1.5rem',
                                }}
                            ></i>
                        </NavLink>
                }
                {
                    this.state.showCartPopout && this.renderCartPopout()
                }
            </div>
        </div>
    )

    topCategory = () => (
        <div className={`top-nav ${!this.state.hideSearchBar ? 'show' : ''}`}>
            {
                dataChecking(this.props.header, 'data') ?
                    dataChecking(this.props.header, 'data').map((val) => (
                        <div className="ml-3 category" key={val.code}>
                            {val.text}
                        </div>
                    ))
                    :
                    null
            }
        </div>
    )

    renderCartPopout = () => (
        <div className="cart-popup-modal">
            <CartPage />
            <div className="text-right">
                <NavLink className="hershop-button" to="/checkout">
                    Checkout Now
                </NavLink>
            </div>
        </div>
    )

    render() {
        return (
            <div id="header">
                <div className={`logo ${!this.state.hideSearchBar ? 'show' : ''}`}>
                    <NavLink to="/">
                        <img src="https://cdn5.hermo.my/hermo/imagelink/2017/hermo-logo_01522372998.png" alt="Hermo Logo" width="100%"></img>
                    </NavLink>
                </div>
                {this.topCategory()}
                {this.quicklinks()}
            </div>
        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    header: makeSelectHeader(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Header);
