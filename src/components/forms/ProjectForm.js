import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import {
  checkboxField,
  inputField,
  selectField,
  textareaField
} from './inputs'

let ProjectForm = props => {
  const { handleSubmit, pristine, submitting, error } = props
  const blocked = pristine || submitting
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className='c-cool-input__error'>{error}</p>}
      <Field
        component={inputField}
        label='Code'
        name='project[code]'
        placeholder='code'
        type='text'
      />

      <Field
        component={inputField}
        label='Name'
        name='project[name]'
        placeholder='name'
        type='text'
      />

      <Field
        component={inputField}
        label='Start Date'
        name='project[start_date]'
        placeholder='start_date'
        type='date'
      />

      <Field
        component={inputField}
        label='End Date'
        name='project[end_date]'
        placeholder='end_date'
        type='date'
      />

      <Field
        component={inputField}
        label='Url'
        name='project[url]'
        placeholder='url'
        type='text'
      />

      <Field
        component={selectField}
        label='Status'
        name='project[status]'
        options={['active', 'stalled', 'dead']}
        placeholder='status'
      />

      <Field
        component={checkboxField}
        label='Topics'
        name='project[topics]'
        options={['anime', 'gaming', 'programming', 'personal']}
        placeholder='topics'
      />

      <Field
        component={inputField}
        label='Short'
        name='project[short]'
        placeholder='short'
        type='text'
      />

      <Field
        component={textareaField}
        label='Description'
        name='project[description]'
        placeholder='description'
      />

      <button type="submit" className={blocked || 'c-btn c-btn--warning'} disabled={blocked}>
        Submit
      </button>
    </form>
  )
}

const mapStateToProps = (state, ownState) => {
  return { initialValues: { project: ownState.project } }
}

ProjectForm = reduxForm({ form: 'project' })(ProjectForm)
ProjectForm = connect(mapStateToProps)(ProjectForm)
export default ProjectForm
