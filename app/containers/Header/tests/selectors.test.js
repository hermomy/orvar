import { fromJS } from 'immutable';
import makeSelectHeader from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectHeader', () => {
    it('Expect makeSelectHeader to return state from reducer', () => {
        const selector = makeSelectHeader();
        const mock = fromJS({ header: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
