/**
*
* NavigationTab
*
*/

import React from 'react';
import { AppBar, Tabs, Tab, Grid, Container } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

import './style.scss';

class NavigationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = { value: 0 };
    }

    renderTabID = (event, value) => {
        this.setState({ value });
        this.props.data.map((data) => {
            if (data.url) {
                this.setState({ url: data.url });
            }
            return null;
        });
        this.setState({ value });
        this.props.renderTabID(value);
    };
    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Container>
                        <Grid container={true}>
                            <Grid item={true}>
                                <NavLink to="/profile">
                                    <div className="pt-1">
                                        <KeyboardArrowLeft />
                                    </div>
                                </NavLink>
                            </Grid>
                            <Grid item={true}>
                                <Tabs value={this.state.value} onChange={(event, value) => this.renderTabID(event, value)}>
                                    {
                                        this.props.data.map((data) => (
                                            <Tab
                                                key={data.title}
                                                label={data.title}
                                                onClick={() => {
                                                    if (this.props.onTabClick) {
                                                        this.props.onTabClick(data);
                                                    }
                                                }}
                                            />
                                        ))
                                    }
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

NavigationTab.propTypes = {

};

export default NavigationTab;
