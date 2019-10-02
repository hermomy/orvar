import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, setCookie } from 'globalUtils';
import globalScope from 'globalScope';
import { AUTH_LOGIN } from './constants';
import {
    loginSuccess,
    loginFailed,
} from './actions';

export function* loginQuery(action) {
    try {
        const base64 = require('base-64');
        const hash = base64.encode(`${action.loginData.email}:${action.loginData.password}`);
        const response = yield call(apiRequest, 'auth/token', 'post', {}, null, { headers: { 'Authorization': `Basic ${hash}` } });
        if (response && response.ok) {
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            const response2 = yield call(apiRequest, '/profile');
            if (response2 && response2.ok) {
                globalScope.username = response2.data.username;
                yield put(loginSuccess(response.data));
            }
        } else {
            yield put(loginFailed(response.data));
        }
    } catch (error) {
        yield put(loginFailed(error));
    }
}

// Individual exports for testing
export default function* gamesPageSaga() {
    yield takeLatest(AUTH_LOGIN, loginQuery);
}
