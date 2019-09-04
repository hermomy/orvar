/*
 *
 * ProfileWallet reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_VOUCHER_DATA,
    GET_VOUCHER_DATA_SUCCESS,
    GET_VOUCHER_DATA_FAILED,
    GET_VOUCHER_DETAIL,
    GET_VOUCHER_DETAIL_SUCCESS,
    GET_VOUCHER_DETAIL_FAILED,
    GET_BALANCE_DATA,
    GET_BALANCE_DATA_SUCCESS,
    GET_BALANCE_DATA_FAILED,
    GET_POINT_DATA,
    GET_POINT_DATA_SUCCESS,
    GET_POINT_DATA_FAILED,
} from './constants';

export const initialState = fromJS({
    userData: null,
    voucherData: null,
    voucherDetail: null,
    balanceData: null,
    balanceMeta: null,
    pointData: null,
    pointMeta: null,
    loading: false,
});

function profileWalletReducer(state = initialState, action) {
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
        case GET_VOUCHER_DATA:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_VOUCHER_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('voucherData', action.data.data);
        case GET_VOUCHER_DATA_FAILED:
            return state
                .set('error', action.data.data)
                .set('loading', false)
                .set('voucherData', null);
        case GET_VOUCHER_DETAIL:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_VOUCHER_DETAIL_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('voucherDetail', action.data.data);
        case GET_VOUCHER_DETAIL_FAILED:
            return state
                .set('error', action.data.data)
                .set('loading', false)
                .set('voucherDetail', null);
        case GET_BALANCE_DATA:
            return state
                .set('error', false)
                .set('balanceLoading', true);
        case GET_BALANCE_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('balanceLoading', false)
                .set('balanceData', action.data.items)
                .set('balanceMeta', action.data._meta);
        case GET_BALANCE_DATA_FAILED:
            return state
                .set('error', action.data.items)
                .set('balanceLoading', false)
                .set('balanceData', null)
                .set('balanceMeta', null);
        case GET_POINT_DATA:
            return state
                .set('error', false)
                .set('pointLoading', true);
        case GET_POINT_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('pointLoading', false)
                .set('pointData', action.data.items)
                .set('pointMeta', action.data._meta);
        case GET_POINT_DATA_FAILED:
            return state
                .set('error', action.data.items)
                .set('pointLoading', false)
                .set('pointData', null)
                .set('pointMeta', null);
        default:
            return state;
    }
}

export default profileWalletReducer;
