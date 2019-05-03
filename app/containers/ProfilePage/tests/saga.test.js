/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { profilePageSaga } from '../saga';
import {
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import profilePageSaga, { getProfileWorker } from '../saga';
import {
    getProfile,
    getProfileSuccess,
    getProfileFail,
 } from '../actions';
import {
    GET_PROFILE,
} from '../constants';

// const generator = profilePageSaga();

describe('profilePageSaga', () => {
    const api = 'https://fake.url';

    it('Expect GET_PROFILE to trigger getProfileWorker', () => {
        const generator = profilePageSaga();
        expect(generator.next().value).toEqual([
            takeLatest(GET_PROFILE, getProfileWorker),
        ]);
    });

    it('Expect getProfileSuccess to get profile', () => {
        const responce = { ok: true };
        const generator = getProfileWorker(getProfile(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/profile', 'get', null));
        expect(generator.next(responce).value).toEqual(put(getProfileSuccess()));
    });

    it('Expect getProfileFail fail to get profile', () => {
        const responce = { ok: true };
        const generator = getProfileWorker(getProfile(api));
        expect(generator.next().value).toEqual(call(apiRequest, '/profile', 'get', null, ''));
        expect(generator.next(responce).value).toEqual(put(getProfileFail()));
    });
});
