import './App.css';
import {useContext} from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Sidebar from './Sidebar/sidebar'
import Footer from './Sidebar/footer'
import {UserContext} from './UserContext';
import Login from './components/login';
import Register from './components/register';
import On_hold from './components/vaccination/on_hold';
import On_holdEdit from './components/vaccination/on_holdEdit';
import Booked from './components/vaccination/booked';
import BookedEdit from './components/vaccination/bookedEdit';
import Vaccinated from './components/vaccination/vaccinated';
import Testing from './components/testing/testing';
import Testing_patient from './components/testing/testing_patient';
import Testing_patientAdd from './components/testing/testing_patientAdd';
import TestingEdit from './components/testing/testingEdit';
import History from './components/testing/testing_history';
import Tests from './components/testing/tests';
import Profile from './components/profile';
import ProfileEdit from './components/profileEdit';


function App() {

  const {user} = useContext(UserContext);
  const {logout} = useContext(UserContext);

  return (
    <div className="container">
        <BrowserRouter>
        { user && <Sidebar user={user} logOut={logout} />}
        <Routes>
        { user && user.uloga == 'doktor' && <Route path="/" element={<On_hold user={user}/>} /> }
        { user && user.uloga == 'pacijent' && <Route path="/" element={<Profile user={user}/>} /> }
            {!user && (
              
              <>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Register/>} />
              </>
              )}
            <Route path="*" element={<Navigate to={user ? '/':'/login'} />} />
            <Route path='/on_hold/update/oib/:oib' element={<On_holdEdit user={user}/>}/>
            <Route path="/booked" element={<Booked user={user}/>} />
            <Route path='/booked/update/oib/:oib' element={<BookedEdit user={user}/>}/>
            <Route path="/vaccinated" element={<Vaccinated user={user}/>} />
            <Route path="/testing" element={<Testing user={user}/>} />
            <Route path="/testing_patient" element={<Testing_patient user={user}/>} />
            <Route path='/testing_patient/add/oib/:oib' element={<Testing_patientAdd user={user}/>} />
            <Route path='/testing/update/id/:id' element={<TestingEdit user={user}/>}/>
            <Route path="/testing_history" element={<History user={user}/>} />
            <Route path="/tests" element={<Tests user={user}/>} />
            <Route path="/profile" element={<Profile user={user}/>} />
            <Route path='/profile/update/oib/:oib' element={<ProfileEdit user={user}/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;