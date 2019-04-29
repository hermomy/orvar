import { createSelector } from 'reselect';

/**
 * Direct selector to the profileWishlist state domain
 */
const selectProfileWishlistDomain = (state) => state.get('profileWishlist');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileWishlist
 */

const makeSelectProfileWishlist = () => createSelector(
    selectProfileWishlistDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileWishlist;
export {
    selectProfileWishlistDomain,
};
