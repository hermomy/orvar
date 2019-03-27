
import {
    doLogin,
    doLogout,
    loginSuccess,
    loginFailed,
} from '../actions';
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
} from '../constants';

describe('LoginForm actions', () => {
    describe('doLogin()', () => {
        it('has a type of AUTH_LOGIN', () => {
            const expected = {
                type: AUTH_LOGIN,
            };
            expect(doLogin()).toEqual(expected);
        });
    });

    describe('doLogout()', () => {
        it('has a type of AUTH_LOGOUT', () => {
            const expected = {
                type: AUTH_LOGOUT,
            };
            expect(doLogout()).toEqual(expected);
        });
    });

    describe('loginSuccess()', () => {
        it('has a type of AUTH_LOGIN_SUCCESS', () => {
            const response = { token: '' };
            const expected = {
                type: AUTH_LOGIN_SUCCESS,
                payload: response.token,
            };
            expect(loginSuccess(response)).toEqual(expected);
        });
    });

    describe('loginFailed()', () => {
        it('has a type of AUTH_LOGIN_FAILED', () => {
            const expected = {
                type: AUTH_LOGIN_FAILED,
                payload: undefined,
            };
            expect(loginFailed()).toEqual(expected);
        });
    });
});
