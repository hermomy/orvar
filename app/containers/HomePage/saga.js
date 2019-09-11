import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_HOME_BANNER,
    GET_FLAGSHIP,
} from './constants';
import {
    getHomeBannerSuccess,
    getHomeBannerFailed,
    getFlagshipSuccess,
    getFlagshipFailed,
} from './actions';
import { staticErrorResponse, apiRequest } from '../../globalUtils';


export function* getBannerWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/home-banner');
        if (response && response.ok !== false) {
            yield put(getHomeBannerSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getHomeBannerFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getHomeBannerFailed(e));
    }
}
export function* getFlagshipWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/flagship');
        if (response && response.ok !== false) {
            yield put(getFlagshipSuccess(response));
        } else if (response && response.ok === false) {
            yield put(getFlagshipFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getFlagshipFailed(e));
    }
}

// Individual exports for testing
export default function* homePageSaga() {
    yield takeLatest(GET_HOME_BANNER, getFlagshipWorker);
    yield takeLatest(GET_FLAGSHIP, getBannerWorker);
}
