/**
*
* InputForm
*
*/

import React from 'react';
import { Input, InputLabel, InputAdornment, FormControl, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff, Cancel } from '@material-ui/icons';

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
        <Cancel
            color="action"
            onClick={() => {
                this.props.onClear();
            }}
        />
    )

    showVisibilty = () => (
        <IconButton
            aria-label="Toggle password visibility"
            onClick={this.props.handleClickShowPassword}
        >
            {this.props.showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
    )

    render() {
        return (
            <FormControl fullWidth={true}>
                {(this.props.label) ? <InputLabel className="text-capitalize">{this.props.label}</InputLabel> : ''}
                <Input
                    id={this.props.id}
                    onChange={this.props.handleChange}
                    type={this.props.type}
                    value={this.props.value}
                    endAdornment={
                        <InputAdornment position="end">
                            {this.props.value ? this.showCancelButton() : null}
                            {this.props.togglePassword ? this.showVisibilty() : null}
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
}

InputForm.propTypes = {

};

export default InputForm;
