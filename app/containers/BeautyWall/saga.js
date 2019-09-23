import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_REVIEW,
} from './constants';
import {
    getReviewSuccess,
    getReviewFailed,
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
// Individual exports for testing
export default function* beautyWallSaga() {
    yield takeLatest(GET_REVIEW, getReviewWorker);
}
