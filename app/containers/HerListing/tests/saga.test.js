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
    getData,
    getDataSuccess,
    getDataFail,
} from '../actions';
import herListingSaga, { fetchData } from '../saga';
import {
    GET_DATA,
} from '../constants';

describe('herlisting Saga', () => {
    const api = 'https://fake.url';

    it('Expect GET_DATA to trigger fetchData', () => {
        const generator = herListingSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_DATA, fetchData),
        ]);
    });

    it('Expect getDataSuccess to get data', () => {
        const responce = { ok: true };
        const generator = fetchData(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect getDataFail fail to get data', () => {
        const responce = { ok: false };
        const generator = fetchData(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

    it('Expect getDataFail(error) fail to get data and show error', () => {
        const responce = new Error('error');
        const generator = fetchData(getData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/mall', 'get', null, ''));
        expect(generator.throw(responce).value).toEqual(put(getDataFail(responce)));
    });
});
