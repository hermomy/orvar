import { fromJS } from 'immutable';
import makeSelectBrandPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectBrandPage', () => {
    it('Expect makeSelectBrandPage to return state from reducer', () => {
        const selector = makeSelectBrandPage();
        const mock = fromJS({ BrandPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
