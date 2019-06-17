/**
 *
 * ProfileEditInfo
 *
 */

import React from 'react';
import { apiRequest, dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import Async from 'assets/react-async';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavTab from 'components/NavigationTab';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import {
    Create,
    Person,
} from '@material-ui/icons/';

import makeSelectProfileEditInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileEditInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        userData: apiRequest('/profile', 'get'),
        profileInfoConfig: [
            { label: 'PHOTO', default: 'Add a photo to personalise your account', action: <Avatar onClick={() => console.log} /> },
            { label: 'NAME', dataPath: ['username'] },
            { label: 'LEVEL', dataPath: ['membership', 'name'] },
            { label: 'GENDER', dataPath: ['gender'], action: <Create onClick={() => console.log} /> },
            { label: 'EMAIL ADDRESS', dataPath: ['email'] },
            { label: 'BIRTH DATE', dataPath: ['birthday'], action: <Create onClick={() => console.log} /> },
        ],
        // skindetailsConfig: [],
    }

    renderProfileInfoCard = (userData) => (
        <Card className="infoCard">
            <CardHeader
                avatar={
                    <Person style={{ color: 'F8E1E7', marginBottom: '20px' }} />
                }
                title={
                    <div align="left">
                        <Typography variant="subtitle1">Profile Info</Typography><br />
                        <Typography variant="body1" style={{ color: '#808080' }}>Your personal details are only for Hermo product services, it will not be reavealed to the public or other hermo users.</Typography>
                    </div>
                }
            />
            <CardContent>
                <List>
                    {
                        this.state.profileInfoConfig.map((config) => (
                            <ListItem key={config.label}>
                                <ListItemText primary={<Typography>{config.label}</Typography>} />
                                <ListItemText style={{ align: 'left' }} primary={<Typography>{config.dataPath ? dataChecking(userData.data, config.dataPath) : config.default}</Typography>} />
                                {config.action ? <ListItemIcon>{config.action}</ListItemIcon> : '' }
                            </ListItem>
                        ))
                    }
                </List>
            </CardContent>
        </Card>
    )

    render() {
        return (
            <div align="center" className="container">
                <NavTab
                    tabs={[
                        {
                            title: 'Profile Info',
                            description: (
                                <div align="center">
                                    <Typography>Profile</Typography>
                                    <br />
                                    <Typography>Basic info, like your name, photo and your skin details</Typography>
                                </div>
                            ),
                            content: (
                                <div>
                                    <Async promise={this.state.userData}>
                                        <Async.Loading><CircularProgress /></Async.Loading>
                                        <Async.Resolved>
                                            {
                                                (userData) => this.renderProfileInfoCard(userData)
                                            }
                                        </Async.Resolved>
                                        <Async.Rejected>
                                            <div>PLACEHOLDER FOR ERROR</div>
                                        </Async.Rejected>
                                    </Async>
                                </div>
                            ),
                        },
                        {
                            title: 'Skin Details',
                            content: (
                                <div>
                                    <h3>Skin line 1</h3>
                                    <h1>Skin line 2</h1>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        );
    }
}

ProfileEditInfo.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileEditInfo: makeSelectProfileEditInfo(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileEditInfo', reducer });
const withSaga = injectSaga({ key: 'profileEditInfo', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileEditInfo);
