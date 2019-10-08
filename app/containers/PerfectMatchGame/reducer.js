/*
 *
 * PerfectMatchGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_GAME_TOKEN,
    GET_GAME_TOKEN_SUCCESS,
    GET_GAME_TOKEN_FAILED,
} from './constants';

export const initialState = fromJS({
    gameToken: {
        loading: false,
        error: false,
        success: false,
    },
});

function perfectMatchGameReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAME_TOKEN:
            return state
                .setIn(['gameToken', 'loading'], true)
                .setIn(['gameToken', 'error'], false)
                .setIn(['gameToken', 'success'], false)
                .setIn(['gameToken', 'data'], null);
        case GET_GAME_TOKEN_SUCCESS:
            return state
                .setIn(['gameToken', 'loading'], false)
                .setIn(['gameToken', 'error'], false)
                .setIn(['gameToken', 'success'], true)
                .setIn(['gameToken', 'data'], action.gameTokenData);
        case GET_GAME_TOKEN_FAILED:
            return state
                .setIn(['gameToken', 'loading'], false)
                .setIn(['gameToken', 'error'], true)
                .setIn(['gameToken', 'success'], false)
                .setIn(['gameToken', 'data'], action.gameTokenData);
        default:
            return state;
    }
}

export default perfectMatchGameReducer;
