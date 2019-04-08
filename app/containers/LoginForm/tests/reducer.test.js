import { fromJS } from 'immutable';
import loginFormReducer from '../reducer';

import {
    doLogin,
    // doLogout,
    loginSuccess,
    loginFailed,
} from '../actions';

describe('loginFormReducer', () => {
    let state;
    const responseSuccess = { token: '123' };
    const responseFailed = true;
    beforeEach(() => {
        state = fromJS({
            loading: false,
            error: false,
            loginSuccess: false,
        });
    });

    it('Expect return the initial state', (done) => {
        const expectedResult = state;
        expect(loginFormReducer(undefined, {})).toEqual(fromJS(expectedResult));
        done();
    });

    // describe('login');

    // Login
    it('Expect show loading when trying to login', (done) => {
        const expected = state.set('loading', true);
        expect(loginFormReducer(state, doLogin())).toEqual(expected);
        done();
    });

    // it('Expect show loading when trying to logout', (done) => {
    //     const expected = state.set('loading', false);
    //     expect(loginFormReducer(state, doLogout())).toEqual(expected);
    //     done();
    // });

    it('Expect set loading false when success', (done) => {
        const expected = state.set('loading', false).set('error', false).set('loginSuccess', true);
        expect(loginFormReducer(state, loginSuccess(responseSuccess))).toEqual(expected);
        done();
    });

    it('Expect show error if login failed', (done) => {
        const expected = state.set('loading', false).set('error', true);
        expect(loginFormReducer(state, loginFailed(responseFailed))).toEqual(expected);
        done();
    });

    // it('Expect reset session when logout success', (done) => {
    //     // TODO: test for reset session
    //     const expected = state.set('loading', false).set('error', false);
    //     expect(loginFormReducer(state, doLogout())).toEqual(expected);
    //     done();
    // });
});
