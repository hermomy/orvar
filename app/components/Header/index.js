/**
*
* Header
*
*/

import React from 'react';

import { NavLink } from 'react-router-dom';
import CartPage from 'containers/CartPage';

import globalScope from '../../globalScope';
import './style.scss';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showCartPopout: false,
        };
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
            <div className="header">
                <div className="logo">
                    <NavLink to="/">
                        <img src="https://cdn5.hermo.my/hermo/imagelink/2017/hermo-logo_01522372998.png" alt="Hermo Logo" width="30%"></img>
                    </NavLink>
                </div>
                <div className="cart-in-header">
                    {
                        globalScope.token ?
                            <div
                                className="cart-popout-trigger"
                                onClick={() => this.setState({ showCartPopout: !this.state.showCartPopout })}
                            >Cart</div>
                            :
                            <NavLink to="/login">login</NavLink>
                    }
                    {
                        this.state.showCartPopout && this.renderCartPopout()
                    }
                </div>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;
