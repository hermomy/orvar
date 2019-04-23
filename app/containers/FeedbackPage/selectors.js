import { createSelector } from 'reselect';

/**
 * Direct selector to the feedbackPage state domain
 */
const selectFeedbackPageDomain = (state) => state.get('feedbackPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FeedbackPage
 */

const makeSelectFeedbackPage = () => createSelector(
    selectFeedbackPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectFeedbackPage;
export {
    selectFeedbackPageDomain,
};
