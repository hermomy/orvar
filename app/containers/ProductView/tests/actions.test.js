
import {
    getProductById,
    doProductFail,
    doProductSuccess,
} from '../actions';

import {
    GET_PRODUCT,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
} from '../constants';

describe('ProductView actions', () => {
    it('Expect getProductById() return type of GET_PRODUCT', () => {
        const productId = 10520;
        const expected = {
            type: GET_PRODUCT,
            productId,
        };
        expect(getProductById(productId)).toEqual(expected);
    });

    it('Expect getProductFail() return type of GET_PRODUCT_FAIL', () => {
        const expected = {
            type: GET_PRODUCT_FAIL,
        };
        expect(doProductFail()).toEqual(expected);
    });

    it('Expect getProductSuccess() return type of GET_PRODUCT_SUCCESS', () => {
        const data = true;
        const expected = {
            type: GET_PRODUCT_SUCCESS,
            data,
        };
        expect(doProductSuccess(data)).toEqual(expected);
    });
});
