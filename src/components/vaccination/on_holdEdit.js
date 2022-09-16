import { React, useState, useEffect } from 'react'
import useForm from './use_on_holdEditForm'
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
import './on_hold.css'

export default function Na_cekanjuEdit(props) {
    const { oib } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [na_cekanju, setNa_cekanju] = useState([])
    const [cjepiva, setCjepiva] = useState([])
    const [update, setUpdate] = useState(1)
    const [newValue, setStartDate] = useState(new Date());
    const [newValue2, setStartDate2] = useState(new Date());
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
        'http://localhost/vuv-cijepi-se/API/api/vaccination/read-on-hold.php',
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
        .then((response) => response.json())
        .then((data) => setNa_cekanju(data))

        fetch(
            'http://localhost/vuv-cijepi-se/API/api/vaccination/read-vaccines.php',
            {
              method: 'GET',
              headers: myHeaders,
            }
          )
            .then((response) => response.json())
            .then((data) => setCjepiva(data))
  
      fetch(
          'http://localhost/vuv-cijepi-se/API/api/vaccination/read-on-holdSingle.php?oib=' +
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
      newValue2,
      Success

    )
    
    const handleExistingValues = (data) => {
      values.vrsta_cjepiva = 1
      values.prva_doza_datum = data.prva_doza_datum
      values.prva_doza_status = data.prva_doza_status
      values.druga_doza_datum = data.druga_doza_datum
      values.druga_doza_status = data.druga_doza_status
      setUpdate(update + 1)
    }
  
    return (
      <>
          <Grid item xs className='form_na_cekanju'>
            <Paper className='editContainernc' elevation={10}>
            <FormHelperText className='naslov'>Naruči pacijenta</FormHelperText>
              <form onSubmit={handleSubmit}>
              
                <Grid className='gridClass' container spacing={3}>
              
                  <Grid item xs>
                      <>
                        <FormControl variant='outlined' className='selectEdit'>
                        <FormHelperText >Vrsta cjepiva</FormHelperText>
                          <Select className='select_na_cekanju'
                            labelId='labelCjepivo'
                            name='vrsta_cjepiva'
                            value={values.vrsta_cjepiva}
                            onChange={handleChange}
                           
                          >
                            {cjepiva.map((cjepivo) => (
                              <MenuItem key={cjepivo.id} value={cjepivo.id}>
                                {cjepivo.naziv_cjepiva}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                  </Grid>
                  
                  <Grid item xs>
                  <FormHelperText >Datum prve doze</FormHelperText>
                  
                    <DatePicker dateFormat="dd/MM/yyyy" minDate={new Date()} filterDate={isWeekday} onKeyDown={(e) => {
       e.preventDefault();
    }} name='prva_doza_datum' selected={newValue} onChange={(date) => setStartDate(date)} /> 
                  </Grid>
                  
                  <Grid item xs>
                  <FormHelperText >Datum druge doze</FormHelperText>
                    <DatePicker dateFormat="dd/MM/yyyy" minDate={new Date()} filterDate={isWeekday} onKeyDown={(e) => {
       e.preventDefault();
    }} name='druga_doza_datum' selected={newValue2} onChange={(date2) => setStartDate2(date2)} />
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