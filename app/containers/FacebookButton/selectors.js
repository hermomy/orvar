import { createSelector } from 'reselect';

/**
 * Direct selector to the facebookButton state domain
 */
const selectFacebookButtonDomain = (state) => state.get('facebookButton');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FacebookButton
 */

const makeSelectFacebookButton = () => createSelector(
    selectFacebookButtonDomain,
    (substate) => substate.toJS()
);

export default makeSelectFacebookButton;
export {
    selectFacebookButtonDomain,
};
