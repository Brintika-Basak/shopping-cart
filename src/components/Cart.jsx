import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const incrementHandler = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };
  const decrementHandler = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              key={i.id}
              imgsrc={i.imgSrc}
              name={i.name}
              id={i.id}
              qty={i.quantity}
              price={i.price}
              decrement={decrementHandler}
              increment={incrementHandler}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>No items yet</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal : ${subTotal}</h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax:${tax}</h2>
        <h2>total:${total}</h2>
      </aside>
    </div>
  );
};
const CartItem = ({
  imgsrc,
  name,
  id,
  qty,
  price,
  decrement,
  increment,
  deleteHandler,
}) => (
  <div className="cartItem">
    <img src={imgsrc} alt="Item" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>
    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;
