import { React, useState, useEffect } from 'react'
import useForm from './use_naruceniEditForm'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
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
import './naruceni.css'

export default function NaruceniEdit(props) {
    const { OIB } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [naruceni, setNaruceni] = useState([])
    const [update, setUpdate] = useState(1)
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

    function Cancel() {
      document.getElementById('cancelButton').disabled = true
      document.getElementById('redirect').click()
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
      values.prva_doza_datum = data.prva_doza_datum
      values.prva_doza_status = data.prva_doza_status
      values.druga_doza_datum = data.druga_doza_datum
      values.druga_doza_status = data.druga_doza_status
      setStartDate(Date.parse(data.prva_doza_datum))
      setStartDate2(Date.parse(data.druga_doza_datum))
      setUpdate(update + 1)
    }
  
    return (
      <>
          <Grid item xs className='form_naruceni'>
            <Paper className='editContainern' elevation={10}>
            <FormHelperText className='naslov'>Ažuriraj pacijenta</FormHelperText>
              <form onSubmit={handleSubmit}>
                <Grid className='gridClass' container spacing={3}>
             
                <Grid item xs>
                <FormHelperText >Datum prve doze</FormHelperText>
                  <DatePicker dateFormat="dd/MM/yyyy" minDate={new Date()} filterDate={isWeekday} onKeyDown={(e) => {
       e.preventDefault();
    }} name='prva_doza_datum' selected={newValue} onChange={(date) => setStartDate(date)} /> 
                </Grid>
                <Grid item xs>
                <FormLabel id="demo-radio-buttons-group-label">Primljena prva doza</FormLabel>
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
                <FormHelperText >Datum druge doze</FormHelperText>
                  <DatePicker dateFormat="dd/MM/yyyy" minDate={new Date()} filterDate={isWeekday} onKeyDown={(e) => {
       e.preventDefault();
    }} name='druga_doza_datum' selected={newValue2} onChange={(date2) => setStartDate2(date2)} /> 
                </Grid>
                <Grid item xs>
                <FormLabel id="demo-radio-buttons-group-label">Primljena druga doza</FormLabel>
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
                    color='primary'
                    className='inputn'
                  >
                    Spremi
                  </Button>
                  <Button
                    id='cancelButton'
                    type='submit'
                    color='primary'
                    className='inputon'
                    onClick={Cancel}
                  >
                    Odustani
                  </Button>
                  {successMessage && (
                    <FormHelperText className='successTextn'>
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
  