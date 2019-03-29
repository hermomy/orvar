/**
 *
 * HerListing
 *
 */

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import makeSelectHerListing from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';
import { getData,
         getPage,
} from './actions';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';

export class HerListing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        listView: false,
    };

    componentWillMount() {
        this.props.dispatch(getData());
    }

    Paging = () => {
        const data = dataChecking(this.props, 'herlisting', 'data', 'product', 'result');
        if (!data || !data._meta) {
            return null;
        }
        return (
            <Pagination
                dpatch={(page) => {
                    this.props.dispatch(getPage(page));
                }}
                meta={data._meta}
                link={data._links}
            />
        );
    }

    sort = (event) => {
        this.props.dispatch(getPage(`${this.props.herlisting.data.product._links.self.href}?sort=${event.target.value}`));
        console.log(event.target.value);
    }


    render() {
        console.log(this.props);

        if (this.props.herlisting.loading) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            );
        }

        return (
            <div className="container">
                <Helmet>
                    <title>HerListing</title>
                    <meta name="description" content="Description of HerListing" />
                </Helmet>
                <FormattedMessage {...messages.header} />
                <img alt="topPicture" />
                <div>
                    <p>xinshanlinzhixuan</p>
                    <p>ydsajondfsfdjjgjgjfjgjgjffdkfdkg</p>
                </div>
                <input type="submit" onClick={() => { this.setState({ listView: !this.state.listView }); }} value="grid/list" />
                {this.Paging()}
                <div>
                    <select className="sorter" onChange={(value) => { this.setState({ sortValue: value }); this.sort(value); }} >
                        {
                            dataChecking(this.props, 'herlisting', 'data', 'sort', 'items') ?
                            this.props.herlisting.data.sort.items.map((sort) =>
                            (
                                <option key={sort.id} value={sort.id}>{sort.text}</option>
                            ))
                            :
                            null
                        }
                    </select>
                    {/* {
                        dataChecking(this.props, 'herlisting', 'data', 'sort', 'items') ?
                        this.props.herlisting.data.sort.items.map((sort) =>
                        (
                            <p onClick={() => this.sort(sort.id)} >{sort.text}</p>
                        ))
                        :
                        null
                    } */}
                </div>
                <div className={`${this.state.listView ? 'list_view' : 'grid_view'}`}>
                    {
                        dataChecking(this.props, 'herlisting', 'data', 'product', 'result', 'items') ?
                        this.props.herlisting.data.product.result.items.map((product) =>
                            (
                                <div className={`product-card-div ${this.state.listView ? 'list_view_component' : 'grid_view_component'}`}>
                                    <ProductCard
                                        product={product}
                                        listViewMode={this.state.listView}
                                    />
                                </div>
                        )) : null
                    }
                </div>
            </div>
        );
    }
}
// <i class="fa fa-heart-o" aria-hidden="true"></i>

HerListing.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    herlisting: makeSelectHerListing(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'herListing', reducer });
const withSaga = injectSaga({ key: 'herListing', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HerListing);
