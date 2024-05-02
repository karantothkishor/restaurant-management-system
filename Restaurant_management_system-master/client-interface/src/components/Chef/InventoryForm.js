import React, { Fragment, ReactFragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../../providers/GlobalContext';

const InventoryForm = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [Inputs, SetInputs] = useState({
    ItemID: '',
    Quantity: ''
  })
  const [Errors, SetErrors] = useState({
    ItemID: '',
    Quantity: ''
  })
  // const [Isvalid, SetIsValid] = useState(false);
  const [IsPending, setIsPending] = useState(false);

  const validate = async () => {
    let input = Inputs;
    let errors = {};
    let isValid = true;


    if (!(input.ItemID).trim()) {
      isValid = false;
      errors.ItemID = "Please enter ItemID";
    } else {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(input.ItemID)) {
        isValid = false;
        errors.ItemID = "Please enter only numbers";
      } else {
        try {
          const ItemID = Inputs.ItemID;
          const response = await fetch(`http://localhost:5000/check_Itemid/${ItemID}`);
          const jsonData = await response.json();
          if (jsonData.length === 0) {
            isValid = false;
            errors.ItemID = "Enter a valid Item ID";
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    }

    if (typeof input.Quantity !== "undefined") {

      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(input.Quantity)) {
        isValid = false;
        errors.Quantity = "Please enter only numbers";
      } else if (parseInt(input.Quantity) <= 0) {
        isValid = false;
        errors.Quantity = "Quantity should be a positive Integer";
      }
    }

    if (!(input.Quantity).trim()) {
      isValid = false;
      errors.Quantity = "Please enter Quantity";
    }
    SetErrors(errors);
    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validate().then(isValid => {
      if (isValid) {
        setIsPending(true);
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var date = year + "-" + month + "-" + day;
        console.log(date);
        const ItemID = Inputs.ItemID;
        const Quantity = Inputs.Quantity;
        fetch('http://localhost:5000/add_items', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ItemID, Quantity, date })
        }).then(res => {
          console.log(res);
        })
        setIsPending(false);
      }
    });
  }

  useEffect(() => {
    //getUserDetails();
  }, []);

  return (
    <Fragment>
      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'Chef' && user.Role === 'head' ?
              <div className="demo centerMy">
                <div className="container text-center">
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour">Inventory Update From</h2>
                  <div className="card shadow-lg p-3 mb-5 bg-white rounded demo2 ChangeTextFont">
                    <form onSubmit={handleSubmit}>

                      <div className="row justify-content-center">
                        <div className="form-group text-left  col-sm-5">
                          <label>Item ID
                            <input className="form-control"
                              type="text"
                              name="ItemID"
                              value={Inputs.ItemID}
                              onChange={e => SetInputs({ ...Inputs, ItemID: e.target.value })}
                            />
                          </label>
                          <div className="text-danger">{Errors.ItemID}</div>
                        </div>
                        <div className="form-group text-left  col-sm-5">
                          <label>Quantity
                            <input className="form-control"
                              type="text"
                              name="Quantity"
                              value={Inputs.Quantity}
                              onChange={e => SetInputs({ ...Inputs, Quantity: e.target.value })}
                            />
                          </label>
                          <div className="text-danger">{Errors.Quantity}</div>
                        </div>

                        <div className="col-sm-6">
                          {!IsPending && <button className="btn btn-primary btn-lg btn-block" >Add Items</button>}
                          {IsPending && <button className="btn btn-primary btn-lg btn-block" disabled>Adding...</button>}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              : 'Only Head Chef can access this page'
          }
        </div>
      }
    </Fragment>
  );
};

export default InventoryForm;

// disabled={!Name.trim() || !Address.trim() || !Contact.trim() || !Zip.trim() } 