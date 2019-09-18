import { createSelector } from 'reselect';

/**
 * Direct selector to the brandPage state domain
 */
const selectBrandPageDomain = (state) => state.get('brandPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BrandPage
 */

const makeSelectBrandPage = () => createSelector(
    selectBrandPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectBrandPage;
export {
    selectBrandPageDomain,
};
