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
        <Route path='/display-hotel' element={<DisplayHotel />}/>
        <Route path='/add-hotel' element={<AddHotel/>} />
        <Route path='/city-hotels' element={<CityHotels />}/>
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  );
}

export default App;
