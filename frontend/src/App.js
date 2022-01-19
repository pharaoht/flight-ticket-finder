import store from './store';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import Flights from './containers/Flights/Flights';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';


const App = () => {

  return (
    <Provider store={store}>
      <Layout/>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/tickets/:from_airport/:to_airport/:depart_date/:return_date/' component={Flights}/>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
