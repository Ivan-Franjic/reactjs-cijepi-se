import { React, useState, useEffect } from 'react'
//import Login from '../login/login'
import useForm from './use_testiranjeEditForm'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import validate from './validatePreglediEdit'
//import './pregledi.css'
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
import { StarRate } from '@mui/icons-material';

export default function TestiranjeEdit(props) {
    const { id } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [testiranje, setTestiranje] = useState([])
    const [update, setUpdate] = useState(1)
    const [disableSelect, setDisableSelect] = useState(false)
    const [newValue, setStartDate] = useState();
    const isWeekday = (date) => {
      const day = date.getDay()
      return day !== 0 && day !== 6
    }
    //const [newValue, setValue] = useState(new Date());
    
  
  
    function Success(message) {
      setSuccessMessage(message)
      document.getElementById('submitButton').disabled = true
      setTimeout(() => {
        document.getElementById('redirect').click()
      }, 2000)
    }
  
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const rezultati = [
        { value: 1, label: 'Na čekanju' },
        { value: 2, label: 'Pozitivan' },
        { value: 3, label: 'Negativan' }
      ]
  
  
    useEffect(() => {
      fetch(
        'http://localhost/vuv-cijepi-se/API/api/testiranje/read.php',
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
        .then((response) => response.json())
        .then((data) => setTestiranje(data))
  
      fetch(
          'http://localhost/vuv-cijepi-se/API/api/testiranje/readSingle.php?id=' +
          id,
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
      id,
      newValue,
      Success


    )


    const handleExistingValues = (data) => {
      values.OIB = data.OIB
      //values.ime = data.ime
      //values.prezime = data.prezime
      //values.adresa = data.adresa
      //values.grad = data.grad
      //values.zupanija = data.zupanija
      //values.datum_rodenja = data.datum_rodenja
      values.test = data.test
      values.datum = data.datum
      values.rezultat = data.rezultat
      values.token = data.token
      setStartDate(Date.parse(data.datum))
      setUpdate(update + 1)
    }
   
    
    console.log(newValue);
  
    return (
      <>
          <Grid item xs>
            <Paper className='editContainer' elevation={10}>
              <form onSubmit={handleSubmit}>
                <Grid className='gridClass' container spacing={3}>
                <Grid item xs>
                
                      
                  </Grid>
      <Grid item xs>
      <DatePicker minDate={new Date()} filterDate={isWeekday} name='datum' selected={newValue} onChange={(date) => setStartDate(date)} />
                      
                  </Grid>
                
                  <Grid item xs>
                      <>
                        <FormControl variant='outlined' className='selectEdit'>
                          <InputLabel id='labelRezultati'>Rezultat</InputLabel>
                          <Select
                            labelId='labelRezultati'
                            name='rezultat'
                            value={values.rezultat}
                            onChange={handleChange}
                            label='Rezultat'
                          >
                            {rezultati.map((rezultat) => (
                              <MenuItem key={rezultat.value} value={rezultat.label}>
                                {rezultat.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                  </Grid>
                  <Link id='redirect' to='/testiranje' />
                  <Button
                    id='submitButton'
                    type='submit'
                    variant='contained'
                    color='primary'
                    className='input'
                  >
                    Spremi
                  </Button>
                  {successMessage && (
                    <FormHelperText className='successText'>
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
  