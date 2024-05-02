import React, { useContext, useState, Fragment } from 'react';
import GlobalContext from '../providers/GlobalContext';
// import GlobalContextProvider from '../providers/GlobalContextProvider';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const axios = require('axios');

const Header = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = globalContext.user;

  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/logout`, null, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          globalContext.setUser({});
          navigate('/');
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(`Couldn't log the user out: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6"
            component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}> Restaurant Management System </Link>
          </Typography>

          {user.identifyRole === 'Customer' ? <Button color="inherit" onClick={() => navigate('/menu')}> Menu </Button> : ''}
          {user.identifyRole === 'Customer' ? <Button color="inherit" onClick={() => navigate('/user_cart')}> Cart </Button> : ''}
          {user.identifyRole === 'Customer' ? <Button color="inherit" onClick={() => navigate('/online_checkout')}> Checkout </Button> : ''}
          {user.identifyRole === 'Customer' ? <Button color="inherit" onClick={() => navigate('/user_history')}> History </Button> : ''}
          {user.identifyRole === 'Customer' ? <Button color="inherit" onClick={() => navigate('/update_profile')}> Update </Button> : ''}

          {user.identifyRole === 'Chef' ? <Button color="inherit" onClick={() => navigate('/chef')}> Orders </Button> : ''}
          {user.identifyRole === 'Chef' && user.Role === 'head' ? <Button color="inherit" onClick={() => navigate('/list_inventory')}> Inventory </Button> : ''}
          {user.identifyRole === 'Chef' && user.Role === 'head' ? <Button color="inherit" onClick={() => navigate('/inventory_form')}> Add Ingredients </Button> : ''}

          {user.identifyRole === 'DeliveryMan' ? <Button color="inherit" onClick={() => navigate('/deli_agent')}> Delivery List </Button> : ''}

          {user.identifyRole === 'DeliveryManager' ? <Button color="inherit" onClick={() => navigate('/deli_manager')}> Order List </Button> : ''}
          {user.identifyRole === 'DeliveryManager' ? <Button color="inherit" onClick={() => navigate('/deli_manager/all_persons')}> People </Button> : ''}

          {user.identifyRole === 'TableManager' ? <Button color="inherit" onClick={() => navigate('/tbl_mngr')}> People </Button> : ''}

          {user.identifyRole === 'Owner' ? <Button color="inherit" onClick={() => navigate('/addcoupon')}> Coupons </Button> : ''}
          {user.identifyRole === 'Owner' ? <Button color="inherit" onClick={() => navigate('/adddeliverymanager')}> DeliveryM </Button> : ''}
          {user.identifyRole === 'Owner' ? <Button color="inherit" onClick={() => navigate('/adddeliveryagent')}> Agent </Button> : ''}
          {user.identifyRole === 'Owner' ? <Button color="inherit" onClick={() => navigate('/addtablemanager')}> TableM </Button> : ''}
          {user.identifyRole === 'Owner' ? <Button color="inherit" onClick={() => navigate('/addwaiter')}> Waiter </Button> : ''}
          {user.identifyRole === 'Owner' ? <Button color="inherit" onClick={() => navigate('/addchef')}> Chefs </Button> : ''}

          <Card color="inherit" sx={{ mx: 10 }} style={{ variant: "contained", border: "10px", boxShadow: "none", padding: "10px", borderRadius: 3 }}>
            <Typography>
              {user.Username ? ` Logged in as ${user.Username}, ${user.identifyRole} ` : ' Not logged in '}
            </Typography>
          </Card>
          {user.Username ? (
            <Button color="inherit" onClick={logout}> Logout </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}> Login </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* {
        globalContext.fetchingUser ? (
          <h1 className="loader">Loading...</h1>
        ) : (
          ''
        )
      } */}
    </div >
  )
}

export default Header;