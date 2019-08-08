import { createSelector } from 'reselect';

/**
 * Direct selector to the profileOrderDetail state domain
 */
const selectProfileOrderDetailDomain = (state) => state.get('profileOrderDetail');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileOrderDetail
 */

const makeSelectProfileOrderDetail = () => createSelector(
    selectProfileOrderDetailDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileOrderDetail;
export {
    selectProfileOrderDetailDomain,
};
