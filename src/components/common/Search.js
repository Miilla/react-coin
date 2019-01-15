import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import Loading from '../common/Loading';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            loading: false,
            searchResults: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        this.setState({ [inputName]: inputValue });

        if (!inputValue) {
            return 'Input value is empty';
        }
        else
            this.setState({ loading: true });
        fetch(`${API_URL}/autocomplete?searchQuery=${inputValue}`)
            .then(handleResponse)
            .then((res) => {
                this.setState({ loading: false, searchResults: res });
            })
            .catch((err) => {
                this.setState({ loading: false });
                console.log(err)
            });
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if (!searchQuery) {
            return '';
        }

        if (searchResults.length > 0)
            return (
                <div className="Search-result-container">
                    {searchResults.map(result => (
                        <div
                            key={result.id}
                            className="Search-result"
                            onClick={() => this.handleRedirect(result.id)}
                        >
                            {result.name} ({result.symbol})
                    </div>
                    ))
                    }
                </div>
            )
        if (!loading)
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            )
    }

    handleRedirect(currencyId) {
        this.setState({
            searchQuery: '',
            searchResults: []
        });

        this.props.history.push(`/currency/${currencyId}`);
    }

    render() {
        const { loading, searchQuery } = this.state
        return (
            <div className="Search">
                <span className="Search-icon" />
                <input
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    name="searchQuery" onChange={this.handleChange}
                    value={searchQuery}
                />
                <div className="Search-loading">
                    {
                        loading &&
                        <Loading
                            width='12px'
                            height='12px'
                        />
                    }
                </div>
                {this.renderSearchResults()}
            </div >
        )
    }

}

export default withRouter(Search);