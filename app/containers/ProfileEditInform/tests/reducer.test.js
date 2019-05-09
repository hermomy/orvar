
// import { fromJS } from 'immutable';
import profileEditInformReducer, { initialState } from '../reducer';

describe('profileEditInformReducer', () => {
    it('returns the initial state', () => {
        expect(profileEditInformReducer(initialState, {})).toEqual(initialState);
    });
});
