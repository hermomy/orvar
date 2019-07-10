
import {
    getUserData,
} from '../actions';
import {
    GET_USER_DATA,
} from '../constants';

describe('ProfileEditInfo actions', () => {
    describe('Default Action', () => {
        it('has a type of GET_USER_DATA', () => {
            const expected = {
                type: GET_USER_DATA,
            };
            expect(getUserData()).toEqual(expected);
        });
    });
});
