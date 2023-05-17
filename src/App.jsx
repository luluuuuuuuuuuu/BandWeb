
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Tours from './Pages/Tours.jsx';
import NoPage from './Pages/NoPage.jsx';
import TourMap from './Pages/TourMap.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/luluuuuuuuuuuu/BandWeb" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tourmap" element={<TourMap />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Tours from './Pages/Tours.jsx';
import NoPage from './Pages/NoPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="*" element={<NoPage />} />

      </Routes>
      <div>
        <Navbar band="Arctic Monkeys"/>
        <Hero />
        <Titles />
        <Concerts /> 
      </div>
    </BrowserRouter>
  );
}

export default App;-->*/
