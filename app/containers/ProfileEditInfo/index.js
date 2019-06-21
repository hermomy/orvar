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

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Create } from '@material-ui/icons/';

import makeSelectProfileEditInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileEditInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        userData: apiRequest('/profile', 'get'),
        profileInfoConfig: [
            { label: 'PHOTO', default: 'Add a photo to personalise your account', action: <Avatar  /> },
            { label: 'NAME', dataPath: ['username'] },
            { label: 'LEVEL', dataPath: ['membership', 'name'] },
            { label: 'GENDER', dataPath: ['gender'], action: <Create /> },
            { label: 'EMAIL ADDRESS', dataPath: ['email'] },
            { label: 'BIRTH DATE', dataPath: ['birthday'], action: <Create /> },
        ],
        skinDetailConfig: [
            { label: 'SKIN TONE', dataPath: ['skin', 'tone', 'name'], action: <Create /> },
            { label: 'SKIN TYPE', dataPath: ['skin', 'type', 'name'], action: <Create /> },
            { label: 'SKIN CONCERN', action: <Create /> },
        ],
    }

    renderProfileInfoCard = (userData) => (
        <Card>
            <CardHeader
                title={
                    <div>
                        <Typography variant="subtitle1">Profile Info</Typography><br />
                        <Typography variant="body1" color="textSecondary">Your personal details are only for Hermo product services, it will not be reavealed to the public or other hermo users.</Typography>
                    </div>
                }
            />
            <CardContent>
                {
                    this.state.profileInfoConfig.map((config, i) => (
                        <div key={config.label}>
                            <Grid container={true} className="m-1">
                                <Grid item={true} lg={2} md={2} xs={12}><Typography variant="body2" color="textSecondary">{config.label}</Typography></Grid>
                                <Grid item={true} lg={9} md={9} xs={10}><Typography variant="body2">{config.dataPath ? dataChecking(userData.data, config.dataPath) : config.default}</Typography></Grid>
                                <Grid item={true} lg={1} md={1} xs={2}><IconButton size="small" onClick={() => { this.setState({ popup: !this.state.popup }); }}>{config.action}</IconButton></Grid>
                            </Grid>
                            {(this.state.profileInfoConfig.length - 1 !== i) ? <Divider /> : '' }
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )

    renderSkinDetailCard = (userData) => {
        const skinConcerns = userData.data.skin.concerns.map((concern) => concern.name);
        const concernList = skinConcerns.join(', ');

        return (
            <Card style={{ marginTop: '20px' }}>
                <CardHeader
                    title={
                        <div>
                            <Typography variant="subtitle1">Skin Details</Typography><br />
                            <Typography variant="body1" color="textSecondary">Get to know your skin and discover the best product for your concern.</Typography>
                        </div>
                    }
                />
                <CardContent>
                    {
                        this.state.skinDetailConfig.map((config, i) => (
                            <div key={config.label}>
                                <Grid container={true} className="m-1">
                                    <Grid item={true} md={2} xs={12}><Typography variant="body2" color="textSecondary">{config.label}</Typography></Grid>
                                    <Grid item={true} md={9} xs={10}><Typography variant="body2">{config.dataPath ? dataChecking(userData.data, config.dataPath) : concernList}</Typography></Grid>
                                    <Grid item={true} md={1} xs={1}><IconButton size="small" onClick={() => { this.setState({ popup: !this.state.popup }); }}>{config.action}</IconButton></Grid>
                                </Grid>
                                {(this.state.skinDetailConfig.length - 1 !== i) ? <Divider /> : '' }
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
        );
    }

    render() {
        return (
            <Container>
                <div align="center" className="m-3">
                    <Typography variant="subtitle1" display="block" gutterBottom={true}>Profile</Typography>
                    <Typography>Basic info, like your name, photo and your skin details</Typography>
                </div>
                <Async promise={this.state.userData}>
                    <Async.Loading><CircularProgress /></Async.Loading>
                    <Async.Resolved>
                        {(userData) => (
                            <div>
                                {this.renderProfileInfoCard(userData)}
                                {this.renderSkinDetailCard(userData)}
                            </div>
                        )}
                    </Async.Resolved>
                    <Async.Rejected>
                        <div>PLACEHOLDER FOR ERROR</div>
                    </Async.Rejected>
                </Async>
            </Container>
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
