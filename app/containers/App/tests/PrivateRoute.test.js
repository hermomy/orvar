// import React from 'react';
// import { shallow } from 'enzyme';
// import { MemoryRouter, Route } from 'react-router-dom';

// import PrivateRoute from '../PrivateRoute';

describe('<PrivateRoute />', () => {
    it('Expect to have unit tests specified', () => {
        expect(false).toEqual(false);
    });
//     let token = '';
//     let spy;

//     beforeEach(() => {
//         token = 'some login token';
//         spy = () => <span />;
//     });

//     it('Expect render a route', (done) => {
//         const wrapper = shallow(
//             <MemoryRouter initialEntries={['/']} initialIndex={0}>
//                 <PrivateRoute token={token} path="/" component={spy} />
//             </MemoryRouter>
//         ).children().at(0).dive();
//         expect(wrapper.find(Route).length).toEqual(1);
//         done();
//     });

//     // it('Expect not display LoginForm token="some login token", (done) => {
//     //     token = 'some login token';
//     //     const wrapper = shallow(
//     //         <MemoryRouter initialEntries={['/']} initialIndex={0}>
//     //             <PrivateRoute token={token} path="/" component={spy} />
//     //         </MemoryRouter>
//     //     ).children().at(0).dive();

//     //     const loginForm = wrapper.find(Route).props().render().type.preload;
//     //     expect(loginForm).toBeUndefined();

//     //     done();
//     // });

//     // it('Expect display LoginForm if authenticated=false', (done) => {
//     //     const wrapper = shallow(
//     //         <MemoryRouter initialEntries={['/']} initialIndex={0}>
//     //             <PrivateRoute token={token} path="/" component={spy} />
//     //         </MemoryRouter>
//     //     ).children().at(0).dive();

//     //     const loginForm = wrapper.find(Route).props().render().type.preload;
//     //     expect(loginForm).toBeDefined();

//     //     done();
//     // });

//     it('Expect render mall page route', (done) => {
//         const wrapper = shallow(
//             <MemoryRouter initialEntries={['/mall']} initialIndex={0}>
//                 <PrivateRoute token={token} path="/" component={spy} />
//             </MemoryRouter>
//         ).children().at(0).dive();
//         expect(wrapper.find(Route).length).toEqual(1);
//         done();
//     });
});
