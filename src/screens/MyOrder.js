import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  try {
    const fetchMyOrder = async () => {
      let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/myorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("useremail"),
        }),
      });
      let response = await res.json();
      console.log(response.orderData);
      setOrderData(response.orderData);
    };

    useEffect(() => {
      fetchMyOrder();
    }, []);
  } catch (error) {
    console.log(error.message);
  }

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="container">
        <div className="row">
          {orderData !== null ? (
            orderData.order_data?.map((data, index) => {
             
              return data.map((item, index) => {
                return (
                  <div>
                   
                    <div className="card-body bg-light m-3 card border-secondary ">
                      <h5 className="card-title" key={index}>
                        {item.name}
                      </h5>
                      <div
                        className="container w-100 p-0"
                        style={{ height: "38px" }}
                      >
                        <span className="m-1">quantity:{item.qty}</span>
                        <br />
                        <span className="m-1">size:{item.size}</span>

                        <span className=" d-inline ms-2 h-100 w-20 fs-5">
                          price: ₹{item.price}/-
                        </span>
                      </div>
                    </div>
                  </div>
                );
              });
            })
          ) : (
            <h3>No order has been placed yet</h3>
          )}
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
