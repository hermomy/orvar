/*
 *
 * Header actions
 *
 */

import {
    LAYOUT_TOP_NAV,
    LAYOUT_TOP_NAV_SUCCESS,
    LAYOUT_TOP_NAV_FAIL,
} from './constants';

export function layoutTopNav() {
    return {
        type: LAYOUT_TOP_NAV,
    };
}

export function layoutTopNavSuccess(response) {
    return {
        type: LAYOUT_TOP_NAV_SUCCESS,
        response,
    };
}

export function layoutTopNavFail() {
    return {
        type: LAYOUT_TOP_NAV_FAIL,
    };
}
