import {
    getOrder,
} from '../actions';

import {
    GET_ORDER,
} from '../constants';

describe('ProfileOrder actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_ORDER', () => {
            const expected = {
                type: GET_ORDER,
            };
            expect(getOrder()).toEqual(expected);
        });
    });
});
