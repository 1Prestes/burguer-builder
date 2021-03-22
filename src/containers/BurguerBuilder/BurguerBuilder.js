import React, { useState } from 'react'

import Aux from '../../hoc/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const BurguerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  })
  const [totalPrice, setTotalPrice] = useState({ totalPrice: 4 })

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
  }

  const disabledInfo = {
    ...ingredients
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  return (
    <Aux>
      <Burguer ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabledInfo}
      />
    </Aux>
  )
}

export default BurguerBuilder
