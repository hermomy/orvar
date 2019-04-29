import {
    getOrder,
    getOrderDetail,
    getOrderSuccess,
    getOrderFail,
} from '../actions';

import {
    GET_ORDER,
    GET_ORDER_DETAIL,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
} from '../constants';

describe('getOrder action', () => {
    it('has a type of GET_ORDER', () => {
        const expected = {
            type: GET_ORDER,
        };
        expect(getOrder()).toEqual(expected);
    });
});

describe('getOrderDetail action', () => {
    it('has a type of GET_ORDER_DETAIL', () => {
        const expected = {
            type: GET_ORDER_DETAIL,
        };
        expect(getOrderDetail()).toEqual(expected);
    });
});

describe('getOrderSuccess action', () => {
    it('has a type of GET_ORDER_SUCCESS', () => {
        const expected = {
            type: GET_ORDER_SUCCESS,
        };
        expect(getOrderSuccess()).toEqual(expected);
    });
});

describe('getOrderFail action', () => {
    it('has a type of GET_ORDER_FAIL', () => {
        const expected = {
            type: GET_ORDER_FAIL,
        };
        expect(getOrderFail()).toEqual(expected);
    });
});
