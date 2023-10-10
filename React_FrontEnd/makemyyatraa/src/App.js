import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Pages/Registration/Register';
import Login from './Pages/Registration/Login';
import Header from './Common/Header/Header';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
