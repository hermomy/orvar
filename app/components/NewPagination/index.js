/**
*
* NewPagination
*
*/

import React from 'react';
import './style.scss';

class NewPagination extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="pagination">
                {
                    this.props.link.prev ?
                        <a className="pagination-word" onClick={() => { this.props.dpatch(this.props.link.prev.href); }}>&lt;</a>
                        :
                        <span className="disablePagiBtn">&lt;</span>
                }
                {
                    this.props.meta.currentPage >= 3 ?
                        <a className="pagination-word" onClick={() => { this.props.dptach(this.props.link.first.href); }}>1</a>
                        :
                        null
                }
                {
                    this.props.meta.currentPage >= 4 ?
                        <span className="pagination-word">...</span>
                        :
                        null
                }
                {
                    this.props.link.prev ?
                        <a className="pagination-word" onClick={() => { this.props.dpatch(this.props.link.prev.href); }}>{this.props.meta.currentPage - 1}</a>
                        :
                        null
                }
                {
                    this.props.link.self ?
                        <span className="pagination-active-word">{this.props.meta.currentPage}</span>
                        :
                        null
                }
                {
                    this.props.meta.currentPage !== this.props.meta.pageCount ?
                        <a className="pagination-word" onClick={() => { this.props.dpatch(this.props.link.next.href); }}>{this.props.meta.currentPage + 1}</a>
                        :
                        null
                }
                {
                    this.props.meta.pageCount - this.props.meta.currentPage < 3 ?
                        null
                        :
                        <span className="pagination-word">...</span>
                }
                {
                    this.props.meta.pageCount - this.props.meta.currentPage >= 2 ?
                        <a className="pagination-word" onClick={() => { this.props.dpatch(this.props.link.last.href); }}>{this.props.meta.pageCount}</a>
                        :
                        null
                }
                {
                    this.props.link.next ?
                        <a className="pagination-word" onClick={() => { this.props.dpatch(this.props.link.next.href); }}>&gt;</a>
                        :
                        <span className="disablePagiBtn">&gt;</span>
                }
            </div>
        );
    }
}

NewPagination.propTypes = {
};

export default NewPagination;

/* <NewPagination
    dpatch={(page) => {
        this.props.dispatch(getPage(page));
    }}
    meta={data._meta}
    link={data._links}
/> */
