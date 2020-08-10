import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import OrderInput from './components/OrderInput';
import OrdersList from './components/OrdersList';
import AppNavbar from './components/AppNavbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import OrderEdit from './components/OrderEdit';

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Provider store={store}>
				<div>
					<AppNavbar></AppNavbar>
					<Switch>
						<Route exact path="/" component={OrdersList} />
						<Route exact path="/orders/new" component={OrderInput} />
						<Route exact path="/orders/edit/:id" component={OrderEdit} />
					</Switch>
				</div>
			</Provider>
		);
	}
}

export default App;
