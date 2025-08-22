import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import ProtectRoute from "./routes/protectRoute";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route>
          path="/expenses" element=
          {
            <ProtectRoute>
              <ExpenseList></ExpenseList>
            </ProtectRoute>
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
