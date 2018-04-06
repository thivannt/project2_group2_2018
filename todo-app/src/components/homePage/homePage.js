import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './homePage.css'

class Homepage extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) this.props.history.push('/dashboard')
  }
  render() {
    return (
      <div className="background">
        <div className="center">
          <h2 className="animated bounceInLeft title">Todolist</h2>
          <p className="animated bounceInRight">Todoist is the beautifully simple to-do list designed to help you do more and stress less.</p>
          <div className="text animated bounceInUp">
            <Link to='register'>
              <button className='btn btn-success getstarted-btn animated infinite pulse'>GETTING STARTED</button>
            </Link>
            <p style={{ marginTop: 10 }}>Already have account? <Link to='login'>
              <button className='btn btn-success animated infinite pulse' style={{ fontSize: 30, fontWeight: 'bold' }}>Login here!</button>
            </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
