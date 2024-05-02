import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../providers/GlobalContext';

//import './styling.css';

const ListMenu = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [Starters_N, set_Starters_N] = useState([]);
  const [Starters_V, set_Starters_V] = useState([]);
  const [Main_Course_N, set_Main_Course_N] = useState([]);
  const [Main_Course_V, set_Main_Course_V] = useState([]);
  const [Desserts_N, set_Desserts_N] = useState([]);
  const [Desserts_V, set_Desserts_V] = useState([]);
  const [Beverages_N, set_Beverages_N] = useState([]);
  const [Beverages_V, set_Beverages_V] = useState([]);
  const [Sfilter, set_Sfilter] = useState(true);
  const [Mfilter, set_Mfilter] = useState(true);
  const [Dfilter, set_Dfilter] = useState(true);
  const [Bfilter, set_Bfilter] = useState(true);
  const [Nfilter, set_Nfilter] = useState(true);
  const [Vfilter, set_Vfilter] = useState(true);
  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/view_menu");
      const jsonData = await response.json();
      set_Starters_N(jsonData.filter(menu => (menu.category === "Starters" && menu.non_veg === "Yes")));
      set_Starters_V(jsonData.filter(menu => (menu.category === "Starters" && menu.non_veg === "No")));
      set_Main_Course_N(jsonData.filter(menu => (menu.category === "Main Course" && menu.non_veg === "Yes")));
      set_Main_Course_V(jsonData.filter(menu => (menu.category === "Main Course" && menu.non_veg === "No")));
      set_Desserts_N(jsonData.filter(menu => (menu.category === "Desserts" && menu.non_veg === "Yes")));
      set_Desserts_V(jsonData.filter(menu => (menu.category === "Desserts" && menu.non_veg === "No")));
      set_Beverages_N(jsonData.filter(menu => (menu.category === "Beverages" && menu.non_veg === "Yes")));
      set_Beverages_V(jsonData.filter(menu => (menu.category === "Beverages" && menu.non_veg === "No")));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handle_Sfilter = () => {
    set_Sfilter(!Sfilter);
  }

  const handle_Mfilter = () => {
    set_Mfilter(!Mfilter);
  }

  const handle_Dfilter = () => {
    set_Dfilter(!Dfilter);
  }

  const handle_Bfilter = () => {
    set_Bfilter(!Bfilter);
  }

  const handle_Nfilter = () => {
    set_Nfilter(!Nfilter);
  }

  const handle_Vfilter = () => {
    set_Vfilter(!Vfilter);
  }

  const handleAdd = async (e) => {
    let usrnme = user.Username; //need to change
    let dishid = parseInt(e.target.value);
    let quantity = 1;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usrnme, dishid, quantity })
    };

    try {
      const response = await fetch("http://localhost:5000/insert_cart/", requestOptions);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubtract = async (e) => {
    let usrnme = user.Username; //need to change
    let dishid = parseInt(e.target.value);
    let quantity = 1;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usrnme, dishid, quantity })
    };

    try {
      const response = await fetch("http://localhost:5000/remove_cart/", requestOptions);
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Fragment >
      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'Customer' ?
              <div className="demo">
                <br />
                <div className="container text-center">
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Menu</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="App">
                        Filter Menu:
                        <div className="filter">
                          <input
                            type="checkbox"
                            id="Nfilter"
                            name="Nfilter"
                            value="Nfilter"
                            checked={Nfilter}
                            onChange={handle_Nfilter}
                          />
                          Non-Veg
                        </div>
                        <div className="filter">
                          <input
                            type="checkbox"
                            id="Vfilter"
                            name="Vfilter"
                            value="Vfilter"
                            checked={Vfilter}
                            onChange={handle_Vfilter}
                          />
                          Veg
                        </div>
                        <div className="filter">
                          <input
                            type="checkbox"
                            id="Sfilter"
                            name="Sfilter"
                            value="Sfilter"
                            checked={Sfilter}
                            onChange={handle_Sfilter}
                          />
                          Starters
                        </div>
                        <div className="filter">
                          <input
                            type="checkbox"
                            id="Mfilter"
                            name="Mfilter"
                            value="Mfilter"
                            checked={Mfilter}
                            onChange={handle_Mfilter}
                          />
                          Main Course
                        </div>
                        <div className="filter">
                          <input
                            type="checkbox"
                            id="Dfilter"
                            name="Dfilter"
                            value="Dfilter"
                            checked={Dfilter}
                            onChange={handle_Dfilter}
                          />
                          Desserts
                        </div>
                        <div className="filter">
                          <input
                            type="checkbox"
                            id="Bfilter"
                            name="Bfilter"
                            value="Bfilter"
                            checked={Bfilter}
                            onChange={handle_Bfilter}
                          />
                          Beverages
                        </div>
                      </div>
                      {Sfilter && Nfilter ?
                        <div>
                          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Non_Veg)</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Starters_N.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {Sfilter && Vfilter ?
                        <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Veg)</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Starters_V.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {Mfilter && Nfilter ?
                        <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Main Course(Non-Veg)</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Main_Course_N.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {Mfilter && Vfilter ?
                        <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Main Course(Veg)</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Main_Course_V.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {Dfilter && Nfilter ?
                        <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Desserts(Non-Veg)</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Desserts_N.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {Dfilter && Vfilter ?
                        <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Desserts(Veg)</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Desserts_V.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {Bfilter ?
                        <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Beverages</h2>
                          <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                            <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                              <thead>
                                <tr>
                                  <th>Dish ID</th>
                                  <th>Dish</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Beverages_N.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                                {Beverages_V.map(data => (
                                  <tr key={data.dishid}>
                                    <td>{data.dishid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                                    </td>
                                    <td>
                                      <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div> : ''}

                      {/* { Bfilter && Vfilter ?
            <div> <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Beverages(Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Beverages_V.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                        </td>
                        <td>
                          <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div> :''} */}
                    </div>
                  </div>
                  <Link to="/user_cart"> <button type="button" className="btn btn-primary btn-lg btn-block"> GO to Cart </button> </Link>
                </div>
                <br />
              </div>
              : 'Cannot Access this page'
          }
        </div>
      }
    </Fragment>
  );

};

export default ListMenu;