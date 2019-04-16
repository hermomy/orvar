import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_VOUCHER } from './constants';
import { getDataSuccess, getDataFail } from './actions';

export function* voucherDataWorker(action) {
    let res;

    if (action.pageNum) {
        res = yield call(apiRequest, `/voucher?${action.usage}${action.usage === '' ? '&' : ''}page=${action.pageNum}`, 'get');
    } else {
        res = yield call(apiRequest, `/voucher?${action.usage}`, 'get');
    }

    if (res && res.ok) {
        yield put(getDataSuccess({ walletData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

// Individual exports for testing
export default function* profileWalletSaga() {
    yield takeLatest(GET_VOUCHER, voucherDataWorker);
}
