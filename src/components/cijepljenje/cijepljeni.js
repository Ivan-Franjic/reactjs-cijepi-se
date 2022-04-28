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
import EditIcon from '@mui/icons-material/Edit';

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
import './cijepljeni.css'

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

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='first page'
        >
          {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label='previous page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='next page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='last page'
        >
          {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
        </IconButton>
      </div>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const Cijepljeni = (props) => {
    const [rows, setRows] = useState();
    const [oRows, setORows] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searched, setSearched] = useState('');
    const [isSelectActive, setIsSelectActive] = useState(false)
    const [zupanije, setZupanije] = useState([])
    const [zupanija, setZupanija] = useState('')
    const [cijepljeni, setCijepljeni] = useState([])
    const [c, setC] = useState([])
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      heders: myHeaders,
    }

    const url_zupanije =
  'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-zupanije.php'

  const url_cijepljeni =
  'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read.php'

    const getZupanije = async () => {
      const res_zupanije = await fetch(url_zupanije, requestOptions)
      const zupanije = await res_zupanije.json()
      setZupanije(zupanije)
    }

    const getCijepljeni = async () => {
      const res_cijepljeni = await fetch(url_cijepljeni, requestOptions)
      const cijepljeni = await res_cijepljeni.json()
      setC(cijepljeni)
      setCijepljeni(cijepljeni)
    }

    const handleChangeZupanija = (zupanija) => {
      setZupanija(zupanija)
      if (zupanija === 'all') {
        setIsSelectActive(false)
      } else {
        console.log(zupanija)
        setC(cijepljeni.filter((data) => data.zupanija === zupanija))
        c && setIsSelectActive(true)
      }
    }
  
    useEffect(() => {
      getZupanije()
      getCijepljeni()
      updateRows()
    }, [])
  
    const classes = useStyles()

    const requestSearch = (searchedVal) => {
      const filteredRows = oRows.filter((row) => {
      
        return `${row.ime}${row.prezime}${row.adresa}${row.grad}${row.zupanija}${row.OIB}${row.datum_rodenja}${row.cjepivo}${row.druga_doza_datum}`
            .toLowerCase()
            .includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
    const cancelSearch = () => {
      setSearched('');
      requestSearch('');
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    function updateRows() {
      fetch(
        'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read.php',
        {
          method: 'GET',
          mode: 'cors',
          headers: myHeaders,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setRows(data);
          setORows(data);
        });
    }

    return (
        <>
        <FormControl className='select'>
        <InputLabel id='lbl-cijepljeni'></InputLabel>
        <Select
          disableUnderline
          labelId='lbl-cijepljeni'
          id='cijepljeni'
          value={zupanija}
          onChange={(e) => handleChangeZupanija(e.target.value)}
        >
          <MenuItem value='all'>Prikazi sve</MenuItem>
          {zupanije.map((zupanija) => {
            return (
              <MenuItem key={zupanija.id} value={zupanija.naziv_zupanije}>
                {zupanija.naziv_zupanije}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>Zupanije</FormHelperText>
      </FormControl>
      <div className='naslov-div'>
        <h2 className='naslov'>Pregled po zupaniji</h2>
      </div>
          <TableContainer className={classes.table} component={Paper}>
          {rows && (
                <>
                <SearchBar
                    className='searchBar'
                    placeholder='Pretraži'
                    value={searched}
                    onChange={(searchedVal) => requestSearch(searchedVal)}
                    onCancelSearch={() => cancelSearch()}
                  />
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Rbr.</TableCell>
                  <TableCell align='right'>Ime</TableCell>
                  <TableCell align='right'>Prezime</TableCell>
                  <TableCell align='right'>Adresa</TableCell>
                  <TableCell align='right'>Grad</TableCell>
                  <TableCell align='right'>Zupanija</TableCell>
                  <TableCell align='right'>OIB</TableCell>
                  <TableCell align='right'>Datum rodenja</TableCell>
                  <TableCell align='right'>Cjepivo</TableCell>
                  <TableCell align='right'>Datum cijepljenja</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {isSelectActive === false
              ? (rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow key={row.OIB}>
                    <TableCell component='th' scope='row'>
                      {index+1}
                    </TableCell>
                    <TableCell align='right'>{row.ime}</TableCell>
                    <TableCell align='right'>{row.prezime}</TableCell>
                    <TableCell align='right'>{row.adresa}</TableCell>
                    <TableCell align='right'>{row.grad}</TableCell>
                    <TableCell align='right'>{row.zupanija}</TableCell>
                    <TableCell align='right'>{row.OIB}</TableCell>
                    <TableCell align='right'>{row.datum_rodenja}</TableCell>
                    <TableCell align='right'>{row.naziv_cjepiva}</TableCell>
                    <TableCell align='right'>{row.druga_doza_datum}</TableCell>
                  </TableRow>
                  ))
              :(rowsPerPage > 0
                        ? c.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : c
                      ).map((row, index) => (
                  <TableRow key={row.OIB}>
                    <TableCell component='th' scope='row'>
                      {index+1}
                    </TableCell>
                    <TableCell align='right'>{row.ime}</TableCell>
                    <TableCell align='right'>{row.prezime}</TableCell>
                    <TableCell align='right'>{row.adresa}</TableCell>
                    <TableCell align='right'>{row.grad}</TableCell>
                    <TableCell align='right'>{row.zupanija}</TableCell>
                    <TableCell align='right'>{row.OIB}</TableCell>
                    <TableCell align='right'>{row.datum_rodenja}</TableCell>
                    <TableCell align='right'>{row.naziv_cjepiva}</TableCell>
                    <TableCell align='right'>{row.druga_doza_datum}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            15,
                            { label: 'Svi', value: -1 },
                          ]}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          labelRowsPerPage='Broj redova po stranici: '
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
            </Table>
            </>
              )}
          </TableContainer>
        </>
      )
    }
    

export default Cijepljeni;