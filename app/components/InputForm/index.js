/**
*
* InputForm
*
*/

import React from 'react';
import {
    TextField,
    InputAdornment,
    FormControl,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff,
    Cancel,
} from '@material-ui/icons';

// import styled from 'styled-components';

import './style.scss';

class InputForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    showCancelButton = () => (
        <IconButton
            id={this.props.id}
            disableRipple={true}
            onClick={() => {
                this.props.onClear();
            }}
        >
            <Cancel color="action" />
        </IconButton>
    )

    showVisibilty = () => (
        <IconButton
            aria-label="Toggle password visibility"
            onClick={this.props.handleClickShowPassword}
            disableFocusRipple={true}
        >
            {this.props.showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
    )

    showOTP = () => {
        if (this.props.otpSent) {
            if (this.props.canResend) {
                return (
                    <Button onClick={() => { this.props.onClick(); }}>
                        <Typography color="secondary" noWrap={true} variant="body2">
                            <b>Resend</b>
                        </Typography>
                    </Button>
                );
            }
            return (
                <Button disabled={true}>
                    <Typography noWrap={true} variant="body2">
                        <b>Resend ({this.props.timer})</b>
                    </Typography>
                </Button>
            );
        }
        return (
            <Button onClick={() => { this.props.onClick(); }}>
                <Typography color="secondary" noWrap={true} variant="body2">
                    <b>Send OTP</b>
                </Typography>
            </Button>
        );
    };

    render() {
        return (
            <FormControl fullWidth={true}>
                <TextField
                    className="pb-1"
                    id={this.props.id}
                    label={this.props.label}
                    variant="outlined"
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    required={this.props.required ? this.props.required : true}
                    defaultValue={this.props.defaultValue}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {this.props.value ? this.showCancelButton() : null}
                                {this.props.togglePassword ? this.showVisibilty() : null}
                                {this.props.requestOTP ? this.showOTP() : null}
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
        );
    }
}

InputForm.propTypes = {

};

export default InputForm;
