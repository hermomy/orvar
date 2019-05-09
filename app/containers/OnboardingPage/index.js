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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectOnboardingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

export class OnboardingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        selectquestion1: false,
        selectquestion2: false,
        selectquestion3: false,

        page: 1,

        gender: 'Female',
        year: new Date(Date.now()).getUTCFullYear(),
        month: '01',
        day: '01',
        skintone: 'please select ONE option',
    }

    renderPage1 = () => {
        const monthList = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const thisyear = new Date(Date.now()).getUTCFullYear();
        return (
            <div>
                <div>
                    <span>Gender</span><br />
                    <div onClick={() => this.setState({ selectquestion1: !this.state.selectquestion1 })}>
                        {this.state.gender}
                    </div>
                    {
                        !this.state.selectquestion1
                        ?
                            <select onChange={(e) => this.setState({ selectquestion1: false, gender: e.target.value })}>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                        :
                        null
                    }
                </div>
                <div>
                    <span>Date of Birth</span><br />
                    <div onClick={() => this.setState({ selectquestion2: !this.state.selectquestion2 })}>
                        {`${this.state.day} / ${this.state.month} / ${this.state.year}`}
                    </div>

                    {
                        !this.state.selectquestion2
                        ?
                            <div>
                                <select value={'01'} onChange={(e) => this.setState({ day: e.target.value })}>
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
                                <select value={'01'} onChange={(e) => this.setState({ month: e.target.value })}>
                                    <option value="Month" disabled={true}>Month</option>
                                    {
                                        [...Array(12)].map((e, i) =>
                                            (
                                                <option key={i + 1} value={`${i + 1 < 10 ? `0${i + 1}` : i + 1}`} onClick={() => this.setState({ month: `${i + 1 < 10 ? `0${i + 1}` : i + 1}` })}>
                                                    {monthList[i + 1]}
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                                <select value={thisyear} onChange={(e) => this.setState({ year: e.target.value })}>
                                    <option value="Year" disabled={true}>Year</option>
                                    {
                                        [...Array(thisyear - 1918)].map((e, i) =>
                                            (
                                                <option key={thisyear - i} value={thisyear - i} onClick={() => this.setState({ year: thisyear - i })}>
                                                    { thisyear - i }
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                        :
                            null
                    }
                </div>
                <div>
                    {
                        !this.state.selectquestion3
                        ?
                            <div onClick={() => this.setState({ selectquestion3: !this.state.selectquestion3 })}>
                                {this.state.skintone}
                            </div>
                        :
                            <select onChange={(e) => this.setState({ selectquestion3: false, gender: e.target.value })}>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <span>
                        Welcome! Let&#39;s build your beauty profile.<br />
                        You may edit it back under Profile &#62; Setting &#62; Personal Info.
                    </span>
                    <div>
                        {
                            this.state.page === 1 ? this.renderPage1() : null
                        }
                    </div>
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
