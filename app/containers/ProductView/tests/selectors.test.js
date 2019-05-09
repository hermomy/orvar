import { fromJS } from 'immutable';
import makeSelectProductView from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProductView', () => {
    it('Expect selector select productView from state', () => {
        const selector = makeSelectProductView();
        const mock = fromJS({ productView: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
