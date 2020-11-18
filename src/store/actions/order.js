import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
} from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,

  orderId,

  orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: PURCHASE_BURGER_FAIL,

  error,
});

const purchaseBurgerStart = () => ({ type: PURCHASE_BURGER_START });

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());

  axios

    .post('/orders.json', orderData)

    .then((response) => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))

    .catch((error) => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({ type: PURCHASE_INIT });

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,

  orders,
});

export const fetchOrdersFail = (error) => ({
  type: FETCH_ORDERS_FAIL,

  error,
});

export const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());

  axios

    .get('/orders.json')

    .then((response) => {
      const orders = [];

      for (const key in response.data) {
        orders.push({
          ...response.data[key],

          id: key,
        });
      }

      dispatch(fetchOrdersSuccess(orders));
    })

    .catch((error) => dispatch(fetchOrdersFail(error)));
};
