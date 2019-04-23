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
import { layoutTopNav } from './actions';
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
                <div className={`left-side ${!this.state.hideSearchBar ? 'hide-search-bar' : ''}`}>
                    <div className="logo">
                        <NavLink to="/">
                            <img src="https://cdn5.hermo.my/hermo/imagelink/2017/hermo-logo_01522372998.png" alt="Hermo Logo" width="100%"></img>
                        </NavLink>
                    </div>
                    <div className="top-nav">
                        {
                            dataChecking(this.props.header, 'data') ?
                                dataChecking(this.props.header, 'data').map((val) => (
                                    <div className="ml-2" key={val.code}>
                                        {val.text}
                                    </div>
                                ))
                                :
                                null
                        }
                    </div>
                </div>
                <div className="right-side">
                    <div className={`ml-2 a1 ${!this.state.hideSearchBar ? '_show' : ''}`}>
                        {
                            this.state.hideSearchBar ?
                                <i
                                    className="fas fa-search"
                                    onClick={() => this.setState({
                                        hideSearchBar: !this.state.hideSearchBar,
                                    })}
                                    style={{
                                        color: 'grey',
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                    }}
                                ></i>
                            :
                                <span>
                                    <input type="text" placeholder="Search..."></input>
                                    <i
                                        className="fas fa-times"
                                        onClick={() => this.setState({
                                            hideSearchBar: !this.state.hideSearchBar,
                                        })}
                                        style={{
                                            color: 'grey',
                                            fontSize: '1.5rem',
                                            cursor: 'pointer',
                                        }}
                                    ></i>
                                </span>
                        }
                    </div>
                    <div className="ml-2">
                        {
                            globalScope.token ?
                                <i
                                    className="fas fa-user"
                                    style={{
                                        color: 'grey',
                                        fontSize: '1.5rem',
                                    }}
                                ></i>
                            :
                                <NavLink to="/login">
                                    <i
                                        className="fas fa-user"
                                        style={{
                                            color: 'grey',
                                            fontSize: '1.5rem',
                                        }}
                                    ></i>
                                </NavLink>
                        }
                    </div>
                    <div className="ml-2 cart-in-header">
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
