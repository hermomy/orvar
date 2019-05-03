/**
 *
 * ProfileEditInform
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Checkbox from 'components/Checkbox';
import { dataChecking } from 'globalUtils';

import makeSelectProfileEditInform from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    getInformChoice,
    getUserInform,
    getUserAddress,
    putData,
    postAddress,
} from './actions';

export class ProfileEditInform extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        datestyle: 'show',
        thisyear: new Date(Date.now()).getUTCFullYear(),
        gender: null,
        year: null,
        month: null,
        day: null,
        skinTone: null,
        skinType: null,
        skinConcernData: null,
        monthList: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

        editaddress: null,
        stateList: ['Malaysia', 'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Pulau Pinang', 'Perak', 'Perlis', 'Selangor', 'Terengganu', 'Sabah', 'Sarawak', 'Kuala Lumpur', 'Labuan', 'Putrajaya'],
        createAddress: null,
    }

    componentWillMount() {
        this.props.dispatch(getInformChoice());
        this.props.dispatch(getUserInform());
        this.props.dispatch(getUserAddress());
    }

    saveUserConcernToState = (userChoice) => {
        this.setState({ skinConcernData: userChoice });
    }

    submitInform = () => {
        this.props.dispatch(putData(this.props.profileEditInform.data.UserInformData, this.state.gender, this.state.year, this.state.month, this.state.day, this.state.skinTone, this.state.skinType, this.state.skinConcernData));
    }

    deleteAddress = () => {
        this.props.dispatch(
            postAddress(
                'delete',
                this.props.profileEditInform.data.AddressDetail,
            )
        );
    }

    submitEditAddress = () => {
        this.props.dispatch(
            postAddress(
                'put',
                this.props.profileEditInform.data.AddressDetail,
                document.getElementById('address_name').value,
                document.getElementById('address_l1').value,
                document.getElementById('address_l2').value,
                document.getElementById('address_l3').value,
                document.getElementById('address_city').value,
                document.getElementById('address_postcode').value,
                document.getElementById('address_state').value,
                document.getElementById('address_phone_prefix').value,
                document.getElementById('address_phone_number').value,
                document.getElementById('address_phone_other').value,
            )
        );
    }

    createShippingInform = () => (
        <div style={{ backgroundColor: 'lime', marginBottom: '80px' }}>
            <span style={{ backgroundColor: 'red' }} onClick={() => this.setState({ createAddress: null })}>X</span>
            <span>NEW ADDRESS</span><br />
            <span>RECEIVER</span><br />
            <input type="text" id="new_address_name" textHolder={'Name'} /><br />
            <span>address</span><br />
            <input type="text" id="new_address_l1" textHolder={'e.g No 13 2nd Floor, Blok B'} /><br />
            <input type="text" id="new_address_l2" textHolder={'e.g High Noon Apartment'} /><br />
            <input type="text" id="new_address_l3" textHolder={'e.g Taman High Noon'} /><br />
            <span>CITY</span><br />
            <input type="text" id="new_address_city" /><br />
            <span>POSTCODE</span><br />
            <input type="text" id="new_address_postcode" textHolder={'e.g 81200'} /><br />
            <span>STATE</span><br />
            <select id="new_address_state">
                {
                    [...Array(17)].map((e, i) =>
                    (
                        <option key={i} value={`${this.state.stateList[i]}/MY-${i + 1 < 10 ? `0${i + 1}` : i + 1}`} disabled={i === 0}>
                            {this.state.stateList[i]}
                        </option>)
                    )
                }
            </select><br />
            <span>PHONE NO</span><br />
            <select id="new_address_phone_prefix">
                <option disabled={true}>Malaysia</option>
                {
                    [...Array(10)].map((e, i) =>
                    (
                        <option key={i} value={`+60${10 + i}`}>
                            {`0${10 + i}`}
                        </option>)
                    )
                }
                <option disabled={true}>Singapore</option>
                <option value={'+65'}>+65</option>
                <option disabled={true}>Brunei</option>
                <option value={'+673'}>+673</option>
            </select>
            <input type="text" textHolder={'Phone Number'} id="new_address_phone_number" /><br />
            <span>OTHER NO.</span><br />
            <input type="text" textHolder={'Phone Number'} id="new_address_phone_other" />
            <span id="postcode_error"></span>
            <span id="phonenum_error"></span>
            <input type="button" value="Save" onClick={() => { this.checkInput(); }} />
        </div>
    )

    checkInput = () => {
        if (document.getElementById('new_address_postcode').value.length !== 5 && document.getElementById('new_address_postcode').value.length !== 6) {
            document.getElementById('postcode_error').innerHTML = 'Postal Code is invalid.';
            return null;
        }
        if (document.getElementById('new_address_phone_number').value.length !== 7 && document.getElementById('new_address_phone_number').value.length !== 8) {
            document.getElementById('phonenum_error').innerHTML = `Sms Number is not a valid mobile number for ${document.getElementById('new_address_phone_prefix').value}.`;
            return null;
        }
        this.submitNewAddress();
        this.setState({ createAddress: null });
        return null;
    }

    submitNewAddress = () => {
        this.props.dispatch(
            postAddress(
                'post',
                null,
                document.getElementById('new_address_name').value,
                document.getElementById('new_address_l1').value,
                document.getElementById('new_address_l2').value,
                document.getElementById('new_address_l3').value,
                document.getElementById('new_address_city').value,
                document.getElementById('new_address_postcode').value,
                document.getElementById('new_address_state').value,
                document.getElementById('new_address_phone_prefix').value,
                document.getElementById('new_address_phone_number').value,
                document.getElementById('new_address_phone_other').value,
            )
        );
    }

    renderShippingInform = () => {
        if (!dataChecking(this.props, 'profileEditInform', 'data', 'Address')) {
            return null;
        }
        return (
            <div>
                <span>Shipping Information</span>
                <span onClick={() => this.setState({ createAddress: 'a' })}>+ Add New Address</span>
                {
                    this.props.profileEditInform.data.Address.items.map((item) => (
                        <div key={item.id} style={{ marginTop: '20px' }}>
                            <i className="fa fa-pen" onClick={() => { this.setState({ editaddress: item.id }); this.props.dispatch(getUserAddress(item.id)); }}></i>
                            <span>{item.receiver_name}</span>
                            <span>{item.full_contact}</span>
                            <span>{item.full_address}</span>
                        </div>
                    ))
                }
            </div>
        );
    }


    renderEditShippingForm = () => {
        if (!dataChecking(this.props, 'profileEditInform', 'data', 'AddressDetail')) {
            return null;
        }
        const addressdetail = this.props.profileEditInform.data.AddressDetail;
        return (
            <div style={{ backgroundColor: 'lime', marginBottom: '80px' }}>
                <span style={{ backgroundColor: 'red', float: 'right', width: '20px' }} onClick={() => this.setState({ editaddress: null })}>X</span>
                <span>NEW ADDRESS</span><br />
                <span>RECEIVER</span><br />
                <input type="text" id="address_name" defaultValue={addressdetail.receiver_name} /><br />
                <span>ADDRESS</span><br />
                <input type="text" id="address_l1" defaultValue={addressdetail.line_1} /><br />
                <input type="text" id="address_l2" defaultValue={addressdetail.line_2} /><br />
                <input type="text" id="address_l3" defaultValue={addressdetail.line_3} /><br />
                <span>CITY</span><br />
                <input type="text" id="address_city" defaultValue={addressdetail.city} /><br />
                <span>POSTCODE</span><br />
                <input type="text" id="address_postcode" defaultValue={addressdetail.postal_code} /><br />
                <span>STATE</span><br />
                <select id="address_state" defaultValue={addressdetail.state.name}>
                    {
                        [...Array(17)].map((e, i) =>
                        (
                            <option key={i} value={`${this.state.stateList[i]}/MY-${i + 1 < 10 ? `0${i + 1}` : i + 1}`} disabled={i === 0}>
                                {this.state.stateList[i]}
                            </option>)
                        )
                    }
                </select><br />
                <span>PHONE NO</span><br />
                <select value={addressdetail.sms_prefix} id="address_phone_prefix" defaultValue={addressdetail.sms_prefix}>
                    <option disabled={true}>Malaysia</option>
                    {
                        [...Array(10)].map((e, i) =>
                        (
                            <option key={i} value={`+60${10 + i}`}>
                                {`0${10 + i}`}
                            </option>)
                        )
                    }
                    <option disabled={true}>Singapore</option>
                    <option value={'+65'}>+65</option>
                    <option disabled={true}>Brunei</option>
                    <option value={'+673'}>+673</option>
                </select>
                <input type="text" defaultValue={addressdetail.sms_number} id="address_phone_number" /><br />
                <span>OTHER NO.</span><br />
                <input type="text" defaultValue={addressdetail.contact_number} id="address_phone_other" />
                <input type="button" defaultValue="Save" onClick={() => { this.submitEditAddress(); this.setState({ editaddress: null }); }} />
                <input type="button" defaultValue="Delete" onClick={() => { this.deleteAddress(); this.setState({ editaddress: null }); }} />
            </div>
        );
    }

    renderForm = () => {
        if (!dataChecking(this.props, 'profileEditInform', 'data', 'InformChoiceData') || !dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData')) {
            return null;
        }
        const user = this.props.profileEditInform.data.UserInformData;
        const choice = this.props.profileEditInform.data.InformChoiceData;
        return (
            <div>
                <span>Username</span>
                <input type="text" disabled={true} value={user.username} /><br />
                <span>User Level</span>
                <input type="text" disabled={true} value={user.membership.name} /><br />
                <span>Email Address</span>
                <input type="text" disabled={true} value={user.email} /><br />
                <span>Gender</span>
                <select value={this.state.gender ? this.state.gender : user.gender} name="sex" onChange={(e) => this.setState({ gender: e.target.value })}>
                    <option value="Male" onClick={() => this.setState({ gender: 'Male' })}>Male</option>
                    <option value="Female" onClick={() => this.setState({ gender: 'Female' })}>Female</option>
                </select><br />
                {
                    this.state.datestyle === 'show' ?
                        <div>
                            <input type="text" value={user.birthday} disabled={true} /><i className="fa fa-calendar" aria-hidden="true" onClick={() => this.setState({ datestyle: 'edit' })}></i>
                            <br />
                        </div>
                        :
                        <div>
                            <select value={this.state.year ? this.state.year : dataChecking(user, 'birthday') ? user.birthday.split('-')[0] : this.state.thisyear} onChange={(e) => this.setState({ year: e.target.value })}>
                                <option value="Year" disabled={true}>Year</option>
                                {
                                    [...Array(this.state.thisyear - 1918)].map((e, i) =>
                                        (
                                            <option key={this.state.thisyear - i} value={this.state.thisyear - i} onClick={() => this.setState({ year: this.state.thisyear - i })}>
                                                { this.state.thisyear - i }
                                            </option>
                                        )
                                    )
                                }
                            </select>
                            <select value={this.state.month ? this.state.month : dataChecking(user, 'birthday') ? user.birthday.split('-')[1] : '01'} onChange={(e) => this.setState({ month: e.target.value })}>
                                <option value="Month" disabled={true}>Month</option>
                                {
                                    [...Array(12)].map((e, i) =>
                                        (
                                            <option key={i + 1} value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`} onClick={() => this.setState({ month: `${i + 1 < 10 ? `0${i + 1}` : i + 1}` })}>
                                                {this.state.monthList[i + 1]}
                                            </option>
                                        )
                                    )
                                }
                            </select>
                            <select value={this.state.day ? this.state.day : dataChecking(user, 'birthday') ? user.birthday.split('-')[2] : '01'} onChange={(e) => this.setState({ day: e.target.value })}>
                                <option value="Day" disabled={true}>Day</option>
                                {
                                    [...Array(31)].map((e, i) =>
                                        (
                                            <option key={i + 1} value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`} onClick={() => this.setState({ day: `${i + 1 < 10 ? `0${i + 1}` : i + 1}` })}>
                                                {i + 1}
                                            </option>)
                                        )
                                }
                            </select>
                        </div>
                }
                <br />
                <span>Skin Tone</span>
                {
                    choice.skin_tone.items.map((item) => (
                        <div key={item.id}>
                            <input name="skin_tone" type="radio" value={item} defaultChecked={item.id === user.skin.tone.id} onChange={() => this.setState({ skinTone: item })} />{item.name}
                        </div>
                    ))
                }
                <br />
                <span>Skin Type</span>
                {
                    choice.skin_type.items.map((item) => (
                        <div key={item.id}>
                            <input name="skin_type" type="radio" value={item} defaultChecked={item.id === user.skin.type.id} onChange={() => this.setState({ skinType: item })} />{item.name}
                        </div>
                    ))
                }
                <br />
                <span>Skin Concern</span>
                <br />
                {this.renderCheckbox(user, choice)}
                <br />
                <input type="button" value="Save Change" onClick={() => { this.submitInform(); }} />
            </div>
        );
    }

    renderCheckbox = (user, choice) => {
        if (!dataChecking(choice, 'skin_problem', 'items')) {
            return null;
        }
        return (
            <Checkbox
                choice={choice.skin_problem.items}
                userselect={user.skin.concerns}
                saveDataToContainer={(userChoice) => this.saveUserConcernToState(userChoice)}
            />
        );
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderForm()}
                {this.renderShippingInform()}
                {this.state.editaddress ? this.renderEditShippingForm() : null}
                {this.state.createAddress ? this.createShippingInform() : null}
            </div>
        );
    }
}

ProfileEditInform.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileEditInform: makeSelectProfileEditInform(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileEditInform', reducer });
const withSaga = injectSaga({ key: 'profileEditInform', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileEditInform);
