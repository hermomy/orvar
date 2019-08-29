/**
 *
 * ProfileWallet
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NavigationTab from 'components/NavigationTab';

import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@material-ui/core';
import {
    ToggleButton,
    ToggleButtonGroup,
} from '@material-ui/lab';
import {
    KeyboardArrowRight,
} from '@material-ui/icons';

import makeSelectProfileWallet from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileWallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        navigationTabValue: 0,
        targetVoucherValue: 0,

        navTabConfig: [
            {
                title: <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>Vouchers</span>
                    <div className="wishlist-quantity">
                        {
                            dataChecking(this.props.profileWallet, 'voucherData', 'items', 'length') > 0 &&
                                <span style={{ color: '#FFFFFF' }}>{this.props.profileWallet.voucherData.items.length}</span>
                        }
                    </div>
                </div>,
            },
            { title: 'points' },
            { title: 'balance' },
        ],
        voucherFilter: [
            { title: 'All', value: 0 },
            { title: 'Hermo', value: 1 },
            { title: 'Partners', value: 2 },
        ],
    }

    componentWillMount() {
        this.props.dispatch(actions.getVoucherData({ status: 'available', filterType: 'all' }));
    }

    renderVoucherContent = () => {
        if (!dataChecking(this.props.profileWallet, 'voucherData', 'items')) {
            return null;
        }

        const vouchers = dataChecking(this.props.profileWallet, 'voucherData', 'items');

        return (
            <div>
                <Paper className="p-1">
                    <Typography display="block" gutterBottom={true} style={{ fontWeight: 'bold' }}>VOUCHERS</Typography>
                    <div className="voucher-header">
                        <div>
                            <Typography>Did you know? You can get freebies by inviting your friends.</Typography>
                        </div>
                        <div>
                            <NavLink to={'#'} style={{ textDecoration: 'none' }}>
                                <Typography color="primary">
                                    LEARN MORE
                                </Typography>
                                <IconButton size="small">
                                    <KeyboardArrowRight color="primary" />
                                </IconButton>
                            </NavLink>
                        </div>
                    </div>
                </Paper>
                {
                    dataChecking(vouchers, 'length') === 0 ?
                        <Paper className="empty-voucher-container text-xs-center my-1 p-3">
                            <img
                                src={require('Resources/wallet/empty_illustration.png')}
                                alt="empty_voucher"
                                width="100%"
                                style={{ width: '25rem' }}
                            />
                            <Typography variant="h6" display="block" className="mb-1">You have no available vouchers at the moment</Typography>
                            <Typography display="block" className="mb-2">Start browsing for vouchers and fill this space up!</Typography>
                            <NavLink to={'reward'} style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="p-1"
                                >
                                    <Typography>Redeem Vouchers Now</Typography>
                                </Button>
                            </NavLink>
                        </Paper>
                        :
                        <div className="voucher-container">
                            <Typography display="block" className="m-1" style={{ fontWeight: 'bold' }}>Available Voucher</Typography>
                            <Grid container={true} spacing={2}>
                                {
                                    vouchers.map((voucher, index) => (
                                        <Grid item={true} key={index} lg={3} md={4} xs={12}>
                                            <div className="voucher-card">
                                                <Paper className="card-header">
                                                    {
                                                        /^RM/.test(voucher.title) ?
                                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Typography>{voucher.title.slice(0, 8)} OFF</Typography>
                                                                <img
                                                                    src={dataChecking(voucher, 'partner', 'logo')}
                                                                    alt="merchant_Logo"
                                                                    style={{ borderRadius: '50rem', width: '15%' }}
                                                                />
                                                            </div>
                                                            :
                                                            <Typography>{voucher.title}</Typography>
                                                    }
                                                </Paper>
                                                <Paper className="card-content">
                                                    <Typography display="block">{voucher.title}</Typography>
                                                    <Typography display="block">{voucher.remark}</Typography>
                                                </Paper>
                                                {/* <div className="rounded-corner">
                                                    <div className="corner-left" />
                                                    <div className="corner-right" style={{ marginRight: -20, borderRadius: 25, alignSelf: 'center', width: '2.5rem', height: '2.5rem', backgroundColor: '#F3EFEE' }} />
                                                </div> */}
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                }
            </div>
        );
    }

    renderVoucher = () => (
        <Container>
            <Box className="my-1 text-xs-center">
                <ToggleButtonGroup
                    value={this.state.targetVoucherValue}
                    exclusive={true}
                    onChange={(event, newValue) => {
                        this.setState({ targetVoucherValue: newValue });

                        switch (newValue) {
                            case 0:
                                this.props.dispatch(actions.getVoucherData({ status: 'available', filterType: 'all' }));
                                break;
                            case 1:
                                this.props.dispatch(actions.getVoucherData({ status: 'available', filterType: 'locals' }));
                                break;
                            case 2:
                                this.props.dispatch(actions.getVoucherData({ status: 'available', filterType: 'partners' }));
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    {
                        this.state.voucherFilter.map((filter, index) => (
                            <ToggleButton
                                key={index}
                                value={filter.value}
                                style={{ minWidth: '10rem', backgroundColor: `${this.state.targetVoucherValue === filter.value ? '#660033' : '#F3EFEE'}`, borderColor: '#660033' }}
                                disabled={this.state.targetVoucherValue === filter.value}
                            >
                                <Typography style={{ color: `${this.state.targetVoucherValue === filter.value ? '#FFFFFF' : '#660033'}` }}>{filter.title}</Typography>
                            </ToggleButton>
                        ))
                    }
                </ToggleButtonGroup>
            </Box>
            {this.renderVoucherContent()}
        </Container>
    )

    renderPoint = () => (
        <div>point</div>
    )

    renderBalance = () => (
        <div>balance</div>
    )

    renderContents = () => {
        let contentType;
        switch (this.state.navigationTabValue) {
            case 0:
                contentType = this.renderVoucher();
                break;
            case 1:
                contentType = this.renderPoint();
                break;
            case 2:
                contentType = this.renderBalance();
                break;
            default:
                break;
        }

        return (
            <div>{contentType}</div>
        );
    }

    render() {
        return (
            <div>
                <NavigationTab
                    data={this.state.navTabConfig}
                    renderTabID={(navigationTabValue) => this.setState({ navigationTabValue })}
                />
                {
                    this.props.profileWallet.loading ?
                        <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                        :
                        this.renderContents()
                }
            </div>
        );
    }
}

ProfileWallet.propTypes = {
    dispatch: PropTypes.func.isRequired,
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
