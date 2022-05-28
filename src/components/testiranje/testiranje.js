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
import './testiranje.css'

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
  const Testiranje = (props) => {
    const [rows, setRows] = useState();
    const [oRows, setORows] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searched, setSearched] = useState('');
    const [isSelectActive, setIsSelectActive] = useState(false)
    const [zupanije, setZupanije] = useState([])
    const [zupanija, setZupanija] = useState('')
    const [testiranje, setTestiranje] = useState([])
    const [t, setT] = useState([])
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      heders: myHeaders,
    }

    const url_zupanije =
  'http://localhost/vuv-cijepi-se/API/api/cijepljenje/read-zupanije.php'

  const url_testiranje =
  'http://localhost/vuv-cijepi-se/API/api/testiranje/read.php'

    const getZupanije = async () => {
      const res_zupanije = await fetch(url_zupanije, requestOptions)
      const zupanije = await res_zupanije.json()
      setZupanije(zupanije)
    }

    const getTestiranje = async () => {
      const res_testiranje = await fetch(url_testiranje, requestOptions)
      const testiranje = await res_testiranje.json()
      setT(testiranje)
      setTestiranje(testiranje)
    }

    const handleChangeZupanija = (zupanija) => {
      setZupanija(zupanija)
      if (zupanija === 'all') {
        setIsSelectActive(false)
      } else {
        setT(testiranje.filter((data) => data.zupanija === zupanija))
        t && setIsSelectActive(true)
      }
    }

    useEffect(() => {
      getZupanije()
      getTestiranje()
      updateRows()
    }, [])
  
    const classes = useStyles()

    const requestSearch = (searchedVal) => {
      const filteredRows = oRows.filter((row) => {
      
        return `${row.ime}${row.prezime}${row.adresa}${row.grad}${row.zupanija}${row.OIB}${row.datum_rodenja}${row.test}${row.datum}${row.rezultat}`
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
        'http://localhost/vuv-cijepi-se/API/api/testiranje/read.php',
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
        <FormControl className='selectt'>
        <InputLabel id='lbl-testiranje'></InputLabel>
        <Select
          disableUnderline
          labelId='lbl-testiranje'
          id='testiranje'
          value={zupanija}
          onChange={(e) => handleChangeZupanija(e.target.value)}
        >
          <MenuItem value='all'>Prikaži sve</MenuItem>
          {zupanije.map((zupanija) => {
            return (
              <MenuItem key={zupanija.id} value={zupanija.naziv_zupanije}>
                {zupanija.naziv_zupanije}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText className='helper'>Pregled po županiji</FormHelperText>
      </FormControl>
     
          <TableContainer className="table-testiranje" component={Paper}>
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
                  <TableCell align='right'>Županija</TableCell>
                  <TableCell align='right'>OIB</TableCell>
                  <TableCell align='right'>Datum rođenja</TableCell>
                  <TableCell align='right'>Vrsta testa</TableCell>
                  <TableCell align='right'>Datum testiranja</TableCell>
                  <TableCell align='right'>Rezultat</TableCell>
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
                  <TableRow key={row.id}>
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
                    <TableCell align='right'>{row.test}</TableCell>
                    <TableCell align='right'>{row.datum}</TableCell>
                    <TableCell align='right'>{row.rezultat}</TableCell>
                    <TableCell>
                      <Link to={'/testiranje/azuriraj/id/' + row.id}>
                        <IconButton collor='primary'>
                        <FaCalendar />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              :(rowsPerPage > 0
                        ? t.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : t
                      ).map((row, index) => (
                  <TableRow key={row.id}>
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
                    <TableCell align='right'>{row.test}</TableCell>
                    <TableCell align='right'>{row.datum}</TableCell>
                    <TableCell align='right'>{row.rezultat}</TableCell>
                    <TableCell>
                      <Link to={'/testiranje/azuriraj/id/' + row.id}>
                        <IconButton collor='primary'>
                        <FaCalendar />
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
    

export default Testiranje;