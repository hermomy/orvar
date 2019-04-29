
import {
    getWishlist,
    getWishlistSuccess,
    getWishlistFail,
    deleteWishlist,
} from '../actions';
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    DELETE_WISHLIST,
} from '../constants';

describe('getWishlist action', () => {
    it('has a type of GET_WISHLIST', () => {
        const expected = {
            type: GET_WISHLIST,
        };
        expect(getWishlist()).toEqual(expected);
    });
});

describe('getWishlistSuccess action', () => {
    it('has a type of GET_WISHLIST_SUCCESS', () => {
        const expected = {
            type: GET_WISHLIST_SUCCESS,
        };
        expect(getWishlistSuccess()).toEqual(expected);
    });
});

describe('getWishlistFail action', () => {
    it('has a type of GET_WISHLIST_FAIL', () => {
        const expected = {
            type: GET_WISHLIST_FAIL,
        };
        expect(getWishlistFail()).toEqual(expected);
    });
});

describe('deleteWishlist action', () => {
    it('has a type of DELETE_WISHLIST', () => {
        const expected = {
            type: DELETE_WISHLIST,
        };
        expect(deleteWishlist()).toEqual(expected);
    });
});
