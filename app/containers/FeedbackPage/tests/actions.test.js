import {
    postFeedback,
} from '../actions';

import {
    POST_FEEDBACK,
} from '../constants';

describe('FeedbackPage actions', () => {
    describe('Default Action', () => {
        it('has a type of POST_FEEDBACK', () => {
            const expected = {
                type: POST_FEEDBACK,
            };
            expect(postFeedback()).toEqual(expected);
        });
    });
});
