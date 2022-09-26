import { React, useState, useEffect } from 'react'
import useForm from './use_testing_patientAddForm'
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

export default function Testing_patientAdd(props) {
    const { id } = useParams()
    const [successMessage, setSuccessMessage] = useState('')
    const [update, setUpdate] = useState(1)
    const [newValue, setStartDate] = useState(new Date());
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

    const testovi = [
        { value: 1, label: 'PCR' },
        { value: 2, label: 'Brzi' }
      ]

    const { handleChange, handleSubmit} = useForm(
      newValue,
      props,
      Success

    )

    return (
      <>
       <Grid item xs className='form_testiranje'>
            <Paper className='editContainert' elevation={10}>
            <FormHelperText className='naslov'>Testiranje</FormHelperText>
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
                        <FormHelperText >Vrsta testa</FormHelperText>
                          <Select className='select_test'
                            labelId='labelTest'
                            name='test'
                            value='PCR'
                            onChange={handleChange}
                          >
                            
                            {testovi.map((test) => (
                              <MenuItem key={test.value} value={test.label}>
                                {test.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                  </Grid>
          
                  <Link id='redirect' to='/testing_patient' />
                  <Button
                    id='submitButton'
                    type='submit'
                    color='primary'
                    className='inputtp'
                  >
                    Potvrdi
                  </Button>
                  <Button
                    id='cancelButton'
                    type='submit'
                    color='primary'
                    className='inputotp'
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