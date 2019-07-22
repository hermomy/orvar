/**
*
* NavigationTab
*
*/

import React from 'react';
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

    renderTopBar = () => (
        <div>
            <AppBar color="default" position="static" style={{ marginBottom: 15 }}>
                {
                    this.props.isLinked ?
                        <div>
                            <Hidden mdUp={true}>
                                <NavLink to="/profile">
                                    <IconButton color="primary">
                                        <ChevronLeft />
                                    </IconButton>
                                </NavLink>
                            </Hidden>
                        </div>
                        :
                        null
                }
                {
                    this.props.isFiltered ?
                        <div style={{ position: 'absolute', right: '2%' }}>
                            <Hidden mdUp={true}>
                                <IconButton>
                                    <Tune />
                                </IconButton>
                            </Hidden>
                        </div>
                        :
                        null
                }
                <Toolbar>
                    {
                        this.props.isLinked ?
                            <div>
                                <Hidden xsDown={true}>
                                    <NavLink to="/profile">
                                        <IconButton color="primary">
                                            <ChevronLeft />
                                        </IconButton>
                                    </NavLink>
                                </Hidden>
                            </div>
                            :
                            null
                    }
                    <Tabs
                        value={this.state.pageValue}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {
                            this.props.tabs.map((tab, index) => (
                                <Tab
                                    key={index}
                                    label={<Typography>{tab.title}</Typography>}
                                    style={{ textTransform: 'none' }}
                                />
                            ))
                        }
                    </Tabs>
                    {
                        this.props.isFiltered ?
                            <div style={{ position: 'absolute', right: '3%' }}>
                                <Hidden xsDown={true}>
                                    <IconButton>
                                        <Tune />
                                    </IconButton>
                                </Hidden>
                            </div>
                            :
                            null
                    }
                </Toolbar>
            </AppBar>
            { this.tabContent(this.state.pageValue) }
        </div>
    )

    render() {
        return (
            <div>
                {this.renderTopBar()}
            </div>
        );
    }
}

NavigationTab.propTypes = {

};

export default NavigationTab;
