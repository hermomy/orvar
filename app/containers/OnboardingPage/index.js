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
import Async from 'react-async';
import { apiRequest } from 'globalUtils';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

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

const postchoice = async (userSelect) => {
    const userProfile = await apiRequest('/profile', 'get');
    const temp = userProfile.data;
    if (userSelect.gender) {
        temp.gender = userSelect.gender;
    }
    if (userSelect.year !== 'YYYY' && userSelect.month !== 'MM' && userSelect.day !== 'DD') {
        temp.birthday = `${userSelect.year ? userSelect.year : temp.birthday.split('-')[0]}-${userSelect.month ? userSelect.month : temp.birthday.split('-')[1]}-${userSelect.day ? userSelect.day : temp.birthday.split('-')[2]}`;
        temp.birthdayDisplay = `${temp.birthday}T16:00:00.000Z`;
    }
    if (userSelect.skintone !== 'please select ONE option') {
        temp.skin.tone = userSelect.skintone;
    }
    if (userSelect.skintype !== 'please select ONE option') {
        temp.skin.type = userSelect.skintype;
    }
    if (userSelect.skincondition.length) {
        temp.skin.concerns = userSelect.skincondition;
    }

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

        bar: 20,
    }

    userSelect = {
        gender: 'Female',
        year: 'YYYY',
        month: 'MM',
        day: 'DD',
        skintone: 'please select ONE option',
        skintype: 'please select ONE option',
        skincondition: [],
        skinconditionforshow: [],
        defaultcondition: 'you may select MORE THAN ONE options',
    }

    firsttime = true;

    changeFirstTimeStatus = () => {
        this.firsttime = false;
    }

    renderBarPercent = () => {
        let percent = 20;
        if (this.userSelect.year !== 'YYYY' && this.userSelect.month !== 'MM' && this.userSelect.day !== 'DD') {
            percent += 20;
        }
        if (this.userSelect.skintone !== 'please select ONE option') {
            percent += 20;
        }
        if (this.userSelect.skintype !== 'please select ONE option') {
            percent += 20;
        }
        if (this.userSelect.skinconditionforshow.length === 0) {
            percent += 20;
        }
        this.setState({ bar: percent });
    }

    renderPage = () => {
        const monthList = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const thisyear = new Date(Date.now()).getUTCFullYear();
        return (
            <div>
                <div>
                    <div>
                        <span>Gender</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion1
                            ?
                                <div onClick={() => this.setState({ selectquestion1: !this.state.selectquestion1 })}>
                                    {this.userSelect.gender}
                                </div>
                            :
                                <div onChange={(e) => { this.setState({ selectquestion1: false }); this.userSelect.gender = e.target.value; }}>
                                    <input type="radio" name="gender" value="Female" />Female<br />
                                    <input type="radio" name="gender" value="Male" />Male
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <span>Date of Birth</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion2
                            ?
                                <div onClick={() => this.setState({ selectquestion2: !this.state.selectquestion2 })}>
                                    {`${this.userSelect.day} / ${this.userSelect.month} / ${this.userSelect.year}`}
                                </div>
                            :
                                <div>
                                    <select value={'01'} onChange={(e) => { this.userSelect.day = e.target.value; }}>
                                        <option value="Day" disabled={true}>Day</option>
                                        {
                                            [...Array(31)].map((e, i) =>
                                                (
                                                    <option
                                                        key={i + 1}
                                                        value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                                                        onClick={() => {
                                                            this.userSelect.day = `${i + 1 < 10 ? `0${i + 1}` : i + 1}`;
                                                            this.renderBarPercent();
                                                        }}
                                                    >
                                                        {i + 1}
                                                    </option>)
                                                )
                                        }
                                    </select>
                                    <select value={'01'} onChange={(e) => { this.userSelect.month = e.target.value; }}>
                                        <option value="Month" disabled={true}>Month</option>
                                        {
                                            [...Array(12)].map((e, i) =>
                                                (
                                                    <option
                                                        key={i + 1}
                                                        value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`}
                                                        onClick={() => {
                                                            this.userSelect.month = `${i + 1 < 10 ? `0${i + 1}` : i + 1}`;
                                                            this.renderBarPercent();
                                                        }}
                                                    >
                                                        {monthList[i + 1]}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                    <select value={thisyear} onChange={(e) => { this.userSelect.year = e.target.value; }}>
                                        <option value="Year" disabled={true}>Year</option>
                                        {
                                            [...Array(thisyear - 1918)].map((e, i) =>
                                                (
                                                    <option
                                                        key={thisyear - i}
                                                        value={thisyear - i}
                                                        onClick={() => {
                                                            this.userSelect.year = thisyear - i;
                                                            this.renderBarPercent();
                                                        }}
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
                <div>
                    <div>
                        <span>Skin Tone</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion3
                            ?
                                <div onClick={() => this.setState({ selectquestion3: !this.state.selectquestion3 })}>
                                    {this.userSelect.skintone}
                                </div>
                            :
                                <div>
                                    {
                                        choice.data.skin_tone.items.map((option, index) => (
                                            <div>
                                                <input
                                                    type="radio"
                                                    key={index}
                                                    name="skin_tone"
                                                    value={option}
                                                    checked={this.userSelect.skintone === option.name}
                                                    onClick={() => {
                                                        this.setState({ selectquestion3: false });
                                                        this.userSelect.skintone = option.name;
                                                        this.renderBarPercent();
                                                    }}
                                                />
                                                {option.name}
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <span>Skin Type</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion4
                            ?
                                <div onClick={() => this.setState({ selectquestion4: !this.state.selectquestion4 })}>
                                    {this.userSelect.skintype}
                                </div>
                            :
                                <div>
                                    {
                                        choice.data.skin_type.items.map((option, index) => (
                                            <div>
                                                <input
                                                    type="radio"
                                                    key={index}
                                                    name="skin_type"
                                                    value={option}
                                                    checked={this.userSelect.skin_type === option.name}
                                                    onClick={() => {
                                                        this.setState({ selectquestion4: false });
                                                        this.userSelect.skintype = option.name;
                                                        this.renderBarPercent();
                                                    }}
                                                />
                                                {option.name}
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <span>Skin Condition</span>
                    </div>
                    <div>
                        {
                            !this.state.selectquestion5
                            ?
                                <div onClick={() => this.setState({ selectquestion5: !this.state.selectquestion5 })}>
                                    {
                                        this.userSelect.skinconditionforshow.length
                                        ?
                                            <div>
                                                {
                                                    this.userSelect.skinconditionforshow.map((skincondition, index) => (
                                                        <span key={index}>{skincondition}</span>
                                                    ))
                                                }
                                            </div>
                                        :
                                            <span>{this.userSelect.defaultcondition}</span>
                                    }
                                </div>
                            :
                                <div>
                                    {
                                        choice.data.skin_problem.items.map((option, index) => (
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    key={index}
                                                    name="skin_condition"
                                                    value={option}
                                                    onClick={() => {
                                                        if (this.userSelect.skinconditionforshow.includes(option.name) > 0) {
                                                            this.userSelect.skinconditionforshow.splice(this.userSelect.skinconditionforshow.indexOf(option.name), 1);
                                                        } else {
                                                            this.userSelect.skinconditionforshow.push(option.name);
                                                        }
                                                        this.renderBarPercent();
                                                    }}
                                                />{option.name}
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </div>
                <input type="button" value="skip" onClick={() => alert('skip')} />
                <input
                    type="button"
                    value="done"
                    onClick={() => postchoice(this.userSelect)}
                />
            </div>
        );
    }

    render() {
        return (
            <div width="500px">
                <div>
                    <span>
                        Welcome! Let&#39;s build your beauty profile.<br />
                        You may edit it back under Profile &#62; Setting &#62; Personal Info.
                    </span>
                    <div style={{ border: '1px solid #ccc' }}>
                        <div style={{ color: '#000', backgroundColor: '#9e9e9e', height: '24px', width: `${this.state.bar}%` }}>wtf</div>
                    </div>
                </div>

                <Async promise={getchoice(this.firsttime)} firsttime={() => this.changeFirstTimeStatus()}>
                    <Async.Loading>
                        <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                    </Async.Loading>
                    <Async.Resolved>
                        {
                            () => (
                                <div>
                                    {this.renderPage()}
                                </div>
                            )
                        }
                    </Async.Resolved>
                    <Async.Rejected>
                        { console.error }
                    </Async.Rejected>
                </Async>
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
