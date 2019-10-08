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
import globalScope from 'globalScope';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Container,
    FormControl,
    FormHelperText,
    Typography,
    Grid,
    Select,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { dataChecking } from 'globalUtils';
import InputForm from 'components/InputForm';
import { withStyles } from '@material-ui/core/styles';

import makeSelectSignUpPage from './selectors';
import {
    doSignup,
    doSendOTP,
    getSmsPrefix,
    getImageLink,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';


export class SignUpPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            sms_prefix: '+6010',
            sms_number: '',
            tac: '',
            signupEmail: '',
            signupPassword: '',
            password_confirmation: '',
            showPassword: false,
            showConfPassword: false,
            otpSent: false,
            canResend: false,
            timer: null,
            sendClick: false,
            sendSuccess: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(getSmsPrefix());
        this.props.dispatch(getImageLink());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signUpPage.signupSuccess !== this.props.signUpPage.signupSuccess && nextProps.signUpPage.signupSuccess) {
            window.location.href = globalScope.previousPage || '/';
        }

        if (nextProps.error !== this.props.error && nextProps.error) {
            console.log(nextProps.error);
        }
        if (nextProps.signUpPage.sendOtpSuccess !== this.props.signUpPage.sendOtpSuccess && nextProps.signUpPage.sendOtpSuccess) {
            this.setState({
                otpSent: true,
                canResend: false,
                sendSuccess: true,
                timer: nextProps.signUpPage.response.data.ttl,
            });
            if (this.state.sendClick) {
                this.resendTimer(nextProps.signUpPage.response.data.ttl);
            }
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };
    handleChangeNumber = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 15) {
            this.setState({ sms_number: onlyNums });
        }
    }
    handleSubmit = (event) => {
        const signUpData = {
            email: this.state.signupEmail,
            password: this.state.signupPassword,
            password_confirmation: this.state.password_confirmation,
            sms_number: this.state.sms_number,
            sms_prefix: this.state.sms_prefix,
            tac: this.state.tac,
        };
        this.props.dispatch(doSignup(signUpData));
        event.preventDefault();
    }
    // add function to Send OTP
    handleSendOTP = () => {
        this.props.dispatch(doSendOTP(this.state.sms_prefix, this.state.sms_number));
        this.setState({ sendClick: true });
    }
    cardHeader = () => (
        <div className="mt-2 pl-1">
            <Typography variant="h5" color="primary">
                <b>{dataChecking(this.props.signUpPage, 'image', 'items') && this.props.signUpPage.image.items[0].title}</b>
            </Typography>
            <Typography variant="h6" color="textSecondary">
                <br />{dataChecking(this.props.signUpPage, 'image', 'items') && this.props.signUpPage.image.items[0].brief}
            </Typography>
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
                    <img src={require('resources/authPage/signup-wishlist.png')} alt="Wishlist" style={imgStyle} />
                </Grid>
                <Grid item={true} className="p-quater" align="center" xs={4}>
                    <img src={require('resources/authPage/signup-order.png')} alt="Order" style={imgStyle} />
                </Grid>
                <Grid item={true} className="p-quater" align="center" xs={4}>
                    <img src={require('resources/authPage/signup-birthday-rewards.png')} alt="rewards" style={imgStyle} />
                </Grid>
            </Grid>
        );
    }

    smsPrefixList = () => dataChecking(this.props.signUpPage, 'common', 'mobile_prefix', 'items', 'length') &&
        this.props.signUpPage.common.mobile_prefix.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
        ))

    resendTimer = (RESEND_TIME) => {
        const interval = setInterval(() => {
            if (this.state.timer > 0) {
                this.setState((prevState) => ({
                    timer: prevState.timer - 1,
                }));
            } else {
                clearInterval(interval);
                this.setState(() => ({
                    canResend: true,
                    timer: RESEND_TIME,
                    sendClick: false,
                    sendSuccess: false,
                }));
            }
        }, 1000);
        return (interval);
    }

    formInput = () => (
        <div>
            <InputLabel className="text-capitalize pb-half">Mobile number</InputLabel>
            <Grid container={true} direction="row" justify="space-around" align="stretch">
                <Grid item={true} xs={3}>
                    <FormControl variant="outlined">
                        <Select
                            native={true}
                            id="sms_prefix"
                            value={this.state.sms_prefix}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput />
                            }
                            required={true}
                        >
                            {this.smsPrefixList()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item={true} xs={9}>
                    <FormControl>
                        <InputForm
                            id="sms_number"
                            handleChange={this.handleChangeNumber}
                            value={this.state.sms_number}
                            placeholder="e.g. 7654321"
                            onClear={() => {
                                this.setState({ sms_number: '' });
                            }}
                            onClick={this.handleSendOTP}
                            requestOTP={true}
                            canResend={this.state.canResend}
                            otpSent={this.state.otpSent}
                            timer={this.state.timer}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            {
                this.state.sendSuccess ? <Typography variant="caption" className="text-success">{this.props.signUpPage.response.messages[0].text}</Typography> : null
            }
            <FormControl fullWidth={true}>
                <InputForm
                    label="OTP Number"
                    variant="outlined"
                    id="tac"
                    placeholder="e.g. 01234"
                    handleChange={this.handleChange}
                    value={this.state.tac}
                    onClear={() => {
                        this.setState({ tac: '' });
                    }}
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Email address"
                    id="signupEmail"
                    type="email"
                    handleChange={this.handleChange}
                    value={this.state.signupEmail}
                    onClear={() => {
                        this.setState({ signupEmail: '' });
                    }}
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Create a password"
                    id="signupPassword"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.signupPassword}
                    showPassword={this.state.signupPassword}
                    handleChange={this.handleChange}
                    handleClickShowPassword={() => this.setState((state) => ({ showPassword: !state.showPassword }))}
                    onClear={() => {
                        this.setState({ signupPassword: '' });
                    }}
                    togglePassword={true}
                    autoComplete="off"
                />
                <FormHelperText className="pb-half" id="password-helper">Password should contain at least 8 characters.</FormHelperText>
            </FormControl>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Confirm your password"
                    id="password_confirmation"
                    type={this.state.showConfPassword ? 'text' : 'password'}
                    value={this.state.password_confirmation}
                    showPassword={this.state.showConfPassword}
                    handleChange={this.handleChange}
                    handleClickShowPassword={() => this.setState((state) => ({ showConfPassword: !state.showConfPassword }))}
                    onClear={() => {
                        this.setState({ password_confirmation: '' });
                    }}
                    togglePassword={true}
                    autoComplete="off"
                />
            </FormControl>
        </div>
    )

    formAction = () => (
        <FormControl fullWidth={true} className="text-xs-center">
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                <Typography>Sign Up</Typography>
            </Button>
            <Typography className="text-xs-center my-half" variant="h6">or<br /></Typography>
            <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#3b5998', color: 'white' }}
            >
                <Typography>LOGIN WITH FACEBOOK</Typography>
            </Button>
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
                        <form onSubmit={this.handleSubmit}>
                            <CardContent>
                                {this.formInput()}
                                {/* Add reCAPTCHA*/}
                            </CardContent>
                            {
                                this.props.signUpPage.error && <ErrorMessage error={this.props.signUpPage.error} type="danger" />
                            }
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
