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

describe('feedbackPage Saga', () => {
    it('Expect POST_FEEDBACK to trigger postFeedbackWorker', () => {
        const generator = feedbackPageSaga();
        expect(generator.next().value).toEqual(
            takeLatest(POST_FEEDBACK, postFeedbackWorker),
        );
    });

    it('Expect success to get feedback', () => {
        const response = {
            comment: '123',
            product_suggestion: '123',
            rating: 0,
        };

        const generator = postFeedbackWorker(postFeedback(response.comment, response.product_suggestion, response.rating));
        expect(generator.next().value).toEqual(call(apiRequest, '/feedback', 'post', response));
        expect(generator.next(response).value).toEqual(put(postFeedbackSuccess()));
    });

    it('Expect fail to get feedback', () => {
        const temp = {
            comment: false,
            product_suggestion: false,
            rating: 0,
        };
        const generator = postFeedbackWorker(postFeedback(false, false, 0));
        expect(generator.next().value).toEqual(call(apiRequest, '/feedback', 'post', temp));
        expect(generator.next(temp).value).toEqual(put(postFeedbackFail()));
    });
});
