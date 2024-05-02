import { useState, useContext, Fragment } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalContext from '../../providers/GlobalContext';

const axios = require('axios');
const theme = createTheme();

const AddDA = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    usrnme: '',
    nme: '',
    contact: '',
    salary: '',
    pass: '',
    zip: '',
  });

  const submitForm = () => {
    console.log(formData)
    axios
      .post(`http://localhost:5000/hire_delperson`, formData, {

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
                        name="nme"
                        label="Name"
                        type="text"
                        id="nme"
                        value={formData.nme}
                        onChange={(e) => setFormData({ ...formData, nme: e.target.value })}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="usrnme"
                        label="Username"
                        name="usrnme"
                        autoComplete="usrnme"
                        value={formData.usrnme}
                        onChange={(e) => setFormData({ ...formData, usrnme: e.target.value })}
                        autoFocus
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pass"
                        label="Password"
                        type="pass"
                        id="pass"
                        autoComplete="current-password"
                        value={formData.pass}
                        onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="contact"
                        label="Contact"
                        type="text"
                        inputProps={{ maxLength: 10, minLength: 10 }}
                        id="contact"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="salary"
                        label="Salary"
                        type="number"
                        id="salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="zip"
                        label="Preferred Zip"
                        type="text"
                        inputProps={{ maxLength: 6, minLength: 6 }}
                        id="zip"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
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

export default AddDA;