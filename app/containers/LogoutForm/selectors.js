import { createSelector } from 'reselect';

/**
 * Direct selector to the logoutForm state domain
 */
const selectLogoutFormDomain = (state) => state.get('logoutForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LogoutForm
 */

const makeSelectLogoutForm = () => createSelector(
    selectLogoutFormDomain,
    (substate) => substate.toJS()
);

export default makeSelectLogoutForm;
export {
    selectLogoutFormDomain,
};
