/**
 *
 * OnboardingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import Async from 'assets/react-async';
import { apiRequest } from 'globalUtils';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Checkbox from 'components/Checkbox';

import makeSelectOnboardingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

const getchoice = async (firsttime) => {
    if (firsttime) {
        choice = await apiRequest('/common', 'get');
    }
    return null;
};

const postchoice = async (userDetail) => {
    const userProfile = await apiRequest('/profile', 'get');
    const temp = userProfile.data;
    if (userDetail.gender) {
        temp.gender = userDetail.gender;
    }
    if (userDetail.year !== 'YYYY' && userDetail.month !== 'MM' && userDetail.day !== 'DD') {
        temp.birthday = `${userDetail.year ? userDetail.year : temp.birthday.split('-')[0]}-${userDetail.month ? userDetail.month : temp.birthday.split('-')[1]}-${userDetail.day ? userDetail.day : temp.birthday.split('-')[2]}`;
        temp.birthdayDisplay = `${temp.birthday}T16:00:00.000Z`;
    }
    if (userDetail.skintone !== 'please select ONE option') {
        temp.skin.tone = userDetail.skintone;
    }
    if (userDetail.skintype !== 'please select ONE option') {
        temp.skin.type = userDetail.skintype;
    }
    temp.skin.concerns = userDetail.skincondition;

    return apiRequest('/profile', 'put', temp);
};

let choice = {};

export class OnboardingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        selectquestion1: false,
        selectquestion2: false,
        selectquestion3: false,
        selectquestion4: false,
        selectquestion5: false,

        toUserDetailPage: false,

        bar: 20,
    }

    userDetail = {
        gender: 'Female',
        year: 'YYYY',
        month: 'MM',
        day: 'DD',
        skintone: 'please select ONE option',
        skintype: 'please select ONE option',
        skincondition: [],
        skinconditionforshow: '',
        defaultcondition: 'you may select MORE THAN ONE options',
    }

    signUpDetail = {
        phoneprefix: '010',
        phonenumber: '',
        OTP: '',
        email: '',
        password: '',
        confirmpassword: '',
    }

    firsttime = true;

    changeFirstTimeStatus = () => {
        this.firsttime = false;
    }

    saveData = () => {
        // if (Number.isInteger(document.getElementById('phone_number').value) || document.getElementById('phone_number').value.length <= 6 || document.getElementById('phone_number').value.length >= 8) {
        //     document.getElementById('phone_number_error').innerHTML = `${document.getElementById('phone_prefix').value} ${document.getElementById('phone_number').value} is not a valid phone number`;
        //     return null;
        // }
        // document.getElementById('phone_number_error').innerHTML = '';

        // // OTP

        // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('email').value)) {
        //     document.getElementById('email_error').innerHTML = 'Please enter a valid email address.';
        //     return null;
        // }
        // document.getElementById('email_error').innerHTML = '';

        // if (document.getElementById('password').value.length <= 7) {
        //     document.getElementById('password_error').innerHTML = 'Password should contain at least 8 characters.';
        //     return null;
        // }
        // document.getElementById('password_error').innerHTML = '';

        // if (document.getElementById('password').value !== document.getElementById('confirm_password').value) {
        //     document.getElementById('confirm_password_error').innerHTML = 'Password not match';
        //     return null;
        // }
        // document.getElementById('confirm_password_error').innerHTML = '';

        // this.signUpDetail.phoneprefix = document.getElementById('phone_prefix').value;
        // this.signUpDetail.phonenumber = document.getElementById('phone_number').value;
        // this.signUpDetail.email = document.getElementById('email').value;
        // this.signUpDetail.password = document.getElementById('password').value;

        this.setState({ toUserDetailPage: true });
        return null;
    }

    renderBarPercent = () => {
        let percent = 20;
        if (this.userDetail.year !== 'YYYY' && this.userDetail.month !== 'MM' && this.userDetail.day !== 'DD') {
            percent += 20;
        }
        if (this.userDetail.skintone !== 'please select ONE option') {
            percent += 20;
        }
        if (this.userDetail.skintype !== 'please select ONE option') {
            percent += 20;
        }
        if (this.userDetail.skincondition.length !== 0) {
            percent += 20;
        }
        this.setState({ bar: percent });
    }

    renderDetailPageForm = () => {
        const monthList = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const thisyear = new Date(Date.now()).getUTCFullYear();
        return (
            <div>
                <div className="detail-page-form-question-container">
                    <div>
                        <span className="detail-page-form-question-title">Gender</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion1
                            ?
                                <div
                                    onClick={() =>
                                        this.setState({
                                            selectquestion1: !this.state.selectquestion1,
                                            selectquestion2: false,
                                            selectquestion3: false,
                                            selectquestion4: false,
                                            selectquestion5: false,
                                        })
                                    }
                                >
                                    {this.userDetail.gender}
                                </div>
                            :
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        defaultChecked={this.userDetail.gender === 'Female'}
                                        onChange={(e) => { this.setState({ selectquestion1: false }); this.userDetail.gender = e.target.value; }}
                                    />
                                        Female
                                    <br />
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        defaultChecked={this.userDetail.gender === 'Male'}
                                        onChange={(e) => { this.setState({ selectquestion1: false }); this.userDetail.gender = e.target.value; }}
                                    />
                                    Male
                                </div>
                        }
                    </div>
                </div>
                <div className="detail-page-form-question-container">
                    <div>
                        <span className="detail-page-form-question-title">Date of Birth</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion2
                            ?
                                <div
                                    onClick={() =>
                                        this.setState({
                                            selectquestion1: false,
                                            selectquestion2: !this.state.selectquestion2,
                                            selectquestion3: false,
                                            selectquestion4: false,
                                            selectquestion5: false,
                                        })
                                    }
                                >
                                    {`${this.userDetail.day} / ${this.userDetail.month} / ${this.userDetail.year}`}
                                </div>
                            :
                                <div>
                                    <select defaultValue={this.userDetail.day} onChange={(e) => { this.userDetail.day = e.target.value; this.renderBarPercent(); }}>
                                        <option value="Day" disabled={true}>Day</option>
                                        {
                                            [...Array(31)].map((e, i) =>
                                                (
                                                    <option
                                                        key={i + 1}
                                                        value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                                                    >
                                                        {i + 1}
                                                    </option>)
                                                )
                                        }
                                    </select>
                                    <select defaultValue={this.userDetail.month} onChange={(e) => { this.userDetail.month = e.target.value; this.renderBarPercent(); }}>
                                        <option value="Month" disabled={true}>Month</option>
                                        {
                                            [...Array(12)].map((e, i) =>
                                                (
                                                    <option
                                                        key={i + 1}
                                                        value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                                                    >
                                                        {monthList[i + 1]}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                    <select defaultValue={this.userDetail.year} onChange={(e) => { this.userDetail.year = e.target.value; this.renderBarPercent(); }}>
                                        <option value="Year" disabled={true}>Year</option>
                                        {
                                            [...Array(thisyear - 1918)].map((e, i) =>
                                                (
                                                    <option
                                                        key={thisyear - i}
                                                        value={thisyear - i}
                                                    >
                                                        { thisyear - i }
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                        }
                    </div>
                </div>
                <div className="detail-page-form-question-container">
                    <div>
                        <span className="detail-page-form-question-title">Skin Tone</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion3
                            ?
                                <div
                                    onClick={() =>
                                        this.setState({
                                            selectquestion1: false,
                                            selectquestion2: false,
                                            selectquestion3: !this.state.selectquestion3,
                                            selectquestion4: false,
                                            selectquestion5: false,
                                        })
                                    }
                                >
                                    {this.userDetail.skintone.name ? this.userDetail.skintone.name : this.userDetail.skintone}
                                </div>
                            :
                                <div>
                                    {
                                        choice.data.skin_tone.items.map((option, index) => (
                                            <div>
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        this.setState({ selectquestion3: false });
                                                        this.userDetail.skintone = option;
                                                        this.renderBarPercent();
                                                    }}
                                                >
                                                    {option.name}
                                                </div>
                                                {/* <input
                                                    type="radio"
                                                    key={index}
                                                    name="skin_tone"
                                                    value={option}
                                                    checked={this.userDetail.skintone.name === option.name}
                                                    onClick={() => {
                                                        this.setState({ selectquestion3: false });
                                                        this.userDetail.skintone = option;
                                                        this.renderBarPercent();
                                                    }}
                                                /> */}
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
                <div className="detail-page-form-question-container">
                    <div>
                        <span className="detail-page-form-question-title">Skin Type</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion4
                            ?
                                <div
                                    onClick={() =>
                                        this.setState({
                                            selectquestion1: false,
                                            selectquestion2: false,
                                            selectquestion3: false,
                                            selectquestion4: !this.state.selectquestion4,
                                            selectquestion5: false,
                                        })
                                    }
                                >
                                    {this.userDetail.skintype.name ? this.userDetail.skintype.name : this.userDetail.skintype}
                                </div>
                            :
                                <div>
                                    {
                                        choice.data.skin_type.items.map((option, index) => (
                                            <div>
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        this.setState({ selectquestion4: false });
                                                        this.userDetail.skintype = option;
                                                        this.renderBarPercent();
                                                    }}
                                                >
                                                    {option.name}
                                                </div>
                                                {/* <input
                                                    type="radio"
                                                    key={index}
                                                    name="skin_type"
                                                    value={option}
                                                    checked={this.userDetail.skintype.name === option.name}
                                                    onClick={() => {
                                                        this.setState({ selectquestion4: false });
                                                        this.userDetail.skintype = option;
                                                        this.renderBarPercent();
                                                    }}
                                                />
                                                {option.name} */}
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
                <div className="detail-page-form-question-container">
                    <div>
                        <span className="detail-page-form-question-title">Skin Condition</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion5
                            ?
                                <div
                                    onClick={() =>
                                        this.setState({
                                            selectquestion1: false,
                                            selectquestion2: false,
                                            selectquestion3: false,
                                            selectquestion4: false,
                                            selectquestion5: !this.state.selectquestion5,
                                        })
                                    }
                                >
                                    {
                                        this.userDetail.skinconditionforshow !== ''
                                        ?
                                            <div>
                                                {this.userDetail.skinconditionforshow}
                                            </div>
                                        :
                                            <span>{this.userDetail.defaultcondition}</span>
                                    }
                                </div>
                            :
                                <div>
                                    <div>
                                        <Checkbox
                                            choice={choice.data.skin_problem.items}
                                            userselect={[]}
                                            saveDataToContainer={(userChoice) => { this.userDetail.skincondition = userChoice; console.log(userChoice); }}
                                            needSelectedOptionName={true}
                                            saveDataNameToContainer={(dataNameChoice) => { this.userDetail.skinconditionforshow = dataNameChoice; this.renderBarPercent(); }}
                                            noTickDesign={true}
                                        />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <input type="button" value="skip" onClick={() => alert('skip')} />
                <input
                    type="button"
                    value="done"
                    onClick={() => postchoice(this.userDetail)}
                />
            </div>
        );
    }

    renderDetailPage = () => (
        <div style={{ width: '500px', margin: 'auto' }}>
            <div>
                <span>
                    Welcome! Let&#39;s build your beauty profile.<br />
                    You may edit it back under Profile &#62; Setting &#62; Personal Info.
                </span>
                <div style={{ border: '1px solid #ccc' }}>
                    <div style={{ color: '#000', backgroundColor: '#9e9e9e', height: '24px', width: `${this.state.bar}%` }}>{this.state.bar}%</div>
                </div>
            </div>

            <Async promise={getchoice(this.firsttime)}>
                <Async.Loading>
                    <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                </Async.Loading>
                <Async.Resolved>
                    {
                        () => (
                            <div>
                                {this.changeFirstTimeStatus()}
                                {this.renderDetailPageForm()}
                            </div>
                        )
                    }
                </Async.Resolved>
                <Async.Rejected>
                    { console.error }
                </Async.Rejected>
            </Async>
        </div>
    )

    renderSignUp = () => (
        <div className="signup-page-form-container">
            <div className="signup-page-form-question-container">
                <select value={this.signUpDetail.phoneprefix} id="phone_prefix">
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
                <input type="text" id="phone_number" />
                <input type="button" value="Send OTP" /><br />
            </div>
            <span id="phone_number_error"></span>

            <div className="signup-page-form-question-container">
                <i className="fa fa-comments signup-page-form-question-icon" aria-hidden="true"></i>
                <input type="text" id="OTP" /><br />
            </div>
            <span id="OTP_error"></span>

            <div className="signup-page-form-question-container">
                <i className="fa fa-envelope signup-page-form-question-icon" aria-hidden="true"></i>
                <input type="text" id="email" /><br />
            </div>
            <span id="email_error"></span>

            <div className="signup-page-form-question-container">
                <i className="fa fa-lock signup-page-form-question-icon" aria-hidden="true"></i>
                <input type="password" id="password" />
                <input
                    type="checkbox"
                    onClick={() => {
                        if (document.getElementById('password').type === 'text') {
                            document.getElementById('password').type = 'password';
                        } else {
                            document.getElementById('password').type = 'text';
                        }
                    }}
                />
                <br />
            </div>
            <span id="password_error"></span>

            <div className="signup-page-form-question-container">
                <i className="fa fa-lock signup-page-form-question-icon" aria-hidden="true"></i>
                <input type="password" id="confirm_password" />
                {/* <i
                    className={`signup-page-form-question-icon ${document.getElementById('confirm_password').type === 'text' ? 'fa fa-eye' : 'fa fa-eye-slash'}`}
                    aria-hidden="true"
                ></i> */}
                <input
                    type="checkbox"
                    onClick={() => {
                        if (document.getElementById('confirm_password').type === 'text') {
                            document.getElementById('confirm_password').type = 'password';
                        } else {
                            document.getElementById('confirm_password').type = 'text';
                        }
                    }}
                />
            </div>
            <span id="confirm_password_error"></span>

            <input type="button" value="Facebook" onClick={() => this.saveData()} />
        </div>
    )

    render() {
        return (
            <div>
                <div>
                    {this.state.toUserDetailPage ? null : this.renderSignUp()}
                    {this.state.toUserDetailPage ? this.renderDetailPage() : null}
                </div>
            </div>
        );
    }
}

OnboardingPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    onboardingPage: makeSelectOnboardingPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'onboardingPage', reducer });
const withSaga = injectSaga({ key: 'onboardingPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(OnboardingPage);
