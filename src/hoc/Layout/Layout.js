import React, { useState } from 'react'

import Aux from '../Aux/Aux'
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar'

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
