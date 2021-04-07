import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import Order from './Order/Order'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as action from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId)
  }, [])

  return (
    <React.Fragment>
      {props.loading && <Spinner />}
      {!props.loading &&
        props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(action.fetchOrders(token, userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => withErrorHandler(Orders, axios)(props))
