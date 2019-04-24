/**
 *
 * FeedbackPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';

import makeSelectFeedbackPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { postFeedback } from './actions';
import Rate from '../../components/Rate';
import messages from './messages';

export class FeedbackPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        stateMark: null,
    }

    checkUserInput = () => {
        if (document.getElementById('feedback_comment').value.replace(/\s+/g, '').length <= 30) {
            document.getElementById('error_message').innerHTML = 'My Comment should contain at least 30 characters.';
            return;
        }
        if (!this.state.stateMark) {
            document.getElementById('error_message').innerHTML = '"rating" must be given !';
            return;
        }
        this.props.dispatch(
            postFeedback(
                document.getElementById('feedback_comment').value,
                document.getElementById('feedback_suggestproduct').value,
                this.state.stateMark
                )
        );
        window.location.reload();
    }

    renderFeedbackForm = () => (
        <div>
            <span><FormattedMessage {...messages.comment} /></span><span>*</span><br />
            <textarea rows="5" cols="60" id="feedback_comment" placeholder="How do you think about us?" /><br />
            <span>SUGGEST PRODUCT</span><br />
            <textarea rows="5" cols="60" id="feedback_suggestproduct" placeholder="I want Hermo to sell...?" /><br />
            <span>RATE US!</span><span>*</span>
            <Rate
                rating={-1}
                giveRate={(mark) => { this.setState({ stateMark: mark.mark }); }}
            />
            <input type="button" value="Confirm" onClick={() => this.checkUserInput()} />
            <input
                type="button"
                value="Cancel"
                onClick={() => {
                    document.getElementById('feedback_comment').value = '';
                    document.getElementById('feedback_suggestproduct').value = '';
                }}
            />
            <span id="error_message"></span>
        </div>
    )

    render() {
        return (
            <div>
                {this.renderFeedbackForm()}
            </div>
        );
    }
}

FeedbackPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    feedbackPage: makeSelectFeedbackPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'feedbackPage', reducer });
const withSaga = injectSaga({ key: 'feedbackPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(FeedbackPage);
