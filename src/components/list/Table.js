import React from 'react';
import PropsTypes from 'prop-types';
import './Table.css';

const Table = (props) => {
    const { currencies, _renderChangeProcent} = props;

    return(
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {currencies.map((currency) => (
                        <tr key={currency.id}>
                            <td>
                                <span className="Table-rank">{currency.rank}</span>
                                {currency.name}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.price}
                            </td>
                            <td>
                                <span className="Table-dolar">$</span>
                                {currency.marketCap}
                            </td>
                            <td>
                                {_renderChangeProcent(currency.percentChange24h)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
}

Table.propsTypes = {
    currencies: PropsTypes.array.isRequired,
    _renderChangeProcent: PropsTypes.func.isRequired,
}

export default Table;