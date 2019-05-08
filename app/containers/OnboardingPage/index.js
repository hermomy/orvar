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
        gender: 'Female',
        selectquestion1: false,
        selectquestion2: false,
        page: 1,
    }

    renderPage1 = () => (
        <div>
            <div>
                <span>Gender</span><br />
                {
                    !this.state.selectquestion1
                    ?
                        <div onClick={() => this.setState({ selectquestion1: true })}>
                            {this.state.gender}
                        </div>
                    :
                        <select onChange={(e) => this.setState({ selectquestion1: false, gender: e.target.value })}>
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                }
            </div>
            <div>
                <span>Date of Birth</span><br />
                {
                    !this.state.selectquestion2
                    ?
                        <div onClick={() => this.setState({ selectquestion1: true })}>
                            {this.state.gender}
                        </div>
                    :
                        <select onChange={(e) => this.setState({ selectquestion1: false, gender: e.target.value })}>
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                }
            </div>
        </div>
    )

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
                            this.state.page === 1 ? this.renderPage1 : null
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
