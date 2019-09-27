import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_LAYOUT_FOOTER,
} from './constants';
import {
    getLayoutFooterSuccess,
    getLayoutFooterFailed,
} from './actions';
import { staticErrorResponse, apiRequest } from '../../globalUtils';

export function* getLayoutFooterWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/layout/footer');
        if (response && response.ok !== false) {
            yield put(getLayoutFooterSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getLayoutFooterFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getLayoutFooterFailed(e));
    }
}

// Individual exports for testing
export default function* footerSaga() {
    yield takeLatest(GET_LAYOUT_FOOTER, getLayoutFooterWorker);
}
