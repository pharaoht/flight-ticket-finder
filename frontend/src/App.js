import store from './store';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import Flights from './containers/Flights/Flights';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';


const App = () => {
  let flightParams = [];
  //get flight data
  const flightDataProps = (data) => {
    flightParams = data;
  };

  return (
    <Provider store={store}>
      <Layout/>
      <Router>
        <Switch>
          <Route exact path='/' component={() => <Home flightParams={flightDataProps}/>}/>
          <Route path='/tickets' component={() => <Flights flightParams={flightParams}/>}/>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
