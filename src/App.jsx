import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/navbar';
const Home = () => <h2>🏠 Página de Inicio</h2>;
const About = () => <h2>ℹ️ Acerca de</h2>;
const Contact = () => <h2>📞 Contacto</h2>;
const Pokemon = () => <h2>🎮 Pokemon</h2>;
const YuGiOh= () => <h2>🎴 YuGiOh</h2>;
const Magic = () => <h2>🧙🏻‍♂️ Magic</h2>;
const Ofertas = () => <h2>👛 Ofertas</h2>;

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/about">Acerca de</Link> | <Link to="/contact">Contacto</Link>
      </nav>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/yugioh" element={<YuGiOh/>} />
        <Route path="/magic" element={<Magic/>} />
        <Route path="/ofertas" element={<Ofertas />} />
        
      </Routes>
    </Router>
  );
}

export default App;