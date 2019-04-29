import { fromJS } from 'immutable';
import { selectAboutUsDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectAboutUsDomain', () => {
    it('Expect selectAboutUsDomain to return state from reducer', () => {
        const selector = selectAboutUsDomain();
        const mock = fromJS({ AboutUs: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
