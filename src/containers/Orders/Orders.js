import React, { useEffect, useState } from 'react'
import axios from '../../axios-orders'

import Order from './Order/Order'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'

const Orders = props => {
  const [orders, setOrders] = useState([])
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/orders.json')
      .then(response => {
        console.log(response.data)
        const fetchOrders = []
        for (let key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key })
        }
        setOrders(fetchOrders)
        // setLoading(false)
      })
      .catch(error => {
        console.error(error)
        // setLoading(false)
      })
  }, [])

  return (
    <div>
      {orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  )
}

export default props => withErrorHandler(Orders, axios)(props)
