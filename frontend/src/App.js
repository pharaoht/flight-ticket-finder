import store from './store';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './hocs/Layout';


const App = () => {
  return (
    <Provider store={store}>
      <Layout/>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
