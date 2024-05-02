import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import GlobalContext from "../../providers/GlobalContext";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";

const DeliveryManagerListPersons = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const navigate = useNavigate();
  const axios = require('axios');
  const params = useParams();
  const pincode = params.pincode;
  const orderid = params.orderid;
  const [listPersons, setlistPersons] = useState([]);
  const getDeliveryPersons = async pincode => {
    try {
      const response = await fetch(`http://localhost:5000/del_ppl/${pincode}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setlistPersons(jsonData);

    }
    catch (err) {
      console.log(err.message);
    }
  };
  const handleUpdate = async (delid, orderid) => {
    axios
      .post(`http://localhost:5000/assign_delperson`, { delid: delid, ordid: orderid }, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getDeliveryPersons(pincode);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error)
      })
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ delid, orderid })
    // };
    // try {
    //   const response = await fetch("http://localhost:5000/assign_delperson/", requestOptions);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err.message);
    // }
  };
  useEffect(() => {
    getDeliveryPersons(pincode);
  }, []);
  return (
    <Fragment >
      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'DeliveryManager' ?

              <div className="demo">
                <br />
                <div className="container text-center">
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Delivery Person List</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                        <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listPersons.map(data => (
                              <tr key={data.username}>
                                <td>{data.name}</td>
                                <td>{data.contact}</td>
                                <td>
                                  <Button onClick={() => handleUpdate(data.username, orderid)}> Start </Button>
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
              </div>
              : 'Cannot Access this page'
          }
        </div>
      }
    </Fragment>
  )
};

export default DeliveryManagerListPersons;