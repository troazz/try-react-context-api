import React from 'react'

const About = props => {
  return (
    <div>
      <h1 className="display-4">About Contact Manager</h1>
      <p className="lead">Simple app to manage contact</p>
      <p className="text-secondary">Version {props.match.params.id}</p>
    </div>
  )
}

export default About
