import { fromJS } from 'immutable';
import makeSelectProfileOrderDetail from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProfileOrderDetail', () => {
    it('Expect makeSelectProfileOrderDetail to return state from reducer', () => {
        const selector = makeSelectProfileOrderDetail();
        const mock = fromJS({ profileOrderDetail: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
