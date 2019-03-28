/*
 *
 * HerListing actions
 *
 */

import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    GET_PAGE,
    GET_PAGE_SUCCESS,
    GET_PAGE_FAIL,
} from './constants';

export function getData() {
    return {
        type: GET_DATA,
    };
}

export function getDataSuccess(payload) {
    return {
        type: GET_DATA_SUCCESS,
        payload,
    };
}

export function getDataFail(error) {
    return {
        type: GET_DATA_FAIL,
        error,
    };
}

export function getPage(api) {
    return {
        type: GET_PAGE,
        api,
    };
}

export function getPageSuccess(data) {
    return {
        type: GET_PAGE_SUCCESS,
        data,
    };
}

export function getPageFail() {
    return {
        type: GET_PAGE_FAIL,
    };
}
