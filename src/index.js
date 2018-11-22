import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import './index.css';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';
import Details from './components/details/Details';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={List} exact />
                    <Route path="/currency/:id" component={Details} exact />
                    <Route component={NotFound}  />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)