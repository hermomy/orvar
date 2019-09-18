import { createSelector } from 'reselect';

/**
 * Direct selector to the profileEditInfo state domain
 */
const selectProfileEditInfoDomain = (state) => state.get('profileEditInfo');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileEditInfo
 */

const makeSelectProfileEditInfo = () => createSelector(
    selectProfileEditInfoDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileEditInfo;
export {
    selectProfileEditInfoDomain,
};
