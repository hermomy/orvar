
import {
    getWishlist,
} from '../actions';
import {
    GET_WISHLIST,
} from '../constants';

describe('ProfileWishlist actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_WISHLIST', () => {
            const expected = {
                type: GET_WISHLIST,
            };
            expect(getWishlist()).toEqual(expected);
        });
    });
});
