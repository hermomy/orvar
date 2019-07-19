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

import {
    Typography,
    Grid,
    Container,
    AppBar,
    TextField,
    Hidden,
    Drawer,
    Divider,
    ListItem,
    ListItemText,
    List,
    Collapse,
} from '@material-ui/core';
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
            anchorElID: null,
            tabVal: 'skin-care',
            megaMenuToggle: false,
            left: false,
            toggleChildDrawer: false,
            code: null,
            open: false,
            childVal: null,
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

    toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        if (this.state.toggleChildDrawer === true) {
            this.setState({
                toggleChildDrawer: false,
                childVal: null,
            });
        }

        this.setState({ left: !this.state.left });
    };

    megaMenu = () => {
        let content;
        dataChecking(this.props.header, 'header', 'data').map((data) => {
            if (this.state.anchorElID === 'category-directory') {
                if (data.code === 'category-directory') {
                    content = (
                        <Grid container={true}>
                            <Grid className={this.props.classes.leftMegaMenu} item={true} xs={2}>
                                {
                                    data.items.map((item) => (
                                        <div
                                            key={item.text}
                                            onClick={() => item.type !== 'link' && this.setState({ tabVal: item.code })}
                                            className="mb-2"
                                        >
                                            <NavLink className={this.props.classes.urlLink} to={item.url}>
                                                <Typography className={`${this.props.classes.normalFont} ${this.state.tabVal === item.code ? this.props.classes.leftMegaMenuTextActive : ''}`}>
                                                    {item.text}
                                                </Typography>
                                            </NavLink>
                                        </div>
                                    ))
                                }
                            </Grid>
                            <Grid className="p-2" item={true} xs={10}>
                                <Grid container={true}>
                                    {
                                        data.items.map((item) => (
                                            this.state.tabVal === item.code
                                            ?
                                                item.categories.map((category) => (
                                                    <Grid className="mb-1" item={true} xs={3} key={category.url}>
                                                        <div className="mb-half">
                                                            <NavLink className={this.props.classes.urlLink} to={category.url}>
                                                                <Typography color="primary" className={`${this.props.classes.headText} ${this.props.classes.leadTitle}`}>{category.text}</Typography>
                                                            </NavLink>
                                                        </div>
                                                        {
                                                            category.childs.map((child) => (
                                                                <div className="mb-half" key={child.url}>
                                                                    <NavLink className={this.props.classes.urlLink} to={child.url}>
                                                                        <Typography className={this.props.classes.normalFont}>{child.text}</Typography>
                                                                    </NavLink>
                                                                </div>
                                                            ))
                                                        }
                                                    </Grid>
                                                ))
                                            :
                                                null
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                }
            } else if (this.state.anchorElID === 'what-is-new') {
                if (data.code === 'what-is-new') {
                    content = <div>{data.code}</div>;
                }
            } else if (this.state.anchorElID === 'brand-directory') {
                if (data.code === 'brand-directory') {
                    content = <div>{data.code}</div>;
                }
            }
            return null;
        });
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '82px',
                    left: 0,
                    right: 0,
                }}
                onMouseEnter={() => this.setState({ megaMenuToggle: true })}
                onMouseLeave={() => this.setState({ megaMenuToggle: false, anchorElID: null })}
            >
                <Container>
                    <div
                        style={{ backgroundColor: 'white' }}
                    >
                        {content}
                    </div>
                </Container>
            </div>
        );
    }

    childDrawer = () => {
        let content;
        this.props.header.header.data.map((data) => {
            if (data.code === 'category-directory') {
                content = data.items.map((item) => (
                    <div key={item.code}>
                        {
                            item.categories ?
                                <div>
                                    <ListItem button={true} divider={true}>
                                        <ListItemText
                                            primary={item.text}
                                            onClick={() => this.setState({
                                                open: !this.state.open,
                                                childVal: item.code,
                                            })}
                                        />
                                        {this.state.open && this.state.childVal === item.code ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                                    </ListItem>
                                    <Collapse in={this.state.open && this.state.childVal === item.code} timeout="auto" unmountOnExit={true}>
                                        <List component="div" disablePadding={true}>
                                            {
                                                item.categories.map((category) => (
                                                    <div key={category.url}>
                                                        <ListItem className={this.props.classes.childDrawer} component={NavLink} button={true} divider={true} to={category.url}>
                                                            <ListItemText primary={category.text} />
                                                        </ListItem>
                                                    </div>
                                                ))
                                            }
                                        </List>
                                    </Collapse>
                                </div>
                            :
                                <ListItem button={true}>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                        }
                    </div>
                ));
            }
            return null;
        });
        return (
            <List component="div">
                {content}
            </List>
        );
    }

    hamburger =() => (
        <Drawer open={this.state.left} onClose={this.toggleDrawer}>
            <div style={{ width: '200px' }}>
                {
                    !this.state.toggleChildDrawer ?
                        <div>
                            <div>
                                <Grid className="p-1" container={true}>
                                    <Grid item={true}>
                                        <i className="fas fa-bars pr-1"></i>
                                    </Grid>
                                    <Grid item={true}>
                                        <img src={require('images/hermo-logo-image.png')} alt="Hermo Logo" width="100px" />
                                    </Grid>
                                </Grid>
                                <Divider />
                            </div>
                            {
                                dataChecking(this.props.header, 'header', 'data') ?
                                    this.props.header.header.data.map((data) => (
                                        <div key={data.code}>
                                            <div className="p-1">
                                                {
                                                    data.type !== 'hot-link' ?
                                                        <Typography
                                                            onClick={() => this.setState({
                                                                toggleChildDrawer: !this.state.toggleChildDrawer,
                                                                code: data.code,
                                                            })}
                                                        >
                                                            {data.text}
                                                            <i
                                                                className="fas fa-angle-right"
                                                                style={{ float: 'right' }}
                                                            ></i>
                                                        </Typography>
                                                    :
                                                        <Typography>
                                                            {data.text}
                                                        </Typography>

                                                }
                                            </div>
                                            <Divider />
                                        </div>
                                    ))
                                :
                                    null
                            }
                        </div>
                        :
                        <div>
                            <div
                                className="p-1"
                            >
                                <Typography
                                    onClick={() => this.setState({ toggleChildDrawer: !this.state.toggleChildDrawer })}
                                >
                                    <i className="fas fa-angle-left pr-1"></i>
                                    Back
                                </Typography>
                            </div>
                            <Divider />
                            {this.childDrawer()}
                        </div>
                }
            </div>
        </Drawer>
    )

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
                                                dataChecking(this.props, 'header', 'suggestionData', 'error') &&
                                                    dataChecking(this.props, 'header', 'suggestionData', 'data', 'messages', 0, 'text') ?
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
                <div
                    className="search-background-overlay"
                    onClick={() => this.setState({
                        hideSearchBar: !this.state.hideSearchBar,
                        searchQuery: '',
                    })}
                />
                {
                    !this.state.hideSearchBar ?
                        <TextField
                            type="search"
                            margin="normal"
                            autoFocus={true}
                            value={this.state.searchQuery}
                            onChange={this.getSearchResult}
                            autoComplete="off"
                            placeholder="Search for Products, Brands, etc.."
                        />
                    :
                        null
                }
                <i
                    className="fas search-icon fa-search"
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
                                <Typography>
                                    {val.text}
                                </Typography>
                            :
                                <Typography
                                    id={val.code}
                                    onMouseEnter={(event) => this.setState({ megaMenuToggle: true, anchorElID: event.target.id })}
                                >
                                    {val.text}
                                    <i className="fas fa-angle-down ml-quater"></i>
                                </Typography>
                        }
                    </div>
                ))
            }
        </div>
    )

    /**
     * result searching function that display items based on type of search
     * - this function will receive type as params e.g: brand
     */
    renderSearchResult = (type) => dataChecking(this.props.header, 'suggestionData', 'data').map((data) => {
        if (data.type === type) {
            return data.items.map((item, key) => (
                <div className="mb-1" key={key}>
                    <Typography>
                        <Highlighter
                            highlightClassName="search-keyword"
                            searchWords={[this.state.searchQuery]}
                            autoEscape={true}
                            textToHighlight={item.text}
                        />
                    </Typography>
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
                <div>
                    <AppBar className={this.props.classes.header} color="default">
                        <Hidden mdUp={true}>
                            <div id="header-mobile" className="p-1">
                                <Grid container={true} justify="space-between" alignItems="center">
                                    <Grid item={true}>
                                        <Grid container={true} alignItems="center">
                                            <Grid item={true}>
                                                <i
                                                    className="fas fa-bars pr-1"
                                                    onClick={this.toggleDrawer}
                                                ></i>
                                            </Grid>
                                            <Grid item={true}>
                                                <NavLink to="/">
                                                    <img src={require('images/hermo-logo-image.png')} alt="Hermo Logo" width="100px" />
                                                </NavLink>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item={true}>
                                        <i className="fas fa-shopping-cart pr-1"></i>
                                        <i className="fas fa-user"></i>
                                    </Grid>
                                </Grid>
                                <TextField
                                    type="search"
                                    variant="outlined"
                                    margin="dense"
                                    className={this.props.classes.mobileSearch}
                                />
                            </div>
                            {this.hamburger()}
                        </Hidden>
                        <Hidden xsDown={true}>
                            <Container>
                                <div id="header">
                                    <div className={`logo ${!this.state.hideSearchBar ? 'show' : ''}`}>
                                        <NavLink to="/">
                                            <img src={require('images/hermo-logo-image.png')} alt="Hermo Logo" width="100%" />
                                        </NavLink>
                                    </div>
                                    {this.renderTopCategory()}
                                    {this.renderQuicklinks()}
                                </div>
                                {this.state.anchorElID && this.megaMenu()}
                            </Container>
                        </Hidden>
                    </AppBar>
                    {
                        this.state.anchorElID
                        ?
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    backgroundColor: 'black',
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    zIndex: 1,
                                    opacity: '0.2',
                                }}
                            >
                            </div>
                        :
                            null
                    }
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
