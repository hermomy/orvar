import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, setCookie } from 'globalUtils';
import globalScope from 'globalScope';

import { AUTH_LOGIN } from './constants';
import {
    loginSuccess,
    loginFailed,
} from './actions';

export function* doLogin(action) {
    const { username, password } = action.payload;
    try {
        const base64 = require('base-64');
        const hash = base64.encode(`${username}:${password}`);
        const response = yield call(apiRequest, 'auth/token', 'post', {}, null, { headers: { 'Authorization': `Basic ${hash}` } });
        if (response && response.ok) {
            globalScope.token = response.data.token;
            const isAdminResponse = yield call(apiRequest, '/view/preview/145', 'post');
            globalScope.isAdmin = !!(isAdminResponse && isAdminResponse.data && isAdminResponse.data.id);
            if (globalScope.isAdmin) {
                globalScope.token = response.data.token;
                setCookie(process.env.TOKEN_KEY, globalScope.token);
                setCookie(process.env.ADMIN_KEY, globalScope.isAdmin);
                yield put(loginSuccess(response.data.token));
            } else {
                setCookie(process.env.TOKEN_KEY, globalScope.token);
                yield put(loginSuccess(response.data.token));
            }
        } else {
            yield put(loginFailed(response.data));
        }
    } catch (error) {
        yield put(loginFailed(error));
    }
}

export default function* authSaga() {
    yield takeLatest(AUTH_LOGIN, doLogin);
}
