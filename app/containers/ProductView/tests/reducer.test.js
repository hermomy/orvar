
// import { fromJS } from 'immutable';
import productViewReducer, { initialState } from '../reducer';
import {
    getProductById,
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

    it('Expect reducer with getProductById() return loading state', () => {
        const api = 10520;
        expect(
            productViewReducer(state, getProductById(api))
        ).toEqual(state
            .set('loading', true)
        );
    });

    it('Expect reducer with doProductFail() return fail state', () => {
        const error = 'Error occurs';
        expect(
            productViewReducer(state, doProductFail(error))
        ).toEqual(state
            .set('loading', false)
            .set('error', error)
        );
    });

    it('Expect reducer with doProductSuccess() return success state', () => {
        const data = true;
        expect(
            productViewReducer(state, doProductSuccess(data))
        ).toEqual(state
            .set('loading', false)
            .set('data', Object.assign({ ...state.get('data') }, data))
        );
    });
});
