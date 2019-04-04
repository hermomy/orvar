import { call, put, takeLatest } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';
import globalScope from 'globalScope';

import {
    FETCH_CONFIG,
} from './constants';

import {
    fetchConfigSuccess,
    fetchConfigFailed,
} from './actions';

const API = {
    URL: `${process.env.API_URL}/common/config`,
    PARAMS: { method: 'GET', headers: { hertoken: '' } },
};

export function* getConfigData() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, API.URL, API.PARAMS);
        if (response && response.ok !== false) {
            globalScope.config = response.data;
            yield put(fetchConfigSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(fetchConfigFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        yield put(fetchConfigFailed(e));
    }
}

export default function* appSaga() {
    yield takeLatest(FETCH_CONFIG, getConfigData);
}
