import React, { Component } from 'react';
import { connect } from "react-redux";
import Cart from './../conponents/Cart';
import CartItem from './../conponents/CartItem'
import * as Message from './../constants/Message';
import CartResult from './../conponents/CartResult';
import { actDeleteProductInCart, actChangeMessage, actUpdateProductInCart} from "./../actions/index";

class CartContainer extends Component {
    render() {
        var { cart} = this.props;
        return (
            <Cart>
                {this.showCartItem(cart)}
                {this.showTotalAmount(cart)}
            </Cart>
        );
    }
    showCartItem = (cart) => {
        var { onDeleteProductInCart, onChangeMessage, onUpdateProductInCart} = this.props;
        var result = <tr>
                        <td>
                            {Message.MSG_CART_EMPTY}
                        </td>
                    </tr>;
        if( cart.length > 0 ){
            result = cart.map((item,index)=>{
                return( <CartItem
                    key={index}
                    item={item}
                    index={index}
                    onDeleteProductInCart={onDeleteProductInCart}
                    onChangeMessage={onChangeMessage}
                    onUpdateProductInCart={onUpdateProductInCart}/>
                )
            });
        }
        return result;
    }
    showTotalAmount=(cart)=>{
        var result = null;
        if(cart.length>0){
            result = <CartResult cart={cart}/>
        }
        return result;
    }
}


const mapStateToProps = state =>{
    return{
        cart : state.cart
    }
}

const mapDispatchToProps=(dispatch,props)=>{
    return{
        onDeleteProductInCart:(product)=>{
            dispatch(actDeleteProductInCart(product));
        },
        onChangeMessage:(message)=>{
            dispatch(actChangeMessage(message))
        },
        onUpdateProductInCart:(product,quantity)=>{
            dispatch(actUpdateProductInCart(product,quantity))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);