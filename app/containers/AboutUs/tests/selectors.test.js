import { fromJS } from 'immutable';
import makeSelectAboutUs from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectAboutUs', () => {
    it('Expect makeSelectAboutUs to return state from reducer', () => {
        const selector = makeSelectAboutUs();
        const mock = fromJS({ aboutUs: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
