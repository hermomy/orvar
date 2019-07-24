import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_ORDER_LIST,
} from './constants';
import {
    getOrderListSuccess,
    getOrderListFailed,
} from './actions';

export function* getOrderListWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/order?page=${action.pageCount}&per-page=${action.orderCount}`);
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

// Individual exports for testing
export default function* profileOrderListSaga() {
    yield takeLatest(GET_ORDER_LIST, getOrderListWorker);
}
