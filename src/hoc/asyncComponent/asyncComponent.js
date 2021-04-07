import React, { useEffect, useState } from 'react'

const AsyncComponent = importComponent => {
  return props => {
    const [component, setComponent] = useState(null)
    useEffect(() => {
      importComponent().then(cmp => {
        setComponent(cmp.default)
      })
    }, [importComponent])
    const C = component

    return C ? <C {...props} /> : null
  }
}

export default AsyncComponent
