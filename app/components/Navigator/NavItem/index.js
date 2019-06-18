/**
*
* NavItem
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import NavDropdown from './NavDropdown';

function NavItem(props) {
    if (props.data.type === 'internal_url') {
        return (
            <NavLink
                to={props.data.url}
                className={`nav-link text-capitalize text-hover-hermo-pink ${props.itemClassName}`}
                title={props.data.title}
                onClick={props.clickHandler ? props.clickHandler : () => {}}
            >
                <span className={props.data.iconClass ? props.data.iconClass : ''}></span>
                <span>{ props.vertical ? props.data.verticalText : props.data.text}</span>
            </NavLink>
        );
    } else if (props.data.type === 'external_url') {
        return (
            <a
                href={props.data.url}
                className={`nav-link text-capitalize text-hover-hermo-pink ${props.itemClassName}`}
                title={props.data.title}
                onClick={props.clickHandler ? props.clickHandler : () => {}}
            >
                <span className={props.data.iconClass ? props.data.iconClass : ''}>{props.data.text}</span>
                <span>{ props.vertical ? props.data.verticalText : props.data.text}</span>
            </a>
        );
    } else if (props.data.type === 'dropdown') {
        return (
            <NavDropdown items={props.data.items} data={props.data} title={props.data.title} vertical={props.vertical} itemClassName={props.itemClassName} clickHandler={props.clickHandler}>
                <span className={`text-hover-hermo-pink ${props.itemClassName}`}>
                    <span className={(props.data.iconClass ? props.data.iconClass : 'dropdown__name ')} title={props.data.title}></span>
                    <span>{ props.vertical ? props.data.verticalText : props.data.text}</span>
                </span>
            </NavDropdown>
        );
    } else if (props.data.type === 'exec_function') {
        return (
            <a
                onClick={(...params) => {
                    props.data.handleLinkClick({ ...params });

                    if (props.clickHandler) {
                        props.clickHandler({ ...params });
                    }
                }}
                role="button"
                tabIndex="0"
                className={`nav-link text-capitalize text-hover-hermo-pink ${props.itemClassName}`}
                title={props.data.title}
            >
                <span className={props.data.iconClass ? props.data.iconClass : ''}></span>
                <span>{ props.vertical ? props.data.verticalText : props.data.text}</span>
            </a>
        );
    } else if (props.data.type === 'render') {
        return props.data.render(props);
    }

    return (
        <span className={`nav-link text-capitalize text-hover-hermo-pink ${props.itemClassName}`} title={props.data.title}>
            <span className={props.data.iconClass ? props.data.iconClass : ''}></span>
            <span>{ props.vertical ? props.data.verticalText : props.data.text}</span>
        </span>
    );
}

NavItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default NavItem;
