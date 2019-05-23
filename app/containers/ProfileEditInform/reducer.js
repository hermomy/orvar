/*
 *
 * ProfileEditInform reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_USER_INFORM,
    GET_INFORM_CHOICE,
    GET_USER_ADDRESS,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    PUT_DATA,
    POST_ADDRESS,
} from './constants';

export const initialState = fromJS({});

function profileEditInformReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFORM:
            return state
                .set('loading', true)
                .set('success', false);
        case GET_INFORM_CHOICE:
            return state
                .set('loading', true)
                .set('success', false);
        case GET_USER_ADDRESS:
            return state
                .set('loading', true)
                .set('success', false);
        case GET_DATA_SUCCESS:
            return state
                .set('data', Object.assign({ ...state.get('data') }, action.payload))
                .set('loading', false)
                .set('success', true);
        case GET_DATA_FAIL:
            return state
                .set('loading', false)
                .set('success', false)
                .set('error', action.data);
        case PUT_DATA:
            return state
                .set('putLoading', true)
                .set('success', false);
        case POST_ADDRESS:
            return state
                .set('postLoading', true)
                .set('success', false);
        default:
            return state;
    }
}

export default profileEditInformReducer;
