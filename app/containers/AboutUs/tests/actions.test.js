import {
    getCareer,
} from '../actions';

import {
    GET_CAREER,
} from '../constants';

describe('AboutUs actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_CAREER', () => {
            const expected = {
                type: GET_CAREER,
            };
            expect(getCareer()).toEqual(expected);
        });
    });
});
