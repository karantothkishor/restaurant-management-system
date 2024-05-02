import React, { Fragment, useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import GlobalContext from '../../providers/GlobalContext';
import { useNavigate } from 'react-router-dom';

const TableManager = () => {
  const axios = require('axios');
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [TableList, setTableList] = useState([]);
  const getList = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_tables");
      const jsonData = await response.json();
      console.log(jsonData);
      setTableList(jsonData);
    }
    catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  const handleFree = async (e) => {
    let tableId = parseInt(e.target.value);
    console.log(tableId);
    axios
      .post(`http://localhost:5000/checkout_offl`, { tableId: tableId }, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getList();
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error)
      })
  };
  const handleOccupy = async (e) => {
    let tableId = parseInt(e.target.value);
    console.log(tableId);
    axios
      .post(`http://localhost:5000/assign_tbl`, { tableId: tableId }, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getList();
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error)
      })
  };

  const ViewOrder = async (e) => {
    let tableId = parseInt(e.target.value);
    let path = `/vieworder/${tableId}`;
    navigate(path);
  };

  return (
    <Fragment >

      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'TableManager' ?
              <div className="demo">
                <br />
                <div className="container text-center">
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Table List</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                        <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                          <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                            <thead>
                              <tr>
                                <th>Table Number</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {TableList.map(data => (
                                <tr key={data.tableid}>
                                  <td>{data.tableid}</td>
                                  <td>{data.status}</td>
                                  <td>
                                    <Button disabled={data.status === 'Free'} onClick={handleFree} value={data.tableid}> Free Table </Button>
                                  </td>
                                  <td>
                                    <Button disabled={data.status === 'Not free'} onClick={handleOccupy} value={data.tableid}> Occupy Table </Button>
                                  </td>
                                  <td>
                                    <Button disabled={data.status === 'Free'} onClick={ViewOrder} value={data.tableid}> View Order </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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

export default TableManager;