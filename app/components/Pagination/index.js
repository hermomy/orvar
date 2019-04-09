/**
*
* Pagination
*
*/

import React from 'react';
import { dataChecking } from 'globalUtils';
import { getData } from 'containers/HerListing/actions';

import './style.scss';

class Pagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        currentPage: this.props.currentPage,
    }
    componentWillMount() {
        if (this.state.currentPage !== 1) {
            this.props.parentProps.dispatch(getData('mallList', null, `${this.props.parentProps.herlisting.data.product._links.self.href}?page=${this.state.currentPage}`));
        }
    }

    onClickPagi = (targetApi, targetPage) => {
        this.props.parentProps.dispatch(getData('mallList', null, targetApi));
        this.setState({ currentPage: targetPage });
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
    }

    render() {
        return (
            <div className="pagination">
                {
                    this.props.link.prev ?
                        <a
                            className="word pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.prev.href, this.props.meta.currentPage - 1); }}
                        >&lt;</a>
                        :
                        <span className="word disable-pagi-btn">&lt;</span>
                }
                {
                    this.props.meta.currentPage >= 3 ?
                        <a
                            className="word pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.first.href, 1); }}
                        >1</a>
                        :
                        null
                }
                {
                    this.props.meta.currentPage >= 4 ?
                        <span className="word pagination-word">...</span>
                        :
                        null
                }
                {
                    this.props.link.prev ?
                        <a
                            className="word pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.prev.href, this.props.meta.currentPage - 1); }}
                        >{this.props.meta.currentPage - 1}</a>
                        :
                        null
                }
                {
                    this.props.link.self ?
                        <span className="word pagination-active-word">{this.props.meta.currentPage}</span>
                        :
                        null
                }
                {
                    this.props.meta.currentPage !== this.props.meta.pageCount ?
                        <a
                            className="word pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.next.href, this.props.meta.currentPage + 1); }}
                        >{this.props.meta.currentPage + 1}</a>
                        :
                        null
                }
                {
                    this.props.meta.pageCount - this.props.meta.currentPage < 3 ?
                        null
                        :
                        <span className="word pagination-word">...</span>
                }
                {
                    this.props.meta.pageCount - this.props.meta.currentPage >= 2 ?
                        <a
                            className="word pagination-word"
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
                            className="word pagination-word"
                            onClick={() => { this.onClickPagi(this.props.link.next.href, this.props.meta.currentPage + 1); }}
                        >&gt;</a>
                        :
                        <span className="word disable-pagi-btn">&gt;</span>
                }
            </div>
        );
    }
}

Pagination.propTypes = {
};

export default Pagination;
