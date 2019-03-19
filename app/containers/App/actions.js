/*
 *
 * App actions
 *
 */

import {
    FETCH_CONFIG,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILED,
} from './constants';

export function fetchConfig() {
    return {
        type: FETCH_CONFIG,
    };
}

export function fetchConfigSuccess(response) {
    return {
        type: FETCH_CONFIG_SUCCESS,
        payload: response,
    };
}

export function fetchConfigFailed(response) {
    return {
        type: FETCH_CONFIG_FAILED,
        payload: response,
    };
}
