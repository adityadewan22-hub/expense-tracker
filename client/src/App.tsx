import ExpenseList from "./components/ExpenseList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./routes/protectRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import ExpensePage from "./pages/ExpensesPage";

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
              <ExpensePage />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
