/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import {
    Grid,
    Button,
    Typography,
    Container,
} from '@material-ui/core';

// import { dataChecking } from 'globalUtils';

import messages from './messages';
import './style.scss';
const a = [
    {
        'title': 'mall',
        'url': '/mall',
    },
    {
        'title': 'Profile',
        'url': '/profile',
    },
    {
        'title': 'Profile order',
        'url': '/profile/order',
    },
    {
        'title': 'Profile edit info',
        'url': '/profile/detail',
    },
    {
        'title': 'OnboardingPage',
        'url': '/onboarding',
    },
    {
        'title': 'Brand Page',
        'url': '/brand',
    },
    {
        'title': 'Logout',
        'url': '/logout',
    },
];

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        SignUpPage: false,
    }

    render() {
        return (
            <Container>
                <h1 style={{ textAlign: 'center' }}>
                    <FormattedMessage {...messages.header} />
                </h1>
                <Grid container={true} justify="center" spacing={2}>
                    {
                        a.map((data) => (
                            <Grid key={data.title} item={true}>
                                <NavLink to={data.url} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">
                                        <Typography>
                                            {data.title}
                                        </Typography>
                                    </Button>
                                </NavLink>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        );
    }
}
