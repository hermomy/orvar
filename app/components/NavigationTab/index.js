/**
*
* NavigationTab
*
*/

import React from 'react';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';

import './style.scss';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class NavigationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = { value: 0 };
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <div>
                        <KeyboardArrowLeft />
                    </div>
                    <Tabs value={this.state.value} onChange={(event, value) => this.setState({ value })}>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </AppBar>
                {this.state.value === 0 && <TabContainer>Item One</TabContainer>}
                {this.state.value === 1 && <TabContainer>Item Two</TabContainer>}
                {this.state.value === 2 && <TabContainer>Item Three</TabContainer>}
            </div>
        );
    }
}

NavigationTab.propTypes = {

};

export default NavigationTab;
