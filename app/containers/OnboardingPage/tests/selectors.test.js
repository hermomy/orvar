import { fromJS } from 'immutable';
import { selectOnboardingPageDomain } from '../selectors';
import { initialState } from '../reducer';

describe('selectOnboardingPageDomain', () => {
    it('Expect selectOnboardingPageDomain to return state from reducer', () => {
        const selector = selectOnboardingPageDomain();
        const mock = fromJS({ OnboardingPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
