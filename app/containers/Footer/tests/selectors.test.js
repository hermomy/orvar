import { fromJS } from 'immutable';
import makeSelectFooter from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectFooter', () => {
    it('Expect makeSelectFooter to return state from reducer', () => {
        const selector = makeSelectFooter();
        const mock = fromJS({ Footer: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
