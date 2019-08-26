
// import { fromJS } from 'immutable';
import brandPageReducer, { initialState } from '../reducer';

describe('brandPageReducer', () => {
    it('returns the initial state', () => {
        expect(brandPageReducer(initialState, {})).toEqual(initialState);
    });
});
