import React, { useState } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  })
  const [totalPrice, setTotalPrice] = useState(4)
  const [purchaseable, setPurchaseable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)

  const updatedPurchaseable = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    setPurchaseable(sum > 0)
  }

  const addIngredientHandler = type => {
    const oldCount = ingredients[type]
    const updateCount = oldCount + 1
    const updatedIngredients = {
      ...ingredients
    }

    updatedIngredients[type] = updateCount

    const priceAddition = INGREDIENTS_PRICES[type]
    const oldPrice = totalPrice
    const newPrice = oldPrice + priceAddition

    setIngredients(updatedIngredients)
    setTotalPrice(newPrice)
    updatedPurchaseable(updatedIngredients)
  }

  const removeIngredientHandler = type => {
    const oldCount = ingredients[type]
    if (oldCount <= 0) return
    const updateCount = oldCount - 1
    const updatedIngredients = {
      ...ingredients
    }

    updatedIngredients[type] = updateCount

    const priceDeduction = INGREDIENTS_PRICES[type]
    const oldPrice = totalPrice
    const newPrice = oldPrice - priceDeduction

    setIngredients(updatedIngredients)
    setTotalPrice(newPrice)
    updatedPurchaseable(updatedIngredients)
  }

  const purchaseHandler = () => {
    setPurchasing(true)
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    alert('You Continue!')
  }

  const disabledInfo = {
    ...ingredients
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabledInfo}
        purchaseable={purchaseable}
        ordered={purchaseHandler}
        price={totalPrice}
      />
    </Aux>
  )
}

export default BurgerBuilder
