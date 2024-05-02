import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import GlobalContext from '../../providers/GlobalContext';

//import './styling.css';

const DeliveryAgent = () => {
  const axios = require('axios');
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const delid = 0;
  console.log(user.Username);
  const [listOrders, setlistOrders] = useState([]);
  const getList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/order_for_delivery/${user.Username}`);
      const jsonData = await response.json();
      console.log("hi");
      console.log(jsonData);
      const uniqueorders = Array.from(new Set(jsonData.map((item) => item["orderid"])));
      console.log(uniqueorders);
      const orderdata = uniqueorders.map((orderid) => {
        const currentOrderData = jsonData.filter((item) => item["orderid"] === orderid);
        return ({
          "orderid": orderid,
          "orderdata": currentOrderData.map((area) => {
            return ({
              "name": area.name,
              "quantity": area.quantity
            });
          })
        });
      });
      setlistOrders(orderdata);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleUpdate = async (delid, orderid) => {
    console.log("hi");
    console.log(delid);
    axios
      .post(`http://localhost:5000/delivered`, { delivd: delid, ordid: orderid }, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("osad")
          getList();
        } else {
          console.log("Hdsassadi");
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error.message)
      })
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ delid, orderid })
    // };
    // try {
    //   const response = await fetch("http://localhost:5000/delivered/", requestOptions);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  useEffect(() => {
    getList();
  }, [user]);

  return (
    <Fragment >

      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'DeliveryMan' ?
              <div>
                {user.Username !== '' ?
                  <div className="demo">
                    <br />
                    <div className="container text-center">
                      <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Delivery List</h2>
                      <div className="row justify-content-center">
                        <div className="col-sm-10">
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Order Data</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listOrders.map(data => (
                                  <tr key={data.orderid}>
                                    <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                                      <thead>
                                        <tr>
                                          <th>
                                            Dish ID
                                          </th>
                                          <th>
                                            Quantity
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {data.orderdata.map(data1 => (
                                          <tr key={data.orderid}>
                                            <td>{data1.name}</td>
                                            <td>{data1.quantity}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    <td>
                                      <Button onClick={() => handleUpdate(user.Username, data.orderid)} > Delivered </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div> : ''}
              </div>
              : 'Cannot Access this page'
          }
        </div>
      }
    </Fragment>
  );

};

export default DeliveryAgent;