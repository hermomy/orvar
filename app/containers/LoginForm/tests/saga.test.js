/**
 * Login sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
// import { staticErrorResponse } from 'globalUtils';
import authSaga
// , {
//     getToken,
// }
from '../saga';

import {
    doLogin,
    // loginSuccess,
    // loginFailed,
} from '../actions';

// const userPayload = { username: '', password: '' };
// const failedPayload = staticErrorResponse({ text: '{}' });
// const successPayload = { success: true, token: '123' };

let generator;
describe('authSaga()', () => {
    generator = authSaga();

    it('Expect yield getToken() when LOGIN is dispatched', (done) => {
        const mock = generator.next().value;
        const expected = put(doLogin({ username: '', password: '' }));
        expect(mock.PUT).toEqual(expected.FORK);
        done();
    });
});

// describe('getToken()', () => {
//     beforeEach(() => {
//         generator = getToken({ payload: userPayload });
//     });
//     it('Expect trigger loginSuccess() when success', (done) => {
//         expect(generator.next()).toMatchSnapshot();
//         const mock = generator.next(successPayload).value;
//         const expected = put(loginSuccess(successPayload));
//         expect(mock).toEqual(expected);
//         done();
//     });

//     it('Expect trigger loginFailed() when API returned falsy success', (done) => {
//         expect(generator.next()).toMatchSnapshot();
//         const mock = generator.next(failedPayload).value;
//         const expected = put(loginFailed(failedPayload));
//         expect(mock).toEqual(expected);
//         done();
//     });

//     it('Expect trigger loginFailed() no response returned', (done) => {
//         expect(generator.next()).toMatchSnapshot();
//         const errorPayload = staticErrorResponse({ text: JSON.stringify('Test Error') });
//         const mock = generator.next('Test Error').value;
//         const expected = put(loginFailed(errorPayload));
//         expect(mock).toEqual(expected);
//         done();
//     });

//     it('Expect throw loginFailed() if the generator throws error', (done) => {
//         expect(generator.next()).toMatchSnapshot();
//         const errorPayload = staticErrorResponse({ text: 'Error: {}' });
//         const mock = generator.throw({}).value;
//         const expected = put(loginFailed(errorPayload));
//         expect(mock).toEqual(expected);
//         done();
//     });
// });
