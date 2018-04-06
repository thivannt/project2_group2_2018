import React, {Component} from 'react'

export default class ListTodo extends Component{
    render() {
      const todo = Array.from(this.props.todos);
      const listItems = todo.map((item, index) =>
        <tr key={index} className={!item.complete ? 'table-info' : ''}>
          <td width="20" style={{ textAlign: 'center' }}>{index+1}</td>
          <td width="500">{item.name}</td>
          <td width="30" style={{ textAlign: 'center' }}><input type="checkbox" checked={item.complete} onChange={()=>this.props.onToDoChange(item._id,index)} /></td>
          <td width="20" style={{ textAlign: 'center' }}>
           <span className="fa fa-close" style={{color:'red',fontSize:20}} onClick={()=>this.props.onDelete(item._id,index)}></span></td>
        </tr>
      );
      return (
        <tbody>
          {listItems}
          <tr>
            <td></td>
            <td>
                <div className="row">
                <div className="col-lg-4"><b>Total: {todo.length}</b></div>
                <div className="col-lg-4"><b>Completed: {todo.filter(x => x.complete===true).length}</b></div>
                <div className="col-lg-4"><b>Remaining: {todo.filter(x => x.complete===false).length}</b></div>
                </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      );
    }
  }