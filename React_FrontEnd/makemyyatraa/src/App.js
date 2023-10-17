import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Pages/Registration/Register';
import Login from './Pages/Registration/Login';
import Header from './Common/Header/Header';
import DisplayHotel from './Pages/Hotel/Display-Hotel';
import AddHotel from './Pages/Hotel/Add-Hotel';
function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/display-hotel' element={<DisplayHotel />}/>
        <Route path='/add-hotel' element={<AddHotel/>} />
      </Routes>
    </Router>
  );
}

export default App;
