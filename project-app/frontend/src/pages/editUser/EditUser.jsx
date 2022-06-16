import React, { useEffect } from "react";
import { useState } from "react";
import "./editUser.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  console.log(userId);
  const [details, setDetails] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/findById/${userId}`
        );
        console.log(data);
        setDetails(data);
      } catch (err) {}
    };
    fetchUserData();
  }, [userId]);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/edit/${userId}`, details);
      console.log("here");
      window.alert("User updated successfully");
      navigate("../../../users");
    } catch (err) {
      window.alert(err);
    }
  };
  return (
    <div className="newUser-main">
      <form className="form-main">
        <div className="formInner">
          <h1 className="heading">Edit User</h1>
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
            <label htmlFor="name">Contact No : </label>
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
            <textarea
              type="text"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, address: e.target.value })
              }
              value={details.address}
              required
              className="inputSpace"
              style={{ width: "300px" }}
            />
          </div>

          <button className="submitButton-1" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
