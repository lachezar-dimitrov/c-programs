import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BulgerBuilder';
import { authCheckState } from './store/actions/index';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders.js/Orders';
import Auth from './containers/Auth/Auth';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount = () => this.props.onTryAutoSignup();

  render() {
    // let routes = (
    //   <Switch>
    //     <Route path='/auth' component={Auth} />

    //     <Route path='/' exact component={BurgerBuilder} />

    //     <Redirect to='/' />
    //   </Switch>
    // );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path='/checkout' component={Checkout} />

    //       <Route path='/orders' exact component={Orders} />

    //       <Route path='/logout' component={Logout} />

    //       <Route path='/' exact component={BurgerBuilder} />
    //     </Switch>
    //   );
    // }

    return (
      <div>
        <Layout>
          {/* {routes} */}

          <Route path='/auth' component={Auth} />

          <Route path='/' exact component={BurgerBuilder} />

          <Route path='/checkout' component={Checkout} />

          <Route path='/orders' exact component={Orders} />

          <Route path='/logout' component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(authCheckState()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
