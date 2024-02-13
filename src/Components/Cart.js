import React from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeitem,
  incrementQuantity,
  decrementQuantity,
} from "../features/CartSlice";

function Cart() {
  const { cart, TotalQuantity, TotalPrice } = useSelector(
    (state) => state.allcart
  );
  const dispatch = useDispatch();

  const handleIncrement = (index) => {
    dispatch(incrementQuantity({ id: cart[index].id }));
  };

  const handleDecrement = (index) => {
    dispatch(decrementQuantity({ id: cart[index].id }));
  };

  const handleQuantityChange = (event, index) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      if (newQuantity > cart[index].quantity) {
        dispatch(incrementQuantity({ id: cart[index].id }));
      } else if (newQuantity < cart[index].quantity) {
        dispatch(decrementQuantity({ id: cart[index].id }));
      }
    }
  };

  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cart.length} items</h5>
                </div>
                <div className="card-body">
                  {cart.map((item, index) => (
                    <div key={index} className="row mb-4">
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        {/* Image */}
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={item.img}
                            className="w-100"
                            alt={item.name}
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            />
                          </a>
                        </div>
                        {/* Image */}
                      </div>
                      <div className="col-lg-5 col-md-4 col-sm-6">
                        {/* Data */}
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => dispatch(removeitem({ id: item.id }))}
                        >
                          <i className="fas fa-trash" />
                        </button>
                        {/* Data */}
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12">
                        {/* Quantity */}
                        <div className="d-flex mb-4 align-items-center">
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={() => handleDecrement(index)}
                          >
                            <i className="fas fa-minus" />
                          </button>
                          <div className="form-outline flex-grow-1">
                            <input
                              id={`quantity_${index}`}
                              min={0}
                              value={item.quantity}
                              type="number"
                              className="form-control"
                              onChange={(event) =>
                                handleQuantityChange(event, index)
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor={`quantity_${index}`}
                            >
                              Quantity
                            </label>
                          </div>
                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={() => handleIncrement(index)}
                          >
                            <i className="fas fa-plus" />
                          </button>
                        </div>
                        {/* Quantity */}
                        {/* Price */}
                        <p className="text-start text-md-center">
                          <strong>${item.price * item.quantity} </strong>
                        </p>
                        {/* Price */}
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                  {/* Single item */}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{TotalQuantity}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${TotalPrice}</strong>
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => window.print()}
                    disabled={cart.length === 0}
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
