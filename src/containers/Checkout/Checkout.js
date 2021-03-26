import React from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

const Checkout = props => {
  const ingredients = {
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1
  }

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
    </div>
  )
}

export default Checkout
