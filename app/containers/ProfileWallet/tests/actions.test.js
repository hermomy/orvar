import {
    getVoucher,
    getDataSuccess,
    getDataFail,
    getBalance,
    getProfile,
} from '../actions';

import {
    GET_VOUCHER,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    GET_BALANCE,
    GET_PROFILE,
} from '../constants';

describe('getVoucher action', () => {
    it('has a type of GET_VOUCHER', () => {
        const expected = {
            type: GET_VOUCHER,
        };
        expect(getVoucher()).toEqual(expected);
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

describe('getBalance action', () => {
    it('has a type of GET_BALANCE', () => {
        const expected = {
            type: GET_BALANCE,
        };
        expect(getBalance()).toEqual(expected);
    });
});

describe('getProfile action', () => {
    it('has a type of GET_PROFILE', () => {
        const expected = {
            type: GET_PROFILE,
        };
        expect(getProfile()).toEqual(expected);
    });
});
