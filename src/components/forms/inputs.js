import React from 'react'

export const checkboxField = ({input, label, options, disabled, meta: {touched, error}}) => (
  <div className='c-cool-input text--small'>
    <label className={`c-cool-input__label ${error && 'c-cool-input__error'}`}>
      {label}
    </label>
    <div>
      {options && options.map(option => checkboxOption(option, input, disabled, error))}
    </div>
    {touched && error && <span className='c-cool-input__error text--tiny'>{error}</span>}
  </div>
)

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

export const selectField = ({input, label, options, disabled, meta: {touched, error}}) => (
  <div className='c-cool-input text--small'>
    <label className={`c-cool-input__label ${error && 'c-cool-input__error'}`}>
      {label}
    </label>
    <div>
      <select {...input}>
        {options && options.map(option => selectOption(option))}
      </select>
    </div>
    {touched && error && <span className='c-cool-input__error text--tiny'>{error}</span>}
  </div>
)

export const textareaField = ({input, label, options, disabled, meta: {touched, error}}) => (
  <div className='c-cool-input text--small'>
    <label className={`c-cool-input__label ${error && 'c-cool-input__error'}`}>
      {label}
    </label>
    <div>
      <textarea {...input} />
    </div>
    {touched && error && <span className='c-cool-input__error text--tiny'>{error}</span>}
  </div>
)

// -- Helpers -- //

// Checkbox Option
const checkboxOption = (option, input, disabled, error) => {
  const { label, value } = optionToValue(option)
  const checked = input.value.includes(value);

  const handleChange = event => {
    const arr = [...input.value]
    if (event.target.checked) {
      arr.push(value)
    } else {
      arr.splice(arr.indexOf(value), 1)
    }
    return input.onChange(arr)
  }

  return (
    <div key={value}>
      <input
        checked={checked}
        className={`c-cool-input__input ${disabled && 'c-cool-input--disabled'} ${error && 'c-cool-input--error'}`}
        placeholder={label}
        type='checkbox'
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <label>{label}</label>
    </div>
  )
}

// Select Option
const selectOption = option => {
  const { label, value } = optionToValue(option)
  return <option key={value} value={value}>{label}</option>
}

const optionToValue = option => {
  let label, value
  if (typeof option === 'object') {
    label = option.label || option.value
    value = option.value
  } else {
    label = value = option
  }
  return { label, value }
}
