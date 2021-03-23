import React from 'react'

import Logo from '../../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

import classes from './Toolbar.css'

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle open={props.open} clicked={props.closed} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
)

export default Toolbar
