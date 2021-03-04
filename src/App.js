import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Loading from './components/Loading'
import NotFound from './components/NotFound'

import { PAGE_URLS } from './constants/url'

import './App.css';

const CreateBoard = lazy(() => import('./pages/create-board'))
const ViewBoard = lazy(() => import('./pages/board'))

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Suspense fallback={<Loading />} >
          <Switch>
            <Route exact path={PAGE_URLS.HOME} component={CreateBoard} />
            <Route exact path={PAGE_URLS.BOARD} component={ViewBoard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
