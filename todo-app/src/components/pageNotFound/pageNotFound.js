import React, { Component } from 'react';


class PageNotFound extends Component {

  render() {
    return (
      <div className="container-fluid" style={{textAlign:'center'}}>
            <h1>Error 404</h1>
            <h5>Woops. Looks like this page doesn't exist!</h5>
      </div>
    );
  }
}

export default PageNotFound;
