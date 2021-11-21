import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/LoginPage/Login';
import PrivateRoute from './Components/LoginPage/privateRoute';
import StudentsBioData from './Components/StudentsBioData/StudentsBioData';
import StudentsPaymentData from './Components/StudentsPaymentData/StudentsPaymentData';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/bioData'>
            <StudentsBioData />
          </PrivateRoute>
          <PrivateRoute path='/payment'>
            <StudentsPaymentData />
          </PrivateRoute>
          <Route exact path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
