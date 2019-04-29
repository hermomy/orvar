import { createSelector } from 'reselect';

/**
 * Direct selector to the profileReview state domain
 */
const selectProfileReviewDomain = (state) => state.get('profileReview');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileReview
 */

const makeSelectProfileReview = () => createSelector(
    selectProfileReviewDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileReview;
export {
    selectProfileReviewDomain,
};
