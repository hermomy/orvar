import { fromJS } from 'immutable';
import makeSelectExample from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectExample', () => {
    it('Expect makeSelectExample to return state from reducer', () => {
        const selector = makeSelectExample();
        const mock = fromJS({ Example: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
