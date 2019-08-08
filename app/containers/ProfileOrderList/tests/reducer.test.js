
// import { fromJS } from 'immutable';
import profileOrderListReducer, { initialState } from '../reducer';

describe('profileOrderListReducer', () => {
    it('returns the initial state', () => {
        expect(profileOrderListReducer(initialState, {})).toEqual(initialState);
    });
});
