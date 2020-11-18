import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import React, { Component } from 'react';
import classes from './ContactData.css';
import { connect } from 'react-redux';

class ContactData extends Component {
  formConfigure(placeholder, elementType = 'input', type = 'text', value = '', validation) {
    if (!validation || typeof validation !== 'object')
      validation = {
        required: true,
        touched: false,
      };

    return {
      elementType,

      elementConfig: {
        type,

        placeholder,
      },

      value,

      valid: false,

      validation,
    };
  }
  state = {
    orderFrom: {
      name: this.formConfigure('Your name'),

      street: this.formConfigure('Street'),

      zipCode: this.formConfigure('ZIP Code', 'input', 'text', '', {
        required: true,
        minLength: 3,
        maxLength: 6,
      }),

      country: this.formConfigure('Country'),

      email: this.formConfigure('Your E-Mail', 'input', 'email'),

      deliveryMethod: {
        elementType: 'select',

        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },

        value: 'cheapest',

        valid: true,
      },
    },

    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in this.state.orderFrom) {
      formData[formElementIdentifier] = this.state.orderFrom[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,

      price: this.props.totalPrice,

      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };

  checkValidity(value, rules) {
    if (!rules) return true;

    let isValid = true;

    if (rules.required) isValid = value.trim() !== '' && isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderFrom,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,

      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderFrom: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.orderFrom) {
      formElementsArray.push({
        id: key,

        config: this.state.orderFrom[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            invalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            changed={(event) => this.inputChangedHandler(event, id)}
          />
        ))}

        <Button buttonType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>

        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,

  totalPrice: state.burgerBuilder.totalPrice,

  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
