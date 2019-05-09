
// import { fromJS } from 'immutable';
import profileWalletReducer, { initialState } from '../reducer';

describe('profileWalletReducer', () => {
    it('returns the initial state', () => {
        expect(profileWalletReducer(initialState, {})).toEqual(initialState);
    });
});
