import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { menu } from "const/menu";

import "./Layout.scss";

export const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  return (
    <div className="layout">
      <div className="layout-content">
        <Outlet />
        <ToastContainer autoClose={2000} limit={2} />
      </div>
      <nav>
        <ul>
          {menu.map((item, i) => {
            return (
              <li
                key={i}
                onClick={() => setCurrentPage(item.link)}
                className={currentPage === item.link ? "selected" : ""}
              >
                <Link to={item.link}>
                  <Icon icon={item.icon} className="menu-icon" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
