import { createSelector } from 'reselect';

/**
 * Direct selector to the beautyWall state domain
 */
const selectBeautyWallDomain = (state) => state.get('beautyWall');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BeautyWall
 */

const makeSelectBeautyWall = () => createSelector(
    selectBeautyWallDomain,
    (substate) => substate.toJS()
);

export default makeSelectBeautyWall;
export {
    selectBeautyWallDomain,
};
