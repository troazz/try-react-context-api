import React, { Component } from 'react'
import TextInputGroup from './../layout/TextInputGroup'
import { Consumer } from './../../context'
import axios from 'axios'
import classnames from 'classnames'

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
    isLoading: true
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    const { name, email, phone } = res.data
    this.setState({
      name,
      email,
      phone,
      isLoading: false
    })
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
    const updContact = {
      name,
      email,
      phone
    }
    const { id } = this.props.match.params
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    )

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data })

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
              <div className="card-header">Edit Contact</div>
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
                    value={email}
                    disabled={isLoading}
                    placeholder="Enter Email..."
                    type="email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    disabled={isLoading}
                    value={phone}
                    placeholder="Enter Phone..."
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value={isLoading ? 'Please wait...' : 'Update Contact'}
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

export default EditContact
