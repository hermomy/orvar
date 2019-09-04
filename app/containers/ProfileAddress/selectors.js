import { createSelector } from 'reselect';

/**
 * Direct selector to the profileAddress state domain
 */
const selectProfileAddressDomain = (state) => state.get('profileAddress');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileAddress
 */

const makeSelectProfileAddress = () => createSelector(
    selectProfileAddressDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileAddress;
export {
    selectProfileAddressDomain,
};
