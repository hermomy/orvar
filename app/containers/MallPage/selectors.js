import { createSelector } from 'reselect';

/**
 * Direct selector to the mallPage state domain
 */
const selectMallPageDomain = (state) => state.get('mallPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MallPage
 */

const makeSelectMallPage = () => createSelector(
    selectMallPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectMallPage;
export {
    selectMallPageDomain,
};
