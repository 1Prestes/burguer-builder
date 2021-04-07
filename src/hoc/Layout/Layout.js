import React, { useState } from 'react'
import { connect } from 'react-redux'

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
      <Toolbar
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerToggleHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(layout)
