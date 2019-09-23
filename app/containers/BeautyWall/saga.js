import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_REVIEW,
    GET_ORDER,
} from './constants';
import {
    getReviewSuccess,
    getReviewFailed,
    getOrderSuccess,
    getOrderFailed,
} from './actions';
import { staticErrorResponse, apiRequest } from '../../globalUtils';

export function* getReviewWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, action.url || '/beauty-wall');
        if (response && response.ok !== false) {
            yield put(getReviewSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getReviewFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getReviewFailed(e));
    }
}
export function* getOrderWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/order/reviewable');
        if (response && response.ok !== false) {
            yield put(getOrderSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getOrderFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getOrderFailed(e));
    }
}
// Individual exports for testing
export default function* beautyWallSaga() {
    yield takeLatest(GET_REVIEW, getReviewWorker);
    yield takeLatest(GET_ORDER, getOrderWorker);
}
