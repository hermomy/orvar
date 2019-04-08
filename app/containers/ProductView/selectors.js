import { createSelector } from 'reselect';

/**
 * Direct selector to the productView state domain
 */
const selectProductViewDomain = (state) => state.get('productView');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductView
 */

const makeSelectProductView = () => createSelector(
    selectProductViewDomain,
    (substate) => substate.toJS()
);

export default makeSelectProductView;
export {
    selectProductViewDomain,
};
