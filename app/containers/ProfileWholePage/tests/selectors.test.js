import { fromJS } from 'immutable';
import selectProfileWholePageDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfileWholePageDomain', () => {
    it('Expect selector select profileWholePage from state', () => {
        const selector = selectProfileWholePageDomain();
        const mock = fromJS({ profileWholePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
