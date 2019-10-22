/*
 *
 * PerfectMatchGame actions
 *
 */

import {
    GET_GAME_TOKEN,
    GET_GAME_TOKEN_SUCCESS,
    GET_GAME_TOKEN_FAILED,
} from './constants';


export function getGameToken() {
    return {
        type: GET_GAME_TOKEN,
    };
}
export function getGameTokenSuccess(gameTokenData) {
    return {
        type: GET_GAME_TOKEN_SUCCESS,
        gameTokenData,
    };
}
export function getGameTokenFailed(gameTokenData) {
    return {
        type: GET_GAME_TOKEN_FAILED,
        gameTokenData,
    };
}
