/*
 *
 * ProfileWishlist actions
 *
 */
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILED,
} from './constants';

export function getWishlist() {
    return {
        type: GET_WISHLIST,
    };
}

export function getWishlistSuccess(response) {
    return {
        type: GET_WISHLIST_SUCCESS,
        data: response.data,
    };
}

export function getWishlistFailed(response) {
    return {
        type: GET_WISHLIST_FAILED,
        data: response.data,
    };
}
