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
import './naruceni.css'

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


  const Naruceni = (props) => {
    const [rows, setRows] = useState();
    const [oRows, setORows] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searched, setSearched] = useState('');
    const [isSelectActive, setIsSelectActive] = useState(false)
    const [zupanije, setZupanije] = useState([])
    const [zupanija, setZupanija] = useState('')
    const [dob, setDob] = useState('')
    const [naruceni, setNaruceni] = useState([])
    const [n, setN] = useState([])
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      heders: myHeaders,
    }

    const url_zupanije =
  'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-zupanije.php'

  const url_naruceni =
  'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-naruceni.php'

    const getZupanije = async () => {
      const res_zupanije = await fetch(url_zupanije, requestOptions)
      const zupanije = await res_zupanije.json()
      setZupanije(zupanije)
    }

    const getNaruceni = async () => {
      const res_naruceni = await fetch(url_naruceni, requestOptions)
      const naruceni = await res_naruceni.json()
      setN(naruceni)
      setNaruceni(naruceni)
    }
   
  
    const dobi = [
      { value: 1, label: 'Stariji od 18' },
      { value: 2, label: 'Stariji od 25' },
      { value: 3, label: 'Stariji od 35' },
      { value: 4, label: 'Stariji od 45' },
      { value: 5, label: 'Stariji od 65' },
      { value: 6, label: 'Stariji od 80' }
    ]

    const handleChangeDob = (dob) => {
      setDob(dob)
      if (dob === 'all') {
        setIsSelectActive(false)
      } 
      else if(dob==="Stariji od 18")
      {
        console.log(dob)
        setN(naruceni.filter((data) => data.god >= 18))
        n && setIsSelectActive(true)
      }else if(dob==="Stariji od 25"){
        console.log(dob)
        setN(naruceni.filter((data) => data.god >= 25))
        n && setIsSelectActive(true)
      }else if(dob==="Stariji od 35"){
        console.log(dob)
        setN(naruceni.filter((data) => data.god >= 35))
        n && setIsSelectActive(true)
      }else if(dob==="Stariji od 45"){
        console.log(dob)
        setN(naruceni.filter((data) => data.god >= 45))
        n && setIsSelectActive(true)
      }else if(dob==="Stariji od 65"){
        console.log(dob)
        setN(naruceni.filter((data) => data.god >= 65))
        n && setIsSelectActive(true)
      }else{
        console.log(dob)
        setN(naruceni.filter((data) => data.god >= 80))
        n && setIsSelectActive(true)
      }
    }

    const handleChangeZupanija = (zupanija) => {
      setZupanija(zupanija)
      if (zupanija === 'all') {
        setIsSelectActive(false)
      } else {
        console.log(zupanija)
        setN(naruceni.filter((data) => data.zupanija === zupanija))
        n && setIsSelectActive(true)
      }
    }

    useEffect(() => {
      getZupanije()
      getNaruceni()
      updateRows()
    }, [])
  
    const classes = useStyles()

    const requestSearch = (searchedVal) => {
      const filteredRows = oRows.filter((row) => {
      
        return `${row.ime}${row.prezime}${row.adresa}${row.grad}${row.zupanija}${row.OIB}${row.datum_rodenja}${row.cjepivo}${row.prva_doza_datum}${row.prva_doza_status}${row.druga_doza_datum}${row.druga_doza_status}`
            .toLowerCase()
            .includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
      setN(filteredRows);
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
        'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-naruceni.php',
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
        <InputLabel id='lbl-naruceni'></InputLabel>
        <Select
          disableUnderline
          labelId='lbl-naruceni'
          id='naruceni'
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

      <FormControl className='select'>
        <InputLabel id='lbl-naruceni2'></InputLabel>
        <Select
          disableUnderline
          labelId='lbl-naruceni2'
          id='naruceni2'
          value={dob}
          onChange={(e) => handleChangeDob(e.target.value)}
        >
          <MenuItem value='all'>Prikazi sve</MenuItem>
          {dobi.map((dob) => {
            return (
              <MenuItem key={dob.value} value={dob.label}>
                {dob.label}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>Dob</FormHelperText>
      </FormControl>
      <div className='naslov-div'>
        <h2 className='naslov'>Pregled po starosti</h2>
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
                  <TableCell align='right'>Prva doza</TableCell>
                  <TableCell align='right'></TableCell>
                  <TableCell align='right'>Druga doza</TableCell>
                  <TableCell align='right'></TableCell>
                  <TableCell align='right'></TableCell>
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
                    <TableCell align='right'>{row.prva_doza_status}</TableCell>
                    <TableCell align='right'>{row.prva_doza_datum}</TableCell>
                    <TableCell align='right'>{row.druga_doza_status}</TableCell>
                    <TableCell align='right'>{row.druga_doza_datum}</TableCell>
                    <TableCell>
                      <Link to={'/naruceni/azuriraj/OIB/' + row.OIB}>
                        <IconButton collor='primary'>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                  ))
              :(rowsPerPage > 0
                        ? n.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : n
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
                    <TableCell align='right'>{row.prva_doza_status}</TableCell>
                    <TableCell align='right'>{row.prva_doza_datum}</TableCell>
                    <TableCell align='right'>{row.druga_doza_status}</TableCell>
                    <TableCell align='right'>{row.druga_doza_datum}</TableCell>
                    <TableCell>
                      <Link to={'/naruceni/azuriraj/OIB/' + row.OIB}>
                        <IconButton collor='primary'>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
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
    

export default Naruceni;