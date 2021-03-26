import React from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

const Checkout = (props) => {
  const ingredients = {
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1
  }

  console.log(props)

  const checkoutCancelledHandler = () => {}
  const checkoutContinuedHandler = () => {}

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
