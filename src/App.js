import React, { Component} from 'react';
import Header from './conponents/Header';
import ProductContainer from './containers/ProductContainer';
import CartContainer from './containers/CartContainer';
import Footer from './conponents/Footer';
import MessageContainer from './containers/MessageContainer';

class App extends Component{
  render() {
    return(
    <div>
        <Header/>
        <main id="mainContainer">
            <div className="container">
                <ProductContainer/>
                <MessageContainer/>
                <CartContainer/>
            </div>
        </main>
        <Footer/>
    </div>
    );
  }
}
export default App;