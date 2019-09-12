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
    GET_TWOH,
    GET_TWOH_SUCCESS,
    GET_TWOH_FAILED,
    GET_NEW_ARRIVAL,
    GET_NEW_ARRIVAL_SUCCESS,
    GET_NEW_ARRIVAL_FAILED,
} from './constants';

export const initialState = fromJS({
    banner: {
        loading: false,
        error: false,
    },
    flagship: {
        loading: false,
        error: false,
    },
    twoh: {
        loading: false,
        error: false,
        success: false,
    },
    newArrival: {
        loading: false,
        error: false,
        success: false,
    },
});

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOME_BANNER:
            return state
                .setIn(['banner', 'loading'], true)
                .setIn(['banner', 'error'], false);
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
                .setIn(['flagship', 'error'], false);
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
        case GET_TWOH:
            return state
                .setIn(['twoh', 'loading'], true)
                .setIn(['twoh', 'error'], false);
        case GET_TWOH_SUCCESS:
            return state
                .setIn(['twoh', 'success'], true)
                .setIn(['twoh', 'loading'], false)
                .setIn(['twoh', 'error'], false)
                .setIn(['twoh', 'data'], action.twohData);
        case GET_TWOH_FAILED:
            return state
                .setIn(['twoh', 'loading'], false)
                .setIn(['twoh', 'error'], true)
                .setIn(['twoh', 'data'], action.twohData);
        case GET_NEW_ARRIVAL:
            return state
                .setIn(['newArrival', 'loading'], true)
                .setIn(['newArrival', 'error'], false);
        case GET_NEW_ARRIVAL_SUCCESS:
            return state
                .setIn(['newArrival', 'success'], true)
                .setIn(['newArrival', 'loading'], false)
                .setIn(['newArrival', 'error'], false)
                .setIn(['newArrival', 'data'], action.newArrivalData);
        case GET_NEW_ARRIVAL_FAILED:
            return state
                .setIn(['newArrival', 'loading'], false)
                .setIn(['newArrival', 'error'], true)
                .setIn(['newArrival', 'data'], action.newArrivalData);
        default:
            return state;
    }
}

export default homePageReducer;
