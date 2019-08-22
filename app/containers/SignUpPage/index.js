/**
 *
 * SignUpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Card, CardContent, CardActions, Container, FormControl, Typography, Grid, Select, InputLabel, OutlinedInput } from '@material-ui/core';
import InputForm from 'components/InputForm';
import { withStyles } from '@material-ui/core/styles';

import { dataChecking } from 'globalUtils';
import makeSelectSignUpPage from './selectors';
import { doSignup, doSendOTP, getSmsPrefix } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';


export class SignUpPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            smsPrefix: '',
            smsNumber: '',
            otpNumber: '',
            signUpEmail: '',
            signUpPassword: '',
            confPassword: '',
            showPassword: false,
            showConfPassword: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(getSmsPrefix());
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };
    handleClickShowPassword = () => {
        this.setState((state) => ({ showPassword: !state.showPassword }));
    }
    handleClickShowConfPassword = () => {
        this.setState((state) => ({ showConfPassword: !state.showConfPassword }));
    }
    handleSubmit = (event) => {
        this.props.dispatch(doSignup(this.state));
        event.preventDefault();
    }
    // add function to Send OTP
    handleSendOTP = () => {
        alert('OTP SENT! ');
    }

    cardHeader = () => (
        <div className="mt-2 pl-1">
            <Typography variant="h5" color="primary"><b>Sign Up Now!</b></Typography>
            <Typography variant="h6" color="textSecondary"><br />Get 2 FREE Masks with your first purchase.</Typography>
        </div>
    )

    cardHeader2 = () => {
        const imgStyle = {
            width: 80,
            height: 80,
        };
        return (
            <Grid container={true} className="py-1" justify="space-around" alignItems="center" direction="row">
                <Grid item={true} className="p-quater" align="center" xs={4}>
                    <img src={require('Resources/authPage/signup-wishlist.png')} alt="Wishlist" style={imgStyle} />
                </Grid>
                <Grid item={true} className="p-quater" align="center" xs={4}>
                    <img src={require('Resources/authPage/signup-order.png')} alt="Order" style={imgStyle} />
                </Grid>
                <Grid item={true} className="p-quater" align="center" xs={4}>
                    <img src={require('Resources/authPage/signup-birthday-rewards.png')} alt="rewards" style={imgStyle} />
                </Grid>
            </Grid>
        );
    }

    smsPrefixList = () => {
        let showPrefixList;
        let findPrefixList;
        if (this.props.signUpPage && this.props.signUpPage.data.mobile_prefix) {
            const prefixCountry = Object.keys(this.props.signUpPage.data.mobile_prefix.items);
            findPrefixList = prefixCountry.map((countryName) => {
                showPrefixList = Object.entries(this.props.signUpPage.data.mobile_prefix.items[countryName]).map((prefixList) => (
                    <option key={prefixList} value={prefixList[0]}>
                        {prefixList[1]}
                    </option>
                ));
                return (
                    showPrefixList
                );
            });
        }
        return (
            findPrefixList
        );
    }

    formInput = () => (
        <div>
            <InputLabel className="text-capitalize pb-half">Mobile number</InputLabel>
            <Grid container={true} direction="row" justify="space-around" align="stretch">
                <Grid item={true} xs={3}>
                    <FormControl variant="outlined">
                        <Select
                            native={true}
                            id="smsPrefix"
                            value={this.state.smsPrefix}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput />
                            }
                        >
                            {this.smsPrefixList()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item={true} xs={9}>
                    <FormControl>
                        <InputForm
                            id="smsNumber"
                            handleChange={this.handleChange}
                            value={this.state.smsNumber}
                            placeholder="e.g. 7654321"
                            onClear={() => {
                                this.setState({ smsNumber: '' });
                            }}
                            onClick={() => this.props.dispatch(doSendOTP(this.state.smsPrefix, this.state.smsNumber))}
                            requestOTP={true}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <FormControl fullWidth={true}>
                <InputForm
                    label="OTP Number"
                    variant="outlined"
                    id="otpNumber"
                    handleChange={this.handleChange}
                    value={this.state.otpNumber}
                    onClear={() => {
                        this.setState({ otpNumber: '' });
                    }}
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Email address"
                    id="signUpEmail"
                    handleChange={this.handleChange}
                    placeholder="abc"
                    value={this.state.signUpEmail}
                    onClear={() => {
                        this.setState({ signUpEmail: '' });
                    }}
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Create a password"
                    id="signUpPassword"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.signUpPassword}
                    showPassword={this.state.showPassword}
                    handleChange={this.handleChange}
                    handleClickShowPassword={this.handleClickShowPassword}
                    onClear={() => {
                        this.setState({ signUpPassword: '' });
                    }}
                    togglePassword={true}
                />
                <Typography className="pb-half" variant="caption" color="textSecondary">Password should contain at least 8 characters.</Typography>
            </FormControl>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Confirm your password"
                    id="confPassword"
                    type={this.state.showConfPassword ? 'text' : 'password'}
                    value={this.state.confPassword}
                    showPassword={this.state.showConfPassword}
                    handleChange={this.handleChange}
                    handleClickShowPassword={this.handleClickShowConfPassword}
                    onClear={() => {
                        this.setState({ confPassword: '' });
                    }}
                    togglePassword={true}
                />
            </FormControl>
        </div>
    )

    formAction = () => (
        <FormControl fullWidth={true} className="text-xs-center">
            <Button type="submit" variant="contained" color="primary">
                <Typography>Sign Up</Typography>
            </Button>
            <Typography className="text-xs-center mt-1" variant="h6">or<br /></Typography>
            {/* Need to add login with FB  */}
        </FormControl>
    )

    render() {
        return (
            <Container className={this.props.classes.card}>
                <Card>
                    <Container className="p-2">
                        {this.cardHeader()}
                        {this.cardHeader2()}
                        <hr />
                        {/* update onSubmit */}
                        <form onSubmit={this.handleSubmit}>
                            <CardContent>
                                {this.formInput()}
                                {/* Add reCAPTCHA*/}
                            </CardContent>
                            <CardActions>
                                {this.formAction()}
                            </CardActions>
                        </form>
                        <div className="text-xs-center">
                            <Typography className="mt-1" variant="caption" color="textSecondary">
                                By signing up, you agree to the <u>Terms Conditions</u> and will automatically receive insider offers via email.{/* Need to add Link for Terms and condition */}
                            </Typography>
                        </div>
                    </Container>
                </Card>
            </Container>
        );
    }
}


SignUpPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    signUpPage: makeSelectSignUpPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpPage', reducer });
const withSaga = injectSaga({ key: 'signUpPage', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(SignUpPage);
