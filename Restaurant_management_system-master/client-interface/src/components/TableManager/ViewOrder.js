import React, { Fragment, useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import GlobalContext from '../../providers/GlobalContext';
import { useNavigate, useParams } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';
import { Link } from 'react-router-dom';

const ViewOrder = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const params = useParams();
  const tblid = params.tblid;
  const [currentOrders, setcurrentOrders] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/view_ord/${tblid}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setcurrentOrders({
          columns: [
            {
              label: 'Name',
              field: 'Name'
            },
            {
              label: 'OrderQuantity',
              field: 'OrderQuantity'
            }
          ],
          rows: jsonData.map(items => (
            {
              Name: items.name,
              OrderQuantity: items.orderquantity,
            }
          )),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    getOrders();
  }, []);

  return (
    <Fragment >

      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'TableManager' ?
              <div className="demo">
                <br />
                <div>
                  <li>
                    <Link to="/tbl_mngr">Table List</Link>
                  </li>
                </div>
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
    </Fragment >
  )
};

export default ViewOrder;