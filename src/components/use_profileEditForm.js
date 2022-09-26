import { useState } from 'react'

const useForm = (oib, newValue, Success ) => {
  const [values, setValues] = useState({
    ime: '',
    prezime: '',
    datum_rodenja: '',
    adresa: '',
    grad: '',
    zupanija: '',
    punkt_cijepljenja: '',
  })

  const handleChange = (e) => {
    const { name, value} = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    var datumostaje=values.datum_rodenja;

    try{
    let formattedDate = `${
      newValue.getMonth() + 1
    }/${newValue.getDate()}/${newValue.getFullYear()}`;
    var datumprikaz=formattedDate;
    var mjesec='';
    var dan='';
    var godina='';
    var mjesecdo9= datumprikaz.substring(0, 2);
    
    if(mjesecdo9=='1/' || mjesecdo9=='2/' || mjesecdo9=='3/' || mjesecdo9=='4/' || mjesecdo9=='5/' || mjesecdo9=='6/' || mjesecdo9=='7/' || mjesecdo9=='8/' || mjesecdo9=='9/'){
      var mjesec='0' + datumprikaz.substring(0, 1);
      var dan= datumprikaz.substring(2, 4);
      if(dan=='1/' || dan=='2/' || dan=='3/' || dan=='4/' || dan=='5/' || dan=='6/' || dan=='7/' || dan=='8/' || dan=='9/'){
        var dan= '0' + datumprikaz.substring(2, 3);
        var godina= datumprikaz.substring(4, 10);
      }
      else{
        var dan= datumprikaz.substring(2, 4);
        var godina= datumprikaz.substring(5, 10);
      }
    }

    else{
      var mjesec=datumprikaz.substring(0, 2);
      var dan=datumprikaz.substring(3, 5);
      if(dan=='1/' || dan=='2/' || dan=='3/' || dan=='4/' || dan=='5/' || dan=='6/' || dan=='7/' || dan=='8/' || dan=='9/'){
        var dan= '0' + datumprikaz.substring(3, 4);
        var godina= datumprikaz.substring(5, 10);
      }
      else{
        var dan= datumprikaz.substring(3, 5);
        var godina= datumprikaz.substring(6, 10);
      }
    }
    var datumprikazstring=godina+mjesec+dan;
    var datumbaza=parseInt(datumprikazstring);
  }
  catch{
    var dano2= datumostaje.substring(8, 10);
    var mjeseco2= datumostaje.substring(5, 7);
    var godinao2= datumostaje.substring(0, 4);
    var datumprikazstringo2=godinao2+mjeseco2+dano2;
    var datumbaza=parseInt(datumprikazstringo2);

  }
 
    
      let requestOptions = {}
        requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'aplication/json' },
          body: JSON.stringify({
            oib: oib,
            ime: values.ime,
            prezime: values.prezime,
            datum_rodenja: datumbaza,
            adresa: values.adresa,
            grad: values.grad,
            zupanija: values.zupanija,
            punkt_cijepljenja: values.punkt_cijepljenja,
          }),
        }

      fetch(
        'http://localhost/vuv-cijepi-se/API/api/update-profile.php',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          Success(data.message)
        })
  }

  return { handleChange, values, handleSubmit}
}

export default useForm