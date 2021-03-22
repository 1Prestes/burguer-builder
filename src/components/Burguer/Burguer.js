import React from 'react'

import BurguerIngredient from './BurguerIngredient/BurguerIngredient'
import classes from './Burguer.css'

const Burguer = props => {
  return (
    <div className={classes.Burguer}>
      <BurguerIngredient type='bread-top' />
      <BurguerIngredient type='cheese' />
      <BurguerIngredient type='meat' />
      <BurguerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burguer
