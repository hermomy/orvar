import { fromJS } from 'immutable';
import selectProfilePageDomain from '../selectors';
import { initialState } from '../reducer';

describe('selectProfilePageDomain', () => {
    it('Expect selector select profilePage from state', () => {
        const selector = selectProfilePageDomain();
        const mock = fromJS({ profilePage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
