import { createSelector } from 'reselect';

/**
 * Direct selector to the profileOrder state domain
 */
const selectProfileOrderDomain = (state) => state.get('profileOrder');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileOrder
 */

const makeSelectProfileOrder = () => createSelector(
    selectProfileOrderDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileOrder;
export {
    selectProfileOrderDomain,
};
