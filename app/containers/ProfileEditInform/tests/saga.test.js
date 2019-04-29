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
    getInformChoice,
    getUserInform,
    getUserAddress,
    getDataSuccess,
    getDataFail,
    putData,
    postAddress,
} from '../actions';
import {
    GET_INFORM_CHOICE,
    GET_USER_INFORM,
    GET_USER_ADDRESS,
    PUT_DATA,
    POST_ADDRESS,
} from '../constants';
import profileEditInformSaga, { getUserInformWorker, getUserChoiceWorker, getUserAddressWorker, putUserInformWorker, postAddressWorker } from '../saga';

describe('herlisting Saga', () => {
    const api = 'https://fake.url';

    it('Expect GET_USER_INFORM to trigger getUserInformWorker', () => {
        const generator = profileEditInformSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_USER_INFORM, getUserInformWorker),
        ]);
    });

    it('Expect success to get paymentbank', () => {
        const responce = { ok: true };
        const generator = getUserInformWorker(getUserInform(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/profile', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail to get career', () => {
        const responce = { ok: false };
        const generator = getUserInformWorker(getUserInform(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/profile', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

// ---------------
    it('Expect GET_INFORM_CHOICE to trigger getUserChoiceWorker', () => {
        const generator = profileEditInformSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_INFORM_CHOICE, getUserChoiceWorker),
        ]);
    });

    it('Expect success to get getUserChoiceWorker', () => {
        const responce = { ok: true };
        const generator = getUserChoiceWorker(getInformChoice(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/common', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail to get getUserChoiceWorker', () => {
        const responce = { ok: false };
        const generator = getUserChoiceWorker(getInformChoice(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/common', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

// ---------------
    it('Expect GET_USER_ADDRESS to trigger getUserAddressWorker', () => {
        const generator = profileEditInformSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_USER_ADDRESS, getUserAddressWorker),
        ]);
    });

    it('Expect success to get getUserChoiceWorker', () => {
        const responce = { ok: true };
        const generator = getUserAddressWorker(getUserAddress(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/common', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail to get getUserChoiceWorker', () => {
        const responce = { ok: false };
        const generator = getUserAddressWorker(getUserAddress(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/common', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

// ------------------
    it('Expect PUT_DATA to trigger putUserInformWorker', () => {
        const generator = profileEditInformSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_USER_ADDRESS, putUserInformWorker),
        ]);
    });

    it('Expect success to get getUserChoiceWorker', () => {
        const responce = { ok: true };
        const generator = putUserInformWorker(putData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/common', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail to get getUserChoiceWorker', () => {
        const responce = { ok: false };
        const generator = putUserInformWorker(putData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/common', 'get'));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

// --------------------
    it('Expect PUT_DATA to trigger putUserInformWorker', () => {
        const generator = profileEditInformSaga();
        expect(generator.next().value).toEqual([
            takeLatest(PUT_DATA, putUserInformWorker),
        ]);
    });

    it('Expect success to get getUserChoiceWorker', () => {
        const responce = { ok: true };
        const generator = putUserInformWorker(putData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/profile', 'put'));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail to get getUserChoiceWorker', () => {
        const responce = { ok: false };
        const generator = putUserInformWorker(putData(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/profile', 'put'));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });

// ----------------------
    it('Expect POST_ADDRESS to trigger postAddressWorker', () => {
        const generator = profileEditInformSaga();
        expect(generator.next().value).toEqual([
            takeLatest(POST_ADDRESS, putUserInformWorker),
        ]);
    });

    it('Expect success to get postAddressWorker', () => {
        const responce = { ok: true };
        const generator = postAddressWorker(postAddress(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/address', 'post', responce));
        expect(generator.next(responce).value).toEqual(put(getDataSuccess()));
    });

    it('Expect fail to get postAddressWorker', () => {
        const responce = { ok: false };
        const generator = postAddressWorker(postAddress(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/address', 'post', responce));
        expect(generator.next(responce).value).toEqual(put(getDataFail()));
    });
});
