import React from 'react'

import Aux from '../../hoc/Aux'
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'

import classes from './Layout.css'

const layout = props => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

export default layout
