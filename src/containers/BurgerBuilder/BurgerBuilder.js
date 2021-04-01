import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

// const INGREDIENTS_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }

const BurgerBuilder = props => {
  // const [ingredients, setIngredients] = useState(null)
  const [totalPrice, setTotalPrice] = useState(4)
  const [purchaseable, setPurchaseable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://burger-builder-d8334-default-rtdb.firebaseio.com/ingredients.json'
  //     )
  //     .then(response => {
  //       setIngredients(response.data)
  //     })
  //     .catch(error => {
  //       setError(true)
  //     })
  // }, [])

  const updatedPurchaseable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    setPurchaseable(sum > 0)
  }

  // const addIngredientHandler = type => {
  //   const oldCount = ingredients[type]
  //   const updateCount = oldCount + 1
  //   const updatedIngredients = {
  //     ...ingredients
  //   }

  //   updatedIngredients[type] = updateCount

  //   const priceAddition = INGREDIENTS_PRICES[type]
  //   const oldPrice = totalPrice
  //   const newPrice = oldPrice + priceAddition

  //   setIngredients(updatedIngredients)
  //   setTotalPrice(newPrice)
  //   updatedPurchaseable(updatedIngredients)
  // }

  // const removeIngredientHandler = type => {
  //   const oldCount = ingredients[type]
  //   if (oldCount <= 0) return
  //   const updateCount = oldCount - 1
  //   const updatedIngredients = {
  //     ...ingredients
  //   }

  //   updatedIngredients[type] = updateCount

  //   const priceDeduction = INGREDIENTS_PRICES[type]
  //   const oldPrice = totalPrice
  //   const newPrice = oldPrice - priceDeduction

  //   setIngredients(updatedIngredients)
  //   setTotalPrice(newPrice)
  //   updatedPurchaseable(updatedIngredients)
  // }

  const purchaseHandler = () => {
    setPurchasing(true)
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    const queryParams = []
    for (let i in props.ings) {
      queryParams.push(
        encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i])
      )
    }
    queryParams.push('price=' + props.price)
    const queryString = queryParams.join('&')
    props.history.push({ pathname: '/checkout', search: '?' + queryString })
  }

  const disabledInfo = {
    ...props.ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null
  if (props.ings) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    )
  }

  // if (loading) {
  //   orderSummary = <Spinner />
  // }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {!props.ings && !error && <Spinner />}
      {error && <p>Ingredients can't be loaded!</p>}
      {props.ings && <Burger ingredients={props.ings} />}
      <BuildControls
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemove}
        disabled={disabledInfo}
        purchaseable={purchaseable}
        ordered={purchaseHandler}
        price={props.price}
      />
    </Aux>
  )
}

const mapStateToProps = state => {
  return { ings: state.ingredients, price: state.totalPrice }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
      }),
    onIngredientRemove: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => withErrorHandler(BurgerBuilder, axios)(props))
// export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder,api));
