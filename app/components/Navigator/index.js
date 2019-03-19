/**
*
* Navigator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import globalScope from 'globalScope';
import NavItem from './NavItem/index';

import './style.scss';

const NavContainer = styled.div`
    position: absolute;
    top: 0;
    right: 16px;
`;
const UnstyleList = styled.li`
    list-style: none
`;

function Navigator(props) {
    const menu = props.items.map((item) => {
        if (item.require_login && !globalScope.token) {
            return null;
        }

        return (
            <UnstyleList className="nav-item px-2" key={item.code}>
                <NavItem clickHandler={props.clickHandler} vertical={props.vertical} itemClassName={props.itemClassName} data={item}></NavItem>
            </UnstyleList>
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
        <NavContainer className={props.className}>
            <nav className="orvar-navbar">
                <div className="orvar-navbar-nav">
                    {props.items.length && menu}
                </div>
            </nav>
        </NavContainer>
    );
}

Navigator.propTypes = {
    items: PropTypes.array.isRequired,
    vertical: PropTypes.bool,
};

export default Navigator;
