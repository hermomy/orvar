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

import { NavLink } from 'react-router-dom';
import CartPage from 'components/CartPage';
import { dataChecking } from 'globalUtils';
import Highlighter from 'react-highlight-words';
import { layoutTopNav, searchResult } from './actions';
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
            searchQuery: '',
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

    /**
     * section section
     * - result will trigger with minimum 2 characters
     * - result display category as brand, autocomplete and product related
     */
    searchSection = () => (
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
     * quicklink section which is right side of the header
     */
    quicklinks = () => (
        <div className="quicklink">
            {this.searchSection()}
            <div className="ml-3">
                <i
                    className="fas fa-user"
                    style={{
                        color: 'grey',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                ></i>
            </div>
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
    )

    /**
     * top nav section with data came from api /layout/top-nav
     */
    topCategory = () => (
        <div className={`top-nav ${!this.state.hideSearchBar ? 'show' : ''}`}>
            {
                dataChecking(this.props.header, 'header', 'data') ?
                    dataChecking(this.props.header, 'header', 'data').map((val) => (
                        <div className="ml-3 category" key={val.code}>
                            {val.text}
                        </div>
                    ))
                    :
                    null
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
            <div id="header">
                <div className={`logo ${!this.state.hideSearchBar ? 'show' : ''}`}>
                    <NavLink to="/">
                        <img src="https://cdn5.hermo.my/hermo/imagelink/2017/hermo-logo_01522372998.png" alt="Hermo Logo" width="100%"></img>
                    </NavLink>
                </div>
                {this.topCategory()}
                {this.quicklinks()}
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
