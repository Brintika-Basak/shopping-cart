import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
const img1 =
  "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTCH2YIuPY-MdwPIyr_HoPxeDx2rOOlGxtzTxP3LfcoykSFi7hZiPTUMJUcpgvIwfE1PXzNMYaEgnenhSvTAawb1s81OYPf2WRGNISps7Pm92rovXzKTsLAmJBLIIFddVc84iGoTgjefVg&usqp=CAc";

const img2 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXDvFOZdCeLA_qRoeyQi-b3mEeItddF2pMA&usqp=CAU";
const Home = () => {
  const ProductList = [
    {
      name: "Mac Book",
      price: 12000,
      imgSrc: img1,
      id: "abcgsh",
    },
    {
      name: "Nike Shoe",
      price: 900,
      imgSrc: img2,
      id: "abcgshcxgh",
    },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    console.log(options);
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("added to cart");
  };

  return (
    <div className="home">
      {ProductList.map((i) => (
        <ProductCard
          key={i.id}
          name={i.name}
          price={i.price}
          imgSrc={i.imgSrc}
          id={i.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};
//card

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>{price}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to Cart
    </button>
  </div>
);

export default Home;
