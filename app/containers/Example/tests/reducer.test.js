
// import { fromJS } from 'immutable';
import exampleReducer, { initialState } from '../reducer';

describe('exampleReducer', () => {
    it('returns the initial state', () => {
        expect(exampleReducer(initialState, {})).toEqual(initialState);
    });
});
