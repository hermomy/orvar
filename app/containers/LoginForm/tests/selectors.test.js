import { fromJS } from 'immutable';
import {
    selectSession,
    makeSelectAuthError,
    makeSelectAuthLoading,
} from '../selectors';

describe('Session Selectors', () => {
    it('Expect select from LoginForm', () => {
        const loginState = fromJS({});
        const mock = fromJS({ LoginForm: loginState });
        expect(selectSession(mock)).toEqual(loginState);
    });
});

describe('Auth Selectors', () => {
    it('Expect select error LoginForm', () => {
        const selector = makeSelectAuthError();
        const errorState = fromJS({
            error: false,
        });
        const mock = fromJS({ LoginForm: errorState });
        expect(selector(mock)).toEqual(errorState.get('error'));
    });

    it('Expect select loading LoginForm', () => {
        const selector = makeSelectAuthLoading();
        const loadingSelector = fromJS({
            loading: false,
        });
        const mock = fromJS({ LoginForm: loadingSelector });
        expect(selector(mock)).toEqual(loadingSelector.get('loading'));
    });
});
