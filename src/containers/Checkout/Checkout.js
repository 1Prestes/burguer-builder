import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = props => {
  const [ingredients, setIngredients] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const query = new URLSearchParams(props.location.search)
    const ingredients = {}

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        setTotalPrice(param[1])
      } else {
        ingredients[param[0]] = +param[1]
      }
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
      <Route
        path={props.match.path + '/contact-data'}
        render={props => (
          <ContactData
            ingredients={ingredients}
            price={totalPrice}
            {...props}
          />
        )}
      />
    </div>
  )
}

export default Checkout
