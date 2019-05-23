import {
    getInformChoice,
} from '../actions';

import {
    GET_INFORM_CHOICE,
} from '../constants';

describe('ProfileEditInform actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_INFORM_CHOICE', () => {
            const expected = {
                type: GET_INFORM_CHOICE,
            };
            expect(getInformChoice()).toEqual(expected);
        });
    });
});
