/*
 *
 * Header actions
 *
 */

import {
    LAYOUT_TOP_NAV,
    LAYOUT_TOP_NAV_SUCCESS,
    LAYOUT_TOP_NAV_FAIL,
    SEARCH_RESULT,
    SEARCH_RESULT_SUCCESS,
    SEARCH_RESULT_FAIL,
    GET_IMG_LINK,
    GET_IMG_LINK_SUCCESS,
    GET_IMG_LINK_FAILED,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_CART_DATA,
    GET_CART_DATA_SUCCESS,
    GET_CART_DATA_FAILED,
    ITEM_DELETE,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAIL,
} from './constants';

export function layoutTopNav() {
    return {
        type: LAYOUT_TOP_NAV,
    };
}

export function layoutTopNavSuccess(headerData) {
    return {
        type: LAYOUT_TOP_NAV_SUCCESS,
        headerData,
    };
}

export function layoutTopNavFail(headerData) {
    return {
        type: LAYOUT_TOP_NAV_FAIL,
        headerData,
    };
}

export function searchResult(keyword) {
    return {
        type: SEARCH_RESULT,
        keyword,
    };
}

export function searchResultSuccess(searchResultData) {
    return {
        type: SEARCH_RESULT_SUCCESS,
        searchResultData,
    };
}

export function searchResultFail(searchResultData) {
    return {
        type: SEARCH_RESULT_FAIL,
        searchResultData,
    };
}
export function getImgLink() {
    return {
        type: GET_IMG_LINK,
    };
}
export function getImgLinkSuccess(imgLink) {
    return {
        type: GET_IMG_LINK_SUCCESS,
        imgLink,
    };
}
export function getImgLinkFailed(imgLink) {
    return {
        type: GET_IMG_LINK_FAILED,
        imgLink,
    };
}
export function getUserData() {
    return {
        type: GET_USER_DATA,
    };
}
export function getUserDataSuccess(userData) {
    return {
        type: GET_USER_DATA_SUCCESS,
        userData,
    };
}
export function getUserDataFailed(userData) {
    return {
        type: GET_USER_DATA_FAILED,
        userData,
    };
}
export function getCartData() {
    return {
        type: GET_CART_DATA,
    };
}
export function getCartDataSuccess(cartData) {
    return {
        type: GET_CART_DATA_SUCCESS,
        cartData,
    };
}
export function getCartDataFailed(cartData) {
    return {
        type: GET_CART_DATA_FAILED,
        cartData,
    };
}

export function removeItemInCart(id) {
    return {
        type: ITEM_DELETE,
        id,
    };
}
export function removeItemInCartSuccess(itemUpdate) {
    return {
        type: ITEM_DELETE_SUCCESS,
        itemUpdate,
    };
}
export function removeItemInCartFail(itemUpdate) {
    return {
        type: ITEM_DELETE_FAIL,
        itemUpdate,
    };
}
