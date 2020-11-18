import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
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

const purchaseBurgerStart = () => ({
  type: PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());

  axios

    .post('/orders.json', orderData)

    .then((response) => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))

    .catch((error) => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
});
