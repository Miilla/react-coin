import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types'

const Pagination = (props) => {
    const { page, totalPages, handlePaginationClick } = props;
    return (
        <div className="Pagination">
            <button
                className="Pagination-button"
                onClick={() => handlePaginationClick('back')}
                disabled={(page <= 0) ? true : false}
            >
                &larr;
            </button>
            <span className="Pagination-info">
                page <b>{page}</b> of <b>{totalPages}</b>
            </span>
            <button
                className="Pagination-button"
                onClick={() => handlePaginationClick('next')}
                disabled={(page >= totalPages) ? true : false}
            >
                &rarr;
            </button>
        </div>
    )
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    handlePaginationClick: PropTypes.func.isRequired
}

export default Pagination;