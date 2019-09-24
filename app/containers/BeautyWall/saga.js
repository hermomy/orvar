import { notifySuccess, notifyError } from 'containers/Notify';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_REVIEW,
    GET_ORDER,
    GET_REVIEW_DETAILS,
    POST_LIKE,
    POST_SHOWOFF,
} from './constants';
import {
    getReviewSuccess,
    getReviewFailed,
    getOrderSuccess,
    getOrderFailed,
    getReviewDetailsSuccess,
    getReviewDetailsFailed,
    postLikeSuccess,
    postLikeFailed,
    postShowOffSuccess,
    postShowOffFailed,
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
export function* getReviewDetailsWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/beauty-wall/${action.id}`);
        if (response && response.ok !== false) {
            yield put(getReviewDetailsSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getReviewDetailsFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getReviewDetailsFailed(e));
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
export function* postLikeWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/beauty-wall/${action.id}`, 'post');
        if (response && response.ok !== false) {
            yield put(postLikeSuccess(response.data));
            notifySuccess(response.data.messages[0].text);
        } else if (response && response.ok === false) {
            yield put(postLikeFailed(response.data));
            notifyError(response.data.messages[0].text);
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(postLikeFailed(e));
    }
}
export function* postShowOffWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/beauty-wall', 'post', action.data);
        if (response && response.ok !== false) {
            yield put(postShowOffSuccess(response.data));
            notifySuccess(response.data.messages[0].text);
        } else if (response && response.ok === false) {
            yield put(postShowOffFailed(response.data));
            notifyError(response.data.messages[0].text);
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(postShowOffFailed(e));
    }
}
// Individual exports for testing
export default function* beautyWallSaga() {
    yield takeLatest(GET_REVIEW, getReviewWorker);
    yield takeLatest(GET_REVIEW_DETAILS, getReviewDetailsWorker);
    yield takeLatest(GET_ORDER, getOrderWorker);
    yield takeLatest(POST_LIKE, postLikeWorker);
    yield takeLatest(POST_SHOWOFF, postShowOffWorker);
}
