import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CaesarCipher from "./pages/CaesarCipher";
import VigenereCipher from "./pages/VigenereCipher";
import Glossary from "./pages/Glossary";
import PlayfairCipher from "./pages/PlayfairCipher";
import RailFenceCipher from "./pages/RailFenceCipher";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caesar" element={<CaesarCipher />} />
          <Route path="/vigenere" element={<VigenereCipher />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/playfair" element={<PlayfairCipher />} />
          <Route path="/rail-fence" element={<RailFenceCipher />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
