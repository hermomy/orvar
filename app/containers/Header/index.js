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
        };
    }

    componentDidMount() {
        this.props.dispatch(layoutTopNav());
    }

    renderCartPopout = () => {
        console.log();
        return (
            <div className="cart-popup-modal">
                <CartPage />
                <div className="text-right">
                    <NavLink className="hershop-button" to="/checkout">
                        Checkout Now
                    </NavLink>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="header">
                <div className="left-side">
                    <div className="logo mr-1">
                        <NavLink to="/">
                            <img src="https://cdn5.hermo.my/hermo/imagelink/2017/hermo-logo_01522372998.png" alt="Hermo Logo" width="100%"></img>
                        </NavLink>
                    </div>
                    <div className="top-nav">
                        {
                            dataChecking(this.props.header, 'data') ?
                                dataChecking(this.props.header, 'data').map((val) => (
                                    <span className="pr-1" key={val.code}>
                                        {val.text}
                                    </span>
                                ))
                            :
                                <div>xde</div>
                        }
                    </div>
                </div>
                <div className="right-side">
                    <div>
                        <i
                            className="pr-1 fas fa-search"
                            style={{ color: 'grey' }}
                        ></i>
                    </div>
                    <div>
                        {
                            globalScope.token ?
                                <i
                                    className="pr-1 fas fa-user"
                                    style={{ color: 'grey' }}
                                ></i>
                            :
                                <NavLink to="/login">
                                    <i
                                        className="pr-1 fas fa-user"
                                        style={{ color: 'grey' }}
                                    ></i>
                                </NavLink>
                        }
                    </div>
                    <div className="cart-in-header">
                        {
                            globalScope.token ?
                                <i
                                    className="pr-1 fas fa-shopping-cart"
                                    onClick={() => this.setState({
                                        showCartPopout: !this.state.showCartPopout,
                                        cartPopoutActive: !this.state.cartPopoutActive,
                                    })}
                                    style={{ color: 'grey' }}
                                ></i>
                            :
                                <NavLink to="/login">
                                    <i
                                        className="pr-1 fas fa-shopping-cart"
                                        style={{ color: 'grey' }}
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
