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

    it('Should return fail from worker getProduct() with failed response', () => {
        const response = { ok: false };

        const generator = productSaga(getProduct(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get'));
        expect(generator.next(response).value).toEqual(put(getProductFail()));
    });

    it('Should return success from worker getProduct() with success response', () => {
        const response = { ok: true };

        const generator = productSaga(getProduct(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get'));
        expect(generator.next(response).value).toEqual(put(getProductSuccess()));
    });

    it('Should return fail from worker getProduct() when error have throw by apiRequest', () => {
        const error = new Error('Error occurs when calling product api');

        const generator = productSaga(getProduct(api));
        expect(generator.next().value).toEqual(call(apiRequest, api, 'get'));
        expect(generator.throw(error).value).toEqual(put(getProductFail()));
    });
});
