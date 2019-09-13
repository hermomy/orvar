import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_HOME_BANNER,
    GET_FLAGSHIP,
    GET_TWOH,
    GET_NEW_ARRIVAL,
    GET_EXTENSION,
    GET_TRENDING,
    GET_SPONSORED,
    GET_REVIEW,
    GET_STORE,
    GET_LAYOUT_FOOTER,
    GET_IMAGE_FOOTER,
    GET_PARTNER_FOOTER,
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
    getExtensionSuccess,
    getExtensionFailed,
    getTrendingSuccess,
    getTrendingFailed,
    getSponsoredSuccess,
    getSponsoredFailed,
    getReviewSuccess,
    getReviewFailed,
    getStoreSuccess,
    getStoreFailed,
    getLayoutFooterSuccess,
    getLayoutFooterFailed,
    getImageFooterSuccess,
    getImageFooterFailed,
    getPartnerFooterSuccess,
    getPartnerFooterFailed,
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
export function* getExtensionWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/view/135');
        if (response && response.ok !== false) {
            yield put(getExtensionSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getExtensionFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getExtensionFailed(e));
    }
}
export function* getTrendingWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/mall/list?sort=trending.asc');
        if (response && response.ok !== false) {
            yield put(getTrendingSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getTrendingFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getTrendingFailed(e));
    }
}
export function* getSponsoredWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/sponsored');
        if (response && response.ok !== false) {
            yield put(getSponsoredSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getSponsoredFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getSponsoredFailed(e));
    }
}
export function* getReviewWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/beauty-wall');
        if (response && response.ok !== false) {
            yield put(getReviewSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getReviewFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getReviewFailed(e));
    }
}
export function* getStoreWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/store');
        if (response && response.ok !== false) {
            yield put(getStoreSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getStoreFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getStoreFailed(e));
    }
}
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
export function* getImageFooterWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/image?code=hershop-footer');
        if (response && response.ok !== false) {
            yield put(getImageFooterSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getImageFooterFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getImageFooterFailed(e));
    }
}
export function* getPartnerFooterWorker() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/image?code=footer-partner-logo');
        if (response && response.ok !== false) {
            yield put(getPartnerFooterSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getPartnerFooterFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getPartnerFooterFailed(e));
    }
}
// Individual exports for testing
export default function* homePageSaga() {
    yield takeLatest(GET_HOME_BANNER, getFlagshipWorker);
    yield takeLatest(GET_FLAGSHIP, getBannerWorker);
    yield takeLatest(GET_TWOH, getTwohWorker);
    yield takeLatest(GET_NEW_ARRIVAL, getNewArrivalWorker);
    yield takeLatest(GET_EXTENSION, getExtensionWorker);
    yield takeLatest(GET_TRENDING, getTrendingWorker);
    yield takeLatest(GET_SPONSORED, getSponsoredWorker);
    yield takeLatest(GET_REVIEW, getReviewWorker);
    yield takeLatest(GET_STORE, getStoreWorker);
    yield takeLatest(GET_LAYOUT_FOOTER, getLayoutFooterWorker);
    yield takeLatest(GET_IMAGE_FOOTER, getImageFooterWorker);
    yield takeLatest(GET_PARTNER_FOOTER, getPartnerFooterWorker);
}
