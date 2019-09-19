import { createSelector } from 'reselect';

/**
 * Direct selector to the perfectMatchGame state domain
 */
const selectPerfectMatchGameDomain = (state) => state.get('perfectMatchGame');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PerfectMatchGame
 */

const makeSelectPerfectMatchGame = () => createSelector(
    selectPerfectMatchGameDomain,
    (substate) => substate.toJS()
);

export default makeSelectPerfectMatchGame;
export {
    selectPerfectMatchGameDomain,
};
