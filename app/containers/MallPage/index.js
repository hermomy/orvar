/**
 *
 * MallPage
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, apiRequest } from 'globalUtils';
import Async from 'assets/react-async';
import ProductCard from 'components/ProductCard';
import PageChanger from 'components/PageChanger';
import FilterSort from 'components/FilterSort';

import makeSelectMallPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const getMallData = (API) => {
    // TODO: pageNum handling on page load
    if (API.firstTime) {
        return apiRequest(API.URL, 'get');
    }
    return null;
};

const gpProductCard = async (API) => {
    if (!API.firstTime) {
        await apiRequest(API.URL, 'post');
    }
    return apiRequest(API.URL, 'get');
};

export class MallPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        categoryOfFrontUrl: '',
        listView: false,
        getMall: {
            URL: '',
            firstTime: true,
        },
        getProduct: {
            URL: '',
        },
        postWishlist: {
            URL: '',
            runpermit: true,
        },
    }

    componentWillMount() {
        let dispatchlink = this.props.location.search.replace('?', '');
        dispatchlink += `${dispatchlink === '' ? '' : '&'}page=${dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}`;

        const params = this.props.match.params;

        if (dataChecking(params, 'subCategoryQueries')) {
            // Object.assign(this.state.getMall, { URL: `/subcategory/${this.props.match.params.subCategoryQueries.split('-')[0]}` });
            dispatchlink += `&subcategory_id=${this.props.match.params.subCategoryQueries.split('-')[0]}`;
            this.setState({
                categoryOfFrontUrl: `&subcategory_id=${this.props.match.params.subCategoryQueries.split('-')[0]}`,
                getMall: { URL: `/subcategory/${this.props.match.params.subCategoryQueries.split('-')[0]}`, firstTime: true },
            });
        } else if (dataChecking(params, 'categoryQueries')) {
            dispatchlink += `&category_id=${this.props.match.params.categoryQueries.split('-')[0]}`;
            this.setState({
                categoryOfFrontUrl: `&category_id=${this.props.match.params.categoryQueries.split('-')[0]}`,
                getMall: { URL: `/category/${this.props.match.params.categoryQueries.split('-')[0]}`, firstTime: true },
            });
        } else if (dataChecking(params, 'groupName')) {
            let groupId = '';
            switch (this.props.match.params.groupName) {
                case 'skin-care':
                    groupId = 1;
                    break;
                case 'make-up':
                    groupId = 2;
                    break;
                case 'fragrance':
                    groupId = 3;
                    break;
                case 'bath-and-body':
                    groupId = 4;
                    break;
                case 'set-item':
                    groupId = 5;
                    break;
                case 'hair':
                    groupId = 6;
                    break;
                case 'beauty-and-wellness':
                    groupId = 7;
                    break;
                default:
                    break;
            }
            dispatchlink += `&group_id=${groupId}`;
            this.setState({
                categoryOfFrontUrl: `&group_id=${groupId}`,
                getMall: { URL: `/group/${groupId}`, firstTime: true },
            });
        } else {
            this.setState({ getMall: { URL: '/mall', firstTime: true } });
        }
        Object.assign(this.state.getProduct, { URL: `/mall/list?${dispatchlink}` });
    }

    changePageData = (link) => {
        this.setState({ getProduct: { URL: link } });
    }

    changePageUI = (link, pageNum) => {
        const urlFrontPart = this.props.location.pathname.replace('/mall', '').replace('/page-', 'page=');
        const urlBehindPart = this.props.location.search.replace('?', '');
        let url = `?${urlFrontPart}${urlBehindPart}`;

        if (dataChecking(this.props.history, 'push') && dataChecking(this.props.location, 'pathname')) {
            this.props.location.pathname.split('/').forEach((param) => {
                const arr = param.split('-');
                if (arr && arr[0] === 'page') {
                    url = this.props.location.pathname.replace(param, `page-${pageNum}`);
                } else {
                    url = `${this.props.location.pathname}${`${this.props.location.pathname}`.slice(-1) === '/' ? '' : '/'}page-${pageNum}`;
                }
            });
            this.props.history.push(`${url}${this.props.history.location.search}`);
        }
    }

    changeFilterData = (newKey, newId) => {
        let urlBehindPart = this.props.location.search.replace('?', '');
        const urlAfterSpilitByAnd = urlBehindPart.split('&');
        let alreadyExist = false;
        let filterCount = 0;
        Object.values(urlAfterSpilitByAnd).forEach((searchKey) => {
            const keyAndIdInUrl = searchKey.split('=');
            if (keyAndIdInUrl[0] === 'category_id' ||
                keyAndIdInUrl[0] === 'subcategory_id' ||
                keyAndIdInUrl[0] === 'group_id' ||
                keyAndIdInUrl[0] === 'brand_id' ||
                keyAndIdInUrl[0] === 'country_code') {
                filterCount++;
            }
            if (keyAndIdInUrl[0] === newKey && `${keyAndIdInUrl[1]}` === `${newId}`) {
                urlBehindPart = urlBehindPart.replace(`${newKey}=${newId}&`, '');
                urlBehindPart = urlBehindPart.replace(`&${newKey}=${newId}`, '');
                urlBehindPart = urlBehindPart.replace(`${newKey}=${newId}`, '');
                alreadyExist = true;
            }
        });
        if (!alreadyExist) {
            urlBehindPart += `${this.props.location.search === '' ? '' : '&'}${newKey}=${newId}`;
        }
        if (filterCount === 1 && alreadyExist) {
            this.setState({ getProduct: { URL: `/mall/list?${urlBehindPart}${urlBehindPart === '' ? '' : '&'}${this.state.categoryOfFrontUrl}` } });
        } else {
            this.setState({ getProduct: { URL: `/mall/list?${urlBehindPart}` } });
        }
    }

    changeFilterUI = (newKey, newId) => {
        let urlBehindPart = this.props.location.search.replace('?', '');

        const urlAfterSpilitByAnd = urlBehindPart.split('&');
        let alreadyExist = false;
        Object.values(urlAfterSpilitByAnd).forEach((searchKey) => {
            const keyAndIdInUrl = searchKey.split('=');
            if (keyAndIdInUrl[0] === newKey && `${keyAndIdInUrl[1]}` === `${newId}`) {
                urlBehindPart = urlBehindPart.replace(`${newKey}=${newId}&`, '');
                urlBehindPart = urlBehindPart.replace(`&${newKey}=${newId}`, '');
                urlBehindPart = urlBehindPart.replace(`${newKey}=${newId}`, '');
                alreadyExist = true;
            }
        });
        if (!alreadyExist) {
            urlBehindPart += `${this.props.location.search === '' ? '' : '&'}${newKey}=${newId}`;
        }
        this.props.history.push(`${this.props.location.pathname.replace(`/page-${this.props.match.params.pageNum}`, '/page-1')}?${urlBehindPart}`);
    }

    changeSortUI = (oldSortId, newSortId) => {
        let urlBehindPart = this.props.location.search.replace('?', '');
        if (urlBehindPart.indexOf('sort=') !== -1) {
            urlBehindPart = urlBehindPart.replace(`sort=${oldSortId}`, `sort=${newSortId}`);
        } else {
            urlBehindPart += `${this.props.location.search === '' ? '' : '&'}sort=${newSortId}`;
        }
        this.props.history.push(`${this.props.location.pathname.replace(`/page-${this.props.match.params.pageNum}`, '/page-1')}?${urlBehindPart}`);
    }

    changeSortData = (oldSortId, newSortId) => {
        let urlBehindPart = this.props.location.search.replace('?', '');
        const urlAfterSpilitByAnd = urlBehindPart.split('&');
        let filterCount = 0;
        if (urlBehindPart.indexOf('sort=') !== -1) {
            urlBehindPart = urlBehindPart.replace(`sort=${oldSortId}`, `sort=${newSortId}`);
        } else {
            urlBehindPart += `${this.props.location.search === '' ? '' : '&'}sort=${newSortId}`;
        }
        Object.values(urlAfterSpilitByAnd).forEach((searchKey) => {
            const keyAndIdInUrl = searchKey.split('=');
            if (keyAndIdInUrl[0] === 'category_id' || keyAndIdInUrl[0] === 'subcategory_id' || keyAndIdInUrl[0] === 'group_id') {
                filterCount++;
            }
        });
        if (filterCount === 0) {
            this.setState({ getProduct: { URL: `/mall/list?${urlBehindPart}${this.state.categoryOfFrontUrl === '' ? '' : '&'}${this.state.categoryOfFrontUrl}` } });
        } else {
            this.setState({ getProduct: { URL: `/mall/list?${urlBehindPart}` } });
        }
    }

    renderPageChanger = (data) => {
        const productData = data.data;
        return (
            <PageChanger
                productData={productData}
                pagenum={dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}
                changePage={(link, pageNum) => { this.changePageData(link, pageNum); this.changePageUI(link, pageNum); }}
            />
        );
    }

    renderProductCard = (data) => (
        data.data.items.map((item) => (
            <div
                key={item.id}
                className="product-card-div"
            >
                <ProductCard
                    key={item.id}
                    product={item}
                    url={item.url}
                    image={true}
                    feature={true}
                    rating={true}
                    listViewMode={this.state.listView} // this.props.dispatch(postWishlist(item.id, this.props.mallPage.data.productData._links.self.href))}
                    allowWishlistButton={true}
                    addOrDeleteWishlist={() => { this.setState({ postWishlist: { URL: `/wishlist/${item.id}`, runpermit: false } }); }}
                    disableElevation={true}
                />
            </div>
        ))
    );

    renderFilterSort = (data) => (
        <FilterSort
            sorts={data.data.sort.items}
            changeSort={(oldSortId, newSortId) => { this.changeSortData(oldSortId, newSortId); this.changeSortUI(oldSortId, newSortId); }}
            filters={data.data.filters}
            changeFilter={(newKey, newId) => { this.changeFilterData(newKey, newId); this.changeFilterUI(newKey, newId); }}
            location={this.props.location}
        />
    )

    render() {
        return (
            <div className="container">
                <Async promise={getMallData(this.state.getMall)}>
                    <Async.Loading>
                        <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                    </Async.Loading>
                    <Async.Resolved>
                        {
                            (data) => (
                                <div>
                                    <img className="banner" src="https://cdn5.hermo.my/hermo/imagelink/2019/april-2019-loreal-paris_01554085356.jpg" alt="" />
                                    <div>
                                        <div className="view-button">
                                            <input type="button" onClick={() => { this.setState({ listView: !this.state.listView }); }} value="grid/list" />
                                        </div>
                                    </div>
                                    <div className="sort-filter-container">
                                        {this.renderFilterSort(data)}
                                    </div>
                                    <Async promise={gpProductCard(this.state.getProduct, this.state.postWishlist)}>
                                        <Async.Loading>
                                            <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                                        </Async.Loading>
                                        <Async.Resolved>
                                            {
                                                (productdata) => (
                                                    <div>
                                                        {this.renderPageChanger(productdata)}
                                                        <div className={`${this.state.listView ? 'list-view' : 'grid-view'}`}>
                                                            {this.renderProductCard(productdata)}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Async.Resolved>
                                        <Async.Rejected>
                                            { console.error }
                                        </Async.Rejected>
                                    </Async>
                                    <div>
                                        <span className="next-page-bottom" onClick={() => { this.changePageData(this.props.mallPage.data.productData._links.self.href); this.changePageUI(this.props.mallPage.data.productData._links.self.href, (this.props.mallPage.data.productData._meta.currentPage + 1)); }}>Next Page</span>
                                    </div>
                                </div>
                            )
                        }
                    </Async.Resolved>
                    <Async.Rejected>
                        { console.error }
                    </Async.Rejected>
                </Async>
            </div>
        );
    }
}

MallPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    mallPage: makeSelectMallPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mallPage', reducer });
const withSaga = injectSaga({ key: 'mallPage', saga });

export default compose(
    withRouter,
    withReducer,
    withSaga,
    withConnect,
)(MallPage);
