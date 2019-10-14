import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchSurveys } from '../../actions'

class SurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className='card blue-grey darken-1' key={ survey._id }>
          <div className='card-content white-text'>
            <span className='card-title'>{ survey.title }</span>
            <p>
              { survey.body }
            </p>
          </div>
          <div className="card-action">
            <p className='right green-text'>
              Sent on: { new Date(survey.dateSent).toLocaleDateString() }
            </p>
            <button>Yes: { survey.yes }</button>
            <button>No: { survey.no }</button>
          </div>
        </div>
      )
    })
  }
  
  render() {
    return (
      <div>
        { this.renderSurveys() }
      </div>
    )
  }
}

function mapStateToProps({ surveys }) {
  return { surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)