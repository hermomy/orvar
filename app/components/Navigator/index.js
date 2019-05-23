/**
*
* Navigator
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import globalScope from 'globalScope';
import NavItem from './NavItem/index';

import './style.scss';

function Navigator(props) {
    const menu = props.items.map((item) => {
        if (item.require_login && !globalScope.token) {
            return null;
        }

        return (
            <li className="nav-item px-2" key={item.code} style={{ listStyle: 'none' }}>
                <NavItem clickHandler={props.clickHandler} vertical={props.vertical} itemClassName={props.itemClassName} data={item}></NavItem>
            </li>
        );
    });

    if (props.vertical) {
        return (
            <div className={`vertical-navigator ${props.className}`}>
                <nav className="">
                    <div className="">
                        {props.items.length && menu}
                    </div>
                </nav>
            </div>
        );
    }

    return (
        <div className={props.className} style={{ position: 'absolute', top: 0, right: '16px' }}>
            <nav className="orvar-navbar">
                <div className="orvar-navbar-nav">
                    {props.items.length && menu}
                </div>
            </nav>
        </div>
    );
}

Navigator.propTypes = {
    items: PropTypes.array.isRequired,
    vertical: PropTypes.bool,
};

export default Navigator;
