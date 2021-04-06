import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import Order from './Order/Order'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as action from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = props => {
  useEffect(() => {
    props.onFetchOrders()
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
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(action.fetchOrders())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => withErrorHandler(Orders, axios)(props))
