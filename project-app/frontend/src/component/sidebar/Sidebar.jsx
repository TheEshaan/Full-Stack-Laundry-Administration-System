import "./sidebar.css";
import {
  LineStyle,
  BarChart,
  PlaylistAddCheck,
  LocalLaundryService,
  AllInbox,
  PeopleAlt,
  Equalizer,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const classSelector = (str) => {
    if (str === location.pathname) {
      return "sidebarListItem sidebarListItemSelected";
    }
    return "sidebarListItem";
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className={classSelector("/")}>
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={classSelector("/users")}>
                <PeopleAlt className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/reports" className="link">
              <li className={classSelector("/reports")}>
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Laundry</h3>
          <ul className="sidebarList">
            <Link to="/laundryList" className="link">
              <li className={classSelector("/laundryList")}>
                <PlaylistAddCheck className="sidebarIcon" />
                Laundry List
              </li>
            </Link>
            <Link to="/laundryCategory" className="link">
              <li className={classSelector("/laundryCategory")}>
                <LocalLaundryService className="sidebarIcon" />
                Laundry Category
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
