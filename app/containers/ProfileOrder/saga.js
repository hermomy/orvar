import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_ORDER, GET_ORDER_DETAIL } from './constants';
import { getOrderSuccess, getOrderFail } from './actions';


export function* orderDataWorker(action) {
    let res = null;
    if (!action.numOfPage) {
        res = yield call(apiRequest, `/order${action.category}`, 'get', null);
    } else {
        res = yield call(apiRequest, `/order${action.category}?page=${action.numOfPage}`, 'get', null);
    }
    if (res && res.ok) {
        yield put(getOrderSuccess({ orderListData: res.data }));
    } else {
        yield put(getOrderFail(res.data));
    }
}

export function* orderDetailWorker(action) {
    const res = yield call(apiRequest, action.OrderDetailAPI, 'get', null);
    if (res && res.ok) {
        yield put(getOrderSuccess({ orderListDetail: res.data }));
    } else {
        yield put(getOrderFail(res.data));
    }
}

// Individual exports for testing
export default function* profileOrderSaga() {
    yield [
        takeLatest(GET_ORDER, orderDataWorker),
        takeLatest(GET_ORDER_DETAIL, orderDetailWorker),
    ];
}
