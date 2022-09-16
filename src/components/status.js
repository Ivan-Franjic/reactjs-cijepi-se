import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { Link } from 'react-router-dom'
import SearchBar from 'material-ui-search-bar';
import { FaCalendar } from "react-icons/fa";
import {
  Delete,
  Visibility,
  Edit,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableFooter,
  TablePagination,
} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: 1000,
      marginTop: 60,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  })

  const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

  const Status = (props) => {
    const [rows, setRows] = useState();
    const [oRows, setORows] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searched, setSearched] = useState('');
    const [isSelectActive, setIsSelectActive] = useState(false)
    const [status, setStatus] = useState([])
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      heders: myHeaders,
    }

  const url_status =
  'http://localhost/vuv-cijepi-se/API/api/vaccination/read-booked.php'


    const getStatus = async () => {
      const res_status = await fetch(url_status, requestOptions)
      const status = await res_status.json()
      setStatus(status)
    }

   

    useEffect(() => {
      getStatus()
    }, [])
  
    const classes = useStyles()

    return (
        <>
          <TableContainer className="table-status" component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Rbr.</TableCell>
                  <TableCell align='right'>Ime</TableCell>
                  <TableCell align='right'>Prezime</TableCell>
                  <TableCell align='right'>Adresa</TableCell>
                  <TableCell align='right'>Grad</TableCell>
                  <TableCell align='right'>Županija</TableCell>
                  <TableCell align='right'>OIB</TableCell>
                  <TableCell align='right'>Datum rođenja</TableCell>
                  <TableCell align='right'>Cjepivo</TableCell>
                  <TableCell align='right'>Prva doza</TableCell>
                  <TableCell align='right'></TableCell>
                  <TableCell align='right'>Druga doza</TableCell>
                  <TableCell align='right'></TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {status.map((row, index) => (
                  <TableRow key={row.oib}>
                    {props.user.oib === row.oib ? (
                      <>
                    <TableCell component='th' scope='row'>
                      {index+1}.
                    </TableCell>
                    <TableCell align='right'>{row.ime}</TableCell>
                    <TableCell align='right'>{row.prezime}</TableCell>
                    <TableCell align='right'>{row.adresa}</TableCell>
                    <TableCell align='right'>{row.grad}</TableCell>
                    <TableCell align='right'>{row.zupanija}</TableCell>
                    <TableCell align='right'>{row.oib}</TableCell>
                    <TableCell align='right'>{row.datum_rodenja}</TableCell>
                    <TableCell align='right'>{row.naziv_cjepiva}</TableCell>
                    <TableCell align='right'>{row.prva_doza_status}</TableCell>
                    <TableCell align='right'>{row.prva_doza_datum}</TableCell>
                    <TableCell align='right'>{row.druga_doza_status}</TableCell>
                    <TableCell align='right'>{row.druga_doza_datum}</TableCell>
                    </>
                    ) :(
                      ''
                      )}          
                  </TableRow>
                   ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
    }
    

export default Status;