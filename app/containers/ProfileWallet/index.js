/**
 *
 * ProfileWallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NavigationTab from 'components/NavigationTab';

import makeSelectProfileWallet from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const a = [
    {
        title: 'home 1',
    },
    {
        title: 'home 2',
    },
];
export class ProfileWallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        tabVal: 0,
    }
    home1 = () => (
        <div>lorem 1</div>
    )

    home2 = () => (
        <div>home 2</div>
    )

    renderContents = () => {
        let b;
        switch (this.state.tabVal) {
            case 0:
                b = this.home1();
                break;
            case 1:
                b = this.home2();
                break;
            default:
                break;
        }

        return (
            <div>{b}</div>
        );
    }

    render() {
        return (
            <div>
                <NavigationTab
                    data={a}
                    renderTabID={(tabVal) => this.setState({ tabVal })}
                />
                {this.renderContents()}
            </div>
        );
    }
}

ProfileWallet.propTypes = {
    dispatch: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    profileWallet: makeSelectProfileWallet(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWallet', reducer });
const withSaga = injectSaga({ key: 'profileWallet', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileWallet);
