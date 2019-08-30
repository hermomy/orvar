/**
 *
 * ProfileAddress
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { notifySuccess, notifyError } from 'containers/Notify';

import {
    Card,
    CardContent,
    Container,
    CardHeader,
    Typography,
    IconButton,
    Button,
    // FormControl,
    // Grid,
    // Select,
    // InputLabel,
    // OutlinedInput,
} from '@material-ui/core';

import {
    Edit,
} from '@material-ui/icons';
import PopupDialog from 'components/PopupDialog';
// import InputForm from 'components/InputForm';
import AddressForm from 'components/AddressForm';
import { withStyles } from '@material-ui/core/styles';
import { dataChecking } from 'globalUtils';
import makeSelectProfileAddress from './selectors';
import {
    getConfigData,
    getAddress,
    getAddressInfo,
    addAddress,
    deleteAddress,
    updateAddress,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';

export class ProfileAddress extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            popup: false,
            addAddress: true,
            city: '',
            line_1: '',
            line_2: '',
            line_3: '',
            postal_code: '',
            receiver_name: '',
            sms_number: '',
            sms_prefix: '+6010',
            state_code: 'MY-01',
            contact_number: '',
            id: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(getAddress());
        this.props.dispatch(getConfigData());
    }

    componentWillReceiveProps(nextProps) {
        let info;
        if (this.props.profileAddress.notification !== nextProps.profileAddress.notification) {
            if (nextProps.profileAddress.notification.type === 'fail') {
                notifyError(nextProps.profileAddress.notification.message);
            } else {
                notifySuccess(nextProps.profileAddress.notification.message);
            }
        }
        if (this.props.profileAddress.addAddress.success !== nextProps.profileAddress.addAddress.success) {
            this.props.dispatch(getAddress());
            this.onClose();
        }
        if (this.props.profileAddress.updateAddress.success !== nextProps.profileAddress.updateAddress.success && nextProps.profileAddress.updateAddress.success) {
            this.props.dispatch(getAddress());
            this.onClose();
        }
        if (this.props.profileAddress.deleteAddress.success !== nextProps.profileAddress.deleteAddress.success) {
            this.props.dispatch(getAddress());
            this.onClose();
        }
        if (this.props.profileAddress.addressInfo.success !== nextProps.profileAddress.addressInfo.success) {
            if (dataChecking(nextProps, 'profileAddress', 'addressInfo', 'data')) {
                info = nextProps.profileAddress.addressInfo.data;
                this.setState({
                    id: info.id,
                    city: info.city,
                    line_1: info.line_1,
                    line_2: info.line_2,
                    line_3: info.line_3,
                    postal_code: info.postal_code,
                    receiver_name: info.receiver_name,
                    sms_number: info.sms_number,
                    sms_prefix: info.sms_prefix,
                    state_code: info.state_code,
                    contact_number: info.contact_number,
                    popup: !this.state.popup,
                });
            }
        }
    }
    onActionButtonClick = (type) => {
        let dialogTitle = null;
        switch (type) {
            case 'add_address':
                dialogTitle = 'Add address';
                this.setState({ popup: !this.state.popup });
                break;
            case 'edit_address':
                dialogTitle = 'Edit address';
                break;
            default:
                break;
        }
        this.setState({
            dialogTitle,
            dialogType: type,
        });
    }
    onClose = () => {
        this.setState({
            popup: false,
            city: '',
            line_1: '',
            line_2: '',
            line_3: '',
            postal_code: '',
            receiver_name: '',
            sms_number: '',
            sms_prefix: '+6010',
            state_code: 'MY-01',
            contact_number: '',
            id: '',
        });
    }
    onClear = (event) => { // target not precise
        this.setState({ [event.target.id]: '' });
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };
    handleChangeNumber = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 15) {
            this.setState({ [event.target.id]: onlyNums });
        }
    }
    handleChangePostCode = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 6) {
            this.setState({ [event.target.id]: onlyNums });
        }
    }
    handleSubmit = (event) => {
        const addressData = {
            city: this.state.city,
            line_1: this.state.line_1,
            line_2: this.state.line_2,
            line_3: this.state.line_3,
            postal_code: this.state.postal_code,
            receiver_name: this.state.receiver_name,
            sms_number: this.state.sms_number,
            sms_prefix: this.state.sms_prefix,
            state_code: this.state.state_code,
            contact_number: this.state.contact_number,
        };
        switch (this.state.dialogType) {
            case 'add_address' :
                this.props.dispatch(addAddress(addressData));
                break;
            case 'edit_address' :
                this.props.dispatch(updateAddress(addressData, this.state.id));
                break;
            default:
                break;
        }
        event.preventDefault();
    }
    addressList = () => dataChecking(this.props, 'profileAddress', 'addressList', 'data', 'items') &&
        this.props.profileAddress.addressList.data.items.map((item, index) => (
            <Card id={item.id} key={index} className="my-1">
                <CardHeader
                    title={`Address ${index + 1}`}
                    action={
                        <IconButton
                            onClick={() => {
                                this.props.dispatch(getAddressInfo(item.id));
                                this.onActionButtonClick('edit_address');
                            }}
                        >
                            <Edit />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography>Receiver: {item.receiver_name}<br /></Typography>
                    <Typography>Contact number: {item.full_contact}<br /></Typography>
                    <Typography>Address: {item.full_address}<br /></Typography>
                </CardContent>
            </Card>
        )
    )
    smsPrefixList = () => dataChecking(this.props, 'profileAddress', 'configData', 'data', 'mobile_prefix', 'items', 'length') &&
        this.props.profileAddress.configData.data.mobile_prefix.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
    ))
    statesList = () => dataChecking(this.props, 'profileAddress', 'configData', 'data', 'state', 'items') &&
        this.props.profileAddress.configData.data.state.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
    ))
    renderDialogContent = () => {
        switch (this.state.dialogType) {
            case 'add_address':
                return (
                    <AddressForm
                        handleChange={this.handleChange}
                        value={this.state.receiver_name}
                        onClear={this.onClear}
                        state={this.state}
                        handleChangeNumber={this.handleChangeNumber}
                        smsPrefixList={this.smsPrefixList()}
                        statesList={this.statesList()}
                        handleChangePostCode={this.handleChangePostCode}
                        handleSubmit={this.handleSubmit}
                    />
                );
            case 'edit_address':
                if (dataChecking(this.props, 'profileAddress', 'addressInfo', 'data')) {
                    return (
                        <AddressForm
                            editAddress={true}
                            handleChange={this.handleChange}
                            value={this.state.receiver_name}
                            onClear={this.onClear}
                            state={this.state}
                            handleChangeNumber={this.handleChangeNumber}
                            smsPrefixList={this.smsPrefixList()}
                            statesList={this.statesList()}
                            handleChangePostCode={this.handleChangePostCode}
                            handleSubmit={this.handleSubmit}
                            handleDelete={() => {
                                this.props.dispatch(deleteAddress(this.state.id));
                            }}
                        />
                    );
                }
                break;
            default:
                break;
        }
        return null;
    }
    render() {
        return (
            <Container className={this.props.classes.card}>
                <Typography variant="h1">My Addresses</Typography>
                <Button
                    onClick={() => this.onActionButtonClick('add_address')}
                    variant="contained"
                >+ Add new address</Button>
                {this.addressList()}
                <PopupDialog
                    display={this.state.popup}
                    title={this.state.dialogTitle}
                    onClose={() => this.onClose()}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
            </Container>
        );
    }
}

ProfileAddress.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileAddress: makeSelectProfileAddress(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileAddress', reducer });
const withSaga = injectSaga({ key: 'profileAddress', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(ProfileAddress);
