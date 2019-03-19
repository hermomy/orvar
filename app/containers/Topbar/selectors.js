import { createSelector } from 'reselect';

/**
 * Direct selector to the Topbar state domain
 */
const selectTopbarDomain = (state) => state.get('topbar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Topbar
 */

const makeSelectTopbarLoading = () => createSelector(
    selectTopbarDomain,
    (substate) => substate.get('loading')
);

const makeSelectTopbarError = () => createSelector(
    selectTopbarDomain,
    (substate) => substate.get('error')
);

const makeSelectTopNav = () => createSelector(
    selectTopbarDomain,
    (substate) => substate.get('topNav')
);

export {
    selectTopbarDomain,
    makeSelectTopbarLoading,
    makeSelectTopbarError,
    makeSelectTopNav,
};
