import { fromJS } from 'immutable';
import makeSelectProfileAddress from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileAddress', () => {
    it('Expect makeSelectProfileAddress to return state from reducer', () => {
        const selector = makeSelectProfileAddress();
        const mock = fromJS({ ProfileAddress: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
