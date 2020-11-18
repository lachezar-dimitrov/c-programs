import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
} from '../actions/actionTypes';

const initialState = {
  orders: [],

  loading: false,

  purchased: false,
};

const reducer = (state = initialState, { type, orderData, orderId }) => {
  switch (type) {
    case PURCHASE_INIT:
      return {
        ...state,

        purchased: false,
      };

    case PURCHASE_BURGER_START:
      return {
        ...state,

        loading: true,
      };

    case PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...orderData,

        id: orderId,
      };

      return {
        ...state,

        loading: false,

        purchased: true,

        orders: state.orders.concat(newOrder),
      };

    case PURCHASE_BURGER_FAIL:
      return {
        ...state,

        loading: true,
      };

    default:
      return state;
  }
};

export default reducer;
