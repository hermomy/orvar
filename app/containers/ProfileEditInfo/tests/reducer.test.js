
// import { fromJS } from 'immutable';
import profileEditInfoReducer, { initialState } from '../reducer';

describe('profileEditInfoReducer', () => {
    it('returns the initial state', () => {
        expect(profileEditInfoReducer(initialState, {})).toEqual(initialState);
    });
});
