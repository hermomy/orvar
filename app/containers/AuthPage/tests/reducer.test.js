
// import { fromJS } from 'immutable';
import authPageReducer, { initialState } from '../reducer';

describe('authPageReducer', () => {
    it('returns the initial state', () => {
        expect(authPageReducer(initialState, {})).toEqual(initialState);
    });
});
