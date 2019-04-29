import {
    getCareer,
    getPaymentBank,
    getDataSuccess,
    getDataFail,
} from '../actions';

import {
    GET_CAREER,
    GET_PAYMENT_BANK,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
} from '../constants';

describe('getCareer action', () => {
    it('has a type of GET_CAREER', () => {
        const expected = {
            type: GET_CAREER,
        };
        expect(getCareer()).toEqual(expected);
    });
});

describe('getPaymentBank action', () => {
    it('has a type of GET_PAYMENT_BANK', () => {
        const expected = {
            type: GET_PAYMENT_BANK,
        };
        expect(getPaymentBank()).toEqual(expected);
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
