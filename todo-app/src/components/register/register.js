import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './register.css'
import AuthAPI from '../../utils/authApi'

class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      email:'',
      message:''
    }
    this.onRegisterSubmit=this.onRegisterSubmit.bind(this);
  }
  onRegisterSubmit(e){
    e.preventDefault();
    AuthAPI.register(this.state.username,this.state.password,this.state.email)
    .then(response => response.json())
    .then(json =>{
      if (json._id) this.props.history.push('/login');
      else if (json.message) this.setState({message:json.message});
    }).catch(err=> this.setState({message:err.message}))
  }
  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) this.props.history.push('/dashboard')
  }
  render() {
    return (
      <div className='background'>
      <div className="login-page animated bounceIn">
      <div className="form">
      <Link to="/" style={{ textDecoration: 'none' }}>
      <span className="fa fa-close exit" />
    </Link>
      <h3>Register</h3>
      {this.state.message && <div className="alert alert-danger animated bounceIn">{this.state.message}</div>}
        <form className="login-form">
          <input required type="text" placeholder="username" value={this.state.username} onChange={e=>this.setState({username:e.target.value})}/>
          <input required type="password" placeholder="password" value={this.state.password} onChange={e=>this.setState({password:e.target.value})}/>
          <input required type="email" placeholder="email"value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
          <button onClick={e=>this.onRegisterSubmit(e)}>Register</button>
        </form>
      </div>
    </div>
    </div>
    );
  }
}

export default Register;
