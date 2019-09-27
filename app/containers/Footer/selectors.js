import { createSelector } from 'reselect';

/**
 * Direct selector to the footer state domain
 */
const selectFooterDomain = (state) => state.get('footer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Footer
 */

const makeSelectFooter = () => createSelector(
    selectFooterDomain,
    (substate) => substate.toJS()
);

export default makeSelectFooter;
export {
    selectFooterDomain,
};
