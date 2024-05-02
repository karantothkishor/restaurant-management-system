import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import GlobalContext from "../../providers/GlobalContext";
import { MDBDataTableV5 } from 'mdbreact';

const DeliveryManagerAllPersons = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [listPersons, setlistPersons] = useState(null);
  useEffect(() => {
    const getDeliveryPersons = async () => {
      try {
        const response = await fetch(`http://localhost:5000/all_del_persons`);
        const jsonData = await response.json();
        console.log(jsonData);
        setlistPersons({
          columns: [
            {
              label: 'Name',
              field: 'Name'
            },
            {
              label: 'Availability',
              field: 'Available'
            },
            {
              label: 'OrderID',
              field: 'OrderID'
            }
          ],
          rows: jsonData.map(list_persons => (
            {
              Name: list_persons.name,
              Available: list_persons.available,
              OrderID: list_persons.orderid,
            }
          )),
        });
        console.log(listPersons);

      }
      catch (err) {
        console.log(err.message);
      }

    };
    getDeliveryPersons();
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
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > All delivery persons</h2>
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                        <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                          {listPersons ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={listPersons} />
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

export default DeliveryManagerAllPersons;