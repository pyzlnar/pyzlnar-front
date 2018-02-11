import React from 'react'

export const inputField = ({input, label, type, disabled, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} disabled={disabled} />
    </div>
      {touched && error && <span>{error}</span>}
  </div>
)
