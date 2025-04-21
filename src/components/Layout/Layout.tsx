import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { Icon, Types } from "organizer-ui";

import { navigation } from "const/navigation";

import "./Layout.scss";

export const Layout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const selectedPageKey = currentPage.replace(/([\w-]+)\/.*/, "$1");

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  return (
    <div className="layout">
      <div className="layout-content">
        <Outlet />
      </div>
      <nav>
        <ul>
          {navigation.map((item, i) => {
            const isSelected =
              selectedPageKey !== "/" && item.link.includes(selectedPageKey);
            const cn = [
              isSelected && "selected",
              selectedPageKey !== "/" &&
                navigation[i + 1]?.link?.includes(selectedPageKey) &&
                "pre-selected",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              item.inMenu &&
              item.icon && (
                <li
                  key={i}
                  onClick={() => setCurrentPage(item.link)}
                  className={cn}
                >
                  <Link to={item.link}>
                    <Icon
                      name={item.icon}
                      theme={
                        isSelected
                          ? Types.ColorThemeExtended.Primary
                          : Types.ColorThemeExtended.Tertiary
                      }
                      size={Types.Size.Large}
                    />
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

// TODO: bibla na udalenie @iconify/react
