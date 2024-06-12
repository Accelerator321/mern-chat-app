import React from 'react'

const Alert = ({message, color}) => {
  return (
    <div className={`notification ${color}`}>{message}</div>
  )
}

export default Alert