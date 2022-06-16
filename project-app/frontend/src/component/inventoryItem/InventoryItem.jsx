import React from "react";
import "./inventoryItem.css";
export default function InventoryItem({ listItem }) {
  return (
    <>
      <div className="inventory-row">
        <div className="table-data firstCol">{listItem.username}</div>
        <div className="table-data secondCol">{listItem.name}</div>
        <div className="table-data thirdCol">{listItem.recievedItems}</div>
        <div className="table-data fourthCol">{listItem.processingItems}</div>
        <div className="table-data fifthCol">{listItem.shippedItems}</div>
        <div className="table-data sixthCol">{listItem.deliveredItems}</div>
      </div>
      <div className="line-breaker"></div>
    </>
  );
}
