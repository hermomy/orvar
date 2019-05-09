import { fromJS } from 'immutable';
import makeSelectCheckoutPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectCheckoutPage', () => {
    it('Expect makeSelectCheckoutPage to return state from reducer', () => {
        const selector = makeSelectCheckoutPage();
        const mock = fromJS({ checkoutPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
