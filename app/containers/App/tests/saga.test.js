/**
 * App sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
// import { staticErrorResponse } from 'globalUtils';

import appSaga, { getConfigData } from '../saga';
import {
    fetchConfig,
    // fetchConfigSuccess,
    // fetchConfigFailed,
} from '../actions';

let generator;
describe('appSaga()', () => {
    beforeEach(() => {
        generator = appSaga();
    });

    it('Expect trigger fetchConfig() when FETCH_CONFIG is dispatched', (done) => {
        const expected = put(fetchConfig());
        const mock = generator.next().value;
        expect(mock.PUT).toEqual(expected.FORK);
        done();
    });
});

describe('getConfigData()', () => {
    beforeEach(() => {
        generator = getConfigData();
        expect(generator.next()).toMatchSnapshot();
    });

    // describe('Getting the data', () => {
    //     let response;
    //     beforeEach(() => {
    //         response = staticErrorResponse({ text: '' });
    //         expect(generator.next()).toMatchSnapshot();
    //     });

    //     afterEach(() => {
    //         response = staticErrorResponse({ text: '' });
    //     });

    //     // it('Expect trigger fetchConfigSuccess() when response.success is true', (done) => {
    //     //     response.success = true;
    //     //     const mock = generator.next(response).value;
    //     //     const expected = put(fetchConfigSuccess(response));
    //     //     expect(mock).toEqual(expected);
    //     //     done();
    //     // });

    //     // describe('Failed Scenarios', () => {
    //     //     it('with server error', (done) => {
    //     //         response.messages[0].text = 'Server Error';
    //     //         const mock = generator.next(response).value;
    //     //         const expected = put(fetchConfigFailed(response));
    //     //         expect(mock).toEqual(expected);
    //     //         done();
    //     //     });

    //     //     it('not a valid response from server', (done) => {
    //     //         response.messages[0].text = 'No response from server';
    //     //         const mock = generator.next().value;
    //     //         const expected = put(fetchConfigFailed(response));
    //     //         expect(expected).toEqual(mock);
    //     //         done();
    //     //     });
    //     // });
    // });
});
