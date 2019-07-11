import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_ORDER_LIST,
    GET_ORDER_DATA,
} from './constants';
import {
    getOrderListSuccess,
    getOrderListFailed,
    getOrderDataSuccess,
    getOrderDataFailed,
} from './actions';

export function* getOrderListWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/order');
        if (response && response.ok !== false) {
            yield put(getOrderListSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getOrderListFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getOrderListFailed(e));
    }
}

export function* getOrderDataWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/order/${action.orderID}`);
        if (response && response.ok !== false) {
            yield put(getOrderDataSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getOrderDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getOrderDataFailed(e));
    }
}

// Individual exports for testing
export default function* profileOrderDetailSaga() {
    yield takeLatest(GET_ORDER_LIST, getOrderListWorker);
    yield takeLatest(GET_ORDER_DATA, getOrderDataWorker);
}
