import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_VOUCHER, GET_BALANCE, GET_PROFILE } from './constants';
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

export function* balanceDataWorker(action) {
    let res;

    if (action.pageNum) {
        res = yield call(apiRequest, `/profile/balance?page=${action.pageNum}`, 'get');
    } else {
        res = yield call(apiRequest, '/profile/balance', 'get');
    }

    if (res && res.ok) {
        yield put(getDataSuccess({ balanceData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

export function* profileDataWorker() {
    const res = yield call(apiRequest, '/profile', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ profileData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

// Individual exports for testing
export default function* profileWalletSaga() {
    yield [
        takeLatest(GET_VOUCHER, voucherDataWorker),
        takeLatest(GET_BALANCE, balanceDataWorker),
        takeLatest(GET_PROFILE, profileDataWorker),
    ];
}
