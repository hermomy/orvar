import { takeLatest, call, put } from 'redux-saga/effects';
import globalScope from 'globalScope';
import { staticErrorResponse, apiRequest, setCookie } from '../../globalUtils';
import {
    FACEBOOK_AUTH,
} from './constants';
import {
    postFbSuccess,
    postFbFailed,
} from './actions';

export function* postFbWorker(action) {
    let err;
    const { id, token, email } = action.payload;
    const body = JSON.stringify({
        id,
        token,
        email,
    });
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/facebook', 'post', body);
        if (response && response.ok !== false) {
            yield put(postFbSuccess(response));
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
        } else if (response && response.ok === false) {
            yield put(postFbFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(postFbFailed(e));
    }
}

// Individual exports for testing
export default function* facebookButtonSaga() {
    yield takeLatest(FACEBOOK_AUTH, postFbWorker);
}
