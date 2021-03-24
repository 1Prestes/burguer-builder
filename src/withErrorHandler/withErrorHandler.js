import React, { useEffect, useState } from 'react'

import Modal from '../components/UI/Modal/Modal'
import Aux from '../hoc/Aux/Aux'

const WithErrorHandler = (WrappedComponent, axios) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.interceptors.response.use(req => {
      setError(null)
      return req
    })
    axios.interceptors.response.use(
      res => res,
      error => {
        setError(JSON.stringify(error.message))
      }
    )
  }, [axios])

  const errorConfirmedHandler = () => {
    setError(null)
  }

  return props => (
    <Aux>
      <Modal modalClosed={errorConfirmedHandler} show={error}>
        {error ? error : null}
      </Modal>
      <WrappedComponent {...props} />
    </Aux>
  )
}

export default WithErrorHandler
