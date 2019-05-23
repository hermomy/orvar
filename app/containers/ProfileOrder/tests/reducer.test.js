
// import { fromJS } from 'immutable';
import profileOrderReducer, { initialState } from '../reducer';

describe('profileOrderReducer', () => {
    it('returns the initial state', () => {
        expect(profileOrderReducer(initialState, {})).toEqual(initialState);
    });
});
