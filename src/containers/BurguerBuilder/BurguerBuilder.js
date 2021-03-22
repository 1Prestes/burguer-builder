import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burguer from '../../components/Burguer/Burguer'

class BurguerBuilder extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {...}
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  render () {
    return (
      <Aux>
        <Burguer ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    )
  }
}

export default BurguerBuilder
