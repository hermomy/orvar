/*
 *
 * ProfileAddress reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_CONFIGDATA,
    GET_CONFIGDATA_SUCCESS,
    GET_CONFIGDATA_FAILED,
    GET_ADDRESS,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILED,
    GET_ADDRESS_INFO,
    GET_ADDRESS_INFO_SUCCESS,
    GET_ADDRESS_INFO_FAILED,
    ADD_ADDRESS,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILED,
    UPDATE_ADDRESS,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILED,
    DELETE_ADDRESS,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILED,
} from './constants';

export const initialState = fromJS({
    configData: {
        loading: false,
        error: false,
        data: null,
    },
    addressList: {
        loading: false,
        error: false,
        data: null,
    },
    addressInfo: {
        success: false,
        loading: false,
        error: false,
        data: null,
    },
    addAddress: {
        success: false,
        loading: false,
    },
    updateAddress: {
        success: false,
        loading: false,
    },
    deleteAddress: {
        success: false,
        loading: false,
    },
    notification: null,
    error: false,
});

function profileAddressReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CONFIGDATA:
            return state
                .setIn(['configData', 'loading'], true)
                .setIn(['configData', 'error'], false);
        case GET_CONFIGDATA_SUCCESS:
            return state
                .setIn(['configData', 'loading'], false)
                .setIn(['configData', 'error'], false)
                .setIn(['configData', 'data'], action.data);
        case GET_CONFIGDATA_FAILED:
            return state
                .setIn(['configData', 'loading'], false)
                .setIn(['configData', 'error'], true)
                .setIn(['configData', 'data'], action.data);

        case GET_ADDRESS:
            return state
                .setIn(['addressList', 'loading'], true)
                .setIn(['addressList', 'error'], false);
        case GET_ADDRESS_SUCCESS:
            return state
                .setIn(['addressList', 'loading'], false)
                .setIn(['addressList', 'error'], false)
                .setIn(['addressList', 'data'], action.data);
        case GET_ADDRESS_FAILED:
            return state
                .setIn(['addressList', 'loading'], false)
                .setIn(['addressList', 'error'], true)
                .setIn(['addressList', 'data'], action.data);

        case GET_ADDRESS_INFO:
            return state
                .setIn(['addressInfo', 'success'], false)
                .setIn(['addressInfo', 'loading'], true)
                .setIn(['addressInfo', 'error'], false)
                .setIn(['addressInfo', 'data'], null);
        case GET_ADDRESS_INFO_SUCCESS:
            return state
                .setIn(['addressInfo', 'success'], true)
                .setIn(['addressInfo', 'loading'], false)
                .setIn(['addressInfo', 'error'], false)
                .setIn(['addressInfo', 'data'], action.data);
        case GET_ADDRESS_INFO_FAILED:
            return state
                .setIn(['addressInfo', 'success'], false)
                .setIn(['addressInfo', 'loading'], false)
                .setIn(['addressInfo', 'error'], true)
                .setIn(['addressInfo', 'data'], action.data);

        case ADD_ADDRESS:
            return state
                .setIn(['addAddress', 'success'], false)
                .setIn(['addAddress', 'loading'], true)
                .set('error', false);
        case ADD_ADDRESS_SUCCESS:
            return state
                .setIn(['addAddress', 'success'], true)
                .setIn(['addAddress', 'loading'], false)
                .set('error', false)
                .set('notification', {
                    type: 'success',
                    message: action.message,
                });
        case ADD_ADDRESS_FAILED:
            return state
                .setIn(['addAddress', 'success'], false)
                .setIn(['addAddress', 'loading'], false)
                .set('error', true)
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });

        case UPDATE_ADDRESS:
            return state
                .setIn(['updateAddress', 'success'], false)
                .setIn(['updateAddress', 'loading'], true)
                .set('error', false);
        case UPDATE_ADDRESS_SUCCESS:
            return state
                .setIn(['updateAddress', 'success'], true)
                .setIn(['updateAddress', 'loading'], false)
                .set('error', false)
                .set('notification', {
                    type: 'success',
                    message: action.message,
                });
        case UPDATE_ADDRESS_FAILED:
            return state
                .setIn(['updateAddress', 'success'], false)
                .setIn(['updateAddress', 'loading'], false)
                .set('error', true)
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });

        case DELETE_ADDRESS:
            return state
                .setIn(['deleteAddress', 'success'], false)
                .setIn(['deleteAddress', 'loading'], true)
                .set('error', false);
        case DELETE_ADDRESS_SUCCESS:
            return state
                .setIn(['deleteAddress', 'success'], true)
                .setIn(['deleteAddress', 'loading'], false)
                .set('error', false)
                .set('notification', {
                    type: 'success',
                    message: action.message,
                });
        case DELETE_ADDRESS_FAILED:
            return state
                .setIn(['deleteAddress', 'success'], false)
                .setIn(['deleteAddress', 'loading'], false)
                .set('error', true)
                .set('notification', {
                    type: 'fail',
                    message: action.message,
                });
        default:
            return state;
    }
}

export default profileAddressReducer;
