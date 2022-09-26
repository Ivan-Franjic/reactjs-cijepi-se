import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { FaPencilAlt } from "react-icons/fa";
import { IconButton } from '@material-ui/core';
import './profile.css'
import profilePic from '../profile.jpg';

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
        <img class="profile_img" src={profilePic} alt="profile"/>
        <div class="profile_header">{props.user.ime} {props.user.prezime} <br>
        </br>
        {props.user.oib}</div>
        <div class="row">
          <div class="column">
          <h3>Osobne informacije <Link to={'/profile/update/oib/' + props.user.oib}>
                        <IconButton className='icon' collor='primary'>
                        <FaPencilAlt />
                        </IconButton>
                      </Link></h3>
          
            {status.map((row, index) => (
              <>
                {props.user.oib === row.oib ? (
                  <>
                  <p>Ime i prezime: {row.ime} {row.prezime}</p>
                  <p>Datum rođenja: {row.datum_rodenja}</p>
                  <p>Email: {props.user.email}</p>
                  <p>Adresa: {row.adresa}, {row.grad}</p>
                  </>
                  ) :(
                  ''
                  )}    
                  </>      
                  ))}
          </div>
          
          <div class="column">
            <h3>Status cijepljenja</h3>
            {status.map((row, index) => (
              <>
                {props.user.oib === row.oib ? (
                  <>
                    <p>Cjepivo: {row.naziv_cjepiva}</p>
                    <p>Prva doza: {row.prva_doza_status}, {row.prva_doza_datum}</p>
                    <p>Druga doza: {row.druga_doza_status}, {row.druga_doza_datum}</p>
                  </>
                  ) :(
                  ''
                  )}          
                  </>
                  ))}
          </div>

        </div>
          
        </>
      )
    }
    

export default Status;