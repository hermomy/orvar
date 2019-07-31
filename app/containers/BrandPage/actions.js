/*
 *
 * BrandPage actions
 *
 */

import {
    GET_BRAND_LIST,
    GET_BRAND_LIST_SUCCESS,
    GET_BRAND_LIST_FAIL,
} from './constants';

export function getBrandList() {
    return {
        type: GET_BRAND_LIST,
    };
}
export function getBrandListSuccess(brandList) {
    return {
        type: GET_BRAND_LIST_SUCCESS,
        brandList,
    };
}
export function getBrandListFail() {
    return {
        type: GET_BRAND_LIST_FAIL,
    };
}
