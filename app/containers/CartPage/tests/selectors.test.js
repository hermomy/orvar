import { fromJS } from 'immutable';
import selectCartPageDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectCartPageDomain', () => {
    it('Expect selectCartPageDomain to return state from reducer', () => {
        const selector = selectCartPageDomain();
        const mock = fromJS({ cartPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
