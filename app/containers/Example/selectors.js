import { createSelector } from 'reselect';

/**
 * Direct selector to the example state domain
 */
const selectExampleDomain = (state) => state.get('example');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Example
 */

const makeSelectExample = () => createSelector(
    selectExampleDomain,
    (substate) => substate.toJS()
);

export default makeSelectExample;
export {
    selectExampleDomain,
};
