import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../UserContext';
import React, { Component, useEffect } from 'react'
import './login.css'

  const url = 'http://localhost/vuv-cijepi-se/API/api/vaccination/read-vaccination-points.php'
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'GET',
    heders: myHeaders,
  }



const Register = () => {
    const {registerUser, wait} = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [formData, setFormData] = useState({
        ime:'',
        prezime:'',
        datum_rodenja:'',
        adresa:'',
        grad:'',
        zupanija:'',
        oib:'',
        email:'',
        lozinka:'',
        selectedOption
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        console.log(e.target.value);
    }


    const submitForm = async (e) => {
        e.preventDefault();

        //if(formData.ime.trim() === '' || formData.prezime.trim() === '' || formData.email.trim() === '' || formData.lozinka.trim() === ''){
            //setSuccessMsg(false);
            //setErrMsg('Molimo popunite sva polja!');
            //return;
        //}

        //if(!Object.values(formData).every(val => val.trim() !== '')){
            //setSuccessMsg(false);
            //setErrMsg('Molimo popunite sva polja!');
            //return;
        //}

        const data = await registerUser(formData);
        if(data.success){
            e.target.reset();
            setSuccessMsg('Uspješno ste registrirani!');
            setErrMsg(false);
        }
        else if(!data.success && data.message){
            setSuccessMsg(false);
            setErrMsg(data.message);
        }
        
    }

    const [punktovi, setPunktovi] = useState([])
  const getPunktovi = async () => {
    const res = await fetch(url)
    const punktovi = await res.json()
    setPunktovi(punktovi)
    console.log(punktovi)
  }

  useEffect(() => {
    getPunktovi()
  }, [])
  

    return (
        <div className="myformregistracija">
            <form onSubmit={submitForm}>
            <label className='naslovregistracija' for="naslov" aria-hidden="true">Registracija</label>
                <input type="text" name="ime" onChange={onChangeInput} placeholder="Ime" id="ime" value={formData.ime} required />
                <input type="text" name="prezime" onChange={onChangeInput} placeholder="Prezime" id="prezime" value={formData.prezime} required />
                <input type="number" name="datum_rodenja" onChange={onChangeInput} placeholder="Datum rodenja" id="datum_rodenja" value={formData.datum_rodenja} required />
                <input type="text" name="oib" onChange={onChangeInput} placeholder="OIB" id="oib2" value={formData.oib} required />
                <input type="text" name="adresa" onChange={onChangeInput} placeholder="Adresa" id="adresa" value={formData.adresa} required />
                <input type="text" name="grad" onChange={onChangeInput} placeholder="Grad" id="grad" value={formData.grad} required />
                <input type="text" name="zupanija" onChange={onChangeInput} placeholder="Zupanija" id="zupanija" value={formData.zupanija} required />
                <div id="punkt">
                <select class="selectPunkt"
                name="selectedOption"
                    onChange={onChangeInput}>
                        {punktovi.map((item) => <option key={item.id} value={item.naziv_punkta}>{item.naziv_punkta}</option>
                    )}
                    </select>
                </div>
                <input type="email" name="email" onChange={onChangeInput} placeholder="Email" id="email" value={formData.email} required />
                <input type="password" name="lozinka" onChange={onChangeInput} placeholder="Lozinka" id="lozinka" value={formData.lozinka} required />
                {successMsg && <div className="success-msg">{successMsg}</div>}
                {errMsg && <div className="err-msg">{errMsg}</div>}
                <button className='prijavabutton' type="submit" disabled={wait}>Registracija</button>
                <div className='prijavabutton'><Link className='prijavabutton' to="/login">Prijava</Link></div>
            </form>
        </div>
    )
}

export default Register;