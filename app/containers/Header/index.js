/* eslint-disable jsx-a11y/no-autofocus */
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

import { NavLink, withRouter } from 'react-router-dom';
import CartPage from 'containers/CartPage';
import { dataChecking } from 'globalUtils';
import Highlighter from 'react-highlight-words';

import { Popover, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import NavDropdown from 'components/Navigator/NavItem/NavDropdown';

import { layoutTopNav, searchResult } from './actions';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import globalScope from '../../globalScope';
import styles from './materialStyle';

export class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showCartPopout: false,
            hideSearchBar: true,
            searchQuery: '',
            anchorEl: null,
        };
        this.getSearchResult = this.getSearchResult.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(layoutTopNav());
    }

    getSearchResult = (e) => {
        this.setState({ searchQuery: event.target.value });
        if (e.target.value.length > 2) {
            this.props.dispatch(searchResult(this.state.searchQuery));
        }
    }

    popMegaMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    closeMegaMenu = () => {
        this.setState({
            anchorEl: null,
        });
    };

    megaMenu = () => {
        const open = Boolean(this.state.anchorEl);
        return (
            <Popover
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.closeMegaMenu}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 87, left: 70 }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div>
                    {
                        dataChecking(this.props.header, 'header', 'data').map((data) => (
                            <div key={data.code}>
                                {
                                    data.code === 'category-directory'
                                    ?
                                        <Grid
                                            container={true}
                                        >
                                            <Grid className={this.props.classes.leftMegaMenu} item={true} xs={2}>
                                                {
                                                    data.items.map((item, key) => (
                                                        <div className="mb-1" key={key}>
                                                            <Typography className={this.props.classes.leftMegaMenuText}>{item.text}</Typography>
                                                        </div>
                                                    ))
                                                }
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima optio dolor, nobis, corporis fugit illo quaerat commodi quas nesciunt a, architecto ducimus excepturi accusantium molestias qui similique minus quae assumenda?
                                            </Grid>
                                        </Grid>
                                    :
                                    null
                                }
                            </div>
                        ))
                    }
                </div>
            </Popover>
        );
    }

    /**
     * section section
     * - result will trigger with minimum 2 characters
     * - result display category as brand, autocomplete and product related
     */
    renderSearchSection = () => (
        <div>
            {
                !this.state.hideSearchBar ?
                    this.state.searchQuery.length < 3 ?
                        null
                    :
                        <div style={{ position: 'relative' }}>
                            <div className={this.state.hideSearchBar ? 'resultBoxhide' : 'resultBoxshow'}>
                                {
                                    dataChecking(this.props, 'header', 'suggestionData', 'loading') ?
                                        <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="hermo loading" />
                                    :
                                        <div>
                                            {
                                                dataChecking(this.props, 'header', 'suggestionData', 'error') ?
                                                    <div>
                                                        {this.props.header.suggestionData.data.messages[0].text} for <b>{this.state.searchQuery}</b>
                                                    </div>
                                                :
                                                    <div>
                                                        {this.renderSearchResult('brand')}
                                                        {this.renderSearchResult('autocomplete')}
                                                        {this.renderSearchResult('mall')}
                                                    </div>
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                :
                    null
            }
            <div className={`search ml-3 ${!this.state.hideSearchBar ? 'show' : ''}`}>
                {
                    !this.state.hideSearchBar ?
                        <input autoFocus={true} type="text" value={this.state.searchQuery} onChange={this.getSearchResult}></input>
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
        </div>
    )

    /**
     * User section for menu to profiles
     */
    renderUserSection = () => {
        const items = [];
        if (globalScope.token) {
            items.push({
                code: 'logout',
                require_login: true,
                type: 'exec_function',
                text: 'Logout',
                iconClass: 'fas fa-sign-out-alt px-1',
                handleLinkClick: () => {
                    globalScope.previousPage = window.location.pathname;
                    this.props.history.push('/logout');
                },
            });
        } else {
            items.push({
                code: 'login',
                require_login: true,
                type: 'exec_function',
                text: 'Login',
                iconClass: 'fas fa-sign-in-alt px-1',
                handleLinkClick: () => {
                    globalScope.previousPage = window.location.pathname;
                    this.props.history.push('/login');
                },
            });
        }

        return (
            <div className="ml-3">
                <NavDropdown
                    items={items}
                    // data={props.data}
                    title="User"
                    // itemClassName="fas fa-user"
                    style={{
                        color: 'grey',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                    clickHandler={() => {}}
                >
                    <i
                        className="fas fa-user"
                        style={{
                            color: 'grey',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                        }}
                    ></i>
                </NavDropdown>
            </div>
        );
    }

    /**
     * User cart dropdown
     */
    renderCartSection = () => {
        if (!globalScope.token) {
            return null;
        }

        return (
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
                        <NavLink to="/">
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
        );
    }

    /**
     * quicklink section which is right side of the header
     */
    renderQuicklinks = () => (
        <div className="quicklink">
            {this.renderSearchSection()}
            {this.renderUserSection()}
            {this.renderCartSection()}
        </div>
    )

    /**
     * top nav section with data came from api /layout/top-nav
     */
    renderTopCategory = () => (
        <div className={`top-nav ${!this.state.hideSearchBar ? 'show' : ''}`}>
            {
                dataChecking(this.props.header, 'header', 'data').map((val) => (
                    <div className="ml-3 category" key={val.code}>
                        {
                            val.type === 'hot-link' ?
                                <span>
                                    {val.text}
                                </span>
                            :
                                <span
                                    id={val.code}
                                    onClick={this.popMegaMenu}
                                >
                                    {val.text}
                                    <i className="fas fa-angle-down ml-quater"></i>
                                </span>
                        }
                    </div>
                ))
            }
            { this.megaMenu() }
        </div>
    )

    /**
     * result searching function that display items based on type of search
     * - this function will receive type as params e.g: brand
     */
    renderSearchResult = (type) => dataChecking(this.props.header, 'suggestionData', 'data').map((data) => {
        if (data.type === type) {
            return data.items.map((item, key) => (
                <div key={key}>
                    <Highlighter
                        highlightClassName="search-keyword"
                        searchWords={[this.state.searchQuery]}
                        autoEscape={true}
                        textToHighlight={item.text}
                    />
                </div>
            ));
        }
        return null;
    });

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

    /**
     * - This is desktop header component
     * - Component will consists of hermo logo, top nav and quicklinks
     */
    render() {
        return (
            dataChecking(this.props.header, 'header', 'data') ?
                <div id="header">
                    <div className={`logo ${!this.state.hideSearchBar ? 'show' : ''}`}>
                        <NavLink to="/">
                            <img src={require('images/hermo-logo-image.png')} alt="Hermo Logo" width="100%" />
                        </NavLink>
                    </div>
                    {this.renderTopCategory()}
                    {this.renderQuicklinks()}
                </div>
            :
                null
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
    withRouter,
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(Header);
