/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_HOME_BANNER,
    GET_HOME_BANNER_SUCCESS,
    GET_HOME_BANNER_FAILED,
    GET_FLAGSHIP,
    GET_FLAGSHIP_SUCCESS,
    GET_FLAGSHIP_FAILED,
} from './constants';

export const initialState = fromJS({
    banner: {
        loading: false,
        error: false,
        data: null,
    },
    flagship: {
        loading: false,
        error: false,
        data: null,
    },
});

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOME_BANNER:
            return state
                .setIn(['banner', 'loading'], true)
                .setIn(['banner', 'error'], false)
                .setIn(['banner', 'data'], null);
        case GET_HOME_BANNER_SUCCESS:
            return state
                .setIn(['banner', 'loading'], false)
                .setIn(['banner', 'error'], false)
                .setIn(['banner', 'data'], action.bannerData);
        case GET_HOME_BANNER_FAILED:
            return state
                .setIn(['banner', 'loading'], false)
                .setIn(['banner', 'error'], true)
                .setIn(['banner', 'data'], action.bannerData);
        case GET_FLAGSHIP:
            return state
                .setIn(['flagship', 'loading'], true)
                .setIn(['flagship', 'error'], false)
                .setIn(['flagship', 'data'], null);
        case GET_FLAGSHIP_SUCCESS:
            return state
                .setIn(['flagship', 'loading'], false)
                .setIn(['flagship', 'error'], false)
                .setIn(['flagship', 'data'], action.flagshipData);
        case GET_FLAGSHIP_FAILED:
            return state
                .setIn(['flagship', 'loading'], false)
                .setIn(['flagship', 'error'], true)
                .setIn(['flagship', 'data'], action.flagshipData);
        default:
            return state;
    }
}

export default homePageReducer;
