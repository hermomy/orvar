
import {
    getProduct,
    getProductById,
    getProductFail,
    getProductSuccess,
} from '../actions';

import {
    GET_PRODUCT,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
} from '../constants';

describe('ProductView actions', () => {
    it('Should getProduct() return type of GET_PRODUCT', () => {
        const api = 'https://api.hermo.my/mall/10520';
        const expected = {
            type: GET_PRODUCT,
            api,
        };
        expect(getProduct(api)).toEqual(expected);
    });

    it('Should getProductById() return type of GET_PRODUCT', () => {
        const productId = 10520;
        const expected = {
            type: GET_PRODUCT,
            api: `http://api.hermo.my/mall/${productId}`,
        };
        expect(getProductById(productId)).toEqual(expected);
    });

    it('Should getProductFail() return type of GET_PRODUCT_FAIL', () => {
        const expected = {
            type: GET_PRODUCT_FAIL,
        };
        expect(getProductFail()).toEqual(expected);
    });

    it('Should getProductSuccess() return type of GET_PRODUCT_SUCCESS', () => {
        const data = true;
        const expected = {
            type: GET_PRODUCT_SUCCESS,
            data,
        };
        expect(getProductSuccess(data)).toEqual(expected);
    });
});
