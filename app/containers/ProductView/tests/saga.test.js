/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { defaultSaga } from '../saga';

// const generator = defaultSaga();
import { takeLatest, put, call } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import productViewSaga, { getProduct as productSaga } from '../saga';
import {
    GET_PRODUCT,
} from '../constants';
import {
    getProduct, getProductFail, getProductSuccess,
} from '../actions';

describe('productview Saga', () => {
    const api = 'https://mock-url';

    it('Expect worker getProduct() fired when GET_PRODUCT is dispatched', () => {
        const generator = productViewSaga();
        expect(generator.next(getProduct(api)).value).toEqual(takeLatest(GET_PRODUCT, productSaga));
    });

    it('Expect worker getProduct() return failed response when api is not ok', () => {
        const response = { ok: false };

        const generator = productSaga(getProduct(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get'));
        expect(generator.next(response).value).toEqual(put(getProductFail()));
    });

    it('Expect worker getProduct() return success response when api is ok', () => {
        const response = { ok: true };

        const generator = productSaga(getProduct(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get'));
        expect(generator.next(response).value).toEqual(put(getProductSuccess()));
    });

    it('Expect worker getProduct() return error response when api thrown an error', () => {
        const error = new Error('Error occurs when calling product api');

        const generator = productSaga(getProduct(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get'));
        expect(generator.throw(error).value).toEqual(put(getProductFail()));
    });
});
