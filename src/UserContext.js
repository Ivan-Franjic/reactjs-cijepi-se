import {createContext, useState, useEffect} from 'react'
import axios from 'axios'
import { createBrowserHistory } from 'history'

export const UserContext = createContext();

const history = createBrowserHistory()
export const Axios = axios.create({
    baseURL: 'http://localhost/vuv-cijepi-se/API/',
});

export const UserContextProvider = ({children}) => {

    const [theUser, setUser] = useState(null);
    const [wait, setWait] = useState(false);

    const registerUser = async ({ime,prezime,datum_rodenja,adresa,grad,zupanija,oib,email,lozinka,selectedOption}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('register.php',{
                ime,
                prezime,
                datum_rodenja,
                adresa,
                grad,
                zupanija,
                oib,
                email,
                lozinka,
                selectedOption
            });
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }

    const loginUser = async ({oib,lozinka}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('login.php',{
                oib,
                lozinka 
            });
            if(data.success && data.token){
                localStorage.setItem('loginToken', data.token);
                setWait(false);
                return {success:1};
            }
            setWait(false);
            return {success:0, message:data.message};
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }

    }

    const loggedInCheck = async () => {
        const loginToken = localStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;
        if(loginToken){
            const {data} = await Axios.get('getUser.php');
            if(data.success && data.user){
                setUser(data.user);
                console.log(data);
                return;
            }
            setUser(null);
        }
    }

    useEffect(() => {
        async function asyncCall(){
            await loggedInCheck();
        }
        asyncCall();
    },[]);

    const logout = () => {
        localStorage.removeItem('loginToken');
        setUser(null);
        history.push('/login')
        window.location.reload(false)
    }

    return (
        <UserContext.Provider value={{registerUser,loginUser,wait, user:theUser,loggedInCheck,logout}}>
            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;