import { fromJS } from 'immutable';
import selectProductViewDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProductViewDomain', () => {
    it('Should selector select productView from state', () => {
        const selector = selectProductViewDomain();
        const mock = fromJS({ productView: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
