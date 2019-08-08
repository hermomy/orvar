
// import { fromJS } from 'immutable';
import profileOrderDetailReducer, { initialState } from '../reducer';

describe('profileOrderDetailReducer', () => {
    it('returns the initial state', () => {
        expect(profileOrderDetailReducer(initialState, {})).toEqual(initialState);
    });
});
