import { useState } from 'react'

const useForm = (id, newValue, Success ) => {
  const [values, setValues] = useState({
    OIB: '',
    //ime: '',
    //prezime: '',
    //adresa: '',
    //grad: '',
    //zupanija: '',
    //datum_rodenja: '',
    test: '',
    datum: '',
    rezultat: '',
    token: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value} = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
 
  
  const handleSubmit = (e) => {
    e.preventDefault()
    //var error = validate(values)
   var datumostaje=values.datum;
    //var length= newValue.length;
    
    console.log(datumostaje);
      console.log(newValue);
     
  if(isNaN(newValue) == true){ 
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
  }else{
    var dan= datumostaje.substring(8, 10);
    //var danint= parseInt(dan);
    //var danint2= danint+1;
    //var danstr= danint2.toString();
    var mjesec= datumostaje.substring(5, 7);
    var godina= datumostaje.substring(0, 4);
    var datumprikazstring=godina+mjesec+dan;
    var datumbaza=parseInt(datumprikazstring);
  }


    let requestOptions = {}
        requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'aplication/json' },
          body: JSON.stringify({
            id: id,
            OIB: values.OIB,
            //ime: values.ime,
            //prezime: values.prezime,
            //adresa: values.adresa,
            //zupanija: values.zupanija,
            //datum_rodenja: values.datum_rodenja,
            test: values.test,
            datum: datumbaza,
            rezultat: values.rezultat,
            token: values.token,
          }),
        }

      fetch(
        'http://localhost/vuv-cijepi-se/API/api/testiranje/update.php',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          Success(data.message)
          //window.location.reload()
        })
        //.catch((error) => {
         // console.log(
           // 'There has been a problem with your fetch operation:',
           // error
         // )
       // })
    
  }

  return { handleChange, values, handleSubmit}
}

export default useForm