import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_VOUCHER_DATA,
} from './constants';
import {
    getVoucherDataSuccess,
    getVoucherDataFailed,
} from './actions';

export function* getVoucherDataWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/services/gami/vouchers?status=${action.status}&type=${action.filterType}`);

        if (response && response.ok !== false) {
            yield put(getVoucherDataSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getVoucherDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getVoucherDataFailed(e));
    }
}

// Individual exports for testing
export default function* profileWalletSaga() {
    yield takeLatest(GET_VOUCHER_DATA, getVoucherDataWorker);
}
