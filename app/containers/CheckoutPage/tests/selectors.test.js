import { fromJS } from 'immutable';
import { selectCheckoutPageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectCheckoutPageDomain', () => {
    it('Expect selectCheckoutPageDomain to return state from reducer', () => {
        const selector = selectCheckoutPageDomain();
        const mock = fromJS({ CheckoutPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
