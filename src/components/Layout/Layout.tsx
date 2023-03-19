import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { Icon } from "@iconify/react";

import { navigation } from "const/navigation";

import "./Layout.scss";

export const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const selectedPageKey = currentPage.replace(/([\w-]+)\/.*/, "$1");

  return (
    <div className="layout">
      <div className="layout-content">
        <Outlet />
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
                    item.link.includes(selectedPageKey) ? "selected" : ""
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
