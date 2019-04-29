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
    postFeedback,
    postFeedbackSuccess,
    postFeedbackFail,
} from '../actions';
import {
    POST_FEEDBACK,
} from '../constants';
import feedbackPageSaga, { postFeedbackWorker } from '../saga';

describe('herlisting Saga', () => {
    const data = true;

    it('Expect POST_FEEDBACK to trigger postFeedbackWorker', () => {
        const generator = feedbackPageSaga();
        expect(generator.next().value).toEqual([
            takeLatest(POST_FEEDBACK, postFeedbackWorker),
        ]);
    });

    it('Expect success to get feedback', () => {
        const responce = { ok: true };
        const generator = postFeedbackWorker(postFeedback(data));
        expect(generator.next().value).toEqual(call(apiRequest, '/feedback', 'post', data));
        expect(generator.next(responce).value).toEqual(put(postFeedbackSuccess()));
    });

    it('Expect fail to get feedback', () => {
        const responce = { ok: false };
        const generator = postFeedbackWorker(postFeedback(data));
        expect(generator.next().value).toEqual(call(apiRequest, '/feedback', 'post', null, data));
        expect(generator.next(responce).value).toEqual(put(postFeedbackFail(data)));
    });
});
