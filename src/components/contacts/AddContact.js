import React, { Component } from 'react'
import TextInputGroup from './../layout/TextInputGroup'
import { Consumer } from './../../context'
import axios from 'axios'
import classnames from 'classnames'

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
    isLoading: false
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = async (dispatch, e) => {
    e.preventDefault()
    if (this.state.isLoading) {
      return
    }
    const { name, email, phone } = this.state

    // validation
    if (name === '') {
      this.setState({ errors: { name: 'Name is required.' } })
      return
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required.' } })
      return
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required.' } })
      return
    }

    this.setState({ isLoading: true })
    const newContact = {
      name,
      email,
      phone
    }

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    )
    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    })

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
      isLoading: false
    })

    this.props.history.push('/')
  }

  render() {
    const { name, email, phone, errors, isLoading } = this.state

    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    disabled={isLoading}
                    placeholder="Enter Name..."
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    disabled={isLoading}
                    value={email}
                    placeholder="Enter Email..."
                    type="email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    disabled={isLoading}
                    placeholder="Enter Phone..."
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value={isLoading ? 'Please wait...' : 'Add Contact' }
                    disabled={isLoading}
                    className={classnames('btn btn-block', {
                      'btn-light': isLoading,
                      'btn-primary': !isLoading
                    })}
                  />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact
