import { createSelector } from 'reselect';

/**
 * Direct selector to the herListing state domain
 */
const selectHerListingDomain = (state) => state.get('herListing');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HerListing
 */

const makeSelectHerListing = () => createSelector(
    selectHerListingDomain,
    (substate) => substate.toJS()
);

export default makeSelectHerListing;
export {
    selectHerListingDomain,
};
