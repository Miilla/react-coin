import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };
    }

    componentDidMount() {
        this._getData();
    }

    _getData() {
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                const { currencies, totalPages } = data;
                this.setState({ totalPages, currencies, loading: false });
            })
            .catch((error) => {
                this.setState({ error: error.errorMessage, loading: false });
            });
    }

    _renderChangeProcent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        }
        else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        }
        else return <span >{percent}</span>
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => this._getData());
    }

    render() {
        const { loading, error, currencies, page, totalPages } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div>
                <Table currencies={currencies} _renderChangeProcent={this._renderChangeProcent} />
                <Pagination page={page} totalPages={totalPages} handlePaginationClick={this.handlePaginationClick} />
            </div>
        )
    }
}

export default List;

//udilia.com/docs/cryptocurrencies/v1
