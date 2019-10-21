/*
 *
 * GamesPage actions
 *
 */

import {
    GET_RESULT,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAILED,
} from './constants';

export function getResult(payload) {
    return {
        type: GET_RESULT,
        payload,
    };
}
export function getResultSuccess(resultData) {
    return {
        type: GET_RESULT_SUCCESS,
        resultData,
    };
}
export function getResultFailed(resultData) {
    return {
        type: GET_RESULT_FAILED,
        payload: resultData,
    };
}
