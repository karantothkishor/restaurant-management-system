import React, { Fragment, ReactFragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../providers/GlobalContext';

const OnlineCheckout = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [CheckIng, setCheckIng] = useState(true);
  const [orderP, setorderP] = useState(false);
  const [Inputs, SetInputs] = useState({
    Name: 'my name',
    Contact: '1234567890',
    Address: 'my addr',
    Zip: '1234'
  })
  const [Errors, SetErrors] = useState({
    Address: '',
    Zip: '',
    Ing: ''
  })
  // const [Isvalid, SetIsValid] = useState(false);
  const [IsPending, setIsPending] = useState(false);

  const getUserDetails = async () => {
    try {
      const usrnme = user.Username;
      // console.log(usrnme);
      // const usrnme = 'whubbocks0'; //need to change
      const response = await fetch(`http://localhost:5000/get_user_details/${usrnme}`);
      const jsonData = await response.json();
      SetInputs({
        Name: jsonData[0].name,
        Address: jsonData[0].address,
        Zip: jsonData[0].zip,
        Contact: jsonData[0].contact
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  const validate = async () => {
    let input = Inputs;
    let errors = {};
    let isValid = true;

    try {
      const zip = Inputs.Zip;
      const response = await fetch(`http://localhost:5000/check_zip/${zip}`);
      const jsonData = await response.json();
      if (jsonData.length === 0) {
        isValid = false;
        errors.Zip = "We do not deliver to this location";
      }
    } catch (err) {
      console.error(err.message);
    }

    if (!(input.Address).trim()) {
      isValid = false;
      errors.Address = "Please enter Address";
    }

    if (!(input.Zip).trim()) {
      isValid = false;
      errors.Zip = "Please enter Zip code";
    }

    if (typeof input.Zip !== "undefined") {

      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(input.Zip)) {
        isValid = false;
        errors.Zip = "Please enter only numbers";
      } else if ((input.Zip).length !== 6) {
        isValid = false;
        errors.Zip = "length of zip should be 6";
      }
    }
    SetErrors(errors);
    return isValid;
  }

  const checkIngredients = async () => {
    let ingAvail = true;
    let errors = {};
    try {
      const usrnme = user.Username;
      const response = await fetch(`http://localhost:5000/insuff_ing_onl/${usrnme}`);
      const jsonData = await response.json();
      if (jsonData.length > 0) {
        ingAvail = false;
        setCheckIng(false);
        errors.Ing = "Sorry, we do not have sufficient Ingredients";
      }
    } catch (err) {
      console.error(err.message);
    }
    console.log(ingAvail);
    SetErrors(errors);
    return ingAvail;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validate().then(isValid => {
      if (isValid) {
        setIsPending(true);
        const usrnme = user.Username;
        // const usrnme = 'whubbocks0';
        const Name = Inputs.Name;
        const Address = Inputs.Address;
        const Zip = Inputs.Zip;
        const Contact = Inputs.Contact;
        var currentdate = new Date();
        var timestamp = currentdate.getFullYear() + "-"
          + (currentdate.getMonth() + 1) + "-"
          + currentdate.getDate() + " "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();
        fetch('http://localhost:5000/editprofile', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usrnme, Name, Address, Contact, Zip })
        }).then(res => {
          console.log(res);
          checkIngredients().then(ingAvail => {
            if (ingAvail) {
              fetch('http://localhost:5000/ins_ord', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usrnme, timestamp })
              }).then(res => {
                console.log(res);
                if (res.status === 200) {
                  setorderP(true);
                }
              })
            }
          });
        })
        setIsPending(false);
      }
    });
  }

  useEffect(() => {
    getUserDetails();
  }, [user]);

  return (
    <Fragment>


      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'Customer' ?
              <div className="demo centerMy">
                <div className="container text-center">

                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour">Delivery Address</h2>
                  <div className="card shadow-lg p-3 mb-5 bg-white rounded demo2 ChangeTextFont">
                    <form onSubmit={handleSubmit}>

                      <div className="row justify-content-center">
                        <div className="form-group text-left  col-sm-5">
                          <label>Address
                            <input className="form-control"
                              type="text"
                              name="Address"
                              value={Inputs.Address}
                              onChange={e => SetInputs({ ...Inputs, Address: e.target.value })}
                            />
                          </label>
                          <div className="text-danger">{Errors.Address}</div>
                        </div>
                        <div className="form-group text-left  col-sm-5">
                          <label>Zip code
                            <input className="form-control"
                              type="text"
                              name="Zip"
                              value={Inputs.Zip}
                              onChange={e => SetInputs({ ...Inputs, Zip: e.target.value })}
                            />
                          </label>
                          <div className="text-danger">{Errors.Zip}</div>
                        </div>
                        <div className="text-danger">{Errors.Ing}</div>
                        <div className="col-sm-6">
                          {!IsPending && <button className="btn btn-primary btn-lg btn-block" >Place Order</button>}
                          <Link to="/user_cart"> <button type="button" className="btn btn-primary btn-lg btn-block"> Go back to Cart </button> </Link>
                          {IsPending && <button className="btn btn-primary btn-lg btn-block" disabled>Ordering...</button>}
                        </div>
                      </div>
                    </form>
                  </div>
                  {orderP ? <h2 className="btn btn-primary btn-lg btn-block">Order placed</h2> : <h2 className="btn btn-primary btn-lg btn-block">Order Not placed</h2>}
                </div>
              </div>
              : 'Cannot Access this page'
          }
        </div>
      }
    </Fragment>
  );
};

export default OnlineCheckout;

// disabled={!Name.trim() || !Address.trim() || !Contact.trim() || !Zip.trim() } 