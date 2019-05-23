import {
    mainGetProfile,
} from '../actions';

import {
    MAIN_GET_PROFILE,
} from '../constants';

describe('ProfileWholePage actions', () => {
    describe('Default Action', () => {
        it('has a type of MAIN_GET_PROFILE', () => {
            const expected = {
                type: MAIN_GET_PROFILE,
            };
            expect(mainGetProfile()).toEqual(expected);
        });
    });
});
