import axios from "axios";
import { useEffect, useState } from "react";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const [recentLaundry, setRecentLaundry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/laundry/recent"
        );
        setRecentLaundry(data);
      } catch (err) {}
    };
    fetchData();
  }, []);

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
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Orders</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {recentLaundry.map((laundry) => (
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{laundry.customer[0].name}</span>
            </td>
            <td className="widgetLgDate">{convertDate(laundry.createdAt)}</td>
            <td className="widgetLgAmount">₹ {laundry.cost}</td>
            <td className="widgetLgStatus">
              <Button type={laundry.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
