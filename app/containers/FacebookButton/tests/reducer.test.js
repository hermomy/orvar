
// import { fromJS } from 'immutable';
import facebookButtonReducer, { initialState } from '../reducer';

describe('facebookButtonReducer', () => {
    it('returns the initial state', () => {
        expect(facebookButtonReducer(initialState, {})).toEqual(initialState);
    });
});
