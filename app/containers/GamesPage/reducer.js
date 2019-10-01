/*
 *
 * GamesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
} from './constants';

export const initialState = fromJS({
    login: {
        loading: false,
        error: false,
        success: false,
    },
});

function gamesPageReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return state
                .setIn(['login', 'loading'], true)
                .setIn(['login', 'error'], false);
        case AUTH_LOGIN_SUCCESS:
            return state
                .setIn(['login', 'loading'], false)
                .setIn(['login', 'error'], false)
                .setIn(['login', 'success'], true)
                .setIn(['login', 'data'], action.data);
        case AUTH_LOGIN_FAILED:
            return state
                .setIn(['login', 'loading'], false)
                .setIn(['login', 'error'], true)
                .setIn(['login', 'data'], action.data);
        default:
            return state;
    }
}

export default gamesPageReducer;
