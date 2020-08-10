import {
	GET_ORDERS,
	ADD_ORDER_SUCCESS,
	ADD_ORDER_START,
	ADD_ORDER_FAILURE,
	EDIT_ORDER,
	DELETE_ORDER,
	ORDERS_LOADING,
	FETCH_ORDER,
	FETCH_ORDER_START,
	FETCH_ORDER_FAILURE,
} from '../constants';

const initialState = {
	selectedOrder: {},
	orders: [],
	sending: false,
	errorMessage: undefined,
};

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ORDERS:
			return {
				...state,
				orders: action.payload,
				loading: false,
			};
		case DELETE_ORDER:
			return {
				...state,
				orders: state.orders.filter((order) => order._id !== action.payload),
			};
		case ADD_ORDER_START:
			return {
				...state,
				sending: true,
			};
		case ADD_ORDER_SUCCESS:
			return {
				...state,
				orders: [action.payload, ...state.orders],
				sending: false,
			};
		case ADD_ORDER_FAILURE:
			return {
				...state,
				sending: false,
				error: action.payload,
			};
		case EDIT_ORDER:
			const updatedOrders = state.orders.map((order) => {
				if (order._id === action.payload._id) {
					order = action.payload;
				}
				return order;
			});
			return {
				...state,
				orders: updatedOrders,
			};
		case FETCH_ORDER_START:
			return {
				...state,
			};
		case FETCH_ORDER:
			return {
				...state,
				selectedOrder: state.orders.filter(
					(order) => order._id === action.payload._id
				)[0],
			};
		case FETCH_ORDER_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case ORDERS_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
