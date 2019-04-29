import { fromJS } from 'immutable';
import selectAboutUsDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectAboutUsDomain', () => {
    it('Expect selector select aboutUs from state', () => {
        const selector = selectAboutUsDomain();
        const mock = fromJS({ aboutUs: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
