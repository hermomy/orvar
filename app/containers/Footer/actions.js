/*
 *
 * Footer actions
 *
 */

import {
    GET_LAYOUT_FOOTER,
    GET_LAYOUT_FOOTER_SUCCESS,
    GET_LAYOUT_FOOTER_FAILED,
} from './constants';

export function getLayoutFooter() {
    return {
        type: GET_LAYOUT_FOOTER,
    };
}

export function getLayoutFooterSuccess(layoutFooterData) {
    return {
        type: GET_LAYOUT_FOOTER_SUCCESS,
        layoutFooterData,
    };
}
export function getLayoutFooterFailed(layoutFooterData) {
    return {
        type: GET_LAYOUT_FOOTER_FAILED,
        layoutFooterData,
    };
}
