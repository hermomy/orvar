import {
    postFeedback,
    postFeedbackSuccess,
    postFeedbackFail,
} from '../actions';

import {
    POST_FEEDBACK,
    POST_FEEDBACK_SUCCESS,
    POST_FEEDBACK_FAIL,
} from '../constants';

describe('postFeedback action', () => {
    it('has a type of POST_FEEDBACK', () => {
        const expected = {
            type: POST_FEEDBACK,
        };
        expect(postFeedback()).toEqual(expected);
    });
});

describe('postFeedbackSuccess action', () => {
    it('has a type of POST_FEEDBACK_SUCCESS', () => {
        const expected = {
            type: POST_FEEDBACK_SUCCESS,
        };
        expect(postFeedbackSuccess()).toEqual(expected);
    });
});

describe('postFeedbackFail action', () => {
    it('has a type of POST_FEEDBACK_FAIL', () => {
        const expected = {
            type: POST_FEEDBACK_FAIL,
        };
        expect(postFeedbackFail()).toEqual(expected);
    });
});
