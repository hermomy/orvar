

import React from 'react';
import { dataChecking } from 'globalUtils';
import { getData } from 'containers/HerListing/actions';

import './style.scss';

class Pagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        activatedPage: null,
    }

    componentWillMount() {
        if (this.props.isHerlisting) {
            if (this.props.goToPage && this.props.goToPage !== 1) {
                let selfApiUrl = this.props.parentProps.herlisting.data.product.result._links.self.href;
                if (selfApiUrl.indexOf('page=') !== -1) {
                    selfApiUrl = selfApiUrl.replace(`page=${this.props.parentProps.herlisting.data.product.result._meta.currentPage}`, `page=${this.props.goToPage}`);
                } else {
                    selfApiUrl += `${selfApiUrl.indexOf('?' !== -1) ? '&' : '?'}page=${this.props.goToPage}`;
                }
                this.props.parentProps.dispatch(getData(
                    '', // path
                    'mallList', // datatype
                    selfApiUrl,
                ));
            }

            if (dataChecking(this.props, 'meta', 'currentPage')) {
                this.setState({ activatedPage: this.props.meta.currentPage });
            }
        } else if (!this.props.isHerlisting) {
            this.setState({ activatedPage: 1 });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isHerlisting) {
            if (nextProps.goToPage && nextProps.goToPage !== this.props.goToPage) {
                this.props.parentProps.dispatch(getData('', 'mallList', `${this.props.parentProps.herlisting.data.product._links.self.href}?page=${nextProps.goToPage}`));
            }

            if (dataChecking(nextProps, 'meta', 'currentPage') && dataChecking(nextProps, 'meta', 'currentPage') !== dataChecking(this.props, 'meta', 'currentPage')) {
                this.setState({ activatedPage: nextProps.meta.currentPage });
            }
        } else if (!this.props.isHerlisting) {
            this.setState({ activatedPage: nextProps.meta.currentPage });
        }
    }

    onClickPagi = (targetApi, targetPage) => {
        if (this.props.isHerlisting) {
            this.props.parentProps.dispatch(getData('', 'mallList', targetApi));
            this.setState({ activatedPage: null });
            let newPathName = '';

            if (dataChecking(this.props.parentProps, 'history', 'push') && dataChecking(this.props.parentProps, 'location', 'pathname')) {
                this.props.parentProps.location.pathname.split('/').forEach((param) => {
                    const arr = param.split('-');
                    if (arr && arr[0] === 'page') {
                        newPathName = this.props.parentProps.location.pathname.replace(param, `page-${targetPage}`);
                    } else {
                        newPathName = `${this.props.parentProps.location.pathname}/page-${targetPage}`;
                    }
                });
                this.props.parentProps.history.push(`${newPathName}${this.props.parentProps.history.location.search}`);
            }
        } else if (!this.props.isHerlisting) {
            this.props.callBack(targetPage);
            this.setState({ activatedPage: targetPage });
        }
    }

    render() {
        return (
            <div className="pagination">
                {
                    this.props.link.prev ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.prev.href, this.props.meta.currentPage - 1); }}
                        >&lt;</a>
                        :
                        <span className="paginator-button disable-pagi-btn">&lt;</span>
                }
                {
                    this.props.meta.currentPage >= 3 ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.first.href, 1); }}
                        >1</a>
                        :
                        null
                }
                {
                    this.props.meta.currentPage >= 4 ?
                        <span className="paginator-button pagination-word">...</span>
                        :
                        null
                }
                {
                    this.props.link.prev ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.prev.href, this.props.meta.currentPage - 1); }}
                        >{this.props.meta.currentPage - 1}</a>
                        :
                        null
                }
                {
                    this.props.link.self ?
                        <span className={`paginator-button pagination-active-word ${`${this.state.activatedPage}` === `${this.props.meta.currentPage}` ? 'activated' : ''}`}>{this.props.meta.currentPage}</span>
                        :
                        null
                }
                {
                    this.props.meta.currentPage !== this.props.meta.pageCount ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.next.href, this.props.meta.currentPage + 1); }}
                        >{this.props.meta.currentPage + 1}</a>
                        :
                        null
                }
                {
                    this.props.meta.pageCount - this.props.meta.currentPage < 3 ?
                        null
                        :
                        <span className="paginator-button pagination-word">...</span>
                }
                {
                    this.props.meta.pageCount - this.props.meta.currentPage >= 2 ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.last.href, this.props.meta.pageCount); }}
                        >
                            {this.props.meta.pageCount}
                        </a>
                        :
                        null
                }
                {
                    this.props.link.next ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.next.href, this.props.meta.currentPage + 1); }}
                        >&gt;</a>
                        :
                        <span className="paginator-button disable-pagi-btn">&gt;</span>
                }
            </div>
        );
    }
}

Pagination.propTypes = {
};

export default Pagination;
