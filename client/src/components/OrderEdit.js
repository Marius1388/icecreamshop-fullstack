import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { getProductsStartAsync } from '../redux/actions/productActions';
import { editOrder, fetchOrder } from '../redux/actions/orderActions';

class OrderEdit extends React.Component {
	state = {
		userId: '',
		flavour: '',
		numberOfScoops: '',
		pricePerScoop: '',
		totalCost: '',
	};

	onSelect = (e) => {
		let obj = JSON.parse(e.target.value);
		const { user } = this.props;
		this.setState({
			userId: user._id,
			flavour: obj.name,
			pricePerScoop: obj.pricePerScoop,
			numberOfScoops: null,
			totalCost: null,
		});
	};

	onChange = (e) => {
		const price = this.state.pricePerScoop;
		this.setState({
			numberOfScoops: e.target.value,
			totalCost: e.target.value * price,
		});
	};

	onSubmitForm = (e) => {
		e.preventDefault();
		const { editOrder } = this.props;
		const isAuthenticated = this.props.isAuthenticated;

		const editedOrder = {
			_id: this.props.match.params.id,
			userId: this.state.userId,
			flavour: this.state.flavour,
			numberOfScoops: parseInt(this.state.numberOfScoops),
			pricePerScoop: this.state.pricePerScoop,
			totalCost: this.state.totalCost,
		};

		//Edit order via editOrder action
		if (this.state.flavour && this.state.numberOfScoops) {
			this.setState({ msg: null });
			// console.log(`trying to add order: ${JSON.stringify(newOrder)}`);
			if (!isAuthenticated) {
				this.setState({ msg: 'Please log in to edit order' });
			} else {
				editOrder(editedOrder);
			}
		} else {
			this.setState({ msg: 'Please enter all fields' });
		}
	};

	componentDidMount() {
		const { getProductsStartAsync } = this.props;
		getProductsStartAsync();
		const { fetchOrder } = this.props;
		fetchOrder(this.props.match.params.id);
		// console.log(`id to fetch is ${this.props.match.params.id}`);
	}

	render() {
		// console.log(this.props);
		const { products } = this.props.products;
		const selectedOrder = this.props.selectedOrder;

		if (!selectedOrder) {
			return (
				<div>
					<h3>
						please, head back to the list of orders and click on the "edit" button
						next to the order you want to edit
					</h3>
					<Link to="/">Go to list</Link>
				</div>
			);
		}
		return (
			<div className="container w-50">
				<h1>Edit your order that had the flavour:</h1>
				<h2>{selectedOrder.flavour}</h2>
				{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
				<Form
					className="form w-75"
					onSubmit={this.onSubmitForm}
					onKeyPress={() => (e) => {
						e.key === 'Enter' && e.preventDefault();
					}}
				>
					<FormGroup>
						<Label for="flavour">Select Flavour </Label>
						<Input
							type="select"
							name="flavour"
							id="flavourSelect"
							onClick={this.onSelect}
						>
							<option defaultValue="- Pick one -">Pick one !</option>
							{products.map((product) => (
								<option key={product._id} value={JSON.stringify(product)}>
									{product.name}
								</option>
							))}
						</Input>
					</FormGroup>
					<FormGroup>
						<p> The price / scoop is: ${this.state.pricePerScoop}</p>
					</FormGroup>

					<FormGroup>
						<Label for="numberOfScoops"> Number of Scoops </Label>
						<Input
							type="number"
							name="numberOfScoops"
							id="numberOfScoops"
							min="0"
							className="w-50"
							onChange={this.onChange}
						></Input>
					</FormGroup>
					<FormGroup>
						<h2> Your total is ${this.state.totalCost}</h2>
					</FormGroup>
					{this.props.isAuthenticated ? (
						<Button color="dark" className="d-flex justify-content-center">
							Edit Order
						</Button>
					) : null}
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.auth.user,
	selectedOrder: state.orders.selectedOrder,
	orders: state.orders,
	// selectedOrder: state.orders[ownProps.match.params.id],
	products: state.products,
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	fetchOrder: (id) => dispatch(fetchOrder(id)),
	editOrder: (order) => dispatch(editOrder(order)),
	getProductsStartAsync: () => dispatch(getProductsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit);
