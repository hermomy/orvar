/**
*
* PageChanger
*
*/

import React from 'react';
// import styled from 'styled-components';
import './style.scss';

class PageChanger extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        activatedPage: this.props.pagenum,
    }

    changePage = (link, pageNum) => {
        this.props.changePage(link, pageNum);
        this.setState({ activatedPage: pageNum });
    }

    renderPageChanger = () => {
        // if (this.props.productData._meta.pageCount <= 1) {
        //     return null;
        // }
        const link = this.props.productData._links;
        const meta = this.props.productData._meta;
        return (
            <div>
                {
                    link.prev ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.changePage(link.prev.href, meta.currentPage - 1); }}
                        >&lt;</a>
                        :
                        <span className="paginator-button disable-pagi-btn">&lt;</span>
                }
                {
                    meta.currentPage >= 3 ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.changePage(link.first.href, 1); }}
                        >1</a>
                        :
                        null
                }
                {
                    meta.currentPage >= 4 ?
                        <span className="paginator-button pagination-word">...</span>
                        :
                        null
                }
                {
                    link.prev ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.changePage(link.prev.href, meta.currentPage - 1); }}
                        >{meta.currentPage - 1}</a>
                        :
                        null
                }
                {
                    link.self ?
                        <span className={`paginator-button pagination-active-word ${`${this.state.activatedPage}` === `${meta.currentPage}` ? 'activated' : ''}`}>{meta.currentPage}</span>
                        :
                        null
                }
                {
                    meta.currentPage !== meta.pageCount ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.changePage(link.next.href, meta.currentPage + 1); }}
                        >{meta.currentPage + 1}</a>
                        :
                        null
                }
                {
                    meta.pageCount - meta.currentPage < 3 && meta.currentPage !== 1 ?
                        null
                        :
                        <span className="paginator-button pagination-word">...</span>
                }
                {
                    meta.pageCount - meta.currentPage >= 2 ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.changePage(link.last.href, meta.pageCount); }}
                        >
                            {meta.pageCount}
                        </a>
                        :
                        null
                }
                {
                    link.next ?
                        <a
                            className="paginator-button pagination-word"
                            onClick={() => { this.changePage(link.next.href, meta.currentPage + 1); }}
                        >&gt;</a>
                        :
                        <span className="paginator-button disable-pagi-btn">&gt;</span>
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderPageChanger()}
            </div>
        );
    }
}

PageChanger.propTypes = {

};

export default PageChanger;
