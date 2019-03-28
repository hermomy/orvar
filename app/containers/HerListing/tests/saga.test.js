/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { defaultSaga } from '../saga';

// const generator = defaultSaga();

import { put, takeLatest, call } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    // defaultAction,
    getData,
    getDataSuccess,
    getDataFail,
    getPage,
    getPageSuccess,
    getPageFail,
} from '../actions';
import defaultSaga, { getpayload, getpage } from '../saga';
import { GETDATA,
        GETPAGE,
 } from '../constants';

describe('defaultSaga Saga', () => {
    const api = 'https://fake.url';

    it('Expect to have unit tests specified', () => {
        const generator = defaultSaga();
        expect(generator.next(getpayload()).value).toEqual(takeLatest(GETDATA, getpayload));
    });

    it('Expect getDataSuccess', () => {
        const responce = { ok: true };
        const generator = getpayload(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect getDataFail', () => {
        const responce = { ok: false };
        const generator = getpayload(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

    it('Expect getDataFail(error)', () => {
        const responce = new Error('error');
        const generator = getpayload(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.throw(responce).value).toEqual(put(getDataFail(responce)));
    });

    it('test getpage main', () => {
        const generator = defaultSaga();
        expect(generator.next(getpage()).value).toEqual(takeLatest(GETPAGE, getpage));
    });

    it('Expect getPageSuccess', () => {
        const responce = { ok: true };
        const generator = getpage(getPage(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getPageSuccess()));
    });

    it('Expect getPageFail(error)', () => {
        const responce = new Error('error');
        const generator = getpage(getPage(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get', null, ''));
        expect(generator.throw(responce).value).toEqual(put(getPageFail()));
    });
});
