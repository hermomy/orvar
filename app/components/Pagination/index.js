/**
*
* NewPagination
*
*/

import React from 'react';
import './style.scss';

class Pagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="pagination">
                {
                    this.props.link.prev ?
                        <a className="word pagination-word" onClick={() => { this.props.dpatch(this.props.link.prev.href); }}>&lt;</a>
                        :
                        <span className="word disable-pagi-btn">&lt;</span>
                }
                {
                    this.props.meta.currentPage >= 3 ?
                        <a className="word pagination-word" onClick={() => { this.props.dpatch(this.props.link.first.href); }}>1</a>
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
                        <a className="word pagination-word" onClick={() => { this.props.dpatch(this.props.link.prev.href); }}>{this.props.meta.currentPage - 1}</a>
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
                        <a className="word pagination-word" onClick={() => { this.props.dpatch(this.props.link.next.href); }}>{this.props.meta.currentPage + 1}</a>
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
                        <a className="word pagination-word" onClick={() => { this.props.dpatch(this.props.link.last.href); }}>{this.props.meta.pageCount}</a>
                        :
                        null
                }
                {
                    this.props.link.next ?
                        <a className="word pagination-word" onClick={() => { this.props.dpatch(this.props.link.next.href); }}>&gt;</a>
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
