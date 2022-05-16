import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Results from './Results';
import Home from './Home';
import AddNew from './AddNew';
import ControllData from './ControllData';
//Määritetään ja palautetaan äpin routerit
//Navigoinnista vastaa erikseen Header-komponentti
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add_new" element={<AddNew />} />
        <Route exact path="/results_:id" element={<Results />} />
        <Route exact path="/controll_data" element={<ControllData />} />
      </Routes>
    </Router>
  );
}
export default App;
