import { createSelector } from 'reselect';

/**
 * Direct selector to the profileWallet state domain
 */
const selectProfileWalletDomain = (state) => state.get('profileWallet');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileWallet
 */

const makeSelectProfileWallet = () => createSelector(
    selectProfileWalletDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileWallet;
export {
    selectProfileWalletDomain,
};
