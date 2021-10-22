import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './component/Game';
import NotFound from './component/NotFound';
import Start from './component/LandingPage';
import './style/global.scss'

const App: React.FC<{}> = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Start} />
                    <Route path="/game" component={Game} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </div>
  );
}

export default App;
