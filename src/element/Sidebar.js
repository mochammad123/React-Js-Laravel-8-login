import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./../logo.svg";

const Sidebar = () => {
  const [user, setUser] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/datauser").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    if (!token) {
      history.push("/");
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.post("http://127.0.0.1:8000/api/logout").then(() => {
      localStorage.removeItem("token");
      history.push("/");
      window.location.reload(true);
    });
  };

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <Link href="#" class="brand-link">
        <img
          src={logo}
          alt="App Lgo"
          className="brand-image img-circle elevation-3"
        />
        <span class="brand-text font-weight-light">{user.name}</span>
      </Link>

      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              src={logo}
              alt="User logo"
              className="brand-image img-circle elevation-2"
            />
          </div>
          <div class="info">
            <Link href="#" class="d-block">
              {user.level}
            </Link>
          </div>
        </div>

        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-item">
              <Link to="/" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            {() => {
              if (user.level === "admin") {
                return (
                  <li class="nav-item">
                    <Link to="/" class="nav-link">
                      <i class="nav-icon fas fa-users"></i>
                      <p>Data User</p>
                    </Link>
                  </li>
                );
              }
            }}
            <li class="nav-item">
              <Link to="/" class="nav-link">
                <i class="nav-icon fas fa-briefcase"></i>
                <p>Data Helpdesk</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link onClick={logoutHandler} class="nav-link">
                <i class="nav-icon fas fa-lock"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
