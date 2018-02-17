import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { inputField } from './inputs'

let UserForm = props => {
  const { handleSubmit, pristine, submitting, error } = props
  const blocked = pristine || submitting
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={inputField}
        disabled={true}
        label='Email'
        name='user[email]'
        placeholder='email'
        type='text'
      />

      <Field
        component={inputField}
        label='Username'
        name='user[username]'
        placeholder='username'
        type='text'
      />

      {error && <strong>{error}</strong>}
      <button type="submit" className={blocked || 'c-cool-input__button'} disabled={blocked}>
        Submit
      </button>
    </form>
  )
}

const mapStateToProps = (state, ownState) => {
  return { initialValues: { user: ownState.user } }
}

UserForm = reduxForm({ form: 'user' })(UserForm)
UserForm = connect(mapStateToProps)(UserForm)

export default UserForm
