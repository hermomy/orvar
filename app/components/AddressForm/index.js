/**
*
* AddressForm
*
*/

import React from 'react';
// import { dataChecking } from 'globalUtils';
import {
    FormControl,
    InputLabel,
    Grid,
    Select,
    OutlinedInput,
} from '@material-ui/core';
import InputForm from 'components/InputForm';

import './style.scss';

class AddressForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            w: '',
        };
    }
    // smsPrefixList = () => dataChecking(this.props.signUpPage, 'common', 'mobile_prefix', 'items', 'length') &&
    //     this.props.signUpPage.common.mobile_prefix.items.map((item, index) => (
    //         <option key={index} value={item.value}>
    //             {item.name}
    //         </option>
    // ))
    render() {
        return (
            <form>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="receiver_name"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        label="Receiver"
                        value={this.props.state.receiver_name}
                        placeholder="Name"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <InputLabel className="text-capitalize pb-half">Address</InputLabel>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="line_1"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.line_1}
                        placeholder="e.g No 13 2nd Floor, Blok B"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="line_2"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.line_2}
                        placeholder="e.g High Noon Apartment"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="line_3"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.line_3}
                        placeholder="e.g Taman High Noon"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="city"
                        label="City"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.city}
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="postal_code"
                        label="Postcode"
                        handleChange={this.props.handleChangeNumber}
                        onClear={this.props.onClear}
                        value={this.props.state.postal_code}
                        placeholder="e.g 81200"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                {/* STATE_CODE */}
                <InputLabel className="text-capitalize pb-half">Phone no</InputLabel>
                <Grid container={true} direction="row" justify="space-around" align="stretch">
                    <Grid item={true} xs={3}>
                        <FormControl variant="outlined">
                            <Select
                                native={true}
                                id="sms_prefix"
                                value={this.props.state.sms_prefix}
                                onChange={this.props.handleChange}
                                input={
                                    <OutlinedInput />
                                }
                                required={true}
                            >
                                {this.props.smsPrefixList}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={9}>
                        <FormControl>
                            <InputForm
                                id="sms_number"
                                handleChange={this.props.handleChangeNumber}
                                value={this.props.state.sms_number}
                                placeholder="e.g. 7654321"
                                onClear={this.props.onClear}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

AddressForm.propTypes = {

};

export default AddressForm;
