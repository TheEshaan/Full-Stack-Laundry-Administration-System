import React, { useEffect, useRef, useState } from "react";
import "./userList.css";
import { useNavigate } from "react-router-dom";
import UserItem from "../userItem/UserItem";
import axios from "axios";

export default function UserList() {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const textRef = useRef();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (textRef.current.value) navigate(`../user/${textRef.current.value}`);
    else window.alert("Empty Search");
  };

  async function handleSubmit() {
    navigate("../newUser");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user");
        setUserList(res.data);
      } catch (err) {
        window.alert("Couldn't fetch User List");
      }
    };
    fetchData();
  }, []);

  const handleUserDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/delete/${userId}`);
      setUserList((prevList) => {
        return prevList.filter((user) => {
          return user._id !== userId;
        });
      });

      window.alert("User Deleted Succesfully");
    } catch (err) {
      window.alert("Couldn't Delete User");
    }
  };

  const handleUserEdit = async (userId, editInfo) => {
    try {
      await axios.put(
        `http://localhost:5000/api/user/edit/${userId}`,
        editInfo
      );

      setUserList((prevList) => {
        let arr = [...prevList];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]._id === userId) {
            arr[i] = { ...arr[i], ...editInfo };
          }
        }
        return arr;
      });
      window.alert("User Edited Succesfully");
    } catch (err) {}
  };

  return (
    <div className="LoFormMain">
      <br />
      <h2
        className="heading"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1%",
        }}
      >
        <div style={{ fontWeight: "400", fontSize: "40px" }}>User List</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="inputBar"
            placeholder="Search User"
            ref={textRef}
          />
          <button
            className="searchButton-1"
            onClick={handleSearch}
            style={{ marginLeft: "5px" }}
          >
            Search
          </button>
        </div>
        <button className="searchButton-1" onClick={handleSubmit}>
          Add New User
        </button>
      </h2>
      <div className="user-container">
        <div className="user-table">
          <div className="user-headerRow">
            <div className="table-head firstCol">Username</div>
            <div className="table-head secondCol">Name</div>
            <div className="table-head thirdCol">Contact Number</div>
            <div className="table-head fourthCol">Address</div>
            <div className="table-head fifthCol">Created At</div>
            <div className="table-head sixthCol">Actions</div>
          </div>
          <div className="line-breaker"></div>
          <div className="laundry-rows">
            {userList.map((listItem) => (
              <UserItem
                listItem={listItem}
                key={listItem.username}
                actionFunc={{ edit: handleUserEdit, delete: handleUserDelete }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
