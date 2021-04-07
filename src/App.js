import React, { useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'
import AsyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = AsyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = AsyncComponent(() => {
  return import('./containers/Auth/Auth')
})

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup()
  }, [])

  return (
    <div>
      <Layout>
        <Switch>
          {props.isAuthenticated && (
            <Route path='/checkout' component={asyncCheckout} />
          )}
          {props.isAuthenticated && (
            <Route path='/orders' component={asyncOrders} />
          )}
          {props.isAuthenticated && <Route path='/logout' component={Logout} />}
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
