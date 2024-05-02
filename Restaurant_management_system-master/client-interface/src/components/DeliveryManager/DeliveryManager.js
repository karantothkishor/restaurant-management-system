import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../providers/GlobalContext";
import { MDBDataTableV5 } from 'mdbreact';

const DeliveryManager = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [currentOrders, setcurrentOrders] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/onl_cook_ords");
        const jsonData = await response.json();
        console.log(jsonData);
        setcurrentOrders({
          columns: [
            {
              label: 'OrderID',
              field: 'OrderID'
            },
            {
              label: 'Zip',
              field: 'Zip'
            },
            {
              label: 'Time',
              field: 'Time'
            }
          ],
          rows: jsonData.map(curr_orders => (
            {
              OrderID: <Link to={`/deli_manager/order_info/${curr_orders.orderid}/${curr_orders.zip}`}>{curr_orders.orderid}</Link>,
              Zip: curr_orders.zip,
              Time: curr_orders.time,
            }
          )),
        });

      }
      catch (err) {
        console.log(err.message);
      }
    };
    getOrders();
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
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Order List</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                        <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                          {currentOrders ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={currentOrders} />
                            : ''
                          }
                        </div>
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

export default DeliveryManager;