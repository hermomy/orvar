import { createSelector } from 'reselect';

/**
 * Direct selector to the materialUiTesting state domain
 */
const selectMaterialUiTestingDomain = (state) => state.get('materialUiTesting');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MaterialUiTesting
 */

const makeSelectMaterialUiTesting = () => createSelector(
    selectMaterialUiTestingDomain,
    (substate) => substate.toJS()
);

export default makeSelectMaterialUiTesting;
export {
    selectMaterialUiTestingDomain,
};
