import "./App.css";
import { Home } from "./components/Home";
import { Department } from "./components/Departments";
import { Employee } from "./components/Employee";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/department" element={<Department />} exact />
            <Route path="/employee" element={<Employee />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
