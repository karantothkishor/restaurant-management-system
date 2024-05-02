import { useState, useContext, Fragment } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalContext from '../../providers/GlobalContext';

const axios = require('axios');
const theme = createTheme();

const AddCoupon = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    expr_date: '',
    usr_cat: '',
    discount: '',
    min_bill: '',
    max_discount: '',
  });

  const submitForm = () => {
    axios
      .post(`http://localhost:5000/add_coupons`, formData, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Fragment>
      {globalContext.fetchingUser === true ? 'Loading...' :
        <div>
          {
            user.identifyRole === 'Owner' ?
              <div className="page-login">
                <ThemeProvider theme={theme}>
                  <Container component="main" maxWidth="xs">
                    <Box component="form" sx={{ mt: 1 }} onSubmit={submitForm}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="expr_date"
                        label="Expiry Date"
                        name="expr_date"
                        autoComplete="expr_date"
                        type="date"
                        value={formData.expr_date}
                        onChange={(e) => setFormData({ ...formData, expr_date: e.target.value })}
                        autoFocus
                      />
                      <FormControl fullWidth margin="normal" required>
                        <InputLabel>Role</InputLabel>
                        <Select
                          labelId="usr_cat"
                          id="usr_cat"
                          name='usr_cat'
                          required
                          label="User Category"
                          value={formData.usr_cat}
                          onChange={(e) => setFormData({ ...formData, usr_cat: e.target.value })}
                        >
                          <MenuItem value={"Beginner"}>Beginner</MenuItem>
                          <MenuItem value={"Premium"}>Premium</MenuItem>
                          <MenuItem value={"VIP"}>VIP</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="discount"
                        label="Discount"
                        id="discount"
                        autoComplete="discount"
                        type="number"
                        inputProps={{ min: 1, max: 100 }}
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="min_bill"
                        label="Minimum Bill"
                        id="min_bill"
                        type="number"
                        value={formData.min_bill}
                        onChange={(e) => setFormData({ ...formData, min_bill: e.target.value })}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="max_discount"
                        label="Maximum Discount"
                        id="max_discount"
                        type="number"
                        value={formData.max_discount}
                        onChange={(e) => setFormData({ ...formData, max_discount: e.target.value })}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Submit
                      </Button>
                      {error !== null ? <a style={{ color: 'red' }}>{error}</a> : ''}
                    </Box>
                  </Container>
                </ThemeProvider>
              </div >
              : 'Cannot Access this page'
          }
        </div>
      }
    </Fragment>
  )
}

export default AddCoupon;