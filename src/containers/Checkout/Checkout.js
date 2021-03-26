import React, { useEffect, useState } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

const Checkout = props => {
  const [ingredients, setIngredients] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }
    setIngredients(ingredients)
  }, [])

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }
  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  return (
    <div>
      {ingredients && (
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
      )}
    </div>
  )
}

export default Checkout
