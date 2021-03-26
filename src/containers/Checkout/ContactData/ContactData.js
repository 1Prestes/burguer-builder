import React, { useState } from 'react'

import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'

const ContactData = props => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  })
  const [loading, setLoading] = useState(false)

  const orderHandler = event => {
    event.preventDefault()
    setLoading(true)
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: 'Goku',
        address: {
          street: 'Any Street',
          zipCode: '11630000',
          country: 'Brazil'
        },
        email: 'any@mail.com'
      },
      deliveryMethod: 'fastest'
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

  let form = (
    <form>
      <input
        className={classes.Input}
        type='text'
        name='name'
        placeholder='Your Name'
      />
      <input
        className={classes.Input}
        type='email'
        name='email'
        placeholder='Your E-mail'
      />
      <input
        className={classes.Input}
        type='text'
        name='street'
        placeholder='Street'
      />
      <input
        className={classes.Input}
        type='text'
        name='postal'
        placeholder='Postal Code'
      />
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
