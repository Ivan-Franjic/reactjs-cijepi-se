import { React, useState, useEffect } from 'react'
import useForm from './use_profileEditForm'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from 'react-router-dom'
import {
  Paper,
  Grid,
  TextField,
  FormHelperText,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'
import './profile.css'

export default function ProfileEdit(props) {
    const { oib } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [punktovi_cijepljenja, setPunktovi_cijepljenja] = useState([])
    const [zupanije, setZupanije] = useState([])
    const [update, setUpdate] = useState(1)
    const [newValue, setStartDate] = useState();
    

    function Success(message) {
      setSuccessMessage(message)
      document.getElementById('submitButton').disabled = true
      setTimeout(() => {
        document.getElementById('redirect').click()
      }, 2000)
    }

    function Cancel() {
      document.getElementById('cancelButton').disabled = true
      document.getElementById('redirect').click()
    }
  
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
  
  
    useEffect(() => {
        fetch(
            'http://localhost/vuv-cijepi-se/API/api/vaccination/read-vaccination-points.php',
            {
              method: 'GET',
              headers: myHeaders,
            }
          )
            .then((response) => response.json())
            .then((data) => setPunktovi_cijepljenja(data))

        fetch(
            'http://localhost/vuv-cijepi-se/API/api/vaccination/read-counties.php',
            {
              method: 'GET',
              headers: myHeaders,
            }
          )
                .then((response) => response.json())
                .then((data) => setZupanije(data))
  
      fetch(
          'http://localhost/vuv-cijepi-se/API/api/read-profileSingle.php?oib=' +
          oib,
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          handleExistingValues(data)
        })
    }, [])

    const { handleChange, values, handleSubmit} = useForm(
      oib,
      newValue,
      Success

    )
    
    const handleExistingValues = (data) => {
      values.ime = data.ime
      values.prezime = data.prezime
      values.adresa = data.adresa
      values.grad = data.grad
      values.zupanija = data.zupanija
      values.datum_rodenja = data.datum_rodenja
      values.punkt_cijepljenja = data.punkt_cijepljenja
      setStartDate(Date.parse(data.datum_rodenja))
      setUpdate(update + 1)
    }
  
    return (
      <>
          <Grid item xs className='form_edit_profile'>
            <Paper className='editContainerp' elevation={10}>
            <FormHelperText className='naslov'>Azuriraj podatke</FormHelperText>
              <form onSubmit={handleSubmit}>
              
                <Grid className='gridClass' container spacing={3}>
              
                <Grid item xs>
                  <label>Ime
                  <input type="text" id="ime" name="ime" defaultValue={values.ime} onChange={handleChange} variant="outlined" required   />
                  </label>
                  <label>Prezime
                  <input type="text" id="prezime" name="prezime" defaultValue={values.prezime} onChange={handleChange}  variant="outlined" required  />
                  </label>
                  
                  </Grid>
            
                  <Grid item xs>
                  <FormHelperText >Datum rodenja</FormHelperText>
                  
                    <DatePicker dateFormat="dd/MM/yyyy" onKeyDown={(e) => {
                    e.preventDefault();
                        }} name='datum_rodenja' selected={newValue} onChange={(date) => setStartDate(date)} /> 
                  </Grid>

                  <Grid item xs>
                  <FormHelperText >Adresa</FormHelperText>
                  <input type="text" id="adresa" name="adresa" defaultValue={values.adresa} onChange={handleChange} variant="outlined" required  />
                  </Grid>

                  <Grid item xs>
                  <FormHelperText >Grad</FormHelperText>
                  <input type="text" id="grad" name="grad" defaultValue={values.grad} onChange={handleChange} variant="outlined" required />
                  </Grid>

                  <Grid item xs>
                      <>
                        <FormControl variant='outlined' className='selectEdit'>
                        <FormHelperText >Zupanija</FormHelperText>
                          <Select className='select_zupanija'
                            labelId='labelZupanija'
                            name='zupanija'
                            value={values.zupanija}
                            onChange={handleChange}
                           
                          >
                            {zupanije.map((zupanija) => (
                              <MenuItem key={zupanija.id} value={zupanija.naziv_zupanije}>
                                {zupanija.naziv_zupanije}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                  </Grid>
                  
                  
                  <Grid item xs>
                      <>
                        <FormControl variant='outlined' className='selectEdit'>
                        <FormHelperText >Punkt cijepljenja</FormHelperText>
                          <Select className='select_punkt_cijepljenja'
                            labelId='labelPunkt'
                            name='punkt_cijepljenja'
                            value={values.punkt_cijepljenja}
                            onChange={handleChange}
                           
                          >
                            {punktovi_cijepljenja.map((punkt_cijepljenja) => (
                              <MenuItem key={punkt_cijepljenja.id} value={punkt_cijepljenja.naziv_punkta}>
                                {punkt_cijepljenja.naziv_punkta}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                  </Grid>
                  
                  
                
                  <Link id='redirect' to='/' />
                  <Button
                    id='submitButton'
                    type='submit'
                    color='primary'
                    className='inputnc'
                  >
                    Spremi
                  </Button>
                  <Button
                    id='cancelButton'
                    type='submit'
                    color='primary'
                    className='inputonc'
                    onClick={Cancel}
                  >
                    Odustani
                  </Button>
                  {successMessage && (
                    <FormHelperText className='successTextnc'>
                      {successMessage}
                    </FormHelperText>
                  )}
                </Grid>
              </form>
            </Paper>
          </Grid>
      
      </>
    )
  }