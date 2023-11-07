import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();
  let options = props.options;
  console.log(options);
  let priceOptions = Object.keys(options);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
  };
  let finalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card  mt-3"
        style={{ width: "18rem", maxHeight: "360px", marginLeft: "1rem" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="img"
          style={{ height: "180px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.foodName}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-danger bg-gradient rounded"
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from({ length: 6 }, (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-danger bg-gradient rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr>
          </hr>
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}> Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
