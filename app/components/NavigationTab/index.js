/**
*
* NavigationTab
*
*/

import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';

import {
    AppBar,
    Hidden,
    IconButton,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@material-ui/core';

import {
    ChevronLeft,
    Tune,
} from '@material-ui/icons';

import * as actions from 'containers/ProfileOrderList/actions';
import './style.scss';

class NavigationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        pageValue: 0,
    }

    tabContent = (pageValue) => (
        <Typography component="div">
            {this.props.tabs[pageValue].description}
            {this.props.tabs[pageValue].content}
        </Typography>
    );

    handleChange = (event, newValue) => {
        this.setState({ pageValue: newValue });
    }

    renderLinkIcon = () => (
        <NavLink to="/profile">
            <IconButton color="primary">
                <ChevronLeft />
            </IconButton>
        </NavLink>
    )

    renderFilterIcon = () => {
        if (this.props.isOrderList) {
            return (
                <div style={{ position: 'absolute', right: '2%' }}>
                    <IconButton>
                        <Tune />
                    </IconButton>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <AppBar color="default" position="static" style={{ marginBottom: 15 }}>
                    <Hidden lgUp={true}>
                        {this.renderLinkIcon()}
                        {this.renderFilterIcon()}
                    </Hidden>
                    <Toolbar>
                        <Hidden mdDown={true}>
                            {this.renderLinkIcon()}
                            {this.renderFilterIcon()}
                        </Hidden>
                        <Tabs
                            value={this.state.pageValue}
                            onChange={this.handleChange}
                            variant="scrollable"
                        >
                            {
                                this.props.tabs.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        label={<Typography>{tab.title}</Typography>}
                                        style={{ textTransform: 'none' }}
                                        onClick={() => {
                                            if (this.props.isOrderList) {
                                                this.props.dispatch(actions.getOrderList({ urlParam: tab.urlParam, pageCount: 1, orderCount: tab.ordersPerPage }));
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Tabs>
                    </Toolbar>
                </AppBar>
                { this.tabContent(this.state.pageValue) }
            </div>
        );
    }
}

NavigationTab.propTypes = {

};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapDispatchToProps);

export default compose(
    withConnect,
)(NavigationTab);
