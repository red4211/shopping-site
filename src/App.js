import React, { useState} from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([
    {name: "Logitech g102", image: "https://i.imgur.com/2YDi60z.jpg", id:0, price:"$15"},
    {name: "Logitech Wireless Mouse M185",image: "https://i.imgur.com/HuLhfCH.jpg",id:1, price:"$10"},
    {name: "Logitech G300s Optical Ambidextrous Gaming Mouse – 9 Programmable Buttons, Onboard Memory",image: "https://i.imgur.com/l9frYoz.jpg",id:2, price:"$15"},
    {name: "Logitech m325",image: "https://i.imgur.com/ploiSYi.jpg",id:3, price:"$16"},
    {name: "Logitech G203 Prodigy RGB Wired Gaming Mouse – Black",image: "https://i.imgur.com/PBox9HG.jpg",id:4, price: "$20"}
  ]);

  const [showCart, setShowCart] = useState(false);
  const toggleCart = ()=>{
    setShowCart(!showCart);
  }

  const [cart, changeCart] = useState([]);
  const addToCart = (obj)=>{
    //check if item already in cart

    let itemAlreadyInCart = false;
    for(let i=0; i<cart.length; i++){
      if(cart[i].id===obj.id){
        itemAlreadyInCart = true;
        let cartCopy = [...cart];
        cartCopy[i].quantity++;
        changeCart(cartCopy);
        break;
      }
    }

    if(itemAlreadyInCart===false){
      obj.quantity = 1;
      changeCart([...cart, obj]);
    }
    console.log(cart);
  }

  const productList = products.map((elem)=>{
    return (<li key={elem.id}>
  <div className="img-wrap"><img src={elem.image} /></div>
  <div>
  <a href="#" className="product-title" >{elem.name}</a>
  <p className="price" >{elem.price}</p>
  <button onClick={()=>{addToCart(elem) }} >Add to cart</button>
  </div>
    </li>)
  })
  return (
    <div className="App">
      <div className="header-top">
        <div className="header-in">
        <div className="cart" onClick={()=>{toggleCart()}}></div>
        </div>
      </div>
      <div className="header-bot">
      <div className="header-in">
          <ul className="top-nav">
            <li><a href="#">Today's deals</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Registry</a></li>
            <li><a href="#">Gift cards</a></li>
            <li><a href="#">Sell</a></li>
          </ul>
        </div>
      </div>

      <div className="main">
        <Cart cart={cart} changeCart={changeCart} showCart={showCart} />

        <ul className="products">
          {productList}
        </ul>
      </div>
    </div>
  );
}

const Cart = (props) => {
  let subtotalItems = 0;
  let subtotalPrice = 0;
  const cartList = props.cart.map((elem, index)=>{
    return (<li>
      <div className="cart-item-info">
      <div className="img-wrap">
        <img src={elem.image} />
      </div>

      <div>
      <p className="item-name">{elem.name} </p>
      <span>Quantity: {elem.quantity} </span>
      <button onClick={()=>{deleteItem(elem)}} >Delete</button>
      </div>
      </div>
      <div className="cart-item-price"><p className="item-price">{elem.price}</p></div>
    </li>)
  })

  const deleteItem = (item)=>{
    let cartCopy = [...props.cart];
    for(let i=0; i<cartCopy.length; i++){
      if(cartCopy[i].id===item.id){
        cartCopy.splice(i, 1);
        break;
      }
    }

    props.changeCart(cartCopy);
  }

  props.cart.forEach((elem,index)=>{
    subtotalItems+=elem.quantity;
    console.log(parseFloat(elem.price));
  })

  if(props.showCart){
    return (
      <div className="shopping-cart" >
        <h2>Shopping Cart</h2>
        <ul className="shopping-list" >
          {cartList}
        </ul>
        <p>
          Subtotal ({subtotalItems} items) {subtotalPrice}
        </p>
      </div>
    );
  }else{
    return null;
  }

  
}
 

export default App;
