import { React, useState, useEffect } from 'react'
//import Login from '../login/login'
import useForm from './use_naruceniEditForm'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
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

export default function NaruceniEdit(props) {
    const { OIB } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [naruceni, setNaruceni] = useState([])
    const [update, setUpdate] = useState(1)
    const [disableSelect, setDisableSelect] = useState(false)
    const [newValue, setStartDate] = useState();
    const [newValue2, setStartDate2] = useState();
    const isWeekday = (date) => {
      const day = date.getDay()
      return day !== 0 && day !== 6
    }
    
  
  
    function Success(message) {
      setSuccessMessage(message)
      document.getElementById('submitButton').disabled = true
      setTimeout(() => {
        document.getElementById('redirect').click()
      }, 2000)
    }
  
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
  
  
    useEffect(() => {
      fetch(
        'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-naruceni.php',
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
        .then((response) => response.json())
        .then((data) => setNaruceni(data))

      fetch(
          'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-naruceniSingle.php?OIB=' +
          OIB,
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
      OIB,
      newValue,
      newValue2,
      Success

    )
  
    const handleExistingValues = (data) => {
      values.ime = data.ime
      values.prezime = data.prezime
      values.adresa = data.adresa
      values.grad = data.grad
      values.zupanija = data.zupanija
      values.datum_rodenja = data.datum_rodenja
      values.vrsta_cjepiva = data.vrsta_cjepiva
      values.prva_doza_datum = data.prva_doza_datum
      values.prva_doza_status = data.prva_doza_status
      values.druga_doza_datum = data.druga_doza_datum
      values.druga_doza_status = data.druga_doza_status
      setStartDate(Date.parse(data.prva_doza_datum))
      setStartDate2(Date.parse(data.druga_doza_datum))
      setUpdate(update + 1)
    }
    console.log(newValue);
    console.log(newValue2);
  
    return (
      <>
          <Grid item xs>
            <Paper className='editContainer' elevation={10}>
              <form onSubmit={handleSubmit}>
                <Grid className='gridClass' container spacing={3}>
                <Grid item xs>
                
                      
                </Grid>

                <Grid item xs>
                  <DatePicker minDate={new Date()} filterDate={isWeekday} name='prva_doza_datum' selected={newValue} onChange={(date) => setStartDate(date)} /> 
                </Grid>

                <Grid item xs>
                <FormLabel id="demo-radio-buttons-group-label">Primio prvu dozu</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="prva_doza_status"
                    value={values.prva_doza_status}
                    onChange={handleChange}
                  >
                  <FormControlLabel value="Cijepljen" control={<Radio />} label="Da" />
                  <FormControlLabel value="Naručen" control={<Radio />} label="Ne" />
                  </RadioGroup>
                      
                </Grid>

                <Grid item xs>
                  <DatePicker minDate={new Date()} filterDate={isWeekday} name='druga_doza_datum' selected={newValue2} onChange={(date2) => setStartDate2(date2)} /> 
                </Grid>

                <Grid item xs>
                <FormLabel id="demo-radio-buttons-group-label">Primio drugu dozu</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="druga_doza_status"
                    value={values.druga_doza_status}
                    onChange={handleChange}
                  >
                  <FormControlLabel value="Cijepljen" control={<Radio />} label="Da" />
                  <FormControlLabel value="Naručen" control={<Radio />} label="Ne" />
                  </RadioGroup>
                      
                </Grid>
                  
                  <Link id='redirect' to='/naruceni' />
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
  