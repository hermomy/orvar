import { fromJS } from 'immutable';
import makeSelectProfileOrder from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileOrder', () => {
    it('Expect makeSelectProfileOrder to return state from reducer', () => {
        const selector = makeSelectProfileOrder();
        const mock = fromJS({ profileOrder: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
