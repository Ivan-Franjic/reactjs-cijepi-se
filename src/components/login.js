import {useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../UserContext';
import './login.css'
const Login = () => {
    const {loginUser, wait, loggedInCheck} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [formData, setFormData] = useState({
        oib:'',
        lozinka:''
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setErrMsg('Molimo popunite sva polja!');
            return;
        }

        const data = await loginUser(formData);
        if(data.success){
            e.target.reset();
            setRedirect('Učitavanje...');
            await loggedInCheck();
            return;
        }
        setErrMsg(data.message);
    }

    return (
        <div className="myformlogin">
            <form onSubmit={submitForm}>
            <label className='naslovprijava' for="naslov" aria-hidden="true">Prijava</label>
                <input type="text" name="oib" maxlength="11" pattern="\d{11}" onChange={onChangeInput} placeholder="OIB" id="oib"  size="25" value={formData.oib} required />
                <input type="password" name="lozinka" onChange={onChangeInput} placeholder="Lozinka" id="lozinka" size="25" value={formData.lozinka} required />
                {errMsg && <div className="err-msg">{errMsg}</div>}
                {redirect ? redirect : <button className='prijavabutton' type="submit" disabled={wait}>Prijava</button>}

            </form>
            <div className="registracijabutton"><Link className='registracija' to="/signup">Cijepi se i ti</Link></div>
        </div>
    )
}

export default Login;