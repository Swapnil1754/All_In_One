import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Pages/Registration/Register';
import Login from './Pages/Registration/Login';
import Header from './Common/Header/Header';
import DisplayHotel from './Pages/Hotel/Display-Hotel';
import AddHotel from './Pages/Hotel/Add-Hotel';
import { Provider } from 'react-redux';
import { store, persistor} from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import City from './Pages/Cities/City';
import CityHotels from './Pages/Hotel/City-Hotels';
import AddRoom from './Pages/Hotel/Rooms/Add-Room';
import HotelProfile from './Pages/Hotel/Owner/Hotel-Profile';
import OwnerDisplay from './Pages/Hotel/Owner/Display/Owner-Display';
import EditRoom from './Pages/Hotel/Rooms/Edit-Room';
import ConfirmHotelBooking from './Pages/Booking/Confirm-Hotel-Booking';
import HotelBill from './Pages/Bill/Hotel-Bill';
import ForgetPassword from './Pages/Registration/Forget-Password';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Header />
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/city' element={<City />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/display-hotel' element={<DisplayHotel />}/>
        <Route path='/add-hotel' element={<AddHotel/>} />
        <Route path='/city-hotels' element={<CityHotels />}/>
        <Route path='/add-room' element={<AddRoom />} />
        <Route path='/edit-room' element={<EditRoom />} />
        <Route path='/hotel-profile' element={<HotelProfile /> } />
        <Route path='/owner-display' element={<OwnerDisplay /> } />
        <Route path='/confirm-hotel-booking' element={<ConfirmHotelBooking />} />
        <Route path='/hotel-bill' element={<HotelBill />} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  );
}

export default App;
