import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./routes/protectRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import ExpensePage from "./pages/ExpensesPage";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <Provider>
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
    </Provider>
  );
}

export default App;
