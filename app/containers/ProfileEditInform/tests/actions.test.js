import {
    getInformChoice,
    getUserInform,
    getUserAddress,
    getDataSuccess,
    getDataFail,
    putData,
    postAddress,
} from '../actions';

import {
    GET_INFORM_CHOICE,
    GET_USER_INFORM,
    GET_USER_ADDRESS,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    PUT_DATA,
    POST_ADDRESS,
} from '../constants';

describe('getInformChoice action', () => {
    it('has a type of GET_INFORM_CHOICE', () => {
        const expected = {
            type: GET_INFORM_CHOICE,
        };
        expect(getInformChoice()).toEqual(expected);
    });
});

describe('getUserInform action', () => {
    it('has a type of GET_USER_INFORM', () => {
        const expected = {
            type: GET_USER_INFORM,
        };
        expect(getUserInform()).toEqual(expected);
    });
});

describe('getUserAddress action', () => {
    it('has a type of GET_USER_ADDRESS', () => {
        const expected = {
            type: GET_USER_ADDRESS,
        };
        expect(getUserAddress()).toEqual(expected);
    });
});

describe('getDataSuccess action', () => {
    it('has a type of GET_DATA_SUCCESS', () => {
        const expected = {
            type: GET_DATA_SUCCESS,
        };
        expect(getDataSuccess()).toEqual(expected);
    });
});


describe('getDataFail action', () => {
    it('has a type of GET_DATA_FAIL', () => {
        const expected = {
            type: GET_DATA_FAIL,
        };
        expect(getDataFail()).toEqual(expected);
    });
});

describe('putData action', () => {
    it('has a type of PUT_DATA', () => {
        const expected = {
            type: PUT_DATA,
        };
        expect(putData()).toEqual(expected);
    });
});

describe('postAddress action', () => {
    it('has a type of POST_ADDRESS', () => {
        const expected = {
            type: POST_ADDRESS,
        };
        expect(postAddress()).toEqual(expected);
    });
});
