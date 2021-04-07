import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/'
import axios from '../../axios-orders'

// const INGREDIENTS_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }

const BurgerBuilder = props => {
  // const [ingredients, setIngredients] = useState(null)
  // const [totalPrice, setTotalPrice] = useState(4)
  // const [purchaseable, setPurchaseable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
  }, [])

  const updatedPurchaseable = ingredients => {
    if (ingredients === null) return 0
    if (ingredients === undefined) return 0

    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
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
    if (props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    // const queryParams = []
    // for (let i in props.ings) {
    //   queryParams.push(
    //     encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i])
    //   )
    // }
    // queryParams.push('price=' + props.price)
    // const queryString = queryParams.join('&')
    props.onInitPurchase()
    props.history.push('/checkout')
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
      {!props.ings && !props.error && <Spinner />}
      {props.error && <p>Ingredients can't be loaded!</p>}
      {props.ings && <Burger ingredients={props.ings} />}
      <BuildControls
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemove}
        disabled={disabledInfo}
        purchaseable={updatedPurchaseable(props.ings)}
        ordered={purchaseHandler}
        isAuth={props.isAuthenticated}
        price={props.price || 0}
      />
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => withErrorHandler(BurgerBuilder, axios)(props))
