import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_BRAND_LIST } from './constants';
import {
    getBrandListSuccess,
    getBrandListFail,
} from './actions';
import { apiRequest } from '../../globalUtils';

export function* brandListQuery() {
    const response = yield call(apiRequest, '/brand/index', 'get');
    if (response && response.ok) {
        yield put(getBrandListSuccess(response.data));
    } else {
        yield put(getBrandListFail(response.data));
    }
}

// Individual exports for testing
export default function* brandPageSaga() {
    yield takeLatest(GET_BRAND_LIST, brandListQuery);
}
