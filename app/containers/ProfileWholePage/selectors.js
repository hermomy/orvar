import { createSelector } from 'reselect';

/**
 * Direct selector to the profileWholePage state domain
 */
const selectProfileWholePageDomain = (state) => state.get('profileWholePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileWholePage
 */

const makeSelectProfileWholePage = () => createSelector(
    selectProfileWholePageDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileWholePage;
export {
    selectProfileWholePageDomain,
};
