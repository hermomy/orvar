import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, staticErrorResponse } from 'globalUtils';
import { notifySuccess, notifyError } from 'containers/Notify';

import {
    RESET_PASSWORD,
} from './constants';
import {
    resetPasswordSuccess,
    resetPasswordFailed,
} from './actions';

export function* resetWorker(action) {
    let err;
    const params = JSON.stringify({
        action: 'reset',
        email: action.resetData,
    });
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/password/reset', 'post', params);
        if (response && response.ok !== false) {
            yield put(resetPasswordSuccess(response.data));
            notifySuccess(response.data.messages[0].text);
        } else if (response && response.ok === false) {
            yield put(resetPasswordFailed(response.data));
            notifyError(response.data.messages[0].text);
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(resetPasswordFailed(e));
    }
}

// Individual exports for testing
export default function* authPageSaga() {
    yield takeLatest(RESET_PASSWORD, resetWorker);
}
