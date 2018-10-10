import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'
import axios from 'axios'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

class Contact extends Component {
  state = {
    showContactInfo: false,
    isLoading: false
  }

  onDeleteClick = async (id, dispatch) => {
    if (this.state.isLoading) {
      return
    }

    this.setState({ isLoading: true })
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    } catch (e) {}

    dispatch({
      type: 'DELETE_CONTACT',
      payload: id
    })
  }

  render() {
    const { id, name, email, phone } = this.props.contact
    const { showContactInfo, isLoading } = this.state

    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  className={
                    this.state.showContactInfo ? 'fas fa-minus' : 'fas fa-plus'
                  }
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className={classnames('fas float-right text-danger', {
                    'fa-trash': !isLoading,
                    'fa-spinner fa-spin': isLoading
                  })}
                  style={{ cursor: 'pointer' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt float-right"
                    style={{
                      cursor: 'pointer',
                      marginRight: '1rem',
                      color: 'black'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact
