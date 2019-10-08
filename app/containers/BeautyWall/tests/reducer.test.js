
// import { fromJS } from 'immutable';
import beautyWallReducer, { initialState } from '../reducer';

describe('beautyWallReducer', () => {
    it('returns the initial state', () => {
        expect(beautyWallReducer(initialState, {})).toEqual(initialState);
    });
});
