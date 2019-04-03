/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { defaultSaga } from '../saga';

// const generator = defaultSaga();
import { put, call } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { productWorker, reviewWorker } from '../saga';
import {
    getProductReview, getProductById, doProductFail, doProductSuccess,
} from '../actions';

describe('productview Saga', () => {
    const api = 123;

    // it('Expect worker getProductById() fired when GET_PRODUCT is dispatched', () => {
    //     const generator = productViewSaga();
    //     expect(generator.next(getProductById(api)).value).toEqual(takeLatest(GET_PRODUCT, productWorker));
    // });

    it('Expect productWorker() return failed response when api is not ok', () => {
        const response = {
            ok: false,
            data: {
                message: [
                    {
                        text: 'Error here',
                    },
                ],
            },
        };

        const generator = productWorker(getProductById(api));
        expect(generator.next().value).toEqual(call(apiRequest, `/mall/${api}`, 'get'));
        expect(generator.next(response).value).toEqual(put(doProductFail(response.data.message[0].text)));
    });

    it('Expect productWorker() return success response when api is ok', () => {
        const response = {
            ok: true,
            data: '123',
        };

        const generator = productWorker(getProductById(api));
        expect(generator.next().value).toEqual(call(apiRequest, `/mall/${api}`, 'get'));
        expect(generator.next(response).value).toEqual(put(doProductSuccess({ product: response.data })));
    });

    it('Expect productWorker() return error response when api thrown an error', () => {
        const error = new Error('Error occurs when calling product api');

        const generator = productWorker(getProductById(api));
        expect(generator.next().value).toEqual(call(apiRequest, `/mall/${api}`, 'get'));
        expect(generator.throw(error).value).toEqual(put(doProductFail(error.message)));
    });

    it('Expect reviewWorker() return failed response when api is not ok', () => {
        const response = {
            ok: false,
            data: {
                message: [
                    {
                        text: 'Error here',
                    },
                ],
            },
        };

        const generator = reviewWorker(getProductReview(api));
        expect(generator.next().value).toEqual(call(apiRequest, `/mall/review?id=${api}`, 'get'));
        expect(generator.next(response).value).toEqual(put(doProductFail(response.data.message[0].text)));
    });

    it('Expect reviewWorker() return success response when api is ok', () => {
        const response = {
            ok: true,
            data: '123',
        };

        const generator = reviewWorker(getProductReview(api));
        expect(generator.next().value).toEqual(call(apiRequest, `/mall/review?id=${api}`, 'get'));
        expect(generator.next(response).value).toEqual(put(doProductSuccess({ reviews: response.data })));
    });

    it('Expect reviewWorker() return error response when api thrown an error', () => {
        const error = new Error('Error occurs when calling product api');

        const generator = reviewWorker(getProductReview(api));
        expect(generator.next().value).toEqual(call(apiRequest, `/mall/review?id=${api}`, 'get'));
        expect(generator.throw(error).value).toEqual(put(doProductFail(error.message)));
    });
});
