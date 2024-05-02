import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../providers/GlobalContext';
// import GlobalContextProvider from '../providers/GlobalContextProvider';
// import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const axios = require('axios');
const theme = createTheme();

const Login = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Username: '',
    Passcode: '',
    identifyRole: '',
  });

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`http://localhost:5000/login`, formData, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("response data user", response);
          console.log(response);
          globalContext.setUser(response.data.user);
          setError(null);
          if (response.data.user.identifyRole === 'Customer') {
            navigate('/menu');
          }
          else if (response.data.user.identifyRole === 'Chef') {
            navigate('/chef');
          }
          else if (response.data.user.identifyRole === 'DeliveryMan') {
            navigate('/deli_agent');
          }
          else if (response.data.user.identifyRole === 'DeliveryManager') {
            navigate('/deli_manager');
          }
          else if (response.data.user.identifyRole === 'TableManager') {
            navigate('/tbl_mngr');
          }
          else if (response.data.user.identifyRole === 'Owner') {
            navigate('/addcoupon');
          }
          else {
            navigate('/');
          }
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setError('Incorrect details');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="page-login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={submitForm}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="username"
                value={formData.Username}
                onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.Passcode}
                onChange={(e) => setFormData({ ...formData, Passcode: e.target.value })}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Role</InputLabel>
                <Select
                  labelId="identifyRole"
                  id="identifyRole"
                  name='Role'
                  required
                  label="Role"
                  value={formData.identifyRole}
                  onChange={(e) => setFormData({ ...formData, identifyRole: e.target.value })}
                >
                  <MenuItem value={"Customer"}>Customer</MenuItem>
                  <MenuItem value={"Waiter"}>Waiter</MenuItem>
                  <MenuItem value={"Chef"}>Chef</MenuItem>
                  <MenuItem value={"TableManager"}>Table Manager</MenuItem>
                  <MenuItem value={"DeliveryManager"}>Delivery Manager</MenuItem>
                  <MenuItem value={"DeliveryMan"}>Delivery Man</MenuItem>
                  <MenuItem value={"Owner"}>Owner</MenuItem>
                </Select>
              </FormControl>
              {/* <Badge color={"secondary"} > */}
              <Button
                type="submit"
                // color={"secondary"}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              // onClick={submitForm}
              >
                Sign In
              </Button>
              {error !== null ? <a style={{ color: 'red' }}>{error}</a> : ''}
              <Grid container margin="normal" >
                <Grid item xs>
                  <Link to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* <input
        type="text"
        name="Username"
        value={formData.Username}
        onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
      />

      <input
        type="password"
        name="Passcode"
        value={formData.Passcode}
        onChange={(e) => setFormData({ ...formData, Passcode: e.target.value })}
      />

      <input
        type="text"
        name="identifyRole"
        list="rolenames"
        // value={formData.identifyRole}
        onChange={(e) => setFormData({ ...formData, identifyRole: e.target.value })}
      />
      <datalist id="rolenames">
        <option value="Customer" />
        <option value="Waiter" />
        <option value="Chef" />
        <option value="TableManager" />
        <option value="DeliveryManager" />
        <option value="DeliveryMan" />
      </datalist> */}


      {/* <Button text="Login" loading={loading} onClick={submitForm} /> */}
    </div >
  )
}

export default Login;