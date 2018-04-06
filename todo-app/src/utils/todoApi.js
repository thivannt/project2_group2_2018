import host from '../config'
const AuthAPI = {
  createOne: (name) => {
    return fetch(host + '/todos', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      },
    })
  },
  getAll: () => {
    return fetch(host + '/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      },
    })
  },
  deleteOne: (id) => {
    return fetch(host + '/todos/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      },
    })
  },
  changeTodo: (id) => {
    return fetch(host + '/todos/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      },
    })
  },
}
export default AuthAPI
