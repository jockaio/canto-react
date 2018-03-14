import React from 'react';
import ReactDOM from 'react-dom';
import Callback from './components/Callback';
import Profile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

const Root = () => {
  return (
    <div>
      <Router history={browserHistory}>
        <div className="container">
            <Route path="/" component={Dashboard}/>
            <Route path="/callback" component={Callback} />
            <Route path="/myprofile" component={Profile} onEnter={requireAuth} />
        </div>
      </Router>
    </div>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));