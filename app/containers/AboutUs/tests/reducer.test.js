
// import { fromJS } from 'immutable';
import aboutUsReducer, { initialState } from '../reducer';

describe('aboutUsReducer', () => {
    it('returns the initial state', () => {
        expect(aboutUsReducer(initialState, {})).toEqual(initialState);
    });
});
