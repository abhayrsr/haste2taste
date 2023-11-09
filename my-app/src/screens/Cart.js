import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer"
import trash from '../trash.svg'

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if(data.length === 0){
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3"> The Cart is Empty</div>
            </div>
        )
    }
    
    const handleCheckOut = async() => {
      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch("http://localhost:5000/api/orderData",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      if(response.status === 200){
        console.log("x")
        dispatch({ type: "DROP"})
      }
    } 

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
   
  return (
    <div className="container">
      <table className="table table-dark table-hover m-4 fs-5">
      <thead>
    <tr className="text-danger">
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Option</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
        {data.map((food, index) => (
        <tr className="text-white" id="row">
            <th scope="row">{index + 1}</th>
            <td>{food.name}</td>
            <td>{food.quantity}</td>
            <td>{food.size}</td>
            <td>{food.price}</td>
            <td> <button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={()=>{dispatch({ type:"REMOVE", index: index})}}></img></button></td>
        </tr>
        ))}
  </tbody>
      </table>
      <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
      <button className="btn bg-success text-white mx-2" onClick={handleCheckOut}> Check Out</button>
    </div>
   
  );
}
