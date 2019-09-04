import { createSelector } from 'reselect';

/**
 * Direct selector to the profileRewards state domain
 */
const selectProfileRewardsDomain = (state) => state.get('profileRewards');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileRewards
 */

const makeSelectProfileRewards = () => createSelector(
    selectProfileRewardsDomain,
    (substate) => substate.toJS()
);

export default makeSelectProfileRewards;
export {
    selectProfileRewardsDomain,
};
