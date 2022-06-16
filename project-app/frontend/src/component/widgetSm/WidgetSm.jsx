import { useEffect } from "react";
import { useState } from "react";
import "./widgetSm.css";
import axios from "axios";

export default function WidgetSm() {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/recent"
        );
        setRecentUsers(data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Recently Joined Members</span>
      <ul className="widgetSmList">
        {recentUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
