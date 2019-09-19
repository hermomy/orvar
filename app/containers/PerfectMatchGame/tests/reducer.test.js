
// import { fromJS } from 'immutable';
import perfectMatchGameReducer, { initialState } from '../reducer';

describe('perfectMatchGameReducer', () => {
    it('returns the initial state', () => {
        expect(perfectMatchGameReducer(initialState, {})).toEqual(initialState);
    });
});
