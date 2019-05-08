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
import { NavLink } from 'react-router-dom';
import Pagination from 'components/Pagination';

import makeSelectProfileReview from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getReview, postReview } from './actions';
import Rate from '../../components/Rate';

export class ProfileReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        reviewData: null,
        category: '/mall/reviewable?reviewed=0&per-page=5',
    }

    componentWillMount() {
        this.props.dispatch(getReview('/mall/reviewable?reviewed=0&per-page=5', 'reviewData'));
    }

    insertRateDataToReviewData = (mark, id) => {
        const obj = { ...this.state.reviewData };
        obj[id] = mark;
        this.setState({ reviewData: obj });
    }

    submitReview = (id, item) => {
        if (document.getElementById(`textarea_${id}`).value.replace(/\s+/g, '').length >= 30) {
            const obj = { ...this.state.reviewData };

            if (obj[id]) {
                this.props.dispatch(postReview(obj[id].mark, document.getElementById(`textarea_${id}`).value, item));
            } else {
                alert('rating must be given');
            }
        } else {
            alert('Comment  should contain atleast 30 words');
        }
    }

    renderPendingReviewList = () => {
        if (!dataChecking(this.props, 'profileReview', 'data', 'reviewData')) {
            return null;
        }
        return this.props.profileReview.data.reviewData.items.map((item) => (
            <div key={item.id} className="ProfileReview-review-container">
                <div className="ProfileReview-review-image">
                    <NavLink to={`${item.url ? `${item.url}` : '/mall'}`} >
                        <img src={item.image.small} alt="" />
                    </NavLink>
                </div>
                <div className="ProfileReview-review-content">
                    <span>{item.display_name}</span><br />
                    <textarea rows="5" cols="40" placeholder="Write your review" id={`textarea_${item.id}`} /><br />
                    <span>Rate your product</span>
                    <Rate
                        rating={-1}
                        giveRate={(mark) => { this.insertRateDataToReviewData(mark, item.id); }}
                    />
                </div>
                <input type="button" onClick={() => this.submitReview(item.id, item)} value="Submit Review" />
            </div>
        ));
    }

    renderReviewedList = () => {
        if (!dataChecking(this.props, 'profileReview', 'data', 'reviewedData')) {
            return null;
        }
        return this.props.profileReview.data.reviewedData.items.map((item) => (
            <div key={item.id} style={{ marginTop: '3rem' }}>
                <NavLink to={`${item.id ? `/mall/${item.id}` : '/mall'}`} >
                    <img src={item.product.image.small} alt="" />
                </NavLink>
                <span>{item.display_name}</span>
                <span>You said....</span>
                <span>{item.comment}</span>
                <span>Your Rate</span>
                <Rate
                    rating={item.rating}
                />
                <span>{item.status}</span>
            </div>
        ));
    }

    renderPagination = () => {
        if (this.state.category === '/mall/reviewable?reviewed=0&per-page=5' && dataChecking(this.props, 'profileReview', 'data', 'reviewData', '_meta') && this.props.profileReview.data.reviewData._meta.pageCount > 1) {
            return (
                <Pagination
                    parentProps={this.props}
                    meta={this.props.profileReview.data.reviewData._meta}
                    link={this.props.profileReview.data.reviewData._links}
                    goToPage={1}
                    isHerlisting={false}
                    callBack={(targetpage) => { this.props.dispatch(getReview('mall/reviewable?reviewed=0&per-page=5', 'reviewData', targetpage)); }}
                />
            );
        } else if (this.state.category === '/review/by-me?per-page=5' && dataChecking(this.props, 'profileReview', 'data', 'reviewedData', '_meta') && this.props.profileReview.data.reviewedData._meta.pageCount > 1) {
            return (
                <Pagination
                    parentProps={this.props}
                    meta={this.props.profileReview.data.reviewedData._meta}
                    link={this.props.profileReview.data.reviewedData._links}
                    goToPage={1}
                    isHerlisting={false}
                    callBack={(targetpage) => { this.props.dispatch(getReview('/review/by-me?per-page=5', 'reviewedData', targetpage)); }}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <input type="button" onClick={() => { this.props.dispatch(getReview('/mall/reviewable?reviewed=0&per-page=5', 'reviewData')); this.setState({ category: '/mall/reviewable?reviewed=0&per-page=5' }); }} value="pending review" />
                <input type="button" onClick={() => { this.props.dispatch(getReview('/review/by-me?per-page=5', 'reviewedData')); this.setState({ category: '/review/by-me?per-page=5' }); }} value="reviewed" />
                {this.renderPagination()}
                {this.state.category === '/mall/reviewable?reviewed=0&per-page=5' ? this.renderPendingReviewList() : null}
                {this.state.category === '/review/by-me?per-page=5' ? this.renderReviewedList() : null}
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
