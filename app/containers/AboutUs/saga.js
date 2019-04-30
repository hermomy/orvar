import { apiRequest } from 'globalUtils';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_CAREER, GET_PAYMENT_BANK } from './constants';
import { getDataSuccess, getDataFail } from './actions';

export function* getCareerDataWorker() {
    const res = yield call(apiRequest, '/career', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ careerData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

export function* getPaymentBankDataWorker() {
    const res = yield call(apiRequest, '/payment/bank', 'get');

    if (res && res.ok) {
        yield put(getDataSuccess({ paymentBankData: res.data }));
    } else {
        yield put(getDataFail(res.data));
    }
}

// Individual exports for testing
export default function* aboutUsSaga() {
    yield [
        takeLatest(GET_CAREER, getCareerDataWorker),
        takeLatest(GET_PAYMENT_BANK, getPaymentBankDataWorker),
    ];
}
