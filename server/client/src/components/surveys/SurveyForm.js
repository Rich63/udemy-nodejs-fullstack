// SurveyForm shows a form for a user to add input
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field 
          key={ name }
          component={ SurveyField }
          type='text'
          label={ label }
          name={ name }
        />
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) }>
          { this.renderFields() }
          <Link
            to='/surveys'
            className='red btn-flat left white-text'
            type='Cancel'
          >
            Cancel
            <i className='material-icons right'>cancel</i>
          </Link>
          <button 
            className='teal btn-flat right white-text'
            type='submit'
          >
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '')

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value!'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)