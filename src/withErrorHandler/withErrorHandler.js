import React, { useEffect, useState } from 'react'

import Modal from '../components/UI/Modal/Modal'
import Aux from '../hoc/Aux/Aux'

const WithErrorHandler = (WrappedComponent, axios) => {
  const [error, setError] = useState(null)

  const requestInterceptor = axios.interceptors.request.use(req => {
    setError(null)
    return req
  })
  const responseInterceptor = axios.interceptors.response.use(
    res => res,
    error => {
      setError(JSON.stringify(error.message))
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [requestInterceptor, responseInterceptor])

  const errorConfirmedHandler = () => {
    setError(null)
  }

  return (props) => (
    <Aux>
      <Modal modalClosed={errorConfirmedHandler} show={error}>
        {error ? error : null}
      </Modal>
      <WrappedComponent {...props} />
    </Aux>
  )
}

export default WithErrorHandler
