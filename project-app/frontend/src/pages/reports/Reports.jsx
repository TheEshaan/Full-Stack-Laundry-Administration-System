import React from "react";
import "./reports.css";
import BarGraph from "../../component/ReportsPage Components/barGraph";
import PieChart from "../../component/ReportsPage Components/PieChart";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { data } from "../../component/ReportsPage Components/barGraphData";

export default function Reports() {
  const [washData, setWashData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchWashData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/revenue/profit/category"
        );
        setWashData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/laundry/users/status"
        );
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/user/");
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWashData();
    fetchUsers();
    fetchUserData();
  }, []);
  const findIn = (_id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === _id) return i;
    }
    return -1;
  };

  return (
    <div className="containerReports">
      <div className="categoryWiseIncome">
        <h1 className="headingReports">Combined Revenue</h1>
        <div className="innerContent">
          <div className="displayOrientation">
            {" "}
            <PieChart data={washData} />{" "}
          </div>
          <div className="displayInfo">
            <div className="headingAll">Category Wise</div>
            <div className="information">
              <table className="userInformationTable">
                <tr className="tableUserPending">
                  <th className="tableUserInfoList">Wash Category</th>
                  <th className="tableUserInfoList">Revenue</th>
                </tr>
                {washData.map((data) => (
                  <tr className="tableUserPending">
                    <td className="tableUserInfoList">{data._id}</td>
                    <td className="tableUserInfoList">
                      ₹ {data.totalSaleAmount}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="categoryWashGraph">
        <h1 className="headingReports">Overall Demand</h1>
        <div className="innerContent">
          <div className="displayOrientation">
            {" "}
            <BarGraph data={washData} title="Hi" />{" "}
          </div>
          <div className="displayInfo">
            <div className="headingAll">Category Wise Demand</div>
            <div className="information">
              <table className="userInformationTable">
                <tr className="tableUserPending">
                  <th className="tableUserInfoList">Wash Category</th>
                  <th className="tableUserInfoList">Demand (Order Numbers)</th>
                </tr>
                {washData.map((data) => (
                  <tr className="tableUserPending">
                    <td className="tableUserInfoList">{data._id}</td>
                    <td className="tableUserInfoList">{data.count}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="userLaundryStatus">
        <h1 className="headingReports">Users Laundry status</h1>
        <div className="innerContent">
          <div className="displayInfo">
            <div className="headingAll">Pending User List</div>
            <div className="information">
              <table className="userInformationTable">
                <tr className="tableUserPending">
                  <th className="tableUserInfoList">Users</th>
                  <th className="tableUserInfoList">Amount</th>
                </tr>
                {users &&
                  userData &&
                  userData.pendingUsers &&
                  userData.pendingUsers.length &&
                  userData.pendingUsers.map((data) => {
                    let index = findIn(data._id[0]);
                    if (index === -1) return "";
                    else
                      return (
                        <tr className="tableUserPending">
                          <td className="tableUserInfoList">
                            {users[index].name}
                          </td>
                          <td className="tableUserInfoList">₹ {data.amount}</td>
                        </tr>
                      );
                  })}
              </table>
            </div>
          </div>
          <div className="displayInfo">
            <div className="headingAll">Recieved User List</div>
            <div className="information">
              <table className="userInformationTable">
                <tr className="tableUserPending">
                  <th className="tableUserInfoList">Users</th>
                  <th className="tableUserInfoList">Amount</th>
                </tr>
                {users.length !== 0 &&
                  userData &&
                  userData.recievedUsers &&
                  userData.recievedUsers.map((data) => {
                    let index = findIn(data._id[0]);
                    if (index === -1) return "";
                    else
                      return (
                        <tr className="tableUserPending">
                          <td className="tableUserInfoList">
                            {users[index].name}
                          </td>
                          <td className="tableUserInfoList">₹ {data.amount}</td>
                        </tr>
                      );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
