import host from '../config'
const AuthAPI = {
  login: (username, password) => {
    return fetch(host + '/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',

      },
    })
  },
  register: (username, password,email) => {
    return fetch(host + '/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

}
export default AuthAPI
