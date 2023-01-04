import React, { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { BalanceWheel } from "apps/balanceWheel";
import { Layout } from "components/Layout";
import { Routing } from "types/other";
import { findObject } from "utils/objects";

import "./App.scss";

const App: React.FC = () => {
  const routings: Routing[] = [
    {
      path: "",
      element: <NotFound />,
      title: "Домашняя страница",
      index: true,
    },
    {
      path: "balance-wheel",
      element: <BalanceWheel />,
      title: "Колесо баланса",
    },
    { path: "*", element: <NotFound />, title: "Страница не найдена" },
  ];

  const location = useLocation();
  const currentRouting = findObject(
    routings,
    "path",
    location.pathname.slice(1),
  );

  useEffect((): void => {
    document.title = `Organizer - ${
      currentRouting?.title || "Страница не найдена"
    }`;
  }, [currentRouting]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routings.map((routing) => (
          <Route
            key={routing.path}
            index={routing.index}
            element={routing.element}
            path={routing.path}
          />
        ))}
      </Route>
    </Routes>
  );
};

function NotFound() {
  return (
    <div>
      Такой страницы нет. <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default App;
