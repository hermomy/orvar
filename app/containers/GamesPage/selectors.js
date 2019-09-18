import { createSelector } from 'reselect';

/**
 * Direct selector to the gamesPage state domain
 */
const selectGamesPageDomain = (state) => state.get('gamesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GamesPage
 */

const makeSelectGamesPage = () => createSelector(
    selectGamesPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectGamesPage;
export {
    selectGamesPageDomain,
};
