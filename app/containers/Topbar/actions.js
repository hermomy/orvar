/*
 *
 * Topbar actions
 *
 */

import {
    FETCH_TOP_NAV,
    FETCH_TOP_NAV_SUCCESS,
    FETCH_TOP_NAV_FAILED,
} from './constants';

export function fetchTopNav() {
    return {
        type: FETCH_TOP_NAV,
    };
}

export function fetchTopNavSuccess(response) {
    return {
        type: FETCH_TOP_NAV_SUCCESS,
        payload: response,
    };
}

export function fetchTopNavFailed(response) {
    return {
        type: FETCH_TOP_NAV_FAILED,
        payload: response,
    };
}
