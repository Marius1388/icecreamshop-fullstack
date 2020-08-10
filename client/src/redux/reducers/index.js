import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';

export default combineReducers({
	orders: orderReducer,
	products: productReducer,
	error: errorReducer,
	auth: authReducer,
});
