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
// import CartPage from 'containers/CartPage';
import { dataChecking } from 'globalUtils';
import Highlighter from 'react-highlight-words';
import globalScope from 'globalScope';

import {
    Person,
    Search,
    ShoppingCart,
    Close,
} from '@material-ui/icons';
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
    InputAdornment,
    Popper,
    IconButton,
    Card,
    Box,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { layoutTopNav, searchResult, getImgLink, getUserData } from './actions';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';

export class Header extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showCartPopout: false,
            searchBar: false,
            searchQuery: '',
            anchorElID: null,
            tabVal: 'skin-care',
            megaMenuToggle: false,
            left: false,
            toggleChildDrawer: false,
            open: false,
            childVal: null,
            anchorEl: null,
            userOpen: false,
            arrowRef: null,
        };
        this.getSearchResult = this.getSearchResult.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(layoutTopNav());
        this.props.dispatch(getImgLink());
        if (globalScope.token) {
            this.props.dispatch(getUserData());
        }
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
                                                <Typography className={`${this.props.classes.normalFont} ${this.props.classes.navLink} ${this.state.tabVal === item.code ? this.props.classes.leftMegaMenuTextActive : ''}`}>
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
                                                                        <Typography className={`${this.props.classes.normalFont} ${this.props.classes.navLink}`}>{child.text}</Typography>
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
                    position: 'fixed',
                    top: '60px',
                    left: 0,
                    right: 0,
                    zIndex: 2,
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

    rightHeader = () => {
        console.log();
        return (
            <Grid item={true}>
                <IconButton onClick={() => this.setState({ searchBar: !this.state.searchBar })}>
                    {
                        this.state.searchBar ?
                            <Close
                                onClick={() => this.setState({ searchBar: !this.state.searchBar, searchQuery: '' })}
                                className="animated rotateIn"
                            />
                        :
                            <Search className="animated rotateIn" />

                    }
                </IconButton>
                <IconButton
                    id="profile"
                    onMouseEnter={(evt) => this.setState({
                        anchorEl: evt.currentTarget,
                        userOpen: true,
                    })}
                    onMouseLeave={() => this.setState({ userOpen: false })}
                >
                    <Person />
                </IconButton>
                <IconButton
                    className="right-header-cart"
                >
                    <ShoppingCart />
                </IconButton>
            </Grid>
        );
    }

    leftHeader = () => (
        <Grid item={true} style={{ flex: 1 }}>
            {
                this.state.searchBar ?
                    <div className="animated fadeInLeft">
                        <TextField
                            autoFocus={true}
                            value={this.state.searchQuery}
                            onChange={this.getSearchResult}
                            autoComplete="off"
                            placeholder="Search for Products, Brands, etc.."
                            style={{ width: '100%' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                :
                    <Grid className="animated fadeInLeft" container={true} spacing={2} alignItems="center">
                        <Grid item={true}>
                            <NavLink to="/">
                                <img src={require('images/hermo-logo-image.png')} alt="Hermo Logo" style={{ width: '100px' }} />
                            </NavLink>
                        </Grid>
                        <Grid item={true} style={{ flex: 1 }}>
                            {this.renderTopCategory()}
                        </Grid>
                    </Grid>
            }
        </Grid>
    )

    /**
     * User section for menu to profiles
     */
    renderUserNavLink = () => {
        const imgStyle = {
            width: 18,
            height: 18,
        };
        return (
            <div>
                {
                    globalScope.token ?
                        <Grid container={true} className="py-1">
                            <Grid item={true} xs={12}>
                                <NavLink to="/profile" style={{ textDecoration: 'none' }}>
                                    <Box
                                        align="left"
                                        style={{
                                            color: '#000',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Grid container={true}>
                                            <Grid item={true} xs={2}>
                                                <img src={require('Resources/header/profile-icon.png')} alt="profile-icon" style={imgStyle} />
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                <Typography
                                                    variant="body1"
                                                >
                                                    My Profile
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </NavLink>
                                <hr />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <NavLink to="/profile/order" style={{ textDecoration: 'none' }}>
                                    <Box
                                        align="left"
                                        style={{
                                            color: '#000',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Grid container={true}>
                                            <Grid item={true} xs={2}>
                                                <img src={require('Resources/header/order-icon.png')} alt="order-icon" style={imgStyle} />
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                <Typography
                                                    variant="body1"
                                                >
                                                    My Order
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </NavLink>
                                <hr />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <NavLink to="/profile/rewards" style={{ textDecoration: 'none' }}>
                                    <Box
                                        align="left"
                                        style={{
                                            color: '#000',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Grid container={true}>
                                            <Grid item={true} xs={2}>
                                                <img src={require('Resources/header/rewards-icon.png')} alt="rewards-icon" style={imgStyle} />
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                <Typography
                                                    variant="body1"
                                                >
                                                    Rewards
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </NavLink>
                                <hr />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <NavLink to="/profile/wallet" style={{ textDecoration: 'none' }}>
                                    <Box
                                        style={{
                                            color: '#000',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                        align="left"
                                    >
                                        <Grid container={true}>
                                            <Grid item={true} xs={2}>
                                                <img src={require('Resources/header/wallet-icon.png')} alt="wallet-icon" style={imgStyle} />
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                <Typography
                                                    variant="body1"
                                                >
                                                    My Wallet
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </NavLink>
                                <hr />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <NavLink to="/profile/wishlist" style={{ textDecoration: 'none' }}>
                                    <Box
                                        align="left"
                                        style={{
                                            color: '#000',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Grid container={true}>
                                            <Grid item={true} xs={2}>
                                                <img src={require('Resources/header/wishlist-icon.png')} alt="wishlist-icon" style={imgStyle} />
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                <Typography
                                                    variant="body1"
                                                >
                                                    My Wishlist
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </NavLink>
                                <hr />
                            </Grid>
                            <Grid item={true} xs={12}>
                                <NavLink to="/profile/" style={{ textDecoration: 'none' }}>
                                    <Box
                                        align="left"
                                        style={{
                                            color: '#000',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Grid container={true}>
                                            <Grid item={true} xs={2}>
                                                <img src={require('Resources/header/settings-icon.png')} alt="settings-icon" style={imgStyle} />
                                            </Grid>
                                            <Grid item={true} xs={10}>
                                                <Typography
                                                    variant="body1"
                                                >
                                                    Settings
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </NavLink>
                            </Grid>
                        </Grid>
                    :
                        <Grid container={true}>
                            <Grid item={true} xs={12}>
                                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                    <Box
                                        className="p-1"
                                        align="left"
                                        style={{
                                            backgroundColor: '#f2f2f2',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Typography
                                            variant="body1"
                                            style={{ color: '#000' }}
                                        >
                                            Log in
                                        </Typography>
                                    </Box>
                                </NavLink>
                            </Grid>
                            <Grid item={true} xs={12}>
                                <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                                    <Box
                                        className="p-1"
                                        align="left"
                                        style={{
                                            backgroundColor: '#603',
                                        }}
                                        onClick={() => this.setState({ userOpen: false })}
                                    >
                                        <Typography
                                            variant="body1"
                                            style={{ color: '#fff' }}
                                        >
                                            <u>{dataChecking(this.props.header, 'imgLink', 'data', 'items') && this.props.header.imgLink.data.items[0].title}</u>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            style={{ color: '#fff' }}
                                        >
                                            <br />{dataChecking(this.props.header, 'imgLink', 'data', 'items') && this.props.header.imgLink.data.items[0].brief}
                                        </Typography>
                                    </Box>
                                </NavLink>
                            </Grid>
                        </Grid>
                }
            </div>
        );
    }

    renderUserSection = () => (
        <Card
            className={this.props.classes.card}
            style={{
                backgroundColor: '#ffffff',
            }}
        >
            {
                globalScope.token ?
                    <div>
                        <Container
                            className="py-1"
                            style={{
                                backgroundColor: '#f2f2f2',
                            }}
                        >
                            <Typography variant="body1">
                                Hi, {dataChecking(this.props.header, 'user', 'data', 'data') && this.props.header.user.data.data.name}
                            </Typography>
                            <NavLink to="/logout" style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="body1"
                                    style={{ color: '#989898' }}
                                    onClick={() => this.setState({ userOpen: false })}
                                >
                                    <br /><u>Log Out</u>
                                </Typography>
                            </NavLink>
                        </Container>
                        <Container>
                            {this.state.userOpen && this.renderUserNavLink()}
                        </Container>
                    </div>
                :
                    (this.state.userOpen && this.renderUserNavLink())
            }
        </Card>
    )
    /**
     * User cart dropdown
     */
    renderCartSection = () => {}

    /**
     * quicklink section which is right side of the header
     */
    renderQuicklinks = () => {}

    /**
     * top nav section with data came from api /layout/top-nav
     */
    renderTopCategory = () => (
        <div className={`top-nav ${!this.state.hideSearchBar ? 'show' : ''}`}>
            {
                dataChecking(this.props.header, 'header', 'data').map((val) => (
                    <span className="ml-3 category" key={val.code}>
                        {
                            val.type === 'hot-link' ?
                                <NavLink
                                    className={this.props.classes.navLink}
                                    to={val.url}
                                >
                                    <Typography>
                                        {val.text}
                                    </Typography>
                                </NavLink>
                            :
                                <Typography
                                    id={val.code}
                                    onMouseEnter={(event) => this.setState({ megaMenuToggle: true, anchorElID: event.target.id })}
                                >
                                    {val.text}
                                    <i className="fas fa-angle-down ml-quater"></i>
                                </Typography>
                        }
                    </span>
                ))
            }
        </div>
    )

    /**
     * result searching function that display items based on type of search
     * - this function will receive type as params e.g: brand
     */
    renderSearchResult = (type) => {
        let searchQueryResult;
        if (!this.props.header.suggestionData.error) {
            dataChecking(this.props.header, 'suggestionData', 'data').map((data) => {
                if (data.type === type) {
                    searchQueryResult = data.items.map((item, key) => (
                        <div className="mb-1" key={key}>
                            {
                                data.type === 'autocomplete' ?
                                    <Typography
                                        onClick={() => { this.setState({ searchQuery: item.text }); this.props.dispatch(searchResult(this.state.searchQuery)); }}
                                        className={this.props.classes.navLink}
                                    >
                                        <Highlighter
                                            highlightClassName="search-keyword"
                                            searchWords={[this.state.searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={item.text}
                                        />
                                    </Typography>
                                :
                                    <Typography
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <NavLink
                                            className={this.props.classes.navLink}
                                            to={item.model.url}
                                            onClick={() => this.setState({
                                                searchBar: false,
                                                searchQuery: '',
                                            })}
                                        >
                                            <Highlighter
                                                highlightClassName="search-keyword"
                                                searchWords={[this.state.searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={item.text}
                                            />
                                        </NavLink>
                                    </Typography>
                            }
                        </div>
                    ));
                }
                return null;
            });
        } else {
            searchQueryResult = <div><b>{this.state.searchQuery}</b> product not found</div>;
        }
        return (
            <div>
                {searchQueryResult}
            </div>
        );
    }

    renderCartPopout = () => {}

    /**
     * section section
     * - result will trigger with minimum 2 characters
     * - result display category as brand, autocomplete and product related
     */
    renderSearchSection = () => {
        console.log();
        return (
            <div>
                {
                    this.state.searchQuery !== '' && dataChecking(this.props, 'header', 'suggestionData', 'data') ?
                        <div
                            className="search-box"
                        >
                            <Container>
                                <div
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '1rem',
                                        height: '39rem',
                                        overflow: 'scroll',
                                    }}
                                >
                                    {this.renderSearchResult('brand')}
                                    {this.renderSearchResult('autocomplete')}
                                    {this.renderSearchResult('mall')}
                                </div>
                            </Container>
                        </div>
                    :
                        null
                }
                {
                    this.state.searchBar || this.state.searchQuery !== '' ?
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: '6rem',
                                left: '0',
                                right: '0',
                                zIndex: '1101',
                            }}
                            onClick={() => this.setState({ searchBar: !this.state.searchBar, searchQuery: '' })}
                        ></div>
                    :
                        null

                }
            </div>
        );
    }

    /**
     * - This is desktop header component
     * - Component will consists of hermo logo, top nav and quicklinks
     */
    render() {
        return (
            dataChecking(this.props.header, 'header', 'data') ?
                <div>
                    <AppBar color="default" className={this.props.classes.header}>
                        <Hidden smDown={true}>
                            <Container className="header-desktop">
                                <Grid container={true} alignItems="center">
                                    {this.leftHeader()}
                                    {this.rightHeader()}
                                </Grid>
                            </Container>
                            <Popper
                                className={this.props.classes.popper}
                                style={{ zIndex: 1101, maxWidth: '20rem' }}
                                open={this.state.userOpen}
                                placement="top"
                                anchorEl={this.state.anchorEl}
                                onMouseEnter={() => this.setState({ userOpen: true })}
                                onMouseLeave={() => this.setState({ userOpen: false })}
                                modifiers={{
                                    arrow: {
                                        enabled: true,
                                        element: this.state.arrowRef,
                                    },
                                }}
                            >
                                <span className={this.props.classes.arrow} ref={(node) => this.setState({ arrowRef: node })} />
                                {this.renderUserSection()}
                            </Popper>
                        </Hidden>
                        <Hidden mdUp={true}>
                            <div className="header-mobile">
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
                                        <IconButton
                                            id="profile"
                                            className="mr-1"
                                            onClick={(evt) => this.setState({
                                                anchorEl: evt.currentTarget,
                                                userOpen: !this.state.userOpen,
                                            })}
                                        >
                                            <Person />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                {
                                    this.state.userOpen ?
                                        <div>
                                            <span className={this.props.classes.arrow} ref={(node) => this.setState({ arrowRef: node })} />
                                            {this.renderUserSection()}
                                        </div>
                                    :
                                        null
                                }
                                <TextField
                                    className={this.props.classes.mobileSearch}
                                    autoFocus={true}
                                    value={this.state.searchQuery}
                                    onChange={this.getSearchResult}
                                    variant="outlined"
                                    autoComplete="off"
                                    margin="dense"
                                    placeholder="Search for Products, Brands, etc.."
                                    style={{ width: '100%' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            {this.hamburger()}
                        </Hidden>
                    </AppBar>
                    {this.state.anchorElID && this.megaMenu()}
                    {this.renderSearchSection()}
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
