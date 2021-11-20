import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/LoginPage/Login';
import StudentsBioData from './Components/StudentsBioData/StudentsBioData';
import StudentsPaymentData from './Components/StudentsPaymentData/StudentsPaymentData';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/bioData'>
          <StudentsBioData />
        </Route>
        <Route path='/payment'>
          <StudentsPaymentData />
        </Route>
        <Route exact path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
