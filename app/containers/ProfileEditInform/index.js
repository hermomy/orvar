/**
 *
 * ProfileEditInform
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';

import makeSelectProfileEditInform from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getInformChoice, getUserInform } from './actions';

export class ProfileEditInform extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        datestyle: 'show',
    }

    componentWillMount() {
        this.props.dispatch(getInformChoice());
        this.props.dispatch(getUserInform());
    }

    renderForm = () => {
        if (!dataChecking(this.props, 'profileEditInform', 'data', 'InformChoiceData') || !dataChecking(this.props, 'profileEditInform', 'data', 'UserInformData')) {
            return null;
        }
        const user = this.props.profileEditInform.data.UserInformData;
        const choice = this.props.profileEditInform.data.InformChoiceData;
        return (
            <div>
                <span>Username</span>
                <input type="text" disabled={true} value={user.username} />
                <span>User Level</span>
                <input type="text" disabled={true} value={user.membership.name} />
                <span>Email Address</span>
                <input type="text" disabled={true} value={user.email} />
                <select>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <span>Email Address</span>
                <input type="text" disabled={true} value={user.email} />
                {
                    this.state.datestyle === 'show' ?
                        <div>
                            <input type="text" disabled={true} value={user.email} /><i className="fa fa-calendar" aria-hidden="true" onClick={() => this.setState({ datestyle: 'edit' })}></i>
                        </div>
                        :
                        <div>
                            <select>
                                <option value="Month">Month</option><option value="Jan">Jan</option><option value="Feb">Feb</option>
                                <option value="Mar">Mar</option><option value="Apr">Apr</option><option value="May">May</option>
                                <option value="Jun">Jun</option><option value="Jul">Jul</option><option value="Aug">Aug</option>
                                <option value="Sep">Sep</option><option value="Oct">Oct</option><option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>
                            </select>
                        </div>
                }
                <span>Skin Tone</span>
                {
                    choice.skin_tone.items.map((item) => (
                        <div>
                            <input type="radio" value={item} checked={item.id === user.skin.tone.id} />{item.name}
                        </div>
                    ))
                }
                <span>Skin Type</span>
                {
                    choice.skin_type.items.map((item) => (
                        <div>
                            <input type="radio" value={item} checked={item.id === user.skin.type.id} />{item.name}
                        </div>
                    ))
                }
                <span>Skin Concern</span>
                {
                    choice.skin_problem.items.map((item) => (
                        <div>
                            <input type="checkbox" value={item} checked={user.skin.concerns.items.includes(item)} />{item.name}
                        </div>
                    ))
                }
            </div>
        );
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }
}

ProfileEditInform.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileEditInform: makeSelectProfileEditInform(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileEditInform', reducer });
const withSaga = injectSaga({ key: 'profileEditInform', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileEditInform);
