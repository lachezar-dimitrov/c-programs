import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from '../actions/actionTypes';

const initialState = {
  ingredients: null,

  totalPrice: 4,

  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,

  bacon: 0.4,

  cheese: 1.3,

  meat: 0.7,
};

const reducer = (state = initialState, { type, ingredientName, ingredients }) => {
  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...state,

        ingredients: {
          ...state.ingredients,

          [ingredientName]: state.ingredients[ingredientName] + 1,
        },

        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,

        ingredients: {
          ...state.ingredients,

          [ingredientName]: state.ingredients[ingredientName] - 1,
        },

        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
      };

    case SET_INGREDIENTS:
      return {
        ...state,

        ingredients: ingredients,

        totalPrice: 4,

        error: false,
      };

    case FETCH_INGREDIENTS_FAILED:
      return {
        ...state,

        error: true,
      };

    default:
      return state;
  }
};
export default reducer;
