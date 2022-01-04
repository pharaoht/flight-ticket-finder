import Home from './containers/Home/Home';
import Navbar from '../src/components/Navbar/Navbar';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Home></Home>
    </>
  );
}

export default App;
