import Topbar from "./component/topbar/Topbar";
import Sidebar from "./component/sidebar/Sidebar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import LaundryList from "./pages/laundryList/LaundryList";
import LaundryCategory from "./pages/laundryCategory/LaundryCategory";
import NewLaundryForm from "./pages/newLaundryForm/NewLaundryForm";
import NewUserForm from "./pages/newUserForm/NewUserForm";
import SingleUser from "./pages/singleUser/SingleUser";
import EditLaundry from "./pages/editLaundry/EditLaundry";
import EditUser from "./pages/editUser/EditUser";
import Reports from "./pages/reports/Reports";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/newUser" element={<NewUserForm />} />
          <Route path="/laundryList" element={<LaundryList />} />
          <Route path="/laundryOrderForm" element={<NewLaundryForm />} />
          <Route path="/laundryCategory" element={<LaundryCategory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/user/:username" element={<SingleUser />} />
          <Route path="/edit/laundry/:id" element={<EditLaundry />} />
          <Route path="/edit/user/:id" element={<EditUser/>} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;