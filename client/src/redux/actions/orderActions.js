// import fetchingData from '../../apis/fetchingData';
import axios from 'axios';
import { tokenConfig } from './authActions';
import history from '../../history';

import {
	GET_ORDERS,
	ADD_ORDER_START,
	ADD_ORDER_SUCCESS,
	ADD_ORDER_FAILURE,
	EDIT_ORDER,
	DELETE_ORDER,
	ORDERS_LOADING,
	FETCH_ORDER,
	FETCH_ORDER_START,
	FETCH_ORDER_FAILURE,
} from '../constants';
import { returnErrors } from './errorActions';

export const getOrders = () => (dispatch) => {
	dispatch(setOrdersLoading());
	axios
		.get('/api')
		.then((res) =>
			dispatch({
				type: GET_ORDERS,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const addOrderAsync = (order) => async (dispatch, getState) => {
	dispatch({ type: ADD_ORDER_START });
	try {
		// const response = await fetchingData.post(
		const response = await axios.post('/api', order, tokenConfig(getState));
		const data = await response.data;
		// console.log(JSON.stringify(data) + 'after await');
		dispatch({ type: ADD_ORDER_SUCCESS, payload: data });
		history.push('/');
	} catch (error) {
		const errorResponse = error.response.data || 'Something went wrong';

		dispatch({ type: ADD_ORDER_FAILURE, payload: errorResponse });
	}
};

export const fetchOrder = (id) => async (dispatch) => {
	dispatch({ type: FETCH_ORDER_START });
	try {
		const response = await axios.get(`/api/${id}`);
		const data = await response.data;
		dispatch({ type: FETCH_ORDER, payload: data });
	} catch (error) {
		const errorResponse = error.response || 'Something went wrong';

		dispatch({ type: FETCH_ORDER_FAILURE, payload: errorResponse });
	}
};

export const editOrder = (order) => (dispatch) => {
	axios
		.put(`/api/${order._id}`, order)
		.then((res) =>
			dispatch({
				type: EDIT_ORDER,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		)
		.finally(history.push('/'));
};

export const deleteOrder = (id) => (dispatch) => {
	axios
		.delete(`/api/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_ORDER,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const setOrdersLoading = () => {
	return {
		type: ORDERS_LOADING,
	};
};
