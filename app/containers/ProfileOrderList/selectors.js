import { createSelector } from 'reselect';

/**
 * Direct selector to the profileOrderList state domain
 */
const selectProfileOrderListDomain = (state) => state.get('profileOrderList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileOrderList
 */

const makeSelectProfileOrderList = () => createSelector(
    selectProfileOrderListDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileOrderList;
export {
    selectProfileOrderListDomain,
};
