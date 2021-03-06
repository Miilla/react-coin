import React from 'react';
import { API_URL } from '../../config';
import { handleResponse, _renderChangeProcent } from '../../helpers';
import Loading from '../common/Loading'
import './Details.css';



class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: {},
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        const currencyId = this.props.match.params.id;
        this.setState({ loading: true })
        this.getData(currencyId);

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const newCurrencyId = nextProps.match.params.id;
            this.getData(newCurrencyId);

        }
    }

    getData(currencyId) {
        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then((currency) => {
                this.setState({
                    loading: false,
                    error: null,
                    currency
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    error: err.errorMessage
                })
            })
    }

    render() {
        const { loading, error, currency } = this.state;

        if (loading) {
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            )
        }
        if (error) {
            return <div className="error">{error}</div>
        }

        return (
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name} ({currency.symbol})
                </h1>
                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currency.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">$ {currency.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H Change <span className="Detail-value">{_renderChangeProcent(currency.percentChange24h)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">
                            Market cap
                        </span>
                        <span className="Detail-dollar">
                            $
                        </span>
                        {currency.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">
                            24H Valume
                        </span>
                        <span className="Detail-dollar">
                            $
                        </span>
                        {currency.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">
                            Total supply
                        </span>
                        {currency.totalSupply}
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;