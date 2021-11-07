import "./css/global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Solver from "./components/Solver/Solver";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/solve" element={<Solver />} />
      </Routes>
    </Router>
  );
};

export default App;
