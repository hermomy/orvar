import {
    getReview,
    getReviewSuccess,
    getReviewFail,
    postReview,
} from '../actions';

import {
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    POST_REVIEW,
} from '../constants';

describe('getReview action', () => {
    it('has a type of GET_REVIEW', () => {
        const expected = {
            type: GET_REVIEW,
        };
        expect(getReview()).toEqual(expected);
    });
});

describe('getReviewSuccess action', () => {
    it('has a type of GET_REVIEW_SUCCESS', () => {
        const expected = {
            type: GET_REVIEW_SUCCESS,
        };
        expect(getReviewSuccess()).toEqual(expected);
    });
});

describe('getReviewFail action', () => {
    it('has a type of GET_REVIEW_FAIL', () => {
        const expected = {
            type: GET_REVIEW_FAIL,
        };
        expect(getReviewFail()).toEqual(expected);
    });
});

describe('postReview action', () => {
    it('has a type of POST_REVIEW', () => {
        const expected = {
            type: POST_REVIEW,
        };
        expect(postReview()).toEqual(expected);
    });
});
