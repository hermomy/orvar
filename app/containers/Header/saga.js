import { takeLatest, call, put } from 'redux-saga/effects';
import { LAYOUT_TOP_NAV } from './constants';
import { layoutTopNavSuccess, layoutTopNavFail } from './actions';
import { apiRequest } from '../../globalUtils';

export function* getTopNav() {
    const response = yield call(apiRequest, '/layout/top-nav', 'get');
    if (response && response.ok) {
        yield put(layoutTopNavSuccess(response.data));
    } else {
        yield put(layoutTopNavFail(response.data));
    }
}

// Individual exports for testing
export default function* headerSaga() {
    yield takeLatest(LAYOUT_TOP_NAV, getTopNav);
}
