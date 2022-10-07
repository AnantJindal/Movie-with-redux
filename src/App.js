import './App.css';
import SignIn from './pages/SignIn/SignIn';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Protected from './components/Protection/Protection';
import MovieDetails from './pages/MovieDetails/MovieDetails';
function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Protected Component={Home} />} />

        {/* For Individual Movie */}
        <Route path='/details/:id' element={<Protected Component={MovieDetails} />} />

        {/* For Searching Bar Navigation */}
        <Route path='/:id' element={<Protected Component={MovieDetails} />} />
      </Routes>
    </>
  );
}

export default App;
