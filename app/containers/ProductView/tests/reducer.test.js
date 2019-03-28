
// import { fromJS } from 'immutable';
import productViewReducer, { initialState } from '../reducer';
import {
    getProduct,
    // getProductById,
    doProductFail,
    doProductSuccess,
} from '../actions';

describe('productViewReducer', () => {
    let state;

    beforeEach(() => {
        state = initialState;
    });

    it('Expect empty reducer return initial state', () => {
        expect(productViewReducer(undefined, {})).toEqual(state);
    });

    it('Expect reducer with getProduct() return loading state', () => {
        const api = 'https://api.hermo.my/mall/10520';
        expect(
            productViewReducer(state, getProduct(api))
        ).toEqual(state
            .set('loading', true)
        );
    });

    it('Expect reducer with doProductFail() return fail state', () => {
        expect(
            productViewReducer(state, doProductFail())
        ).toEqual(state
            .set('loading', false)
            .set('error', 'Error occurs when get products details.')
        );
    });

    it('Expect reducer with doProductSuccess() return success state', () => {
        const data = true;
        expect(
            productViewReducer(state, doProductSuccess(data))
        ).toEqual(state
            .set('loading', false)
            .set('data', data)
        );
    });
});
