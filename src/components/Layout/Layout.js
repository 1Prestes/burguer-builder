import React, { useState } from 'react'

import Aux from '../../hoc/Aux'
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'

import classes from './Layout.css'

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerToggleHandler = isShow => {
    setShowSideDrawer(!isShow)
  }

  return (
    <Aux>
      <Toolbar open={showSideDrawer} closed={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerToggleHandler} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

export default layout
