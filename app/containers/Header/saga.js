import { takeLatest, call, put } from 'redux-saga/effects';
import { LAYOUT_TOP_NAV, SEARCH_RESULT } from './constants';
import { layoutTopNavSuccess, layoutTopNavFail, searchResultSuccess, searchResultFail } from './actions';
import { apiRequest } from '../../globalUtils';

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
    const response = yield call(apiRequest, '/search/suggestion', 'post', body);
    if (response && response.ok) {
        yield put(searchResultSuccess(response.data));
    } else {
        yield put(searchResultFail(response.data));
    }
}

// Individual exports for testing
export default function* headerSaga() {
    yield takeLatest(LAYOUT_TOP_NAV, getTopNav);
    yield takeLatest(SEARCH_RESULT, querySearchResult);
}
