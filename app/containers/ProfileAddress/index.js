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
    getAddress,
    getSmsPrefix,
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
            city: '',
            line_1: '',
            line_2: '',
            line_3: '',
            postal_code: '',
            receiver_name: '',
            sms_number: '',
            sms_prefix: '',
            state_code: '',
            contact_number: '',
        };
    }
    componentDidMount() {
        this.props.dispatch(getAddress());
        this.props.dispatch(getSmsPrefix());
    }
    onActionButtonClick = ({ type }) => {
        let dialogTitle = null;

        switch (type) {
            case 'add_address':
                dialogTitle = 'Add address';
                break;
            case 'edit_address':
                dialogTitle = 'Edit address';
                break;
            default:
                // break;
                dialogTitle = 'Add address';
                break;
        }

        this.setState({
            popup: !this.state.popup,
            dialogTitle,
            dialogType: type,
        });
    }
    onClear = (event) => {
        console.log([event.target.id]);
        this.setState({ [event.target.id]: '' });
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };
    handleChangeNumber = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 15) {
            this.setState({ postal_code: onlyNums });
        }
    }
    addressList = () => dataChecking(this.props, 'profileAddress', 'list', 'items') &&
        this.props.profileAddress.list.items.map((item, index) => (
            <Card id={item.id} key={index}>
                <CardHeader
                    title={`Address ${index + 1}`}
                    action={
                        <IconButton>
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
    smsPrefixList = () => dataChecking(this.props, 'profileAddress', 'common', 'mobile_prefix', 'items', 'length') &&
        this.props.profileAddress.common.mobile_prefix.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
    ))
      // addAddress = () => (
    //     <form onSubmit={this.handleSubmit}>
    //         <InputLabel className="text-capitalize pb-half">Mobile number</InputLabel>
    //         <Grid container={true} direction="row" justify="space-around" align="stretch">
    //             <Grid item={true} xs={3}>
    //                 <FormControl variant="outlined">
    //                     <Select
    //                         native={true}
    //                         id="sms_prefix"
    //                         value={this.state.sms_prefix}
    //                         onChange={this.handleChange}
    //                         input={
    //                             <OutlinedInput />
    //                         }
    //                         required={true}
    //                     >
    //                         {this.smsPrefixList()}
    //                     </Select>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item={true} xs={9}>
    //                 <FormControl>
    //                     <InputForm
    //                         id="sms_number"
    //                         handleChange={this.handleChangeNumber}
    //                         value={this.state.sms_number}
    //                         placeholder="e.g. 7654321"
    //                         onClear={() => {
    //                             this.setState({ sms_number: '' });
    //                         }}
    //                         onClick={this.handleSendOTP}
    //                         requestOTP={true}
    //                         canResend={this.state.canResend}
    //                         otpSent={this.state.otpSent}
    //                         timer={this.state.timer}
    //                     />
    //                 </FormControl>
    //             </Grid>
    //         </Grid>
    //     </form>
    // )
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
                    />
                );
            default:
                // break;
                return (
                    <AddressForm
                        handleChange={this.handleChange}
                        value={this.state.receiver_name}
                        onClear={this.onClear}
                        state={this.state}
                        handleChangeNumber={this.handleChangeNumber}
                        smsPrefixList={this.smsPrefixList()}
                    />
                );
        }
        // return null;
    }
    render() {
        return (
            <Container className={this.props.classes.card}>
                <Typography variant="h1">My Addresses</Typography>
                <Button
                    onClick={() => this.onActionButtonClick('add_address')}
                >+ Add new address</Button>
                {this.addressList()}
                <PopupDialog
                    display={this.state.popup}
                    title={this.state.dialogTitle}
                    onClose={() => {
                        this.setState({ popup: false });
                    }}
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
