
// import { fromJS } from 'immutable';
import loginFormReducer, { initialState } from '../reducer';

describe('loginFormReducer', () => {
    it('returns the initial state', () => {
        expect(loginFormReducer(initialState, {})).toEqual(initialState);
    });
});
