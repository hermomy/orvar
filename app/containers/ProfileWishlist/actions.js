/*
 *
 * ProfileWishlist actions
 *
 */
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
} from './constants';

export function getWishlist() {
    return {
        type: GET_WISHLIST,
    };
}

export function getWishlistSuccess(res) {
    return {
        type: GET_WISHLIST_SUCCESS,
        payload: res,
    };
}

export function getWishlistFail(res) {
    return {
        type: GET_WISHLIST_FAIL,
        error: res,
    };
}
