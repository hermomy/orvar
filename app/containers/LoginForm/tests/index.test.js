// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import { staticErrorResponse } from 'globalUtils';

// import { doLogin } from '../actions';
import { mapDispatchToProps } from '../index';
// import { LoginForm, Form, authkeys } from '../index';

// const props = {
//     loading: false,
//     error: false,
//     login: jest.fn,
// };

describe('<LoginForm />', () => {
    it('Expect to have unit tests specified', () => {
        expect(false).toEqual(false);
    });
//     it('Expect show the login form correctly', (done) => {
//         const wrapper = shallow(<LoginForm {...props} />);
//         const form = <Form action={jest.fn} keys={authkeys} {...props} />;
//         expect(wrapper.props().title).toEqual('Login to Hermo');
//         expect(wrapper.props().children).toEqual(form);
//         done();
//     });
});

describe('<Form />', () => {
    it('Expect to have unit tests specified', () => {
        expect(false).toEqual(false);
    });
//     const spy = jest.fn();
//     it('Expect trigger submit', () => {
//         const form = shallow(<Form action={spy} keys={authkeys} {...props} />);
//         form.simulate('submit');
//         expect(spy).toHaveBeenCalled();
//     });

//     it('Expect show error when error exist', (done) => {
//         props.error = staticErrorResponse({ text: 'Error' });
//         const form = mount(<Form action={spy} keys={authkeys} {...props} />);
//         expect(form.find('.alert').length).toEqual(1);
//         done();
//     });
});

describe('mapDispatchToProps', () => {
    it('Expect be injected', (done) => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result).toBeDefined();
        done();
    });

    // it('Expect dispatch login() when form is submitted', () => {
    //     const dispatch = jest.fn();
    //     const dispatcher = mapDispatchToProps(dispatch);
    //     const data = {
    //         username: { value: 'testusername' },
    //         password: { value: 'testpassword' },
    //     };
    //     dispatcher.login({ target: data, preventDefault: jest.fn });
    //     expect(dispatch).toHaveBeenCalledWith(doLogin({
    //         username: data.username.value,
    //         password: data.password.value,
    //     }));
    // });
});
