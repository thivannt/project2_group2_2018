import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import AuthAPI from '../../utils/authApi'
import './login.css'

class Login extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) this.props.history.push('/dashboard')
  }
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      message:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    AuthAPI.login(this.state.username,this.state.password)
    .then(response => response.json())
    .then(json => {
      if (json.message) this.setState({message:json.message})
      else if (json.token){
        localStorage.setItem('token',json.token);
        this.props.history.push('/dashboard');
      }
    }).catch(err=>{

    })

  }
  render() {
    return (
      <div className='background'>
      <div className="login-page animated bounceIn">
      <div className="form">
      <Link to="/" style={{ textDecoration: 'none' }}>
      <span className="fa fa-close exit" />
    </Link>
        <form className="login-form">
        <h3>Login</h3>
        {this.state.message && <div className="alert alert-danger animated bounceIn">{this.state.message}</div>}
          <input type="text" placeholder="username" value={this.state.username} 
          onChange={(e)=>this.setState({username:e.target.value})}/>
          <input type="password" placeholder="password" value={this.state.password} 
          onChange={(e)=>this.setState({password  :e.target.value})}/>
          <button onClick={this.handleSubmit}>login</button>
          <p className="message">Not registered? <Link to="register">Create an account</Link></p>
        </form>
      </div>
    </div>
    </div>
    );
  }
}

export default Login;
