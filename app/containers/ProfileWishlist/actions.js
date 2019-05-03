/*
 *
 * ProfileWishlist actions
 *
 */
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    DELETE_WISHLIST,
} from './constants';

export function getWishlist(targetpage) {
    return {
        type: GET_WISHLIST,
        targetpage,
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

export function deleteWishlist(productId, pageNumber) {
    return {
        type: DELETE_WISHLIST,
        productId,
        pageNumber,
    };
}
