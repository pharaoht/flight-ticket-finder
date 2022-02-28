import store from './store';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import Destinations from './containers/Destinations/Destinations.jsx';
import Flights from './containers/Flights/Flights';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';
import {FlightContextProvider} from './Context/flight-context';
import Modal from 'react-modal';
import Login from './containers/Login/Login';
import Error from './containers/404/Error';

Modal.setAppElement('#root')
const App = () => {

  return (
    <Provider store={store}>
      <Router>
      <Layout/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/destinations/' component={Destinations} />
          <Route path='/login/' component={Login} />
          <FlightContextProvider>
            <Route path='/tickets/:from_airport/:to_airport/:depart_date/:return_date?' component={Flights}/>
          </FlightContextProvider>
          <Route path='*' component={Error} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
