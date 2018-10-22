import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/common/Header';
import './index.css'

const App = ()=>{
    return (
    <div className="body">
        <Header/>
        <h1> React Coin </h1>
        <p> Up to date crypto currencies financial data </p>
    </div>    
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)