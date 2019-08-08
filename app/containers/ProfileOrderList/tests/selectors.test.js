import { fromJS } from 'immutable';
import makeSelectProfileOrderList from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileOrderList', () => {
    it('Expect makeSelectProfileOrderList to return state from reducer', () => {
        const selector = makeSelectProfileOrderList();
        const mock = fromJS({ profileOrderList: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
