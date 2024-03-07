import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import Layout from "../../components/Layout/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword
      });
      if (res && res.data.success) {
        toast.success(res && res.data.message);
        navigate( "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>RESET PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              required
            />
          </div>
         
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer1"
              placeholder="Enter your Secret Answer"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          </div>
         
        </form>
      </div>
    </Layout>
  );
};

export default  ForgotPassword;
    
