import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

import { Layout } from "components/Layout";
import { Routing } from "types/other";
import { getRoutings } from "utils/navigation";
import { findObject } from "utils/objects";

import "./App.scss";

const App: React.FC = () => {
  const location = useLocation();

  const routings: Routing[] = getRoutings();

  const currentRouting = findObject<string, Routing>(
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

export default App;
