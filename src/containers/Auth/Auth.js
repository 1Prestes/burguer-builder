import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import * as actions from '../../store/actions'
import classes from './Auth.css'

const Auth = props => {
  const [isSignup, setIsSignup] = useState(true)
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  })

  const checkValidity = (value, rules) => {
    let isValid = true

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      }
    }
    setControls({ ...updatedControls })
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

  const submitHandler = event => {
    event.preventDefault()
    props.onAuth(controls.email.value, controls.password.value, isSignup)
  }

  const formElementsArray = []

  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  }

  const form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ))

  return (
    <div className={classes.Auth}>
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType='Success'>SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType='Danger'>
        SWITCH TO SIGN-IN {isSignup ? 'SIGN-IN' : 'SIGN-UP'}
      </Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(null, mapDispatchToProps)(Auth)
