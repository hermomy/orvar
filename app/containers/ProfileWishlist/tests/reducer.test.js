
// import { fromJS } from 'immutable';
import profileWishlistReducer, { initialState } from '../reducer';

describe('profileWishlistReducer', () => {
    it('returns the initial state', () => {
        expect(profileWishlistReducer(initialState, {})).toEqual(initialState);
    });
});
