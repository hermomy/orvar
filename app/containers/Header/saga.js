import { takeLatest, call, put } from 'redux-saga/effects';
import {
    LAYOUT_TOP_NAV,
    SEARCH_RESULT,
    GET_IMG_LINK,
    GET_USER_DATA,
    GET_CART_DATA,
} from './constants';
import {
    layoutTopNavSuccess,
    layoutTopNavFail,
    searchResultSuccess,
    searchResultFail,
    getImgLinkSuccess,
    getImgLinkFailed,
    getUserDataSuccess,
    getUserDataFailed,
    getCartDataSuccess,
    getCartDataFailed,
} from './actions';
import { staticErrorResponse, apiRequest } from '../../globalUtils';

export function* getTopNav() {
    const response = yield call(apiRequest, '/layout/top-nav', 'get');
    if (response && response.ok) {
        yield put(layoutTopNavSuccess(response.data));
    } else {
        yield put(layoutTopNavFail(response.data));
    }
}

export function* querySearchResult(action) {
    const body = JSON.stringify({
        action: 'suggestion',
        keyword: action.keyword,
    });
    const response = yield call(apiRequest, 'search/suggestion', 'post', body);
    if (response && response.ok) {
        yield put(searchResultSuccess(response.data));
    } else {
        yield put(searchResultFail(response.data));
    }
}
export function* imgLinkQuery() {
    const response = yield call(apiRequest, '/image?code=hershop-signup', 'get');
    if (response && response.ok) {
        yield put(getImgLinkSuccess(response.data));
    } else {
        yield put(getImgLinkFailed(response.data));
    }
}
export function* getUserDataWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/profile');
        if (response && response.ok !== false) {
            yield put(getUserDataSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getUserDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getUserDataFailed(e));
    }
}
export function* getCartDataWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/cart');
        if (response && response.ok !== false) {
            yield put(getCartDataSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getCartDataFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getCartDataFailed(e));
    }
}

// Individual exports for testing
export default function* headerSaga() {
    yield takeLatest(LAYOUT_TOP_NAV, getTopNav);
    yield takeLatest(SEARCH_RESULT, querySearchResult);
    yield takeLatest(GET_IMG_LINK, imgLinkQuery);
    yield takeLatest(GET_USER_DATA, getUserDataWorker);
    yield takeLatest(GET_CART_DATA, getCartDataWorker);
}
