import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TrainDetailsPage from './2ndquestion/TrainDetailsPage '
import TrainsPage from './2ndquestion/TrainsPage '
function App() {
  return (
    <BrowserRouter>
       <Routes>
       <Route path="/" element={<TrainsPage />} />
       <Route path="/trains/:trainNumber" element={<TrainDetailsPage />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
