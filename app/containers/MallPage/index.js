/**
 *
 * MallPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';
import ProductCard from 'components/ProductCard';
import PageChanger from 'components/PageChanger';
import FilterSort from 'components/FilterSort';

import makeSelectMallPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getMall, getProduct, postWishlist } from './actions';

export class MallPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        selectedSort: null,
        categoryOfFrontUrl: '',
        listView: false,
        bukatutup: true,
    }

    componentWillMount() {
        let dispatchlink = this.props.location.search.replace('?', '');
        dispatchlink += `${dispatchlink === '' ? '' : '&'}page=${dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}`;

        const params = this.props.match.params;

        if (dataChecking(params, 'subCategoryQueries')) {
            this.props.dispatch(getMall(`/subcategory/${this.props.match.params.subCategoryQueries.split('-')[0]}`));
            dispatchlink += `&subcategory_id=${this.props.match.params.subCategoryQueries.split('-')[0]}`;
            this.setState({ categoryOfFrontUrl: `&subcategory_id=${this.props.match.params.subCategoryQueries.split('-')[0]}` });
        } else if (dataChecking(params, 'categoryQueries')) {
            this.props.dispatch(getMall(`/category/${this.props.match.params.categoryQueries.split('-')[0]}`));
            dispatchlink += `&category_id=${this.props.match.params.categoryQueries.split('-')[0]}`;
            this.setState({ categoryOfFrontUrl: `&category_id=${this.props.match.params.categoryQueries.split('-')[0]}` });
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
            this.props.dispatch(getMall(`/group/${groupId}`));
            dispatchlink += `&group_id=${groupId}`;
            this.setState({ categoryOfFrontUrl: `&group_id=${groupId}` });
        } else {
            this.props.dispatch(getMall('/mall'));
        }

        this.props.dispatch(getProduct(`/mall/list?${dispatchlink}`));
    }

    changePageData = (link) => {
        this.props.dispatch(getProduct(link));
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
            if (keyAndIdInUrl[0] === 'category_id' || keyAndIdInUrl[0] === 'subcategory_id' || keyAndIdInUrl[0] === 'group_id') {
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
            this.props.dispatch(getProduct(`/mall/list?${urlBehindPart}${urlBehindPart === '' ? '' : '&'}${this.state.categoryOfFrontUrl}`));
        } else {
            this.props.dispatch(getProduct(`/mall/list?${urlBehindPart}`));
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
        if (this.props.urlType === 'normalurl') {
            if (urlBehindPart.indexOf('sort=') !== -1) {
                urlBehindPart = urlBehindPart.replace(`sort=${oldSortId}`, `sort=${newSortId}`);
            } else {
                urlBehindPart += `${this.props.location.search === '' ? '' : '&'}sort=${newSortId}`;
            }
            this.props.history.push(`${this.props.location.pathname.replace(`/page-${this.props.match.params.pageNum}`, '/page-1')}?${urlBehindPart}`);
        }
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
            this.props.dispatch(getProduct(`/mall/list?${urlBehindPart}${urlBehindPart === '' ? '' : '&'}${this.state.categoryOfFrontUrl}`));
        } else {
            this.props.dispatch(getProduct(`/mall/list?${urlBehindPart}`));
        }
    }

    renderPageChanger = () => {
        if (!dataChecking(this.props, 'mallPage', 'data', 'productData')) {
            return null;
        }
        const productData = this.props.mallPage.data.productData;
        return (
            <PageChanger
                productData={productData}
                urlType={this.props.urlType}
                location={this.props.location}
                history={this.props.history}
                pagenum={dataChecking(this.props, 'match', 'params', 'pageNum') ? this.props.match.params.pageNum : 1}
                changePage={(link, pageNum) => { this.changePageData(link, pageNum); this.changePageUI(link, pageNum); }}
            />
        );
    }

    renderProductCard = () => {
        if (!dataChecking(this.props, 'mallPage', 'data', 'productData')) {
            return null;
        }
        return this.props.mallPage.data.productData.items.map((item) => (
            <div
                key={item.id}
                className={'product-card-div'}
            >
                <ProductCard
                    key={item.id}
                    product={item}
                    review={item.review}
                    url={item.url}
                    price={dataChecking(item, 'price')}
                    allowDelete={false}
                    listViewMode={!this.state.listView}
                    allowWishlistButton={true}
                    addOrDeleteWishlist={() => this.props.dispatch(postWishlist(item.id, this.props.mallPage.data.productData._links.self.href))}
                />
            </div>

        ));
    }

    renderFilterSort = () => {
        if (!dataChecking(this.props, 'mallPage', 'data', 'originalMallData')) {
            return null;
        }
        return (
            <FilterSort
                sorts={this.props.mallPage.data.originalMallData.sort.items}
                changeSort={(oldSortId, newSortId) => { this.changeSortData(oldSortId, newSortId); this.changeSortUI(oldSortId, newSortId); }}
                filters={this.props.mallPage.data.originalMallData.filters}
                changeFilter={(newKey, newId) => { this.changeFilterData(newKey, newId); this.changeFilterUI(newKey, newId); }}
                location={this.props.location}
            />
        );
    }

    render() {
        console.log(this.props);
        return (
            <div className="container">
                {
                    dataChecking(this.props, 'mallPage', 'loading') && !dataChecking(this.props, 'mallPage', 'data') ?
                        <img className="herlisting-loading content-loading" src={require('images/preloader-02.gif')} alt="" />
                        :
                        <div>
                            <img className="banner" src="https://cdn5.hermo.my/hermo/imagelink/2019/april-2019-loreal-paris_01554085356.jpg" alt="" />

                            <div>
                                <div className="view-button">
                                    <input type="button" onClick={() => { this.setState({ listView: !this.state.listView }); }} value="grid/list" />
                                </div>
                                {this.renderPageChanger()}
                            </div>
                            <div className="sort-filter-container">
                                {this.renderFilterSort()}
                            </div>
                            <div className={`${this.state.listView ? 'list-view' : 'grid-view'}`}>
                                {this.renderProductCard()}
                            </div>
                            <div>
                                <span className="next-page-bottom" onClick={() => { this.changePageData(this.props.mallPage.data.productData._links.self.href); this.changePageUI(this.props.mallPage.data.productData._links.self.href, (this.props.mallPage.data.productData._meta.currentPage + 1)); }}>Next Page</span>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

MallPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
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
