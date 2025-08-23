import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import axios from "axios";

const Register = () => {
  const { setToken } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });
      setToken(res.data.token);
      alert("Registration Successfull");
    } catch (error) {
      alert("Registration Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white">
        <h2>Register</h2>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
