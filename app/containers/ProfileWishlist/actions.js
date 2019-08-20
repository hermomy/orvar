/*
 *
 * ProfileWishlist actions
 *
 */
import {
    GET_WISHLIST,
    GET_WISHLIST_SUCCESS,
    GET_WISHLIST_FAILED,
    DELETE_WISHLIST_ITEM,
    DELETE_WISHLIST_ITEM_SUCCESS,
    DELETE_WISHLIST_ITEM_FAILED,
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILED,
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

export function deleteWishlistItem({ orderID, successCallback }) {
    return {
        type: DELETE_WISHLIST_ITEM,
        orderID,
        successCallback,
    };
}

export function deleteWishlistItemSuccess(message) {
    return {
        type: DELETE_WISHLIST_ITEM_SUCCESS,
        message,
    };
}

export function deleteWishlistItemFailed(message) {
    return {
        type: DELETE_WISHLIST_ITEM_FAILED,
        message,
    };
}

export function addToCart({ orderID }) {
    return {
        type: ADD_TO_CART,
        orderID,
    };
}

export function addToCartSuccess(message) {
    return {
        type: ADD_TO_CART_SUCCESS,
        message,
    };
}

export function addToCartFailed(message) {
    return {
        type: ADD_TO_CART_FAILED,
        message,
    };
}
