import {
    getReview,
} from '../actions';

import {
    GET_REVIEW,
} from '../constants';

describe('ProfileReview actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_REVIEW', () => {
            const expected = {
                type: GET_REVIEW,
            };
            expect(getReview()).toEqual(expected);
        });
    });
});
