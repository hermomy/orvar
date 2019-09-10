
// import { fromJS } from 'immutable';
import homePageReducer, { initialState } from '../reducer';

describe('homePageReducer', () => {
    it('returns the initial state', () => {
        expect(homePageReducer(initialState, {})).toEqual(initialState);
    });
});
