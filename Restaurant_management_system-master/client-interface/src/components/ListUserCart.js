import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../providers/GlobalContext';

//import './styling.css';

const ListUserCart = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [cartDetails, set_cartDetails] = useState([]);
  const [grandTotal, setgrandTotal] = useState(0);
  const [empty, setEmpty] = useState(true);

  const getUserCart = async () => {
    try {
      const usrnme = user.Username;
      const response = await fetch(`http://localhost:5000/user_cart/${usrnme}`);
      const jsonData = await response.json();
      if (jsonData.length !== 0) {
        setEmpty(false);
      }
      var total = 0;
      jsonData.forEach(dish => {
        total += dish.price * dish.quantity;
      });
      setgrandTotal(total);
      set_cartDetails(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserCart();
  }, [user]);

  return (
    <Fragment >
      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'Customer' ?
              <div className="demo">
                <br />
                <div className="container text-center">
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Cart</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                        <div onClick={() => this.handleSubmit('value')}>
                          <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                            <thead>
                              <tr>
                                <th>Dish ID</th>
                                <th>Dish</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th> Total price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartDetails.map(data => (
                                <tr key={data.dishid}>
                                  <td>{data.dishid}</td>
                                  <td>{data.name}</td>
                                  <td>{data.price}</td>
                                  <td>{data.quantity}</td>
                                  <td>{data.price * data.quantity}</td>
                                  {/* <td>
                          <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                        </td>
                        <td>
                          <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                        </td> */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <h4>Grand Total: {grandTotal}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/menu"> <button type="button" className="btn btn-primary btn-lg btn-block"> Go back to Menu </button> </Link>
                  <Link to="/online_checkout"> <button type="button" className="btn btn-primary btn-lg btn-block"> Checkout </button> </Link>
                </div>
                <br />
              </div>

              : 'Cannot Access this page'
          }
        </div >
      }
    </Fragment >
  );

};

export default ListUserCart;