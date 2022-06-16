import React, { useState, useEffect } from "react";
import "./laundryList.css";
import { useNavigate } from "react-router-dom";
import LaundryItem from "../laundryItem/LaundryItem";
import axios from "axios";

export default function LaundryList() {
  let navigate = useNavigate();
  const [laundryList, setLaundryList] = useState([]);
  const [totalLaundryList, setTotalLaundryList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  async function handleSubmit() {
    navigate("../laundryOrderForm");
  }

  const handleLaundryEdit = (arg1, arg2) => {
    console.log("hi");
  };

  const handleLaundryDelete = async (laundryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/laundry/delete/${laundryId}`
      );
      setLaundryList((prevList) => {
        return prevList.filter((user) => {
          return user._id !== laundryId;
        });
      });
      window.alert("Laundry Deleted Succesfully");
    } catch (err) {
      window.alert("Couldn't Delete Laundry");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/laundry");
        setLaundryList(data);
        setTotalLaundryList(data);
      } catch (err) {
        window.alert(err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setLaundryList(() => {
      return totalLaundryList.filter((listItem) => {
        return (
          (!fromDate || compareDate(listItem.createdAt, fromDate)) &&
          (!toDate || compareDate(toDate, listItem.createdAt))
        );
      });
    });
  }, [fromDate, toDate, totalLaundryList]);
  const compareDate = (dt1, dt2) => {
    const date1 = new Date(dt1);
    const date2 = new Date(dt2);

    const date1WithoutTime = new Date(date1.getTime());
    const date2WithoutTime = new Date(date2.getTime());

    date1WithoutTime.setUTCHours(0, 0, 0, 0);
    date2WithoutTime.setUTCHours(0, 0, 0, 0);

    if (date1WithoutTime.getTime() > date2WithoutTime.getTime()) {
      return true;
    } else if (date1WithoutTime.getTime() === date2WithoutTime.getTime()) {
      return true;
    } else {
      return false;
    }
  };
  console.log(laundryList);
  return (
    <div className="LoFormMain">
      <div className="heading">
        <div className="titleLL">Laundry List</div>
        <br />

        <div className="double-date">
          <input
            type={"date"}
            className="date-input1"
            placeholder="From"
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type={"date"}
            className="date-input2"
            placeholder="To"
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="newLO">
          <button className="newOrder" onClick={handleSubmit}>
            Create New Laundry Order
          </button>
        </div>

        {/* <button className="search" style={{ marginLeft: "1%" }}>
          Search
        </button> */}
      </div>
      <div className="laundry-container">
        <div className="laundry-table">
          <div className="laundry-headerRow">
            <div className="table-head firstCol">
              <b>Username</b>
            </div>
            <div className="table-head secondCol">
              <b>Name</b>
            </div>
            <div className="table-head thirdCol">
              <b>Status</b>
            </div>
            <div className="table-head fourthCol">
              <b>Wash Category</b>
            </div>
            <div className="table-head fifthCol">
              <b>Total Cost</b>
            </div>
            <div className="table-head sixthCol">
              <b>Order Date</b>
            </div>
            <div className="table-head seventhCol">
              <b>Action</b>
            </div>
          </div>
          <div className="line-breaker"></div>
          <div className="laundry-rows">
            {laundryList.map((listItem, index) => (
              <LaundryItem
                listItem={listItem}
                key={index}
                actionFunc={{
                  edit: handleLaundryEdit,
                  delete: handleLaundryDelete,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
