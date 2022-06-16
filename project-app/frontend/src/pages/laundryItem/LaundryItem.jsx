import { Delete, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./laundryItem.css";
import { useNavigate } from "react-router";
function LaundryItem({ listItem, actionFunc }) {
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    actionFunc.delete(listItem._id);
  };
  const handleEdit = async () => {
    navigate(`../edit/laundry/${listItem._id}`);
  };
  useEffect(() => {
    // setDate(new Date(listItem.createdAt).toDateString);
  }, []);
  // console.log(date);
  const convertDate = (isoDate) => {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return dt + "-" + month + "-" + year;
  };
  return (
    <>
      <div className="laundry-row">
        <div className="table-data firstCol">
          {listItem.customer[0].username}
        </div>
        <div className="table-data secondCol">{listItem.customer[0].name}</div>
        <div className="table-data thirdCol">{listItem.status}</div>
        <div className="table-data fourthCol">{listItem.category}</div>
        <div className="table-data fifthCol">₹ {listItem.cost}</div>
        <div className="table-data sixthCol">
          {convertDate(listItem.createdAt)}
        </div>
        <div className="table-data sixthCol">
          <Edit
            onClick={handleEdit}
            style={{
              marginRight: "20px",
              color: "white",
              backgroundColor: "green",
            }}
          />
          <Delete
            onClick={handleDelete}
            style={{ color: "white", backgroundColor: "red" }}
          />
        </div>
        {!viewMode && (
          <button className="arrow-buttons" onClick={() => setViewMode(true)}>
            ↓
          </button>
        )}
        {viewMode && (
          <button className="arrow-buttons" onClick={() => setViewMode(false)}>
            ↑
          </button>
        )}
      </div>
      {viewMode && (
        <pre className="extraInfo-container">
          Items:{" "}
          {listItem.items.map((item) => {
            return (
              <pre className="itemsListDown">
                <strong>
                  {item.itemType} x{item.quantity}{" "}
                </strong>
              </pre>
            );
          })}
        </pre>
      )}

      <div className="line-breaker"></div>
    </>
  );
}

export default LaundryItem;
