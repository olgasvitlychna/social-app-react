import React, { useState, useEffect } from 'react';
import './App.css';

import PopUp from './Pop-up';

import Navigations from './Navigation'


import Login from './Login';
import SignUp from './SignUp';
import Posts from './Posts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {

    setTimeout(() => {

      setModalActive(true)


    },
      10000)
  }, [])


  // console.log(user);
  return (
    <Router>
      <div className="App">

        <Navigations user={user} setUser={setUser} />

        {!user &&
          <div>
            {modalActive && <PopUp closeModal={setModalActive} />}

          </div>
        }

        <Switch>
          <Route path='/posts'>
            <Posts />
          </Route>
          <Route path='/login'>
            <Login setUser={setUser} />
          </Route>
          <Route path='/signUp'>
            <SignUp />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;