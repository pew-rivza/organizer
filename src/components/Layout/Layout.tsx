import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { navigation } from "const/navigation";

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
          {navigation.map((item, i) => {
            return (
              item.inMenu && (
                <li
                  key={i}
                  onClick={() => setCurrentPage(item.link)}
                  className={
                    currentPage === item.link ||
                    new RegExp(`${item.link}/.+`).test(currentPage)
                      ? "selected"
                      : ""
                  }
                >
                  <Link to={item.link}>
                    <Icon icon={item.icon || ""} className="menu-icon" />
                  </Link>
                </li>
              )
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
