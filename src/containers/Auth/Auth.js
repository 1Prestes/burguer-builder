import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions'
import { checkValidity, updateObject } from '../../shared/utility'
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

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.setAuthRedirectPath()
    }
  }, [])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      })
    })
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
      {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
      {props.error && <p>{props.error.message}</p>}
      <form onSubmit={submitHandler}>
        {props.loading && <Spinner />}
        {!props.loading && form}
        <Button btnType='Success'>SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType='Danger'>
        SWITCH TO SIGN-IN {isSignup ? 'SIGN-IN' : 'SIGN-UP'}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
