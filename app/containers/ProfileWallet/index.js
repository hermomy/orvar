/**
 *
 * ProfileWallet
 *
 */

import React from 'react';
import { dataChecking, copyToClipboard } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NavigationTab from 'components/NavigationTab';
import PopupDialog from 'components/PopupDialog';
import { notifySuccess } from 'containers/Notify';
import moment from 'moment';
import parse from 'html-react-parser';

import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@material-ui/core';
import {
    ToggleButton,
    ToggleButtonGroup,
} from '@material-ui/lab';
import {
    AttachMoney,
    AssignmentLate,
    AssignmentTurnedIn,
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
        targetFilterValue: 0,
        availability: 'available',
        type: 'all',

        navTabConfig: [
            { title: (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>Vouchers</span>
                </div>
                ),
                dispatchAction: actions.getVoucherData({ status: 'available', filterType: 'all' }),
            },
            { title: 'points', dispatchAction: actions.getPointData({ pageCount: 1, rowsPerPage: 10 }) },
            { title: 'balance', dispatchAction: actions.getBalanceData({ pageCount: 1, rowsPerPage: 10 }) },
        ],
        voucherConfig: [
            { title: 'All', value: 0 },
            { title: 'Hermo', value: 1 },
            { title: 'Partners', value: 2 },
        ],
        voucherFilterConfig: [
            { title: 'Available', value: 0 },
            { title: 'History', value: 1 },
        ],
        pointConfig: [
            { icon: <AssignmentTurnedIn className="pr-1" />, title: 'Available: ', amount: 0 },
            { icon: <AssignmentLate className="pr-1" />, title: 'On Hold: ', amount: 0 },
            { icon: <AttachMoney className="pr-1" />, title: 'Total: ', amount: 0 },
        ],
        balanceConfig: [
            { icon: <AssignmentTurnedIn className="pr-1" />, title: 'Available: ', balance: 'RM0.00' },
            { icon: <AssignmentLate className="pr-1" />, title: 'On Hold: ', balance: 'RM0.00' },
            { icon: <AttachMoney className="pr-1" />, title: 'Total: ', balance: 'RM0.00' },
        ],

        page: 0,
        rowsPerPage: 10,

        popup: false,
    }

    componentWillMount() {
        this.props.dispatch(actions.getVoucherData({ status: 'available', filterType: 'all' }));
        this.props.dispatch(actions.getUserData());
    }

    componentWillReceiveProps(nextProps) {
        if (dataChecking(nextProps, 'profileWallet') !== dataChecking(this.props, 'profileWallet')) {
            this.insertTab(nextProps.profileWallet);
        }
    }

    fetchOrderDataByTab = (config) => {
        this.props.dispatch(config.dispatchAction);
    }

    insertTab = (profileWallet) => {
        const newNavTabConfig = [
            { title: (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>Vouchers</span>
                    <div className="wishlist-quantity">
                        <Typography style={{ color: '#FFFFFF' }}>{dataChecking(profileWallet, 'voucherData', 'items', 'length')}</Typography>
                    </div>
                </div>
                ),
                dispatchAction: actions.getVoucherData({ status: 'available', filterType: 'all' }),
            },
            { title: 'points', dispatchAction: actions.getPointData({ pageCount: 1, rowsPerPage: 10 }) },
            { title: 'balance', dispatchAction: actions.getBalanceData({ pageCount: 1, rowsPerPage: 10 }) },
        ];
        const newPointConfig = [
            { icon: <AssignmentTurnedIn className="pr-1" />, title: 'Available: ', amount: dataChecking(profileWallet, 'userData', 'credit', 'usable') },
            { icon: <AssignmentLate className="pr-1" />, title: 'On Hold: ', amount: dataChecking(profileWallet, 'userData', 'credit', 'on_hold') },
            { icon: <AttachMoney className="pr-1" />, title: 'Total: ', amount: dataChecking(profileWallet, 'userData', 'credit', 'total') },
        ];
        const newBalanceConfig = [
            { icon: <AssignmentTurnedIn className="pr-1" />, title: 'Available: ', balance: dataChecking(profileWallet, 'userData', 'balance', 'usable') },
            { icon: <AssignmentLate className="pr-1" />, title: 'On Hold: ', balance: dataChecking(profileWallet, 'userData', 'balance', 'on_hold') },
            { icon: <AttachMoney className="pr-1" />, title: 'Total: ', balance: dataChecking(profileWallet, 'userData', 'balance', 'total') },
        ];
        this.setState({ navTabConfig: newNavTabConfig, pointConfig: newPointConfig, balanceConfig: newBalanceConfig });
    }

    renderDialogContent = () => {
        if (!dataChecking(this.props.profileWallet, 'voucherDetail')) {
            return null;
        }

        const voucher = dataChecking(this.props.profileWallet, 'voucherDetail');
        const validDate = dataChecking(voucher, 'start_date') && dataChecking(voucher, 'end_date');
        const startDate = dataChecking(voucher, 'start_date') && moment(voucher.start_date).format('DD MMM YYYY');
        const endDate = dataChecking(voucher, 'end_date') && moment(voucher.end_date).format('DD MMM YYYY');

        return (
            <form>
                <Typography variant="h6" display="block">Voucher Details</Typography>
                <Divider className="mt-2 mb-2" />
                <div style={{ display: 'flex', flexDirection: 'row', borderRadius: 6, overflow: 'hidden' }} className="mb-2">
                    <div
                        style={{ padding: '1rem 0', display: 'flex', flex: 8, backgroundColor: '#E4E4E4' }}
                    >
                        <span style={{ marginLeft: '1rem', color: '#FF4081' }}>{voucher.voucher.code}</span>
                    </div>
                    <div
                        onClick={() => {
                            copyToClipboard();
                            notifySuccess(`${voucher.voucher.code}`);
                        }}
                        style={{ cursor: 'pointer', padding: '1rem 0', display: 'flex', alignSelf: 'center', justifyContent: 'center', flex: 2, backgroundColor: '#FF4081' }}
                    >
                        <span style={{ textAlign: 'center', alignSelf: 'center', color: 'white' }}>copy</span>
                    </div>
                </div>
                <Typography variant="h6" display="block">{voucher.title}</Typography>
                { validDate && <Typography display="block">Valid from {startDate.toUpperCase()} to {endDate.toUpperCase()}</Typography> }
                <Divider className="mt-2 mb-2" />
                <Typography display="block">Terms & Conditions:</Typography>
                <Typography display="block">{parse(voucher.tnc)}</Typography>
            </form>
        );
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
                            <NavLink to={'#'} style={{ textDecoration: 'none' }}>
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
                                            <Paper
                                                className="voucher-card"
                                                onClick={() => {
                                                    this.setState({ popup: !this.state.popup });
                                                    this.props.dispatch(actions.getVoucherDetail({ voucherURL: voucher._weblink.params.url }));
                                                }}
                                            >
                                                <Paper className={`${this.state.availability === 'available' ? 'available-card-header' : 'history-card-header'}`}>
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
                                            </Paper>
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
        <div>
            <Box className="my-1 text-xs-center">
                <ToggleButtonGroup
                    value={this.state.targetVoucherValue}
                    exclusive={true}
                    onChange={(event, newValue) => {
                        this.setState({ targetVoucherValue: newValue });

                        switch (newValue) {
                            case 0:
                                this.setState({ type: 'all' });
                                this.props.dispatch(actions.getVoucherData({ availability: this.state.availability, filterType: 'all' }));
                                break;
                            case 1:
                                this.setState({ type: 'locals' });
                                this.props.dispatch(actions.getVoucherData({ availability: this.state.availability, filterType: 'locals' }));
                                break;
                            case 2:
                                this.setState({ type: 'partners' });
                                this.props.dispatch(actions.getVoucherData({ availability: this.state.availability, filterType: 'partners' }));
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    {
                        this.state.voucherConfig.map((config, index) => (
                            <ToggleButton
                                key={index}
                                value={config.value}
                                style={{ minWidth: '10rem', backgroundColor: `${this.state.targetVoucherValue === config.value ? '#660033' : '#F3EFEE'}`, borderColor: '#660033' }}
                                disabled={this.state.targetVoucherValue === config.value}
                            >
                                <Typography style={{ color: `${this.state.targetVoucherValue === config.value ? '#FFFFFF' : '#660033'}` }}>{config.title}</Typography>
                            </ToggleButton>
                        ))
                    }
                </ToggleButtonGroup>
            </Box>
            {this.renderVoucherContent()}
            <div className="floating-container">
                <ToggleButtonGroup
                    className="filter-buttons"
                    value={this.state.targetFilterValue}
                    exclusive={true}
                    onChange={(event, newValue) => {
                        this.setState({ targetFilterValue: newValue });

                        switch (newValue) {
                            case 0:
                                this.setState({ availability: 'available' });
                                this.props.dispatch(actions.getVoucherData({ availability: 'available', filterType: this.state.type }));
                                break;
                            case 1:
                                this.setState({ availability: 'history' });
                                this.props.dispatch(actions.getVoucherData({ availability: 'history', filterType: this.state.type }));
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    {
                        this.state.voucherFilterConfig.map((config, index) => (
                            <ToggleButton
                                key={index}
                                className="filter-button"
                                value={config.value}
                                disabled={this.state.targetFilterValue === config.value}
                            >
                                <div className="filter-button-content">
                                    <Typography className="filter-button-label" tyle={{ color: `${this.state.targetFilterValue === config.value ? '#660033' : '#969696'}` }}>{config.title}</Typography>
                                </div>
                            </ToggleButton>
                        ))
                    }
                </ToggleButtonGroup>
            </div>
        </div>
    )

    renderPoint = () => {
        if (!dataChecking(this.props.profileWallet, 'pointData')) {
            return null;
        }

        const points = dataChecking(this.props.profileWallet, 'pointData');

        return (
            <div>
                <Typography display="block" className="m-1" style={{ fontWeight: 'bold' }}>Points</Typography>
                <div className="balance-header-container">
                    {
                        this.state.pointConfig.map((config, index) => (
                            <div key={index} className="balance-header pr-1">
                                <Paper style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    {config.icon}
                                    <Typography color="textSecondary" className="pr-1">{config.title}</Typography>
                                    {
                                        dataChecking(this.props.profileWallet, 'userData') &&
                                            <Typography style={{ fontWeight: 'bold' }}>{ typeof config.amount === 'number' && config.amount}</Typography>
                                    }
                                </Paper>
                            </div>
                        ))
                    }
                </div>
                <Paper className="text-xs-center my-1">
                    {
                        dataChecking(points, 'length') === 0 ?
                            <div className="p-3">
                                <img
                                    src={require('Resources/wallet/empty_illustration.png')}
                                    alt="empty_voucher"
                                    width="100%"
                                    style={{ width: '25rem' }}
                                />
                                <Typography variant="h6" display="block" className="mt-1 mb-2">You currently have no points</Typography>
                                <NavLink to={'#'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="p-1"
                                    >
                                        <Typography>How to earn more credits?</Typography>
                                    </Button>
                                </NavLink>
                            </div>
                            :
                            <div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ lineHeight: '3rem' }}><Typography>Reference</Typography></TableCell>
                                            <TableCell><Typography>Reference Value</Typography></TableCell>
                                            <TableCell><Typography>Amount</Typography></TableCell>
                                            <TableCell><Typography>Date Created</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            points && points.map((point, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row" style={{ lineHeight: '3rem' }}>
                                                        <Typography>{point.reference}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{point.reference_value}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>RM {point.amount}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{point.created_at}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[10, 20, 30]}
                                    rowsPerPage={this.state.rowsPerPage}
                                    count={dataChecking(this.props.profileWallet, 'pointMeta', 'totalCount')}
                                    page={this.state.page}
                                    onChangePage={(event, newPage) => {
                                        this.props.dispatch(actions.getPointData({ pageCount: (newPage + 1), rowsPerPage: this.state.rowsPerPage }));
                                        this.setState({ page: newPage });
                                    }}
                                    onChangeRowsPerPage={(event) => {
                                        this.props.dispatch(actions.getPointData({ pageCount: 1, rowsPerPage: event.target.value }));
                                        this.setState({ page: 0, rowsPerPage: event.target.value });
                                    }}
                                />
                            </div>
                    }
                </Paper>
            </div>
        );
    }

    renderBalance = () => {
        if (!dataChecking(this.props.profileWallet, 'balanceData')) {
            return null;
        }

        const balances = dataChecking(this.props.profileWallet, 'balanceData');

        return (
            <div>
                <Typography display="block" className="m-1" style={{ fontWeight: 'bold' }}>Balance</Typography>
                <div className="balance-header-container">
                    {
                        this.state.balanceConfig.map((config, index) => (
                            <div key={index} className="balance-header pr-1">
                                <Paper style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                    {config.icon}
                                    <Typography color="textSecondary" className="pr-1">{config.title}</Typography>
                                    {
                                        dataChecking(this.props.profileWallet, 'userData') &&
                                            <Typography style={{ fontWeight: 'bold' }}>RM { typeof config.balance === 'number' && config.balance.toFixed(2)}</Typography>
                                    }
                                </Paper>
                            </div>
                        ))
                    }
                </div>
                <Paper className="text-xs-center my-1">
                    {
                        dataChecking(balances, 'length') === 0 ?
                            <div className="p-3">
                                <img
                                    src={require('Resources/wallet/empty_illustration.png')}
                                    alt="empty_voucher"
                                    width="100%"
                                    style={{ width: '25rem' }}
                                />
                                <Typography variant="h6" display="block" className="mt-1 mb-2">You have no balance transaction</Typography>
                                <NavLink to={'#'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="p-1"
                                    >
                                        <Typography>Shop now!</Typography>
                                    </Button>
                                </NavLink>
                            </div>
                            :
                            <div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ lineHeight: '3rem' }}><Typography>Reference</Typography></TableCell>
                                            <TableCell><Typography>Reference Value</Typography></TableCell>
                                            <TableCell><Typography>Amount</Typography></TableCell>
                                            <TableCell><Typography>Date Created</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            balances && balances.map((balance, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row" style={{ lineHeight: '3rem' }}>
                                                        <Typography>{balance.reference}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{balance.reference_value}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>RM {balance.amount}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{balance.created_at}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[10, 20, 30]}
                                    rowsPerPage={this.state.rowsPerPage}
                                    count={dataChecking(this.props.profileWallet, 'balanceMeta', 'totalCount')}
                                    page={this.state.page}
                                    onChangePage={(event, newPage) => {
                                        this.props.dispatch(actions.getBalanceData({ pageCount: (newPage + 1), rowsPerPage: this.state.rowsPerPage }));
                                        this.setState({ page: newPage });
                                    }}
                                    onChangeRowsPerPage={(event) => {
                                        this.props.dispatch(actions.getBalanceData({ pageCount: 1, rowsPerPage: event.target.value }));
                                        this.setState({ page: 0, rowsPerPage: event.target.value });
                                    }}
                                />
                            </div>
                    }
                </Paper>
            </div>
        );
    }

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
                    onTabClick={(config) => {
                        this.fetchOrderDataByTab(config);
                        this.setState({ page: 0, rowsPerPage: 10 });
                    }}
                />
                <Container>
                    {this.renderContents()}
                </Container>
                <PopupDialog
                    display={this.state.popup}
                    onClose={() => {
                        this.setState({ popup: false });
                    }}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
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
