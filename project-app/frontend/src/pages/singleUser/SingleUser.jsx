import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./singleUser.css";
function SingleUser() {
  const location = useLocation();
  const username = location.pathname.split("/")[2];
  const [userDetails, setUserDetails] = useState({});
  const [userLaundry, setUserLaundry] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/find/${username}`
        );
        console.log(data);
        setUserDetails(data);
      } catch (err) {}
    };
    const fetchUserLaundry = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/laundry/user/${username}`
        );
        console.log(data);
        setUserLaundry(data);
      } catch (err) {}
    };
    fetchUserData();
    fetchUserLaundry();
  }, []);
  return (
    <div className="singleUser">
      <div className="leftContainer">
        <h3 className="title">User info</h3>
        <div className="userInfo">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            className="singleUserImg"
          />
          <span className="userInfoLine">Name: {userDetails.name}</span>
          <div className="userInfoLine">Username: {userDetails.username}</div>
          <div className="userInfoLine">Contact: {userDetails.contactNo}</div>
          <div className="userInfoLine">Address: {userDetails.address}</div>
        </div>
      </div>
      <div className="rightContainer">
        <h3 className="title">User Items</h3>
        <div className="userItems">
          <tr className="tableRow">
            <th className="tableHeading">Category</th>
            <th className="tableHeading">Total Cost</th>
            <th className="tableHeading">Status</th>
            <th className="tableHeading">Items, Qty</th>
          </tr>
          {userLaundry.map((laundry) => (
            <div className="userDetailsInfoTable">
              <tr className="tableRow">
                <th className="tableRowContents">{laundry.category}</th>
                <th className="tableRowContents">{laundry.cost}</th>
                <th className="tableRowContents">{laundry.status}</th>
                <th className="tableRowContents">
                  {laundry.items.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ paddingLeft: "10px" }}>{item.itemType}</div>
                      <div>x{item.quantity}</div>
                    </div>
                  ))}
                </th>
              </tr>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
