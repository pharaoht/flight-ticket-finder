import store from './store';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import Flights from './containers/Flights/Flights';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';


const App = () => {
  let flightDataObj = [];
  //get flight data
  const flightDataProps = (data) => {
    flightDataObj = data;
  }   

  return (
    <Provider store={store}>
      <Layout/>
      <Router>
        <Switch>
          <Route exact path='/' component={() => <Home flightdata={flightDataProps}/>}/>
          <Route path='/tickets' component={() => <Flights ticInfo={flightDataObj}/>}/>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
