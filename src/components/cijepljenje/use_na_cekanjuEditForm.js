import { useState } from 'react'

const useForm = (OIB, newValue, newValue2, Success ) => {
  const [values, setValues] = useState({
    ime: '',
    prezime: '',
    adresa: '',
    grad: '',
    zupanija: '',
    datum_rodenja: '',
    vrsta_cjepiva: '',
    prva_doza_datum: '',
    prva_doza_status: '',
    druga_doza_datum: '',
    druga_doza_status: '',
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
    
    let formattedDate = `${
      newValue.getMonth() + 1
    }/${newValue.getDate()}/${newValue.getFullYear()}`;
    var datumprikaz=formattedDate;
    console.log(datumprikaz);
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
 
    let formattedDate2 = `${
      newValue2.getMonth() + 1
    }/${newValue2.getDate()}/${newValue2.getFullYear()}`;
    var datumprikaz2=formattedDate2;
    console.log(datumprikaz2);
    var mjesec2='';
    var dan2='';
    var godina2='';
    var mjesecdo92= datumprikaz2.substring(0, 2);
    
    if(mjesecdo92=='1/' || mjesecdo92=='2/' || mjesecdo92=='3/' || mjesecdo92=='4/' || mjesecdo92=='5/' || mjesecdo92=='6/' || mjesecdo92=='7/' || mjesecdo92=='8/' || mjesecdo92=='9/'){
      var mjesec2='0' + datumprikaz2.substring(0, 1);
      var dan2= datumprikaz2.substring(2, 4);
      if(dan2=='1/' || dan2=='2/' || dan2=='3/' || dan2=='4/' || dan2=='5/' || dan2=='6/' || dan2=='7/' || dan2=='8/' || dan2=='9/'){
        var dan2= '0' + datumprikaz2.substring(2, 3);
        var godina2= datumprikaz2.substring(4, 10);
      }
      else{
        var dan2= datumprikaz2.substring(2, 4);
        var godina2= datumprikaz2.substring(5, 10);
      }
    }

    else{
      var mjesec2=datumprikaz2.substring(0, 2);
      var dan2=datumprikaz2.substring(3, 5);
      if(dan2=='1/' || dan2=='2/' || dan2=='3/' || dan2=='4/' || dan2=='5/' || dan2=='6/' || dan2=='7/' || dan2=='8/' || dan2=='9/'){
        var dan2= '0' + datumprikaz2.substring(3, 4);
        var godina2= datumprikaz2.substring(5, 10);
      }
      else{
        var dan2= datumprikaz2.substring(3, 5);
        var godina2= datumprikaz2.substring(6, 10);
      }
    }
    var datumprikazstring2=godina2+mjesec2+dan2;
    var datumbaza2=parseInt(datumprikazstring2);
    
      let requestOptions = {}
        requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'aplication/json' },
          body: JSON.stringify({
            OIB: OIB,
            ime: values.ime,
            prezime: values.prezime,
            adresa: values.adresa,
            zupanija: values.zupanija,
            datum_rodenja: values.datum_rodenja,
            vrsta_cjepiva: values.vrsta_cjepiva,
            prva_doza_datum: datumbaza,
            prva_doza_status: 'Naručen',
            druga_doza_datum: datumbaza2,
            druga_doza_status: 'Naručen',
          }),
        }

      fetch(
        'http://localhost/vuv-cijepi-se/API/api/cijepljenje/update-na-cekanju.php',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          Success(data.message)
          //window.location.reload()
        })
        //.catch((error) => {
          //console.log(
            //'There has been a problem with your fetch operation:',
           // error
         // )
       // })
    
  }

  return { handleChange, values, handleSubmit}
}

export default useForm