import { React, useState, useEffect } from 'react'
import useForm from './use_testingEditForm'
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
import './testing.css'

export default function TestiranjeEdit(props) {
    const { id } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [testiranje, setTestiranje] = useState([])
    const [update, setUpdate] = useState(1)
    const [newValue, setStartDate] = useState();
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

    const rezultati = [
        { value: 1, label: 'Na čekanju' },
        { value: 2, label: 'Pozitivan' },
        { value: 3, label: 'Negativan' }
      ]
  
  
    useEffect(() => {
      fetch(
        'http://localhost/vuv-cijepi-se/API/api/testing/read.php',
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
        .then((response) => response.json())
        .then((data) => setTestiranje(data))
  
      fetch(
          'http://localhost/vuv-cijepi-se/API/api/testing/readSingle.php?id=' +
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
      values.oib = data.oib
      values.test = data.test
      values.datum = data.datum
      values.rezultat = data.rezultat
      setStartDate(Date.parse(data.datum))
      
      setUpdate(update + 1)
    }
    
  
    return (
      <>
          <Grid item xs className='form_testiranje'>
            <Paper className='editContainert' elevation={10}>
            <FormHelperText className='naslov'>Ažuriraj pacijenta</FormHelperText>
              <form onSubmit={handleSubmit}>
                <Grid className='gridClass' container spacing={3}>
              
      <Grid item xs>
      <FormHelperText >Datum testiranja</FormHelperText>
      <DatePicker dateFormat="dd/MM/yyyy" minDate={new Date()} filterDate={isWeekday} onKeyDown={(e) => {
       e.preventDefault();
    }} name='datum' selected={newValue} onChange={(date) => setStartDate(date)} />
                      
                  </Grid>
                
                  <Grid item xs>
                      <>
                        <FormControl variant='outlined' className='selectEdit'>
                        <FormHelperText >Rezultat</FormHelperText>
                          <Select className='select_testiranje'
                            labelId='labelRezultati'
                            name='rezultat'
                            value={values.rezultat}
                            onChange={handleChange}
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
                  <Link id='redirect' to='/testing' />
                  <Button
                    id='submitButton'
                    type='submit'
                    color='primary'
                    className='inputt'
                  >
                    Spremi
                  </Button>
                  <Button
                    id='cancelButton'
                    type='submit'
                    color='primary'
                    className='inputot'
                    onClick={Cancel}
                  >
                    Odustani
                  </Button>
                  {successMessage && (
                    <FormHelperText className='successTextt'>
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
  