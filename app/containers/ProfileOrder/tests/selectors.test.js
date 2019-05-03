import { fromJS } from 'immutable';
import { selectProfileOrderDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileOrderDomain', () => {
    it('Expect selectProfileOrderDomain to return state from reducer', () => {
        const selector = selectProfileOrderDomain();
        const mock = fromJS({ ProfileOrder: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
