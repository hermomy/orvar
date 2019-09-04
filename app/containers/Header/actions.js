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

export function layoutTopNavFail() {
    return {
        type: LAYOUT_TOP_NAV_FAIL,
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
export function getImgLinkFailed() {
    return {
        type: GET_IMG_LINK_FAILED,
    };
}
