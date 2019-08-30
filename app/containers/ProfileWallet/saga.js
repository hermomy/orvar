import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_USER_DATA,
    GET_VOUCHER_DATA,
    GET_VOUCHER_DETAIL,
    GET_BALANCE_DATA,
    GET_POINT_DATA,
} from './constants';
import {
    getUserDataSuccess,
    getUserDataFailed,
    getVoucherDataSuccess,
    getVoucherDataFailed,
    getVoucherDetailSuccess,
    getVoucherDetailFailed,
    getBalanceDataSuccess,
    getBalanceDataFailed,
    getPointDataSuccess,
    getPointDataFailed,
} from './actions';

export function* getUserDataWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/profile');
        if (response && response.ok !== false) {
            yield put(getUserDataSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getUserDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getUserDataFailed(e));
    }
}

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

export function* getVoucherDetailWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/services/gami${action.voucherURL}`);

        if (response && response.ok !== false) {
            yield put(getVoucherDetailSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getVoucherDetailFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getVoucherDetailFailed(e));
    }
}

export function* getBalanceDataWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `profile/balance?page=${action.pageCount}&per-page=${action.rowsPerPage}`);

        if (response && response.ok !== false) {
            yield put(getBalanceDataSuccess(response));
            console.log(response);
        } else if (response && response.ok === false) {
            yield put(getBalanceDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getBalanceDataFailed(e));
    }
}

export function* getPointDataWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `profile/credit?page=${action.pageCount}&per-page=${action.rowsPerPage}`);

        if (response && response.ok !== false) {
            yield put(getPointDataSuccess(response));
            console.log(response);
        } else if (response && response.ok === false) {
            yield put(getPointDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getPointDataFailed(e));
    }
}

// Individual exports for testing
export default function* profileWalletSaga() {
    yield takeLatest(GET_USER_DATA, getUserDataWorker);
    yield takeLatest(GET_VOUCHER_DATA, getVoucherDataWorker);
    yield takeLatest(GET_VOUCHER_DETAIL, getVoucherDetailWorker);
    yield takeLatest(GET_BALANCE_DATA, getBalanceDataWorker);
    yield takeLatest(GET_POINT_DATA, getPointDataWorker);
}
