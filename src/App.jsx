import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import ComicsCharacter from "./pages/ComicsCharacter";

// Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterId" element={<ComicsCharacter />} />
      </Routes>
    </Router>
  );
}

export default App;
