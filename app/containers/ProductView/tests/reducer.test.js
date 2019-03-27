
import { fromJS } from 'immutable';
import productViewReducer from '../reducer';

describe('productViewReducer', () => {
    it('returns the initial state', () => {
        expect(productViewReducer(undefined, {})).toEqual(fromJS({}));
    });
});
