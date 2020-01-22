import React from 'react';
import styled from 'styled-components';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Game from '../pages/Game';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import reduxStore from '../redux';
import Menu from '../components/Menu';
import Ranking from '../pages/Ranking';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

function Routes() {
  return (
    <ReduxProvider store={reduxStore}>
      <BrowserRouter>
        <Menu />
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <PrivateRoute path='/game' component={Game} />
            <Route path='/ranking' component={Ranking} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default Routes;
