import { fromJS } from 'immutable';
import selectProfileOrderDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileOrderDomain', () => {
    it('Expect selector select profileOrder from state', () => {
        const selector = selectProfileOrderDomain();
        const mock = fromJS({ profileOrder: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
