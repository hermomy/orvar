/**
 *
 * ProfileReview
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


import makeSelectProfileReview from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getReview, postReview } from './actions';
import Rate from '../../components/Rate';

export class ProfileReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        reviewData: null,
    }

    componentWillMount() {
        this.props.dispatch(getReview(''));
    }

    insertRateDataToReviewData = (mark, id) => {
        const obj = { ...this.state.reviewData };
        obj[`${id}`] = mark;
        this.setState({ reviewData: obj });
    }

    submitReview = (id, item) => {
        if (document.getElementById(`textarea_${id}`).value.replace(/\s+/g, '').length >= 30) {
            const obj = { ...this.state.reviewData };

            if (obj[`${id}`]) {
                this.props.dispatch(postReview(obj[`${id}`].mark, document.getElementById(`textarea_${id}`).value, item));
            } else {
                alert('rating must be given');
            }
        } else {
            alert('Comment  should contain atleast 30 words');
        }
    }

    renderReviewList = () => {
        if (!dataChecking(this.props, 'profileReview', 'data', 'reviewData')) {
            return null;
        }
        return this.props.profileReview.data.reviewData.items.map((item) => (
            <div key={item.id} style={{ marginTop: '3rem' }}>
                <img src={item.image.small} alt="" />
                <span>{item.display_name}</span>
                <textarea rows="5" cols="20" placeholder="Write your review" id={`textarea_${item.id}`} />
                <span>Rate your product</span>
                <Rate
                    rating={-1}
                    giveRate={(mark) => { this.insertRateDataToReviewData(mark, item.id); }}
                />
                <input type="button" onClick={() => this.submitReview(item.id, item)} value="Submit Review" />
            </div>
        ));
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderReviewList()}
            </div>
        );
    }
}

ProfileReview.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileReview: makeSelectProfileReview(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileReview', reducer });
const withSaga = injectSaga({ key: 'profileReview', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileReview);
