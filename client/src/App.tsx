import ExpenseList from "./components/ExpenseList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./routes/protectRoute";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/expenses"
          element={
            <ProtectRoute>
              <ExpenseList />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
