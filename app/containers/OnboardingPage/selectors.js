import { createSelector } from 'reselect';

/**
 * Direct selector to the onboardingPage state domain
 */
const selectOnboardingPageDomain = (state) => state.get('onboardingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by OnboardingPage
 */

const makeSelectOnboardingPage = () => createSelector(
    selectOnboardingPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectOnboardingPage;
export {
    selectOnboardingPageDomain,
};
