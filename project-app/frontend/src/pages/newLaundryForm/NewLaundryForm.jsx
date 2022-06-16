import { React, useState } from "react";
import "./newLaundryForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function NewLaundryForm() {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    category: "",
    items: [],
  });
  const [newItem, setNewItem] = useState({
    itemType: "",
    quantity: 0,
  });
  const [editMode, setEditMode] = useState(false);

  const addItemHandler = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const submitNewItemHandler = (e) => {
    e.preventDefault();
    setDetails((prevDetails) => {
      let arr = [...prevDetails.items];
      arr.push(newItem);
      return { ...details, items: arr };
    });
    setEditMode(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/laundry",
        details
      );
      window.alert("Laundry Order added successfully");
      console.log(res);
    } catch (err) {}
    navigate("../laundryList");
  };

  return (
    <div className="laundryForm-container">
      <div className="laundryForm-wrapper">
      <h1 className="headingNL">Create New Laundry Order</h1>
        <div className="username-container">
          <div className="addItemText">Username: </div>
          <input
            className="addItemTextBlk"
            type="text"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
        </div>
        <div className="washCategory-container">
          <div className="addItemText">Wash Category: </div>
          <input
            className="addItemTextBlk"
            type="text"
            onChange={(e) =>
              setDetails({ ...details, category: e.target.value })
            }
          />
        </div>
        <div className="items-container">
          {details.items.map((item, index) => {
            return (
              <div>
                <span>
                  <span>{index + 1} ) </span>
                  <span>Item: </span>
                  <span>{item.itemType}</span>
                </span>
                <span style={{ marginLeft: "10px" }}>
                  <span>Quantity: </span>
                  <span>{item.quantity}</span>
                </span>
              </div>
            );
          })}
        </div>
        {editMode && (
          <div className="newItem-container">
            <div>
              <div className="">Item Name: </div>
              <input
                type="text"
                onChange={(e) =>
                  setNewItem({ ...newItem, itemType: e.target.value })
                }
              />
            </div>
            <div>
              <div className="">Item Quantity: </div>
              <input
                type="text"
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
              />
            </div>
            <button
              onClick={submitNewItemHandler}
              style={{ marginTop: "10px" }}
              className="addUserCategoryButtons"
            >
              Add
            </button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          {!editMode && (
            <button
              onClick={addItemHandler}
              style={{ margin: "10px" }}
              className="addUserCategoryButtons"
            >
              Add Item
            </button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <button
            onClick={submitHandler}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            className="addUserCategoryButtons"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
