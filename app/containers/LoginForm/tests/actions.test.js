
import {
    doLogin,
    doLogout,
    loginSuccess,
    loginFailed,
} from '../actions';
import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../constants';

describe('LoginForm actions', () => {
    describe('doLogin()', () => {
        it('has a type of LOGIN', () => {
            const expected = {
                type: LOGIN,
            };
            expect(doLogin()).toEqual(expected);
        });
    });

    describe('doLogout()', () => {
        it('has a type of LOGOUT', () => {
            const expected = {
                type: LOGOUT,
            };
            expect(doLogout()).toEqual(expected);
        });
    });

    describe('loginSuccess()', () => {
        it('has a type of LOGIN_SUCCESS', () => {
            const response = { token: '' };
            const expected = {
                type: LOGIN_SUCCESS,
                payload: response.token,
            };
            expect(loginSuccess(response)).toEqual(expected);
        });
    });

    describe('loginFailed()', () => {
        it('has a type of LOGIN_FAILED', () => {
            const expected = {
                type: LOGIN_FAILED,
                payload: undefined,
            };
            expect(loginFailed()).toEqual(expected);
        });
    });
});
