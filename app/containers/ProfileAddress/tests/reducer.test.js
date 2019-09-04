
// import { fromJS } from 'immutable';
import profileAddressReducer, { initialState } from '../reducer';

describe('profileAddressReducer', () => {
    it('returns the initial state', () => {
        expect(profileAddressReducer(initialState, {})).toEqual(initialState);
    });
});
