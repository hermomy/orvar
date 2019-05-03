import { createSelector } from 'reselect';

/**
 * Direct selector to the profileEditInform state domain
 */
const selectProfileEditInformDomain = (state) => state.get('profileEditInform');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileEditInform
 */

const makeSelectProfileEditInform = () => createSelector(
    selectProfileEditInformDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileEditInform;
export {
    selectProfileEditInformDomain,
};
