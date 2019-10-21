/*
 *
 * GamesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_RESULT,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAILED,
} from './constants';

export const initialState = fromJS({
    result: {
        loading: false,
        error: false,
        success: false,
    },
});

function gamesPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RESULT:
            return state
                .setIn(['result', 'loading'], true)
                .setIn(['result', 'error'], false)
                .setIn(['result', 'success'], false)
                .setIn(['result', 'data'], null);
        case GET_RESULT_SUCCESS:
            return state
                .setIn(['result', 'loading'], false)
                .setIn(['result', 'error'], false)
                .setIn(['result', 'success'], true)
                .setIn(['result', 'data'], action.resultData);
        case GET_RESULT_FAILED:
            return state
                .setIn(['result', 'loading'], false)
                .setIn(['result', 'error'], true)
                .setIn(['result', 'data'], action.resultData);
        default:
            return state;
    }
}

export default gamesPageReducer;
