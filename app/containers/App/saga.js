import { call, put, takeLatest } from 'redux-saga/effects';
import { staticErrorResponse, request } from 'globalUtils';

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
        const response = yield call(request, API.URL, API.PARAMS);
        if (response && response.success !== false) {
            yield put(fetchConfigSuccess(response));
        } else if (response && response.success === false) {
            yield put(fetchConfigFailed(response));
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
