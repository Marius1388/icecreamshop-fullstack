import {
	GET_PRODUCTS_START,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAILURE,
} from '../constants';

const initialState = {
	products: [],
	loading: false,
	errorMessage: undefined,
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS_START:
			return {
				...state,
				loading: true,
			};
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload,
			};
		case GET_PRODUCTS_FAILURE:
			return {
				...state,
				loading: false,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
}
