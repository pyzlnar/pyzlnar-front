import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import {
  checkboxField,
  inputField,
  selectField,
  textareaField
} from './inputs'

let SiteForm = props => {
  const { handleSubmit, pristine, submitting, error } = props
  const blocked = pristine || submitting
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className='c-cool-input__error'>{error}</p>}
      <Field
        component={inputField}
        label='Code'
        name='site[code]'
        placeholder='code'
        type='text'
      />

      <Field
        component={inputField}
        label='Name'
        name='site[name]'
        placeholder='name'
        type='text'
      />

      <Field
        component={inputField}
        label='Url'
        name='site[url]'
        placeholder='url'
        type='text'
      />

      <Field
        component={selectField}
        label='Status'
        name='site[status]'
        options={['active', 'inactive']}
        placeholder='status'
      />

      <Field
        component={checkboxField}
        label='Topics'
        name='site[topics]'
        options={['anime', 'gaming', 'programming', 'personal']}
        placeholder='topics'
      />

      <Field
        component={textareaField}
        label='Description'
        name='site[description]'
        placeholder='description'
      />

      <button type="submit" className={blocked || 'c-btn c-btn--warning'} disabled={blocked}>
        Submit
      </button>
    </form>
  )
}

const mapStateToProps = (state, ownState) => (
  { initialValues: { site: ownState.site } }
)

SiteForm = reduxForm({ form: 'site' })(SiteForm)
SiteForm = connect(mapStateToProps)(SiteForm)
export default SiteForm
