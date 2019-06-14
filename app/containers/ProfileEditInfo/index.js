/**
 *
 * ProfileEditInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavTab from 'components/NavigationTab';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import makeSelectProfileEditInfo from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileEditInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderInfoCard = () => {
        console.log();
        return (
            <Card className="infoCard">
                <CardContent>
                    <List
                        subheader={
                            <div>
                                <Typography>test subheader</Typography>
                                <Typography>caption</Typography>
                            </div>
                        }
                    >
                        <ListItem>
                            <ListItemText primary="PHOTO" />
                            <ListItemText primary="Add a photo to personalize your account" />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        );
    }

    render() {
        return (
            <div className="container">
                <NavTab
                    tabs={[
                        {
                            title: 'Profile Info',
                            content: (
                                <div>
                                    <div align="center">
                                        <Typography>Profile</Typography>
                                        <Typography>Basic info, like your name, photo and your skin details</Typography>
                                    </div>
                                    {this.renderInfoCard()}
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
