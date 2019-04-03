/**
*
* TabBar
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

function TabBar() {
    return (
        <div className="TabBar">
            <div style={{ textAlign: 'center' }}>
                <NavLink to="/cart" className="button">cart</NavLink>
            </div>
        </div>
    );
}

TabBar.propTypes = {

};

export default TabBar;
