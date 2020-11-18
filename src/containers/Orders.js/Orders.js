import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/index';
import Order from '../../components/Order/Order';
import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

class Orders extends Component {
  componentDidMount = () => this.props.onFetchOrders();

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,

  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
