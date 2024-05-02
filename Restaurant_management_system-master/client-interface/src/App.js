import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import ListMenu from './components/ListMenu';
import ListUserCart from './components/ListUserCart';
import OnlineCheckout from './components/OnlineCheckout';
import UpdateProfile from './components/UpdateProfile';
import ListUserOrders from './components/ListUserOrders';
import Register from './components/Register';
import Login from './components/Login';
import DeliveryManager from './components/DeliveryManager/DeliveryManager';
import DeliveryManagerListPersons from './components/DeliveryManager/DeliveryManagerListPersons';
import Header from './components/Header';
import GlobalContext from './providers/GlobalContext';
import GlobalContextProvider from './providers/GlobalContextProvider';
import DeliveryManagerAllPersons from './components/DeliveryManager/DeliveryManagerAllPersons';
import DeliveryAgent from './components/DeliveryAgent/deliveryAgent';
import TableManager from './components/TableManager/TableManager';
import Chef from './components/Chef/Chef';
import ListInventory from './components/Chef/ListInventory';
import InventoryForm from './components/Chef/InventoryForm';
import ViewOrder from './components/TableManager/ViewOrder';
import AddCoupon from './components/Owner/addCoupon';
import AddDM from './components/Owner/addDM';
import AddTM from './components/Owner/addTM';
import AddWaiter from './components/Owner/addWaiter';
import AddChef from './components/Owner/addChef';
import AddDA from './components/Owner/addDA';

function App() {
  return (
    <div>
      <GlobalContextProvider>
        <BrowserRouter>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/menu" element={<ListMenu />} />
              <Route path="/register" element={<Register />} />
              <Route path="/deli_manager" element={<DeliveryManager />} />
              <Route path="/deli_manager/order_info/:orderid/:pincode" element={<DeliveryManagerListPersons />} />
              <Route path="/deli_manager/all_persons" element={<DeliveryManagerAllPersons />} />
              <Route path='/deli_agent/' element={<DeliveryAgent />} />
              <Route path='/tbl_mngr' element={<TableManager />} />
              <Route path='/chef' element={<Chef />} />
              <Route path="/user_cart" element={<ListUserCart />} />
              <Route path="/online_checkout" element={<OnlineCheckout />} />
              <Route path="/user_history" element={<ListUserOrders />} />
              <Route path="/update_profile" element={<UpdateProfile />} />
              <Route path="/list_inventory" element={<ListInventory />} />
              <Route path="/inventory_form" element={<InventoryForm />} />
              <Route path='/vieworder/:tblid' element={<ViewOrder />} />
              <Route path='/addcoupon' element={<AddCoupon />} />
              <Route path='/adddeliverymanager' element={<AddDM />} />
              <Route path='/adddeliveryagent' element={<AddDA />} />
              <Route path='/addtablemanager' element={<AddTM />} />
              <Route path='/addwaiter' element={<AddWaiter />} />
              <Route path='/addchef' element={<AddChef />} />
              {/* <Route path="/deli_manager" element={<DeliveryManager />} />
          <Route path="/deli_manager/:pincode" element={<DeliveryManagerListPersons />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
