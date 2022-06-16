import React from "react";
import "./userItem.css";
import { Edit, Delete } from "@material-ui/icons";
import { useNavigate } from "react-router";
function UserItem({ listItem, actionFunc }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    actionFunc.delete(listItem._id);
  };
  const handleEdit = async () => {
    navigate(`../edit/user/${listItem._id}`);
  };
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
      <div className="user-row">
        <div className="table-data firstCol">{listItem.username}</div>
        <div className="table-data secondCol">{listItem.name}</div>
        <div className="table-data thirdCol">{listItem.contactNo}</div>
        <div className="table-data fourthCol">{listItem.address}</div>
        <div className="table-data fifthCol">
          {convertDate(listItem.createdAt)}
        </div>
        <div className="table-data sixthCol">
          <Edit
            style={{
              color: "white",
              backgroundColor: "green",
              marginRight: "20px",
            }}
            onClick={handleEdit}
          />
          <Delete
            style={{ color: "white", backgroundColor: "red" }}
            onClick={handleDelete}
          />
        </div>
      </div>
      <div className="line-breaker"></div>
    </>
  );
}

export default UserItem;
