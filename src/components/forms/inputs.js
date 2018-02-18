import React from 'react'

export const inputField = ({input, label, type, disabled, meta: {touched, error}}) => (
  <div className='c-cool-input text--small'>
    <label className={`c-cool-input__label ${error && 'c-cool-input__error'}`}>
      {label}
    </label>
    <div>
      <input {...input}
        className={`c-cool-input__input ${disabled && 'c-cool-input--disabled'} ${error && 'c-cool-input--error'}`}
        placeholder={label}
        type={type}
        disabled={disabled}
      />
    </div>
    {touched && error && <span className='c-cool-input__error text--tiny'>{error}</span>}
  </div>
)
