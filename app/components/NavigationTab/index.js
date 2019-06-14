/**
*
* NavigationTab
*
*/

import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import './style.scss';

class NavigationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        pageValue: 0,
    }

    tabContent = (pageValue) => (
        <Typography component="div" style={{ paddingLeft: 30 }}>
            {this.props.tabs[pageValue].content}
        </Typography>
    );

    handleChange = (event, newValue) => {
        this.setState({ pageValue: newValue });
    }

    renderTopBar = () => (
        <div>
            <AppBar position="static" class={`topBar ${this.props.hasBorder ? 'border' : ''}`}>
                <Toolbar>
                    <Tabs value={this.state.pageValue} onChange={this.handleChange}>
                        {
                            this.props.tabs.map((tab) => (
                                <Tab label={tab.title} style={{ textTransform: 'none', position: 'relative' }} />
                            ))
                        }
                    </Tabs>
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
