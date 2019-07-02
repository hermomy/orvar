/*
 *
 * ProfileEditInfo reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_COMMON_CONFIG,
    GET_COMMON_CONFIG_SUCCESS,
    GET_COMMON_CONFIG_FAILED,
    CHANGE_PROPS,
    UPDATE_AVATAR,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILED,
    CHANGE_PROPS_AND_UPDATE,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
} from './constants';

export const initialState = fromJS({
    userData: null,
    commonConfig: null,
});

function profileEditInfoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_USER_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('userData', action.data);
        case GET_USER_DATA_FAILED:
            return state
                .set('error', action.data)
                .set('loading', false)
                .set('userData', null);
        case GET_COMMON_CONFIG:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_COMMON_CONFIG_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('commonConfig', action.data);
        case GET_COMMON_CONFIG_FAILED:
            return state
                .set('error', action.data)
                .set('loading', false)
                .set('commonConfig', null);
        case CHANGE_PROPS:
            return state
                .set(action.objKey, fromJS(state.get(action.objKey) || {}).setIn(action.dataPath, action.value).toJS());
        case CHANGE_PROPS_AND_UPDATE:
            return state
                .set(action.objKey, fromJS(state.get(action.objKey) || {}).setIn(action.dataPath, action.value).toJS());
        case UPDATE_AVATAR:
            return state
                .set('updatingAvatar', true);
        case UPDATE_AVATAR_SUCCESS:
            return state
                .set('updatingAvatar', false)
                .set('notification', {
                    type: 'success',
                    message: action.message,
                })
                .set('userData', action.userData);
        case UPDATE_AVATAR_FAILED:
            return state
                .set('updatingAvatar', false)
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });
        case UPDATE_PASSWORD:
            return state
                .set('updatingPassword', true);
        case UPDATE_PASSWORD_SUCCESS:
            return state
                .set('notification', {
                    type: 'success',
                    message: action.message,
                });
        case UPDATE_PASSWORD_FAILED:
            return state
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });
        case UPDATE_USER_DATA_SUCCESS:
            return state
                .set('notification', {
                    type: 'success',
                    message: action.message,
                });
        case UPDATE_USER_DATA_FAILED:
            return state
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                })
                .set('userData', action.userData);
        default:
            return state;
    }
}

export default profileEditInfoReducer;
