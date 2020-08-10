import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, deleteOrder } from '../redux/actions/orderActions';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class OrdersList extends Component {
	state = {
		msg: null,
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
	};

	componentDidMount() {
		const { getOrders } = this.props;
		getOrders();
	}

	shouldComponentUpdate() {
		return true;
	}
	onDeleteClick = (id) => {
		this.props.deleteOrder(id);
	};

	render() {
		const { orders } = this.props.orders;
		const { user } = this.props;

		return (
			<div className="container w-75">
				<h1 className="">Icecream Orders List</h1>
				<p>Note that you can edit or delete only your own order/-s</p>
				{this.props.isAuthenticated ? (
					<Button
						color="dark"
						style={{ marginBottom: '2rem' }}
						// send user to create order page
						href="/orders/new"
					>
						Add new order
					</Button>
				) : (
					<h4 className="mb-3 ml-4">Please log in to manage icecream orders</h4>
				)}
				<ListGroup className="w-75">
					{orders.map((order) => (
						<ListGroupItem key={order._id} className="d-flex">
							<div className="mr-auto p-2">
								<p>{order.flavour}</p>
								<p>price: ${order.totalCost}</p>
							</div>
							{this.props.isAuthenticated && user._id === order.userId ? (
								<div>
									<Link
										className="btn btn-warning p-2 mr-1"
										to={`/orders/edit/${order._id}`}
									>
										Edit
									</Link>
									<Button
										className="btn btn-danger p-2"
										onClick={this.onDeleteClick.bind(this, order._id)}
									>
										Delete
									</Button>
								</div>
							) : null}
						</ListGroupItem>
					))}
				</ListGroup>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		orders: state.orders,
		isAuthenticated: state.auth.isAuthenticated,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getOrders: () => dispatch(getOrders()),
	deleteOrder: (id) => dispatch(deleteOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
