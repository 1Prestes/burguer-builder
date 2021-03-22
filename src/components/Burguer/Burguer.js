import React from 'react'

import BurguerIngredient from './BurguerIngredient/BurguerIngredient'
import classes from './Burguer.css'

const Burguer = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, index) => {
      return <BurguerIngredient key={igKey + index} type={igKey} />
    })
  })
  return (
    <div className={classes.Burguer}>
      <BurguerIngredient type='bread-top' />
      {transformedIngredients}
      <BurguerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burguer
