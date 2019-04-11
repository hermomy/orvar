import { fromJS } from 'immutable';
import { selectProfilePageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectProfilePageDomain', () => {
    it('Expect selectProfilePageDomain to return state from reducer', () => {
        const selector = selectProfilePageDomain();
        const mock = fromJS({ ProfilePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
