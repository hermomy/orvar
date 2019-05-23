
// import { fromJS } from 'immutable';
import profileWholePageReducer, { initialState } from '../reducer';

describe('profileWholePageReducer', () => {
    it('returns the initial state', () => {
        expect(profileWholePageReducer(initialState, {})).toEqual(initialState);
    });
});
