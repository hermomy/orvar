import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_ORDER_LIST,
    CONFIRM_ORDER,
    SUBMIT_REVIEW,
} from './constants';
import {
    getOrderListSuccess,
    getOrderListFailed,
    confirmOrderSuccess,
    confirmOrderFailed,
    submitReviewSuccess,
    submitReviewFailed,
} from './actions';

export function* getOrderListWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/order${action.urlParam}?page=${action.pageCount}&per-page=${action.orderCount}`);
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

export function* confirmOrderWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/order/${action.orderID}`, 'post', {
            id: action.orderID,
        });
        if (response && response.ok !== false) {
            yield put(confirmOrderSuccess(response));
        } else if (response && response.ok === false) {
            yield put(confirmOrderFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(confirmOrderFailed(e));
    }
}

export function* submitReviewWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/beauty-wall', 'post', {
            comment: action.comment,
            image: action.fileString,
            order_id: action.orderID,
        });

        if (response && response.ok !== false) {
            yield put(submitReviewSuccess(response));
        } else if (response && response.ok === false) {
            yield put(submitReviewFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(submitReviewFailed(e));
    }
}

// Individual exports for testing
export default function* profileOrderListSaga() {
    yield takeLatest(GET_ORDER_LIST, getOrderListWorker);
    yield takeLatest(CONFIRM_ORDER, confirmOrderWorker);
    yield takeLatest(SUBMIT_REVIEW, submitReviewWorker);
}
