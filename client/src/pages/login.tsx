import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext";

const Login = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      setToken(res.data.token);
      alert("Login Successful");
    } catch (err) {
      alert("Login failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white"></form>
    </div>
  );
};
