import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Sidebar from './Sidebar/sidebar'
import Na_cekanju from './components/cijepljenje/na_cekanju';
import Na_cekanjuEdit from './components/cijepljenje/na_cekanjuEdit';
import Naruceni from './components/cijepljenje/naruceni';
import NaruceniEdit from './components/cijepljenje/naruceniEdit';
import Cijepljeni from './components/cijepljenje/cijepljeni';
import Testiranje from './components/testiranje/testiranje';
import TestiranjeEdit from './components/testiranje/testiranjeEdit';
import Povijest from './components/testiranje/povijest_testiranja';
import Testovi from './components/testiranje/testovi';


function App() {

  return (
    <div className="container">
        <BrowserRouter>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Na_cekanju />} />
            <Route path='/na_cekanju/azuriraj/OIB/:OIB' element={<Na_cekanjuEdit />}/>
            <Route path="/naruceni" element={<Naruceni />} />
            <Route path='/naruceni/azuriraj/OIB/:OIB' element={<NaruceniEdit />}/>
            <Route path="/cijepljeni" element={<Cijepljeni />} />
            <Route path="/testiranje" element={<Testiranje />} />
            <Route path='/testiranje/azuriraj/id/:id' element={<TestiranjeEdit />}/>
            <Route path="/povijest_testiranja" element={<Povijest />} />
            <Route path="/testovi" element={<Testovi />} />

          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
            
