import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TodoAPI from '../../utils/todoApi'
import ListTodo from './ListTodo'
import './dashBoard.css'



export default class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        todos: [],
        todoName:'',
        message:''
      }
      this.onToDoChange=this.onToDoChange.bind(this);
      this.onAddTodo=this.onAddTodo.bind(this);
      this.onDelete=this.onDelete.bind(this);
    }
    componentWillMount() {
      const token = localStorage.getItem('token')
      if (!token) this.props.history.push('/login')
    }
    componentDidMount() {
      TodoAPI.getAll()
        .then(response => response.json())
        .then(json => {
          const data = Array.from(json);
          if (data.length !== 0) this.setState({ todos: data });
        }).catch(err => this.setState({message:err.message}))
    }
    onToDoChange(id,index){
      TodoAPI.changeTodo(id)
      .then(response =>response.json())
      .then(json =>{
        if (!json.message)
        {let newdata = this.state.todos;
        newdata[index].complete=json.complete;
        this.setState({
          todos:newdata
        })}
        else if (json.message) this.setState({message:'Token invalid. Please login again!'})
      }).catch(err => this.setState({message:err.message}))
    }
    onAddTodo(e){
      e.preventDefault();
      TodoAPI.createOne(this.state.todoName)
      .then(response => response.json())
      .then(json => {
        if (json._id){
          var newData=this.state.todos;
          newData.push(json);
          this.setState({
            todos:newData,
            todoName:''
          })
        } else if (json.message) this.setState({message:'Token invalid. Please login again!'})
      }).catch(err => this.setState({message:err.message}))
    }
    onDelete(id, index){
      TodoAPI.deleteOne(id)
      .then(response =>response.json())
      .then(json =>{
        console.log(json);
        if (json.message==='Deleted')
        {let newdata = this.state.todos;
        newdata.splice(index,1);
        this.setState({
          todos:newdata
        })
      } else if (json.message) this.setState({message:'Token invalid. Please login again!'})
      }).catch(err => this.setState({message:err.message}))
    }
    render() {
      return (
        <div>
          <nav className="navbar navbar-light nav-bar">
            <Link className="navbar-brand" to="dashboard">
              <h3 className="logo">Todolist</h3>
            </Link>
            <Link className="fa fa-sign-out signout" to="#" onClick={()=>{
              localStorage.removeItem('token');
              this.props.history.push('/');
            }}></Link>
          </nav>
          <div className="contain" style={{ marginLeft: '30%', marginRight: '30%' }}>
            <h3 style={{ textAlign: 'center' }}>Todo</h3>
            {this.state.message && <p className="alert alert-danger" style={{textAlign:'center'}}>{this.state.message}</p>}
            <div className="table-responsive">
              <table className="table table-hover" style={{borderCollapse:'separate', borderSpacing:'0 0.5em'}}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Complete</th>
                    <th style={{ textAlign: 'center' }}>Delete</th>
                  </tr>
                </thead>
                <ListTodo todos={this.state.todos} onToDoChange={this.onToDoChange} onDelete={this.onDelete}/>
              </table>
            </div>
            <div style={{textAlign:'center'}}>
            <form>
            <input type="text" required style={{width:'80%'}}value={this.state.todoName} onChange={e=>{this.setState({todoName:e.target.value})}}/>
            <button className="btn" style={{backgroundColor:'#4267B2',color:'white'}} onClick={(e)=>this.onAddTodo(e)}>Add Todo</button>
            </form>
            </div>
          </div>
        </div>

      );
    }
  }


