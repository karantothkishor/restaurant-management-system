import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../../providers/GlobalContext';

//import './styling.css';

const ListInventory = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [Inventory, set_Inventory] = useState([]);
  // const [ItemID, setItemID] = useState('');
  // const [Error, setItemID] = useState('');
  // const [IdSet, set_IdSet] = useState(false);

  const getInventory = async () => {
    try {
      //const usrnme = user.Username;
      const response = await fetch(`http://localhost:5000/inventory`);
      const jsonData = await response.json();
      console.log(jsonData);
      set_Inventory(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   let value = event.value;
  //   if(!value.trim()){
  //     setError("Item ID can not be empty");

  //   }

  // }

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <Fragment >
      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'Chef' && user.Role === 'head' ?
              <div className="demo">
                <br />
                <div className="container text-center">
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Inventory</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                        <div >
                          <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                            <thead>
                              <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Inventory.map(data => (
                                <tr key={data.dishid}>
                                  <td>{data.itemid}</td>
                                  <td>{data.name}</td>
                                  <td>{data.quantity}</td>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Link to="/menu"> <button type="button"> Go back to Menu </button> </Link>
          <Link to="/online_checkout"> <button type="button"> Checkout </button> </Link> */}
                </div>
                <br />
              </div>
              : 'Only Head Chef can access this page'
          }
        </div>
      }
    </Fragment>
  );

};

export default ListInventory;