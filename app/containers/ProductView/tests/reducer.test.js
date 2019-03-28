
// import { fromJS } from 'immutable';
import productViewReducer, { initialState } from '../reducer';
import {
    getProduct,
    // getProductById,
    getProductFail,
    getProductSuccess,
} from '../actions';

describe('productViewReducer', () => {
    let state;

    beforeEach(() => {
        state = initialState;
    });

    it('Should return initial state', () => {
        expect(productViewReducer(undefined, {})).toEqual(state);
    });

    it('Should return loading state when getProduct()', () => {
        const api = 'https://api.hermo.my/mall/10520';
        expect(
            productViewReducer(state, getProduct(api))
        ).toEqual(state
            .set('loading', true)
        );
    });

    it('Should return fail state when getProductFail()', () => {
        expect(
            productViewReducer(state, getProductFail())
        ).toEqual(state
            .set('loading', false)
            .set('error', 'Error occurs when get products details.')
        );
    });

    it('Should return success state when getProductSuccess()', () => {
        const data = true;
        expect(
            productViewReducer(state, getProductSuccess(data))
        ).toEqual(state
            .set('loading', false)
            .set('data', data)
        );
    });
});
