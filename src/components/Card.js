import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart } from "./ContextReducer";
import { useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.option;
  let priceOptions = Object.keys(options);
  let [qty, setQty] = useState(1);
  let [size, setSize] = useState("");
  let foodItem = props.foodItems;
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalprice,
          qty: qty,
        });

        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalprice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalprice,
      qty: qty,
      size: size,
    });
  };
  let finalprice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>

            <div className="container w-100 ">
              <select
                className="m-2 h-100 bg-success rounded text-light"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-success rounded text-light"
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
              <div className="d-inline h-100 fs-5">₹ {finalprice}/-</div>
            </div>
            <hr />
            <button
              className="btn bg-success text-black justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
