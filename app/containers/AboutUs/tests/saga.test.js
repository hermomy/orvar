/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    GET_CAREER,
    GET_PAYMENT_BANK,
} from '../constants';
import { getCareer, getPaymentBank, getDataSuccess, getDataFail } from '../actions';
import aboutUsSaga, { getCareerDataWorker, getPaymentBankDataWorker } from '../saga';

describe('herlisting Saga', () => {
    it('Expect GET_CAREER to trigger getCareerDataWorker', () => {
        const generator = aboutUsSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_CAREER, getCareerDataWorker),
        ]);
    });

    it('Expect GET_PAYMENT_BANK to trigger getPaymentBankDataWorker', () => {
        const generator = aboutUsSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_PAYMENT_BANK, getPaymentBankDataWorker),
        ]);
    });

    it('Expect success to get career', () => {
        const responce = { ok: true };
        const generator = getCareerDataWorker(getCareer());
        expect(generator.next().value).toEqual(call(apiRequest, '/career', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect success to get paymentbank', () => {
        const responce = { ok: true };
        const generator = getPaymentBankDataWorker(getPaymentBank());
        expect(generator.next().value).toEqual(call(apiRequest, '/payment/bank', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail fail to get career', () => {
        const responce = { ok: false };
        const generator = getCareerDataWorker(getCareer());
        expect(generator.next().value).toEqual(call(apiRequest, '/career', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataFail(responce)));
    });

    it('Expect fail to get paymentbank', () => {
        const responce = { ok: false };
        const generator = getPaymentBankDataWorker(getPaymentBank());
        expect(generator.next().value).toEqual(call(apiRequest, '/payment/bank', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataFail(responce)));
    });
});
