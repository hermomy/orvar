/**
 *
 * ProfileOrderList
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

import moment from 'moment';
import NavTab from 'components/NavigationTab';
import PopupDialog from 'components/PopupDialog';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import {
    Button,
    Card,
    Grid,
    Hidden,
    IconButton,
    Link,
    Paper,
    Popover,
    Stepper,
    Step,
    StepContent,
    StepLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core';
import {
    KeyboardArrowRight,
    QueryBuilder,
} from '@material-ui/icons';

import makeSelectProfileOrderList from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

export class ProfileOrderList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        currentConfig: { title: 'All Orders', urlParam: '' },
        orderStatusConfigs: [
            { title: 'All Orders', urlParam: '' },
            { title: 'To Pay', urlParam: '/to-paid' },
            { title: 'To Ship', urlParam: '/to-ship' },
            { title: 'To Receive', urlParam: '/to-receive' },
            { title: 'To Review', urlParam: '/to-review' },
            { title: 'Cancelled', urlParam: '/canceled' },
        ],

        anchorEl: null,
        orderDate: '',

        popup: false,
        dialogType: null,
        activeStep: 0,
        stepperConfigs: [
            <Typography>Upload an image of the package we sent</Typography>,
            <Typography>What do you think of the package? <span style={{ color: '#B7B7B7', display: 'block' }}>(Min. 25 characters)</span></Typography>,
        ],
        files: [],
        comment: '',

        page: 0,
        rowsPerPage: 10,
        haveReceived: {},
    }

    componentWillMount() {
        this.props.dispatch(actions.getOrderList({ urlParam: '', pageCount: 1, orderCount: this.state.rowsPerPage }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileOrderList !== this.props.profileOrderList) {
            if (dataChecking(nextProps, 'profileOrderList', 'orderMeta', 'currentPage')) {
                this.setState({ page: (nextProps.profileOrderList.orderMeta.currentPage - 1) });
            }
        }
    }

    isNextButtonDisabled = () => {
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (this.state.activeStep === 0 && (allowedFileTypes.indexOf(dataChecking(this.state, 'files', 0, 'type')) < 0)) {
            return true;
        }
        if (this.state.activeStep === 1 && this.state.comment.length < 25) {
            return true;
        }

        return false;
    }

    fetchOrderDataByTab = ({ urlParam }) => {
        this.props.dispatch(actions.getOrderList({ urlParam, pageCount: 1, orderCount: this.state.rowsPerPage }));
    }

    renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <FilePond
                        className="App"
                        ref={(ref) => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={false}
                        allowFileTypeValidation={true}
                        acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
                        labelFileTypeNotAllowed="File of invalid type"
                        fileValidateTypeLabelExpectedTypes="Only accepts image file"
                        onupdatefiles={(fileItems) => {
                            this.setState({ files: fileItems.map((fileItem) => fileItem.file) });
                            const file = dataChecking(this.state.files, 0);

                            if (file) {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    const result = reader.result;
                                    const fileString = (result.split(';base64,')[1]) || null;
                                    if (fileString) {
                                        this.setState({ fileString });
                                    }
                                };
                                reader.onerror = (error) => {
                                    console.log('Error: ', error);
                                };
                            }
                        }}
                    />
                );
            case 1:
                return (
                    <TextField
                        placeholder="Write your review here...."
                        value={this.state.comment}
                        fullWidth={true}
                        multiline={true}
                        rows={5}
                        variant="outlined"
                        className="mb-1"
                        onChange={(event) => {
                            this.setState({ comment: event.target.value });
                        }}
                    />
                );
            default:
                return 'Unknown step';
        }
    }

    renderStepper = () => (
        <div>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                {
                    this.state.stepperConfigs.map((config, index) => (
                        <Step key={index}>
                            <StepLabel>{config}</StepLabel>
                            <StepContent>
                                <div>{this.renderStepContent(index)}</div>
                                <div>
                                    <div>
                                        <Button
                                            disabled={this.state.activeStep === 0}
                                            onClick={() => {
                                                this.setState({ activeStep: this.state.activeStep - 1 });
                                            }}
                                        >
                                            BACK
                                        </Button>
                                        <Button
                                            disabled={this.isNextButtonDisabled()}
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                this.setState({ activeStep: this.state.activeStep + 1 });
                                            }}
                                        >
                                            NEXT
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))
                }
            </Stepper>
            {
                this.state.activeStep === this.state.stepperConfigs.length && (
                    <Paper square={true} elevation={0}>
                        <Button
                            onClick={() => {
                                this.setState({ activeStep: this.state.activeStep - 1 });
                            }}
                        >
                            BACK
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                                this.props.dispatch(actions.submitReview({
                                    comment: this.state.comment,
                                    fileString: this.state.fileString,
                                    orderID: this.state.orderID,
                                    successCallback: this.setState({ dialogType: 'confirmed_review' }),
                                }));
                            }}
                        >
                            SUBMIT
                        </Button>
                    </Paper>
                )
            }
        </div>
    )

    renderDialogContent = () => {
        switch (this.state.dialogType) {
            case 'payable':
                return (
                    <div>
                        popup dialog for payable order {this.state.orderID}
                    </div>
                );
            case 'receivable':
                return (
                    <Grid container={true} style={{ textAlign: 'center' }} spacing={2} className="mb-1">
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <img src={require('resources/order/order_to_be_confirm.png')} alt="confirm receipt img" />
                        </Grid>
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <Typography variant="h6" display="block" gutterBottom={true}>Are you sure to confirm your receipt of order?</Typography>
                        </Grid>
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <Grid container={true} justify="center" spacing={2}>
                                <Grid item={true}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            this.setState({ popup: false });
                                        }}
                                        style={{ width: 170 }}
                                    >
                                        CANCEL
                                    </Button>
                                </Grid>
                                <Grid item={true}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            this.props.dispatch(actions.confirmOrder({
                                                orderID: this.state.orderID,
                                                successCallback: this.setState({ dialogType: 'confirmed_receive' }),
                                            }));
                                        }}
                                        style={{ width: 170 }}
                                    >
                                        CONFIRM
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            case 'confirmed_receive':
                return (
                    <Grid container={true} style={{ textAlign: 'center' }} spacing={2} className="mb-1">
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <img src={require('resources/order/confirm_order.png')} alt="confirmed receive img" />
                        </Grid>
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <Typography variant="h6" display="block" gutterBottom={true}>Thank you for confirming the receipt of order.</Typography>
                            <Typography display="block" gutterBottom={true}>Snap a photo and beauty experiences on our wall.</Typography>
                            <Typography display="block" gutterBottom={true}><span style={{ fontStyle: 'bold' }}>50</span> credits will be rewarded for an approved review.</Typography>
                            <Link
                                onClick={() => {
                                    this.setState({ popup: false });
                                    this.fetchOrderDataByTab(this.state.currentConfig);
                                }}
                            >
                                <Typography color="secondary">Ok, I got it</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                );
            case 'reviewable':
                return (
                    <Grid container={true}>
                        <Grid item={true} lg={12} md={12} xs={12} style={{ textAlign: 'center' }}>
                            <Typography variant="h6" display="block" gutterBottom={true}>Show Off Your Purchase!</Typography>
                            <Typography display="block">Write a review on your order to earn more rewards.</Typography>
                            <Link href={'#'} color="secondary">LEARN MORE</Link>
                        </Grid>
                        <Grid item={true} lg={12} md={12} xs={12} style={{ textAlign: 'center' }}>
                            <img src={require('resources/order/review.png')} alt="review img" />
                        </Grid>
                        <Grid item={true} lg={12} md={12} xs={12}>
                            {this.renderStepper()}
                        </Grid>
                    </Grid>
                );
            case 'confirmed_review':
                return (
                    <Grid container={true} style={{ textAlign: 'center' }} spacing={2} className="mb-1">
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <img src={require('resources/order/thank_you.png')} alt="confirm review img" />
                        </Grid>
                        <Grid item={true} lg={12} md={12} xs={12}>
                            <Typography fontWeight="fontWeightBold" display="block" gutterBottom={true}>Thank you very much for your Beauty review,</Typography>
                            <Typography fontWeight="fontWeightBold" display="block" gutterBottom={true}>and it is currently under review.</Typography>
                            <Link
                                onClick={() => {
                                    this.setState({ popup: false });
                                    this.fetchOrderDataByTab(this.state.currentConfig);
                                }}
                            >
                                <Typography color="secondary">Awesome, I&apos;m done here!</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                );
            default:
                break;
        }

        return null;
    }

    renderStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
            case 'cod received':
            case 'received':
            case 'posted':
            case 'cod posted':
                return '#00B047';
            case 'in process':
            case 'pending':
                return '#E98800';
            case 'unpaid':
            case 'cod unpaid':
            case 'cod rejected':
            case 'cod delivery failed':
            case 'cod returned':
                return '#F50000';
            case 'multiple':
            case 'canceled':
            case 'expired':
            case 'shipment delayed':
            case 'deleted':
            case 'cod cancelled':
            case 'cod shipment delayed':
                return '#B7B7B7';
            default:
                break;
        }

        return null;
    }

    renderStatus = (order) => {
        const arr = Object.keys(order.attribute).filter((a) => (a === 'is_payable' || a === 'is_receivable' || a === 'is_reviewable') && order.attribute[a]);
        if (arr.length) {
            return arr.map((attr, index) => {
                if (order.attribute[attr]) {
                    switch (attr) {
                        case 'is_payable':
                            return (
                                <Button
                                    key={index}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({ popup: !this.state.popup, dialogType: 'payable', orderID: order.id });
                                    }}
                                >
                                    <Typography>Pay Now</Typography>
                                </Button>
                            );
                        case 'is_receivable':
                            return (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({ popup: !this.state.popup, dialogType: 'receivable', orderID: order.id });
                                    }}
                                >
                                    <Typography>Confirm Received</Typography>
                                </Button>
                            );
                        case 'is_reviewable':
                            return (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({ popup: !this.state.popup, dialogType: 'reviewable', orderID: order.id });
                                    }}
                                >
                                    <Typography>Rate &amp; Review</Typography>
                                </Button>
                            );
                        default:
                            return null;
                    }
                }
                return null;
            });
        }

        return <Typography style={{ color: this.renderStatusColor(order.status) }}>{order.status}</Typography>;
    }

    renderOrderListCard = (config) => {
        if (!this.props.profileOrderList.orderList) {
            return null;
        }

        return (
            <Card style={{ overflowX: 'auto' }} className="order-tab">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography>Order</Typography></TableCell>
                            <Hidden xsDown={true}>
                                <TableCell><Typography>Date Created</Typography></TableCell>
                                <TableCell><Typography>Courier</Typography></TableCell>
                            </Hidden>
                            <TableCell><Typography>Amount</Typography></TableCell>
                            <TableCell><Typography>Status</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataChecking(this.props.profileOrderList, 'orderList') &&
                            this.props.profileOrderList.orderList.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <NavLink to={`order/${order.id}`} style={{ textDecoration: 'none' }}>
                                            <Typography color="secondary">
                                                {order.number}
                                            </Typography>
                                            <IconButton size="small">
                                                <KeyboardArrowRight color="secondary" />
                                            </IconButton>
                                        </NavLink>
                                    </TableCell>
                                    <Hidden xsDown={true}>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                style={{ marginRight: 5 }}
                                                onClick={(event) => {
                                                    this.setState({
                                                        anchorEl: event.currentTarget,
                                                        orderDate: order.created_at,
                                                    });
                                                }}
                                            >
                                                <QueryBuilder />
                                            </IconButton>
                                            <Typography>{moment(order.created_at).fromNow()}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{order.courier}</Typography>
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        <Typography>{order.currency.symbol} {order.subtotal.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {this.renderStatus(order)}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 25, 40]}
                    rowsPerPage={this.state.rowsPerPage}
                    count={dataChecking(this.props.profileOrderList, 'orderMeta', 'totalCount')}
                    page={this.state.page}
                    onChangePage={(event, newPage) => {
                        this.props.dispatch(actions.getOrderList({ urlParam: config.urlParam, pageCount: (newPage + 1), orderCount: this.state.rowsPerPage }));
                        this.setState({ page: newPage });
                    }}
                    onChangeRowsPerPage={(event) => {
                        this.props.dispatch(actions.getOrderList({ urlParam: config.urlParam, pageCount: 1, orderCount: event.target.value }));
                        this.setState({ page: 0, rowsPerPage: event.target.value });
                    }}
                />
            </Card>
        );
    }

    renderContents = () => {
        console.log(this.state.orderStatusConfigs);
        console.log('Tab', this.state.currentConfig);
        return (
            <div>
                {this.renderOrderListCard(this.state.currentConfig)}
            </div>
        );
    }

    render() {
        return (
            <div>
                <NavTab
                    data={this.state.orderStatusConfigs}
                    onTabClick={(config) => {
                        this.fetchOrderDataByTab(config);
                        this.setState({ currentConfig: config });
                    }}
                    renderTabID={(tabValue) => this.setState({ tabValue })}
                />
                {this.renderContents()}
                <Popover
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={() => {
                        this.setState({ anchorEl: null });
                    }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                >
                    <div style={{ padding: 10 }}><Typography>{this.state.orderDate}</Typography></div>
                </Popover>
                <PopupDialog
                    display={this.state.popup}
                    onClose={() => {
                        this.setState({ popup: false, activeStep: 0, files: [], comment: '' });
                    }}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
            </div>
        );
    }
}

ProfileOrderList.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileOrderList: makeSelectProfileOrderList(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileOrderList', reducer });
const withSaga = injectSaga({ key: 'profileOrderList', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrderList);
