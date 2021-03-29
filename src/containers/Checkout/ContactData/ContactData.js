import React, { useState } from 'react'

import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      minLength: 9,
      maxLength: 9
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-mail'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: ''
    }
  })

  const [loading, setLoading] = useState(false)

  const orderHandler = event => {
    event.preventDefault()
    setLoading(true)
    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      deliveryMethod: 'fastest',
      orderData: formData
    }
    axios
      .post('/orders.json', order)
      .then(response => {
        setLoading(false)
        props.history.push('/')
      })
      .catch(err => {
        setLoading(false)
      })
  }

  const formElementsArray = []

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  const checkValidity = (value, rules) => {
    let isValid = false

    if (rules.required) {
      isValid = value.trim() !== ''
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength
    }

    return isValid
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updateOrderForm = { ...orderForm }
    const updateFormElement = { ...updateOrderForm[inputIdentifier] }

    updateFormElement.value = event.target.value
    updateFormElement.valid = checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    )
    updateOrderForm[inputIdentifier] = updateFormElement
    console.log(updateFormElement)
    setOrderForm({ ...updateOrderForm })
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType='Success' clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  )

  if (loading) {
    form = <Spinner />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  )
}

export default ContactData
