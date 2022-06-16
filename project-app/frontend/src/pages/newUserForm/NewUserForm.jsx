import React, { useState } from "react";
import "./newUserForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NewUserForm() {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    username: "",
    contactNo: "",
    address: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user", details);
      console.log(res.data);
      window.alert("User created");
      navigate("../users");
    } catch (err) {
      window.alert("User creation unsuccessful");
      console.log(err);
    }
  };

  return (
    <div className="newUser-main">
      <form className="form-main" onSubmit={submitHandler}>
        <div className="formInner">
        <h1 className="headingNU">Create New User</h1>
          <div className="formGroup">
            <label htmlFor="name">Fullname:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
              className="inputSpace"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="name">Username: </label>
            <input
              type="text"
              name="text"
              id="text"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
              required
              className="inputSpace"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="name">Contact No: </label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, contactNo: e.target.value })
              }
              value={details.contactNo}
              required
              className="inputSpace"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="name">Address : </label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, address: e.target.value })
              }
              value={details.address}
              required
              className="inputSpace"
            />
          </div>
          <button className="submitButtonNewUser" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
