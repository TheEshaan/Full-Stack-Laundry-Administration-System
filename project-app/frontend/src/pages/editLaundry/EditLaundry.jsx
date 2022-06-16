import React, { useEffect, useState } from "react";
import "./editLaundry.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditLaundry() {
  const [details, setDetails] = useState({});
  const location = useLocation(),
    navigate = useNavigate();
  const laundryId = location.pathname.split("/")[3];
  console.log(laundryId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/laundry/find/${laundryId}`
        );
        setDetails(data);
      } catch (error) {
        window.alert(error);
      }
    };
    fetchData();
  }, [laundryId]);
  console.log(details);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/laundry/update/${laundryId}`,
        details
      );
      window.alert("Laundry updated successfully");
      navigate("../../laundryList");
    } catch (error) {}
  };

  return (
    <div className="editLaundry-container">
      <div className="editLaundry-wrapper">
        <h1 className="headingEL">Edit Laundry</h1>

        <div className="formGroupEL">
          Wash Category:
          <input
            type="text"
            style={{ border: "0" }}
            value={details.category}
            onChange={(e) =>
              setDetails({ ...details, category: e.target.value })
            }
          />
        </div>
        <div className="formGroupEL">
          Status:{" "}
          <input
            type="text"
            style={{ border: "0" }}
            onChange={(e) => setDetails({ ...details, status: e.target.value })}
            value={details.status}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <button
            className="editLaundryBtn"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "15px",
            }}
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLaundry;
