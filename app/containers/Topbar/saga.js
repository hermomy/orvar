// import { take, call, put, select } from 'redux-saga/effects';

import { call, put } from 'redux-saga/effects';
import { staticErrorResponse, request } from 'globalUtils';

import {
    fetchTopNavSuccess,
    fetchTopNavFailed,
} from './actions';

const API = {
    URL: `${process.env.API_URL}/layout/top-nav`,
    PARAMS: { method: 'GET', headers: { hertoken: '' } },
};

export function* getTopNavData(page) {
    const url = (page && typeof page.payload === 'number') ? `${API.URL}?page=${page.payload}` : API.URL;
    let err;

    try { // Trying the HTTP Request
        const response = yield call(request, url, API.PARAMS);
        if (response && response.success !== false) {
            yield put(fetchTopNavSuccess(response));
        } else if (response && response.success === false) {
            yield put(fetchTopNavFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        yield put(fetchTopNavFailed(e));
    }
}

export default function* topnavSaga() {
    // yield takeLatest(FETCH_TOP_NAV, getTopNavData);
}
