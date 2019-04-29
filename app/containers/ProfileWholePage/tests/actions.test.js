import {
    mainGetProfile,
    mainGetProfileSuccess,
    mainGetProfileFail,
} from '../actions';

import {
    MAIN_GET_PROFILE,
    MAIN_GET_PROFILE_SUCCESS,
    MAIN_GET_PROFILE_FAIL,
} from '../constants';

describe('mainGetProfile action', () => {
    it('has a type of MAIN_GET_PROFILE', () => {
        const expected = {
            type: MAIN_GET_PROFILE,
        };
        expect(mainGetProfile()).toEqual(expected);
    });
});

describe('mainGetProfileSuccess action', () => {
    it('has a type of MAIN_GET_PROFILE_SUCCESS', () => {
        const expected = {
            type: MAIN_GET_PROFILE_SUCCESS,
        };
        expect(mainGetProfileSuccess()).toEqual(expected);
    });
});

describe('mainGetProfileFail action', () => {
    it('has a type of MAIN_GET_PROFILE_FAIL', () => {
        const expected = {
            type: MAIN_GET_PROFILE_FAIL,
        };
        expect(mainGetProfileFail()).toEqual(expected);
    });
});
