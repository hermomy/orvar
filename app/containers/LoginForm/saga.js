import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, setCookie } from 'globalUtils';
import globalScope from 'globalScope';

import {
    AUTH_LOGIN,
    GET_IMAGE_LINK,
} from './constants';
import {
    loginSuccess,
    loginFailed,
    getImageLinkSuccess,
    getImageLinkFailed,
} from './actions';

export function* loginQuery(action) {
    try {
        const base64 = require('base-64');
        const hash = base64.encode(`${action.loginData.email}:${action.loginData.password}`);
        const response = yield call(apiRequest, 'auth/token', 'post', {}, 'https://api.hermo.my', { headers: { 'Authorization': `Basic ${hash}` } });
        if (response && response.ok) {
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            yield put(loginSuccess(response.data));
        } else {
            yield put(loginFailed(response.data));
        }
    } catch (error) {
        yield put(loginFailed(error));
    }
}
export function* imageLinkQuery() {
    const response = yield call(apiRequest, '/image?code=hershop-login', 'get');
    if (response && response.ok) {
        yield put(getImageLinkSuccess(response.data));
    } else {
        yield put(getImageLinkFailed(response.data));
    }
}
// Individual exports for testing
export default function* loginFormSaga() {
    yield takeLatest(AUTH_LOGIN, loginQuery);
    yield takeLatest(GET_IMAGE_LINK, imageLinkQuery);
}
