/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { defaultSaga } from '../saga';

// const generator = defaultSaga();

import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
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
import defaultSaga, { getPayload, getPage as sagaGetPage } from '../saga';
import {
    GET_DATA,
    GET_PAGE,
 } from '../constants';

describe('herlisting Saga', () => {
    const api = 'https://fake.url';

    it('generater function for getPayload', () => {
        const generator = defaultSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_DATA, getPayload),
            takeLatest(GET_PAGE, getPage),
        ]);
    });

    it('Expect getDataSuccess to get data', () => {
        const responce = { ok: true };
        const generator = getPayload(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect getDataFail fail to get data', () => {
        const responce = { ok: false };
        const generator = getPayload(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

    it('Expect getDataFail(error) fail to get data and show error', () => {
        const responce = new Error('error');
        const generator = getPayload(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.throw(responce).value).toEqual(put(getDataFail(responce)));
    });

    it('Expect getPageSuccess to get page data', () => {
        const responce = { ok: true };
        const generator = sagaGetPage(getPage(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getPageSuccess()));
    });

    it('Expect getPageFail(error) fail to get page data', () => {
        const responce = new Error('error');
        const generator = sagaGetPage(getPage(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get', null, ''));
        expect(generator.throw(responce).value).toEqual(put(getPageFail()));
    });
});
