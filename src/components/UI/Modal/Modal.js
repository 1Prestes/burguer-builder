import React from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css'

const Modal = props => {
  console.log('aaa')
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Aux>
  )
}
const showIsEqual = (prevProps, nextProps) => {
  return prevProps.show === nextProps.show
}
export default React.memo(Modal, showIsEqual)
