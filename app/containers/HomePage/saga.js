import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_HOME_BANNER,
    GET_FLAGSHIP,
    GET_TWOH,
    GET_NEW_ARRIVAL,
} from './constants';
import {
    getHomeBannerSuccess,
    getHomeBannerFailed,
    getFlagshipSuccess,
    getFlagshipFailed,
    getTwohSuccess,
    getTwohFailed,
    getNewArrivalSuccess,
    getNewArrivalFailed,
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
export function* getTwohWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/feature-banner');
        if (response && response.ok !== false) {
            yield put(getTwohSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getTwohFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getTwohFailed(e));
    }
}
export function* getNewArrivalWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/new-arrival');
        if (response && response.ok !== false) {
            yield put(getNewArrivalSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getNewArrivalFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getNewArrivalFailed(e));
    }
}
// Individual exports for testing
export default function* homePageSaga() {
    yield takeLatest(GET_HOME_BANNER, getFlagshipWorker);
    yield takeLatest(GET_FLAGSHIP, getBannerWorker);
    yield takeLatest(GET_TWOH, getTwohWorker);
    yield takeLatest(GET_NEW_ARRIVAL, getNewArrivalWorker);
}
