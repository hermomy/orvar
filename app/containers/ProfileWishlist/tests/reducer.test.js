
import { fromJS } from 'immutable';
import profileWishlistReducer from '../reducer';

describe('profileWishlistReducer', () => {
    it('returns the initial state', () => {
        expect(profileWishlistReducer(undefined, {})).toEqual(fromJS({}));
    });
});
