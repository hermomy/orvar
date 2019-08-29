/*
 *
 * ProfileWallet reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_VOUCHER_DATA,
    GET_VOUCHER_DATA_SUCCESS,
    GET_VOUCHER_DATA_FAILED,
} from './constants';

export const initialState = fromJS({
    voucherData: null,
});

function profileWalletReducer(state = initialState, action) {
    switch (action.type) {
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
        default:
            return state;
    }
}

export default profileWalletReducer;
