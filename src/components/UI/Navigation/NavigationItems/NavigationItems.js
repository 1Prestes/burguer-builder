import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.css'

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link='/orders' exact={props.exact}>
      Orders
    </NavigationItem>
    <NavigationItem link='/auth' exact={props.exact}>
      Authenticate
    </NavigationItem>
  </ul>
)

export default NavigationItems
