import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import TableUsers from "./Components/Dashboard/TableUsers";
import TableDoctors from "./Components/Dashboard/TableDoctors";
import Charts from "./Components/Dashboard/Charts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Charts />} />
            <Route path="users" element={<TableUsers />} />
            <Route path="doctors" element={<TableDoctors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
