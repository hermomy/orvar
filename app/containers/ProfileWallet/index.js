/**
 *
 * ProfileWallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NavigationTab from 'components/NavigationTab';

import { Container, Box, Tabs, Tab, Paper, Typography } from '@material-ui/core';

import makeSelectProfileWallet from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const a = [
    {
        title: 'vouchers',
    },
    {
        title: 'points',
    },
    {
        title: 'balance',
    },
];
export class ProfileWallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        navigationTabValue: 0,
        pointNavTabValue: 0,
    }
    allVoucher = () => (
        <div>
            <Paper className="p-1">
                <div>
                    <Typography className="text-uppercase">
                        vouchers
                    </Typography>
                </div>
                <Typography>
                    Did you know? You can get freebies by inviting your friends.
                </Typography>
            </Paper>
        </div>
    )
    hermoVoucher = () => (
        <Paper className="p-1">Hermo</Paper>
    )
    partnersVoucher = () => (
        <Paper className="p-1">Partners</Paper>
    )
    voucher = () => (
        <Container>
            <Box className="my-1">
                <Tabs
                    value={this.state.pointNavTabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    centered={true}
                    onChange={(event, pointNavTabValue) => this.setState({ pointNavTabValue })}
                    className="mb-2"
                >
                    <Tab label="All" />
                    <Tab label="Hermo" />
                    <Tab label="Partners" />
                </Tabs>
            </Box>
            {}
            {this.state.pointNavTabValue === 0 && this.allVoucher()}
            {this.state.pointNavTabValue === 1 && this.hermoVoucher()}
{ this.state.pointNavTabValue === 2 && this.partnersVoucher()}
        </Container>
    )

    home2 = () => (
        <div>home 2</div>
    )

    renderContents = () => {
        let b;
        switch (this.state.navigationTabValue) {
            case 0:
                b = this.voucher();
                break;
            case 1:
                b = this.home2();
                break;
            default:
                break;
        }

        return (
            <div>{b}</div>
        );
    }

    render() {
        return (
            <div>
                <NavigationTab
                    data={a}
                    renderTabID={(navigationTabValue) => this.setState({ navigationTabValue })}
                />
                {this.renderContents()}
            </div>
        );
    }
}

ProfileWallet.propTypes = {
    dispatch: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    profileWallet: makeSelectProfileWallet(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWallet', reducer });
const withSaga = injectSaga({ key: 'profileWallet', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileWallet);
